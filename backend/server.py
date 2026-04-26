from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import bcrypt
import jwt
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_SECRET = os.environ['JWT_SECRET']
JWT_ALGORITHM = "HS256"

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- Password & JWT helpers ---

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))

def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email, "exp": datetime.now(timezone.utc) + timedelta(hours=24), "type": "access"}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(request: Request) -> dict:
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = auth_header[7:]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"id": payload["sub"]})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return {"id": user["id"], "email": user["email"], "name": user.get("name", ""), "role": user.get("role", "")}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# --- Pydantic Models ---

class LoginRequest(BaseModel):
    email: str
    password: str

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    message: str
    created_at: str
    status: str

class ProductCreate(BaseModel):
    name: str
    category: str
    image: str
    description: str
    features: List[str] = []
    colors: List[str] = []
    minOrder: str = "50 meters"

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    image: Optional[str] = None
    description: Optional[str] = None
    features: Optional[List[str]] = None
    colors: Optional[List[str]] = None
    minOrder: Optional[str] = None

class ProductResponse(BaseModel):
    id: str
    name: str
    category: str
    image: str
    description: str
    features: List[str]
    colors: List[str]
    minOrder: str

# --- Auth Endpoints ---

@api_router.post("/auth/login")
async def login(req: LoginRequest):
    email = req.email.lower().strip()
    user = await db.users.find_one({"email": email}, {"_id": 0})
    if not user or not verify_password(req.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(user["id"], user["email"])
    return {"token": token, "user": {"id": user["id"], "email": user["email"], "name": user.get("name", ""), "role": user.get("role", "")}}

@api_router.get("/auth/me")
async def get_me(user: dict = Depends(get_current_user)):
    return user

# --- Public Endpoints ---

@api_router.get("/")
async def root():
    return {"message": "Suntex Traders API"}

@api_router.get("/products", response_model=List[ProductResponse])
async def get_products(category: Optional[str] = None):
    query = {} if not category or category == "all" else {"category": category}
    products = await db.products.find(query, {"_id": 0}).to_list(1000)
    return products

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(contact: ContactMessage):
    doc = {
        "id": str(uuid.uuid4()),
        "name": contact.name,
        "email": contact.email,
        "message": contact.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "new",
    }
    await db.contact_messages.insert_one(doc)
    return ContactResponse(**{k: v for k, v in doc.items() if k != "_id"})

# --- Admin Endpoints ---

@api_router.get("/admin/contacts")
async def admin_get_contacts(user: dict = Depends(get_current_user)):
    messages = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return messages

@api_router.patch("/admin/contacts/{contact_id}")
async def admin_update_contact(contact_id: str, status: str = "read", user: dict = Depends(get_current_user)):
    result = await db.contact_messages.update_one({"id": contact_id}, {"$set": {"status": status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"success": True}

@api_router.delete("/admin/contacts/{contact_id}")
async def admin_delete_contact(contact_id: str, user: dict = Depends(get_current_user)):
    result = await db.contact_messages.delete_one({"id": contact_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"success": True}

@api_router.post("/admin/products", response_model=ProductResponse)
async def admin_create_product(product: ProductCreate, user: dict = Depends(get_current_user)):
    doc = {"id": str(uuid.uuid4()), **product.model_dump()}
    await db.products.insert_one(doc)
    return ProductResponse(**{k: v for k, v in doc.items() if k != "_id"})

@api_router.put("/admin/products/{product_id}", response_model=ProductResponse)
async def admin_update_product(product_id: str, product: ProductUpdate, user: dict = Depends(get_current_user)):
    updates = {k: v for k, v in product.model_dump().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")
    await db.products.update_one({"id": product_id}, {"$set": updates})
    updated = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not updated:
        raise HTTPException(status_code=404, detail="Product not found")
    return ProductResponse(**updated)

@api_router.delete("/admin/products/{product_id}")
async def admin_delete_product(product_id: str, user: dict = Depends(get_current_user)):
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"success": True}

# --- Startup: Seed Admin + Products ---

INITIAL_PRODUCTS = [
    {"id": "p1", "name": "Dyed Net Fabric", "category": "net", "image": "https://images.unsplash.com/photo-1634640243198-f1dddab5f677?w=800&q=80", "description": "Premium dyed net fabric available in a spectrum of rich colors. Ideal for overlays, gowns, and decorative draping.", "features": ["Vibrant color retention", "Lightweight & breathable", "Multiple GSM options", "Bulk-ready"], "colors": ["Black", "Navy", "Burgundy", "Ivory", "Gold"], "minOrder": "100 meters"},
    {"id": "p2", "name": "Plain Net Fabric", "category": "net", "image": "https://images.unsplash.com/photo-1613132933857-e2f330cd44fb?w=800&q=80", "description": "Versatile plain net fabric with consistent weave quality. Perfect base for embroidery or standalone use.", "features": ["Uniform mesh pattern", "Easy to dye", "Wrinkle-resistant", "Consistent quality"], "colors": ["White", "Off-white", "Black", "Nude"], "minOrder": "100 meters"},
    {"id": "p3", "name": "Embroidered Net", "category": "net", "image": "https://images.unsplash.com/photo-1590507673164-6c6d319f9b84?w=800&q=80", "description": "Intricately embroidered net fabric with floral and geometric patterns. Adds elegance to any garment.", "features": ["Handcrafted embroidery", "Premium thread work", "Designer patterns", "Export quality"], "colors": ["Multi-color", "Gold thread", "Silver thread"], "minOrder": "50 meters"},
    {"id": "p4", "name": "Classic Cancan", "category": "cancan", "image": "https://images.pexels.com/photos/6843277/pexels-photo-6843277.jpeg?auto=compress&cs=tinysrgb&w=800", "description": "Stiff, layered cancan fabric designed to add volume beneath gowns, lehengas, and formal dresses.", "features": ["High stiffness", "Volume-enhancing", "Lightweight layers", "Crease-resistant"], "colors": ["White", "Black", "Red", "Pink", "Cream"], "minOrder": "100 meters"},
    {"id": "p5", "name": "Soft Cancan Net", "category": "cancan", "image": "https://images.pexels.com/photos/11189313/pexels-photo-11189313.jpeg?auto=compress&cs=tinysrgb&w=800", "description": "A softer variant of cancan with gentle structure for flowy silhouettes.", "features": ["Soft hand feel", "Moderate stiffness", "Breathable", "Multi-layer ready"], "colors": ["White", "Ivory", "Black", "Blush"], "minOrder": "100 meters"},
    {"id": "p6", "name": "Embroidered Organza", "category": "organza", "image": "https://images.pexels.com/photos/4862896/pexels-photo-4862896.jpeg?auto=compress&cs=tinysrgb&w=800", "description": "Sheer organza fabric adorned with delicate embroidery. Ideal for dupattas, sarees, and bridal ensembles.", "features": ["Sheer elegance", "Detailed embroidery", "Crisp finish", "Bridal-grade quality"], "colors": ["Pastel shades", "Gold", "White", "Peach"], "minOrder": "50 meters"},
    {"id": "p7", "name": "Dyed Organza", "category": "organza", "image": "https://images.pexels.com/photos/6843280/pexels-photo-6843280.jpeg?auto=compress&cs=tinysrgb&w=800", "description": "Richly dyed organza with a lustrous finish for fashion-forward designs.", "features": ["Lustrous sheen", "Rich color palette", "Lightweight drape", "Easy to pleat"], "colors": ["Wine", "Emerald", "Sapphire", "Champagne", "Rose"], "minOrder": "100 meters"},
    {"id": "p8", "name": "Embroidered Viscose", "category": "viscose", "image": "https://images.unsplash.com/photo-1712212748773-39d4ea198be5?w=800&q=80", "description": "Soft viscose fabric with intricate embroidery work. Combines comfort with artistry.", "features": ["Ultra-soft texture", "Breathable fabric", "Detailed needlework", "Skin-friendly"], "colors": ["Earth tones", "Pastels", "Vibrant hues"], "minOrder": "50 meters"},
    {"id": "p9", "name": "Dyed Viscose", "category": "viscose", "image": "https://images.unsplash.com/photo-1632154670858-af875eb2716b?w=800&q=80", "description": "Luxuriously soft dyed viscose in deep, saturated colors.", "features": ["Silky drape", "Vibrant dyeing", "Moisture-wicking", "Anti-static"], "colors": ["Teal", "Rust", "Olive", "Burgundy", "Charcoal"], "minOrder": "100 meters"},
    {"id": "p10", "name": "Pure Georgette", "category": "georgette", "image": "https://images.unsplash.com/photo-1636545672666-391bda04f4d0?w=800&q=80", "description": "Flowing pure georgette fabric with a signature crinkled texture.", "features": ["Signature crinkle", "Flowing drape", "Lightweight", "Versatile styling"], "colors": ["Navy", "Black", "Ivory", "Rose", "Mint"], "minOrder": "100 meters"},
    {"id": "p11", "name": "Heavy Georgette", "category": "georgette", "image": "https://images.unsplash.com/photo-1642761689037-57424f3f80d2?w=800&q=80", "description": "A heavier variant of georgette offering more body and structure.", "features": ["Enhanced body", "Structured drape", "Opaque finish", "Premium feel"], "colors": ["Deep shades", "Jewel tones", "Neutrals"], "minOrder": "100 meters"},
    {"id": "p12", "name": "Silk Satin", "category": "satin", "image": "https://images.unsplash.com/photo-1613132923869-7da356bf6ec6?w=800&q=80", "description": "Luxurious silk satin with a high-gloss finish for bridal and luxury fashion.", "features": ["High-gloss finish", "Smooth hand feel", "Rich luster", "Bridal favorite"], "colors": ["Crimson", "Gold", "Ivory", "Black", "Royal Blue"], "minOrder": "50 meters"},
    {"id": "p13", "name": "Duchess Satin", "category": "satin", "image": "https://images.unsplash.com/photo-1617238793696-9035e7fc1825?w=800&q=80", "description": "Heavy-weight duchess satin with a subtle sheen and structured drape.", "features": ["Heavy weight", "Structured body", "Subtle luster", "Wrinkle-resistant"], "colors": ["Black", "White", "Navy", "Champagne"], "minOrder": "50 meters"},
]

@app.on_event("startup")
async def startup_event():
    # Seed admin
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@suntextraders.com").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "janvi123")
    existing = await db.users.find_one({"email": admin_email}, {"_id": 0})
    if not existing:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info(f"Admin user seeded: {admin_email}")
    elif not verify_password(admin_password, existing.get("password_hash", "")):
        await db.users.update_one({"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}})
        logger.info("Admin password updated")

    # Seed products if empty
    count = await db.products.count_documents({})
    if count == 0:
        await db.products.insert_many(INITIAL_PRODUCTS)
        logger.info(f"Seeded {len(INITIAL_PRODUCTS)} products")

    # Create indexes
    await db.users.create_index("email", unique=True)
    await db.products.create_index("category")

    # Write test credentials
    creds_path = Path("/app/memory/test_credentials.md")
    creds_path.parent.mkdir(parents=True, exist_ok=True)
    creds_path.write_text(f"# Admin Credentials\nEmail: {admin_email}\nPassword: {admin_password}\nRole: admin\n\n# Auth Endpoints\nPOST /api/auth/login\nGET /api/auth/me\n")

# Include router + middleware
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
