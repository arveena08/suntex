import { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Package, Palette, Layers } from 'lucide-react';

export default function ProductCard({ product, index = 0 }) {
  const [open, setOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleRipple = useCallback((e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.className = 'ripple';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }, []);

  return (
    <>
      <div
        data-testid={`product-card-${product.id}`}
        className="group relative aspect-[3/4] overflow-hidden cursor-pointer border border-white/5 hover:border-champagne/30 transition-all duration-500"
        onClick={() => setOpen(true)}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {/* Image */}
        <div className="absolute inset-0 overflow-hidden">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-surface shimmer-bg" />
          )}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 product-card-overlay opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-champagne mb-2 font-body">
            {product.category}
          </p>
          <h3 className="font-heading text-xl sm:text-2xl font-medium text-white mb-2">
            {product.name}
          </h3>
          <p className="text-sm text-white/60 font-body font-light leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {product.description}
          </p>
          <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
            <button
              data-testid={`product-view-btn-${product.id}`}
              className="ripple-container text-xs uppercase tracking-[0.2em] font-medium text-champagne border border-champagne/40 px-4 py-2 hover:bg-champagne hover:text-obsidian transition-all duration-300 font-body"
              onClick={(e) => { e.stopPropagation(); handleRipple(e); setOpen(true); }}
            >
              View Details
            </button>
          </div>
        </div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 60px rgba(212, 175, 55, 0.05)' }}
        />
      </div>

      {/* Product Detail Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          data-testid={`product-modal-${product.id}`}
          className="sm:max-w-2xl bg-surface border border-white/10 p-0 overflow-hidden"
        >
          <div className="grid sm:grid-cols-2 gap-0">
            <div className="aspect-square sm:aspect-auto overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex flex-col justify-center">
              <DialogHeader>
                <p className="text-xs uppercase tracking-[0.2em] font-medium text-champagne mb-1 font-body">
                  {product.category}
                </p>
                <DialogTitle className="font-heading text-2xl sm:text-3xl font-light text-white">
                  {product.name}
                </DialogTitle>
                <DialogDescription className="text-white/60 font-body font-light leading-relaxed mt-3">
                  {product.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <Layers className="w-4 h-4 text-champagne mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] font-medium text-white/80 mb-1 font-body">Features</p>
                    <ul className="space-y-1">
                      {product.features.map((f, i) => (
                        <li key={i} className="text-sm text-white/50 font-body font-light">{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Palette className="w-4 h-4 text-champagne mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] font-medium text-white/80 mb-1 font-body">Colors</p>
                    <p className="text-sm text-white/50 font-body font-light">{product.colors.join(', ')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="w-4 h-4 text-champagne mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] font-medium text-white/80 mb-1 font-body">Min. Order</p>
                    <p className="text-sm text-white/50 font-body font-light">{product.minOrder}</p>
                  </div>
                </div>
              </div>

              <a
                data-testid={`product-enquire-btn-${product.id}`}
                href="/contact"
                className="mt-6 inline-block text-center text-xs uppercase tracking-[0.2em] font-medium font-body bg-champagne text-obsidian px-6 py-3 hover:bg-champagne-light transition-colors duration-300"
              >
                Enquire Now
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
