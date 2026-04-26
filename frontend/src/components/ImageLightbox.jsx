import { useState } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

export default function ImageLightbox({ src, alt, open, onClose }) {
  const [zoomed, setZoomed] = useState(false);

  if (!open) return null;

  return (
    <div
      data-testid="image-lightbox"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        data-testid="lightbox-close-btn"
        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/90 rounded-full text-[#2D2D2D] hover:bg-white transition-colors z-10"
        onClick={onClose}
      >
        <X className="w-5 h-5" />
      </button>

      <button
        data-testid="lightbox-zoom-btn"
        className="absolute top-6 right-20 w-10 h-10 flex items-center justify-center bg-white/90 rounded-full text-[#2D2D2D] hover:bg-white transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); setZoomed(!zoomed); }}
      >
        {zoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
      </button>

      <div
        className={`transition-transform duration-500 ease-out ${zoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
        onClick={(e) => { e.stopPropagation(); setZoomed(!zoomed); }}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-[90vw] max-h-[85vh] object-contain rounded-sm shadow-2xl"
        />
      </div>
    </div>
  );
}
