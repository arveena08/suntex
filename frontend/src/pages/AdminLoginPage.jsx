import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { Lock } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@suntextraders.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) { toast.error('Please enter password'); return; }
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/auth/login`, { email, password });
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.user));
      toast.success('Welcome back!');
      navigate('/admin/dashboard');
    } catch (err) {
      const detail = err.response?.data?.detail;
      toast.error(typeof detail === 'string' ? detail : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main data-testid="admin-login-page" className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-teal-dark" />
          </div>
          <h1 className="font-heading text-3xl font-light text-[#2D2D2D]" data-testid="admin-login-title">Admin Login</h1>
          <p className="text-sm text-[#2D2D2D]/50 font-body font-light mt-2">Sign in to manage your store</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-8 bg-white border border-[#E5E0D8] rounded-sm" data-testid="admin-login-form">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-[0.15em] text-[#2D2D2D]/60 font-body">Email</Label>
            <Input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              data-testid="admin-email-input"
              className="bg-[#F7F5F1] border-[#E5E0D8] text-[#2D2D2D] font-body font-light rounded-sm"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-[0.15em] text-[#2D2D2D]/60 font-body">Password</Label>
            <Input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password" data-testid="admin-password-input"
              className="bg-[#F7F5F1] border-[#E5E0D8] text-[#2D2D2D] placeholder:text-[#2D2D2D]/25 font-body font-light rounded-sm"
            />
          </div>
          <button
            type="submit" disabled={loading} data-testid="admin-login-btn"
            className="w-full bg-teal text-white py-3 text-xs uppercase tracking-[0.2em] font-medium font-body hover:bg-teal-dark transition-colors duration-300 disabled:opacity-50 rounded-sm"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
}
