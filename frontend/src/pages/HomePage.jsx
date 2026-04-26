import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award, Truck } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import ProductCard from '../components/ProductCard';
import { FEATURED_PRODUCTS, CATEGORIES } from '../data/products';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1683140426885-6c0ce899409c?w=1600&q=80';

const VALUE_PROPS = [
  {
    icon: Sparkles,
    title: 'Premium Quality',
    description: 'Every fabric undergoes rigorous quality checks to ensure consistency and excellence.',
  },
  {
    icon: Award,
    title: 'Wholesale Pricing',
    description: 'Competitive prices for bulk orders with flexible MOQ options for all categories.',
  },
  {
    icon: Truck,
    title: 'Reliable Delivery',
    description: 'Timely dispatch and nationwide delivery with careful packaging and handling.',
  },
];

export default function HomePage() {
  return (
    <main data-testid="home-page">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Premium textile fabric" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] font-medium text-teal-dark mb-6 font-body animate-fade-in" data-testid="hero-subtitle">
            Premium Wholesale Textiles
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-none text-[#2D2D2D] mb-6 animate-fade-up" data-testid="hero-title">
            Suntex Traders
          </h1>
          <p className="font-body text-base sm:text-lg text-[#2D2D2D]/60 font-light tracking-wide max-w-xl mx-auto mb-10 animate-fade-up stagger-2" data-testid="hero-tagline">
            Quality You Can Feel, Scale You Can Trust.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up stagger-3">
            <Link
              to="/products"
              data-testid="hero-explore-btn"
              className="ripple-container group inline-flex items-center gap-2 bg-teal text-white px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium font-body hover:bg-teal-dark transition-colors duration-300 rounded-sm"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/contact"
              data-testid="hero-contact-btn"
              className="inline-flex items-center gap-2 border border-[#2D2D2D]/20 text-[#2D2D2D] px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium font-body hover:border-teal hover:text-teal-dark transition-all duration-300 rounded-sm"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in stagger-5">
          <span className="text-xs text-[#2D2D2D]/30 uppercase tracking-[0.2em] font-body">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-teal/50 to-transparent" />
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 px-6" data-testid="intro-section">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="section-divider mb-10" />
            <p className="font-body text-base sm:text-lg text-[#2D2D2D]/60 font-light leading-relaxed tracking-wide">
              Crafted in Surat's renowned textile legacy, we are a 50+ year old family-led house of fine fabrics.
              Under the direction of our management, we curate and manufacture exquisite dyed, embroidered, and
              plain textiles — from ethereal nets, cancan to refined organza, georgette, viscose &amp; more — serving
              discerning clients across India with unmatched quality and elegance.
            </p>
            <div className="section-divider mt-10" />
          </ScrollReveal>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-6" data-testid="categories-section">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] font-medium text-teal-dark mb-4 font-body">Our Collection</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-light tracking-tight text-[#2D2D2D]">Explore Our Fabrics</h2>
            </div>
          </ScrollReveal>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {CATEGORIES.filter(c => c.id !== 'all').map((cat, i) => (
              <ScrollReveal key={cat.id} delay={i * 0.05}>
                <Link
                  to={`/products?cat=${cat.id}`}
                  data-testid={`category-link-${cat.id}`}
                  className="text-xs uppercase tracking-[0.15em] font-medium font-body border border-[#E5E0D8] px-5 py-2 text-[#2D2D2D]/50 hover:border-teal/40 hover:text-teal-dark transition-all duration-300 rounded-sm"
                >
                  {cat.label}
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {FEATURED_PRODUCTS.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 0.1}>
                <ProductCard product={product} index={index} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-12">
              <Link
                to="/products"
                data-testid="view-all-products-btn"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium font-body text-teal-dark border border-teal/30 px-8 py-3 hover:bg-teal hover:text-white transition-all duration-300 rounded-sm"
              >
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* Value Props */}
      <section className="py-24 px-6" data-testid="value-props-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {VALUE_PROPS.map((prop, index) => (
              <ScrollReveal key={prop.title} delay={index * 0.15}>
                <div
                  data-testid={`value-prop-${index}`}
                  className="text-center p-8 border border-[#E5E0D8] hover:border-teal/30 transition-all duration-500 group bg-white rounded-sm"
                >
                  <prop.icon className="w-8 h-8 text-teal mx-auto mb-5 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-heading text-xl sm:text-2xl font-medium text-[#2D2D2D] mb-3">{prop.title}</h3>
                  <p className="text-sm text-[#2D2D2D]/50 font-body font-light leading-relaxed">{prop.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-6 relative overflow-hidden" data-testid="cta-section">
        <div className="absolute inset-0 bg-[#8EB5B2]/10" />
        <div className="relative max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] font-medium text-teal-dark mb-4 font-body">Ready to Order?</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-light tracking-tight text-[#2D2D2D] mb-6">
              Partner With Us for Premium Textiles
            </h2>
            <p className="text-base text-[#2D2D2D]/50 font-body font-light leading-relaxed mb-10 max-w-xl mx-auto">
              Whether you need bulk orders or curated selections, we deliver quality fabrics at competitive wholesale prices.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                data-testid="cta-contact-btn"
                className="inline-flex items-center gap-2 bg-teal-dark text-white px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium font-body hover:bg-teal transition-colors duration-300 rounded-sm"
              >
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                data-testid="cta-about-btn"
                className="inline-flex items-center gap-2 border border-[#2D2D2D]/15 text-[#2D2D2D] px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium font-body hover:border-teal hover:text-teal-dark transition-all duration-300 rounded-sm"
              >
                Learn About Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
