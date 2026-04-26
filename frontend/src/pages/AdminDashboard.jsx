import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { LogOut, Mail, Package, Trash2, Eye, EyeOff, Plus, Pencil, Search } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function getAuthHeaders() {
  const token = localStorage.getItem('admin_token');
  return { Authorization: `Bearer ${token}` };
}

const CATEGORIES = ['net', 'cancan', 'organza', 'viscose', 'georgette', 'satin'];

const emptyProduct = { name: '', category: 'net', image: '', description: '', features: '', colors: '', minOrder: '50 meters' };

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [products, setProducts] = useState([]);
  const [contactSearch, setContactSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);

  const fetchContacts = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/admin/contacts`, { headers: getAuthHeaders() });
      setContacts(data);
    } catch (err) {
      if (err.response?.status === 401) { localStorage.clear(); navigate('/admin'); }
    }
  }, [navigate]);

  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/products`);
      setProducts(data);
    } catch (err) { console.error(err); }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { navigate('/admin'); return; }
    fetchContacts();
    fetchProducts();
  }, [navigate, fetchContacts, fetchProducts]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin');
  };

  // Contact actions
  const toggleContactStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'read' ? 'new' : 'read';
    try {
      await axios.patch(`${API}/admin/contacts/${id}?status=${newStatus}`, {}, { headers: getAuthHeaders() });
      setContacts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    } catch (err) { toast.error('Failed to update'); }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API}/admin/contacts/${id}`, { headers: getAuthHeaders() });
      setContacts(prev => prev.filter(c => c.id !== id));
      toast.success('Message deleted');
    } catch (err) { toast.error('Failed to delete'); }
  };

  // Product actions
  const openAddProduct = () => {
    setEditingProduct(null);
    setProductForm(emptyProduct);
    setProductDialogOpen(true);
  };

  const openEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      image: product.image,
      description: product.description,
      features: product.features.join(', '),
      colors: product.colors.join(', '),
      minOrder: product.minOrder,
    });
    setProductDialogOpen(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.category || !productForm.image) {
      toast.error('Name, category, and image are required');
      return;
    }
    setSaving(true);
    const payload = {
      ...productForm,
      features: productForm.features.split(',').map(f => f.trim()).filter(Boolean),
      colors: productForm.colors.split(',').map(c => c.trim()).filter(Boolean),
    };
    try {
      if (editingProduct) {
        await axios.put(`${API}/admin/products/${editingProduct.id}`, payload, { headers: getAuthHeaders() });
        toast.success('Product updated');
      } else {
        await axios.post(`${API}/admin/products`, payload, { headers: getAuthHeaders() });
        toast.success('Product added');
      }
      setProductDialogOpen(false);
      fetchProducts();
    } catch (err) { toast.error('Failed to save product'); }
    finally { setSaving(false); }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/admin/products/${id}`, { headers: getAuthHeaders() });
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Product deleted');
    } catch (err) { toast.error('Failed to delete'); }
  };

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(contactSearch.toLowerCase())
  );

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const newCount = contacts.filter(c => c.status === 'new').length;

  return (
    <main data-testid="admin-dashboard" className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl font-light text-[#2D2D2D]" data-testid="admin-dashboard-title">Dashboard</h1>
            <p className="text-sm text-[#2D2D2D]/50 font-body font-light mt-1">Manage your store</p>
          </div>
          <button
            onClick={handleLogout} data-testid="admin-logout-btn"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-medium font-body text-[#2D2D2D]/50 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-[#E5E0D8] p-4 rounded-sm" data-testid="stat-total-contacts">
            <p className="text-2xl font-heading font-light text-teal-dark">{contacts.length}</p>
            <p className="text-xs uppercase tracking-[0.15em] text-[#2D2D2D]/40 font-body mt-1">Total Messages</p>
          </div>
          <div className="bg-white border border-[#E5E0D8] p-4 rounded-sm" data-testid="stat-new-contacts">
            <p className="text-2xl font-heading font-light text-teal-dark">{newCount}</p>
            <p className="text-xs uppercase tracking-[0.15em] text-[#2D2D2D]/40 font-body mt-1">New Messages</p>
          </div>
          <div className="bg-white border border-[#E5E0D8] p-4 rounded-sm" data-testid="stat-total-products">
            <p className="text-2xl font-heading font-light text-teal-dark">{products.length}</p>
            <p className="text-xs uppercase tracking-[0.15em] text-[#2D2D2D]/40 font-body mt-1">Total Products</p>
          </div>
          <div className="bg-white border border-[#E5E0D8] p-4 rounded-sm">
            <p className="text-2xl font-heading font-light text-teal-dark">{CATEGORIES.length}</p>
            <p className="text-xs uppercase tracking-[0.15em] text-[#2D2D2D]/40 font-body mt-1">Categories</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="contacts" className="w-full">
          <TabsList className="bg-white border border-[#E5E0D8] p-1 rounded-sm mb-6">
            <TabsTrigger value="contacts" data-testid="tab-contacts" className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-body rounded-sm data-[state=active]:bg-teal data-[state=active]:text-white">
              <Mail className="w-4 h-4" /> Messages {newCount > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{newCount}</span>}
            </TabsTrigger>
            <TabsTrigger value="products" data-testid="tab-products" className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-body rounded-sm data-[state=active]:bg-teal data-[state=active]:text-white">
              <Package className="w-4 h-4" /> Products
            </TabsTrigger>
          </TabsList>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#2D2D2D]/30" />
                <Input
                  placeholder="Search messages..." value={contactSearch} onChange={(e) => setContactSearch(e.target.value)}
                  data-testid="contact-search" className="pl-10 bg-white border-[#E5E0D8] font-body font-light rounded-sm"
                />
              </div>
            </div>
            <div className="space-y-3">
              {filteredContacts.map((c) => (
                <div key={c.id} data-testid={`contact-row-${c.id}`}
                  className={`bg-white border rounded-sm p-4 flex flex-col sm:flex-row sm:items-center gap-3 transition-colors ${c.status === 'new' ? 'border-teal/30' : 'border-[#E5E0D8]'}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-body font-medium text-sm text-[#2D2D2D] truncate">{c.name}</p>
                      {c.status === 'new' && <span className="text-[10px] uppercase tracking-wider bg-teal/10 text-teal-dark px-2 py-0.5 rounded-full font-body font-medium">New</span>}
                    </div>
                    <p className="text-xs text-[#2D2D2D]/40 font-body mb-1">{c.email} &middot; {new Date(c.created_at).toLocaleDateString()}</p>
                    <p className="text-sm text-[#2D2D2D]/60 font-body font-light line-clamp-2">{c.message}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => toggleContactStatus(c.id, c.status)} data-testid={`contact-toggle-${c.id}`}
                      className="p-2 border border-[#E5E0D8] rounded-sm hover:border-teal/30 transition-colors" title={c.status === 'read' ? 'Mark as unread' : 'Mark as read'}>
                      {c.status === 'read' ? <EyeOff className="w-4 h-4 text-[#2D2D2D]/40" /> : <Eye className="w-4 h-4 text-teal" />}
                    </button>
                    <button onClick={() => deleteContact(c.id)} data-testid={`contact-delete-${c.id}`}
                      className="p-2 border border-[#E5E0D8] rounded-sm hover:border-red-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {filteredContacts.length === 0 && <p className="text-center text-[#2D2D2D]/30 font-body font-light py-10">No messages found</p>}
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#2D2D2D]/30" />
                <Input
                  placeholder="Search products..." value={productSearch} onChange={(e) => setProductSearch(e.target.value)}
                  data-testid="product-search" className="pl-10 bg-white border-[#E5E0D8] font-body font-light rounded-sm"
                />
              </div>
              <button onClick={openAddProduct} data-testid="add-product-btn"
                className="flex items-center gap-2 bg-teal text-white px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium font-body hover:bg-teal-dark transition-colors rounded-sm shrink-0">
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((p) => (
                <div key={p.id} data-testid={`admin-product-${p.id}`}
                  className="bg-white border border-[#E5E0D8] rounded-sm overflow-hidden group">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-[0.15em] text-teal-dark font-body mb-1">{p.category}</p>
                    <h3 className="font-heading text-lg font-medium text-[#2D2D2D] mb-2">{p.name}</h3>
                    <p className="text-xs text-[#2D2D2D]/40 font-body font-light line-clamp-2 mb-3">{p.description}</p>
                    <div className="flex gap-2">
                      <button onClick={() => openEditProduct(p)} data-testid={`edit-product-${p.id}`}
                        className="flex items-center gap-1 text-xs text-teal-dark border border-teal/30 px-3 py-1.5 rounded-sm hover:bg-teal hover:text-white transition-colors font-body">
                        <Pencil className="w-3 h-3" /> Edit
                      </button>
                      <button onClick={() => deleteProduct(p.id)} data-testid={`delete-product-${p.id}`}
                        className="flex items-center gap-1 text-xs text-red-500/60 border border-red-200 px-3 py-1.5 rounded-sm hover:bg-red-500 hover:text-white transition-colors font-body">
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filteredProducts.length === 0 && <p className="text-center text-[#2D2D2D]/30 font-body font-light py-10">No products found</p>}
          </TabsContent>
        </Tabs>

        {/* Product Add/Edit Dialog */}
        <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
          <DialogContent className="sm:max-w-lg bg-white border border-[#E5E0D8] rounded-sm" data-testid="product-dialog">
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl font-light text-[#2D2D2D]">
                {editingProduct ? 'Edit Product' : 'Add Product'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleProductSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs uppercase tracking-[0.1em] text-[#2D2D2D]/50 font-body">Name *</Label>
                  <Input value={productForm.name} onChange={(e) => setProductForm(p => ({ ...p, name: e.target.value }))}
                    data-testid="product-form-name" className="bg-[#F7F5F1] border-[#E5E0D8] font-body font-light rounded-sm text-sm" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs uppercase tracking-[0.1em] text-[#2D2D2D]/50 font-body">Category *</Label>
                  <select value={productForm.category} onChange={(e) => setProductForm(p => ({ ...p, category: e.target.value }))}
                    data-testid="product-form-category"
                    className="w-full h-9 bg-[#F7F5F1] border border-[#E5E0D8] rounded-sm px-3 text-sm font-body font-light text-[#2D2D2D]">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs uppercase tracking-[0.1em] text-[#2D2D2D]/50 font-body">Image URL *</Label>
                <Input value={productForm.image} onChange={(e) => setProductForm(p => ({ ...p, image: e.target.value }))}
                  placeholder="https://..." data-testid="product-form-image"
                  className="bg-[#F7F5F1] border-[#E5E0D8] font-body font-light rounded-sm text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs uppercase tracking-[0.1em] text-[#2D2D2D]/50 font-body">Description</Label>
                <Textarea value={productForm.description} onChange={(e) => setProductForm(p => ({ ...p, description: e.target.value }))}
                  rows={3} data-testid="product-form-description"
                  className="bg-[#F7F5F1] border-[#E5E0D8] font-body font-light rounded-sm text-sm resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs uppercase tracking-[0.1em] text-[#2D2D2D]/50 font-body">Features (comma-separated)</Label>
                  <Input value={productForm.features} onChange={(e) => setProductForm(p => ({ ...p, features: e.target.value }))}
                    placeholder="Feature 1, Feature 2" data-testid="product-form-features"
                    className="bg-[#F7F5F1] border-[#E5E0D8] font-body font-light rounded-sm text-sm" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs uppercase tracking-[0.1em] text-[#2D2D2D]/50 font-body">Colors (comma-separated)</Label>
                  <Input value={productForm.colors} onChange={(e) => setProductForm(p => ({ ...p, colors: e.target.value }))}
                    placeholder="Red, Blue" data-testid="product-form-colors"
                    className="bg-[#F7F5F1] border-[#E5E0D8] font-body font-light rounded-sm text-sm" />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs uppercase tracking-[0.1em] text-[#2D2D2D]/50 font-body">Min. Order</Label>
                <Input value={productForm.minOrder} onChange={(e) => setProductForm(p => ({ ...p, minOrder: e.target.value }))}
                  data-testid="product-form-minorder" className="bg-[#F7F5F1] border-[#E5E0D8] font-body font-light rounded-sm text-sm" />
              </div>
              <button type="submit" disabled={saving} data-testid="product-form-submit"
                className="w-full bg-teal text-white py-2.5 text-xs uppercase tracking-[0.2em] font-medium font-body hover:bg-teal-dark transition-colors disabled:opacity-50 rounded-sm">
                {saving ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
