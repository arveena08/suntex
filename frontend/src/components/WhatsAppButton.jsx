import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '919374739016';

export default function WhatsAppButton() {
  const message = 'Hello Suntex Traders! I am interested in your fabric collection. Please share more details.';
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-btn"
      className="fixed bottom-20 right-5 z-40 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative flex items-center">
        <span className="absolute right-full mr-3 whitespace-nowrap bg-white text-gray-900 text-xs font-body font-medium px-3 py-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
          Chat with us
        </span>
        <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-110 transition-all duration-300">
          <MessageCircle className="w-6 h-6 text-white" fill="white" />
        </div>
        <div className="absolute inset-0 w-14 h-14 bg-[#25D366] rounded-full animate-ping opacity-20 pointer-events-none" />
      </div>
    </a>
  );
}
