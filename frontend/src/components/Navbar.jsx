import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../components/ui/sheet';
import { Menu, X } from 'lucide-react';

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
        {/* Logo */}
        <Link
          to="/"
          data-testid="navbar-logo"
          className="flex items-center gap-2 group"
        >
          <span className="font-heading text-2xl sm:text-3xl font-light tracking-tight text-white group-hover:text-champagne transition-colors duration-300">
            Suntex
          </span>
          <span className="font-heading text-2xl sm:text-3xl font-light tracking-tight text-champagne">
            Traders
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
              className={`text-xs uppercase tracking-[0.2em] font-medium font-body transition-colors duration-300 ${
                location.pathname === link.path
                  ? 'text-champagne'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            data-testid="nav-cta"
            className="text-xs uppercase tracking-[0.2em] font-medium font-body border border-champagne/40 px-5 py-2 text-champagne hover:bg-champagne hover:text-obsidian transition-all duration-300"
          >
            Get Quote
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          data-testid="mobile-menu-toggle"
          className="md:hidden text-white/80 hover:text-champagne transition-colors"
          onClick={() => setOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Mobile Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="right"
            className="bg-obsidian border-l border-white/10 w-[280px]"
            data-testid="mobile-menu"
          >
            <SheetHeader>
              <SheetTitle className="font-heading text-2xl font-light text-white">
                <span className="text-champagne">Suntex</span> Traders
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
                      ? 'text-champagne'
                      : 'text-white/60 hover:text-white'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                data-testid="mobile-nav-cta"
                className="mt-4 text-center text-xs uppercase tracking-[0.2em] font-medium font-body bg-champagne text-obsidian px-5 py-3 hover:bg-champagne-light transition-colors duration-300"
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
