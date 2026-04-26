"""
Iteration 5 - Testing auth, products CRUD, admin contacts, public products API
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

ADMIN_EMAIL = "admin@suntextraders.com"
ADMIN_PASSWORD = "janvi123"


@pytest.fixture(scope="module")
def token():
    resp = requests.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert resp.status_code == 200, f"Login failed: {resp.text}"
    return resp.json()["token"]


@pytest.fixture(scope="module")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


# Auth tests
class TestAuth:
    def test_login_success(self):
        resp = requests.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert resp.status_code == 200
        data = resp.json()
        assert "token" in data
        assert data["user"]["email"] == ADMIN_EMAIL
        assert data["user"]["role"] == "admin"

    def test_login_wrong_password(self):
        resp = requests.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": "wrongpass"})
        assert resp.status_code == 401

    def test_get_me(self, auth_headers):
        resp = requests.get(f"{BASE_URL}/api/auth/me", headers=auth_headers)
        assert resp.status_code == 200
        assert resp.json()["email"] == ADMIN_EMAIL

    def test_get_me_unauthenticated(self):
        resp = requests.get(f"{BASE_URL}/api/auth/me")
        assert resp.status_code == 401


# Public products
class TestPublicProducts:
    def test_get_all_products(self):
        resp = requests.get(f"{BASE_URL}/api/products")
        assert resp.status_code == 200
        products = resp.json()
        assert len(products) >= 13

    def test_get_products_by_category(self):
        resp = requests.get(f"{BASE_URL}/api/products?category=net")
        assert resp.status_code == 200
        products = resp.json()
        assert all(p["category"] == "net" for p in products)

    def test_product_response_structure(self):
        resp = requests.get(f"{BASE_URL}/api/products")
        assert resp.status_code == 200
        p = resp.json()[0]
        for field in ["id", "name", "category", "image", "description", "features", "colors", "minOrder"]:
            assert field in p, f"Missing field: {field}"


# Admin products CRUD
class TestAdminProducts:
    created_id = None

    def test_create_product(self, auth_headers):
        resp = requests.post(f"{BASE_URL}/api/admin/products", headers=auth_headers, json={
            "name": "TEST_Product",
            "category": "net",
            "image": "https://example.com/img.jpg",
            "description": "Test description",
            "features": ["Feature 1"],
            "colors": ["Red"],
            "minOrder": "50 meters"
        })
        assert resp.status_code == 200
        data = resp.json()
        assert data["name"] == "TEST_Product"
        assert "id" in data
        TestAdminProducts.created_id = data["id"]

    def test_update_product(self, auth_headers):
        pid = TestAdminProducts.created_id
        if not pid:
            pytest.skip("No product created")
        resp = requests.put(f"{BASE_URL}/api/admin/products/{pid}", headers=auth_headers, json={"name": "TEST_Product_Updated"})
        assert resp.status_code == 200
        assert resp.json()["name"] == "TEST_Product_Updated"

    def test_delete_product(self, auth_headers):
        pid = TestAdminProducts.created_id
        if not pid:
            pytest.skip("No product created")
        resp = requests.delete(f"{BASE_URL}/api/admin/products/{pid}", headers=auth_headers)
        assert resp.status_code == 200
        assert resp.json()["success"] is True

    def test_create_product_unauthenticated(self):
        resp = requests.post(f"{BASE_URL}/api/admin/products", json={"name": "x", "category": "net", "image": "x", "description": "x"})
        assert resp.status_code == 401


# Admin contacts
class TestAdminContacts:
    contact_id = None

    def test_submit_contact(self):
        resp = requests.post(f"{BASE_URL}/api/contact", json={"name": "TEST_User", "email": "test@test.com", "message": "Hello test"})
        assert resp.status_code == 200
        data = resp.json()
        assert data["status"] == "new"
        TestAdminContacts.contact_id = data["id"]

    def test_get_contacts(self, auth_headers):
        resp = requests.get(f"{BASE_URL}/api/admin/contacts", headers=auth_headers)
        assert resp.status_code == 200
        assert isinstance(resp.json(), list)

    def test_mark_contact_read(self, auth_headers):
        cid = TestAdminContacts.contact_id
        if not cid:
            pytest.skip("No contact created")
        resp = requests.patch(f"{BASE_URL}/api/admin/contacts/{cid}?status=read", headers=auth_headers)
        assert resp.status_code == 200
        assert resp.json()["success"] is True

    def test_delete_contact(self, auth_headers):
        cid = TestAdminContacts.contact_id
        if not cid:
            pytest.skip("No contact created")
        resp = requests.delete(f"{BASE_URL}/api/admin/contacts/{cid}", headers=auth_headers)
        assert resp.status_code == 200
        assert resp.json()["success"] is True
