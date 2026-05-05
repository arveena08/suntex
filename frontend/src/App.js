import { useEffect } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ProductsPage from '@/pages/ProductsPage';
import ContactPage from '@/pages/ContactPage';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminDashboard from '@/pages/AdminDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-[#F7F5F1] relative">
      {/* Decorative border frame */}
      <div className="fixed inset-0 pointer-events-none z-[55]" aria-hidden="true">
        <div className="absolute inset-2 sm:inset-3 border-2 border-[#8EB5B2]/40 rounded-sm" />
        {/* Corner accents - larger and more visible */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-10 h-10 border-t-[3px] border-l-[3px] border-[#C7B58A]/70 rounded-tl-sm" />
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-10 h-10 border-t-[3px] border-r-[3px] border-[#C7B58A]/70 rounded-tr-sm" />
        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-10 h-10 border-b-[3px] border-l-[3px] border-[#C7B58A]/70 rounded-bl-sm" />
        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-10 h-10 border-b-[3px] border-r-[3px] border-[#C7B58A]/70 rounded-br-sm" />
      </div>

      <BrowserRouter>
        <ScrollToTop />
        <Toaster
          theme="light"
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#FFFFFF',
              border: '1px solid #E5E0D8',
              color: '#2D2D2D',
              fontFamily: 'Outfit, sans-serif',
            },
          }}
        />
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
          <Route path="/products" element={<PublicLayout><ProductsPage /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
          {/* Admin pages - no public nav/footer */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
