import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../components/ui/sheet';
import { Menu } from 'lucide-react';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/products', label: 'Products' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" data-testid="navbar-logo" className="flex items-center gap-3 group">
          <div className="bg-white rounded-sm p-1 shadow-sm group-hover:shadow-md transition-shadow duration-300">
            <img
              src="https://customer-assets.emergentagent.com/job_weave-showcase/artifacts/op0cvbp1_logo.enc"
              alt="Suntex Traders Logo"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
              className={`text-xs uppercase tracking-[0.2em] font-medium font-body transition-colors duration-300 ${
                location.pathname === link.path
                  ? 'text-teal-dark'
                  : 'text-[#2D2D2D]/70 hover:text-[#2D2D2D]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            data-testid="nav-cta"
            className="text-xs uppercase tracking-[0.2em] font-medium font-body border border-teal/40 px-5 py-2 text-teal-dark hover:bg-teal hover:text-white transition-all duration-300"
          >
            Get Quote
          </Link>
        </nav>

        <button
          data-testid="mobile-menu-toggle"
          className="md:hidden text-[#2D2D2D]/60 hover:text-teal-dark transition-colors"
          onClick={() => setOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="right"
            className="bg-[#F7F5F1] border-l border-[#E5E0D8] w-[280px]"
            data-testid="mobile-menu"
          >
            <SheetHeader>
              <SheetTitle>
                <div className="bg-white rounded-sm p-1 shadow-sm inline-block">
                  <img
                    src="https://customer-assets.emergentagent.com/job_weave-showcase/artifacts/op0cvbp1_logo.enc"
                    alt="Suntex Traders Logo"
                    className="h-8 w-auto object-contain"
                  />
                </div>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-6 mt-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
                  className={`text-sm uppercase tracking-[0.15em] font-medium font-body transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-teal-dark'
                      : 'text-[#2D2D2D]/50 hover:text-[#2D2D2D]'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                data-testid="mobile-nav-cta"
                className="mt-4 text-center text-xs uppercase tracking-[0.2em] font-medium font-body bg-teal text-white px-5 py-3 hover:bg-teal-dark transition-colors duration-300"
                onClick={() => setOpen(false)}
              >
                Get Quote
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
