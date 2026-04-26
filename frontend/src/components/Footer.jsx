import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const QUICK_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/products', label: 'Products' },
  { path: '/contact', label: 'Contact' },
];

const PRODUCT_LINKS = [
  { path: '/products?cat=net', label: 'Net Fabrics' },
  { path: '/products?cat=cancan', label: 'Cancan' },
  { path: '/products?cat=organza', label: 'Organza' },
  { path: '/products?cat=viscose', label: 'Viscose' },
  { path: '/products?cat=georgette', label: 'Georgette' },
  { path: '/products?cat=satin', label: 'Satin' },
];

export default function Footer() {
  return (
    <footer data-testid="footer" className="bg-surface border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <div className="bg-white/95 rounded-sm p-1 inline-block">
                <img
                  src="https://customer-assets.emergentagent.com/job_weave-showcase/artifacts/op0cvbp1_logo.enc"
                  alt="Suntex Traders Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-white/40 font-body font-light leading-relaxed">
              Your Dreams We Create. Premium wholesale textiles for the fashion industry since over 50 years.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-champagne mb-5 font-body">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-white/40 hover:text-champagne transition-colors duration-300 font-body font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-champagne mb-5 font-body">
              Products
            </h4>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/40 hover:text-champagne transition-colors duration-300 font-body font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-champagne mb-5 font-body">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-champagne mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/40 font-body font-light">
                  541, Padmavati Textile Market, Ring Road, Surat, Gujarat, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-champagne flex-shrink-0" />
                <a href="tel:+919374739016" className="text-sm text-white/40 hover:text-champagne transition-colors duration-300 font-body font-light">
                  +91 93747 39016
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-champagne flex-shrink-0" />
                <a href="mailto:suntextraders@gmail.com" className="text-sm text-white/40 hover:text-champagne transition-colors duration-300 font-body font-light">
                  suntextraders@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider my-10" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 font-body font-light">
            &copy; {new Date().getFullYear()} Suntex Traders. All rights reserved.
          </p>
          <p className="text-xs text-white/20 font-body font-light">
            Premium Wholesale Textiles Since Establishment
          </p>
        </div>
      </div>
    </footer>
  );
}
