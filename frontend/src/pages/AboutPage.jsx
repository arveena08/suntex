import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Shield, Gem, Handshake, Globe } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1617914169135-cc2513cc64c1?w=1600&q=80';

const WHY_CHOOSE = [
  {
    icon: Shield,
    title: 'Unmatched Quality',
    description: 'Every bolt of fabric passes through multiple quality checkpoints before reaching you. We source only the finest raw materials with over 50 years of expertise.',
  },
  {
    icon: Gem,
    title: 'Vast Variety',
    description: 'From sheer nets to structured satins, embroidered organzas to soft viscose — our extensive portfolio covers knitted, woven, and specialty fabrics.',
  },
  {
    icon: Handshake,
    title: 'Wholesale Pricing',
    description: 'Direct manufacturer partnerships and our own production enable us to offer the most competitive wholesale rates without compromising on quality.',
  },
  {
    icon: Globe,
    title: 'Pan-India Reach',
    description: 'Based in Surat — the textile hub of India — our distribution network spans across the country, ensuring timely delivery to wholesalers, designers, and businesses.',
  },
];

export default function AboutPage() {
  return (
    <main data-testid="about-page">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="About Suntex Traders" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-obsidian/70 to-obsidian" />
        </div>
        <div className="relative z-10 text-center px-6">
          <p className="text-xs uppercase tracking-[0.3em] font-medium text-champagne mb-4 font-body animate-fade-in">
            Our Story
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl font-light tracking-tight text-white animate-fade-up" data-testid="about-hero-title">
            About Suntex Traders
          </h1>
          <p className="font-body text-base text-white/50 font-light mt-4 animate-fade-up stagger-2 italic">
            Your Dreams We Create
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 px-6" data-testid="company-story-section">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] font-medium text-champagne mb-4 font-body">
                  Who We Are
                </p>
                <h2 className="font-heading text-3xl sm:text-4xl font-light tracking-tight text-white mb-6">
                  Over 50 Years of Textile Excellence
                </h2>
                <div className="space-y-4">
                  <p className="text-base text-white/50 font-body font-light leading-relaxed">
                    We are a trusted name in the textile industry, proudly serving as both manufacturers and wholesalers
                    of premium-quality fabrics for over 50 years. Rooted in a rich family legacy and based in
                    Surat — the textile hub of India — our company has grown into a well-established and experienced
                    enterprise known for reliability, craftsmanship, and consistency.
                  </p>
                  <p className="text-base text-white/50 font-body font-light leading-relaxed">
                    Under the leadership of <span className="text-champagne font-normal">Kavish Chopra</span>, we
                    specialize in a diverse range of fabrics including dyed, embroidered, and plain textiles. Our
                    extensive portfolio features knitted and woven fabrics, net and cancan net (ideal for gown linings),
                    embroidered fabrics, georgette, organza, viscose, and much more. Every product reflects our
                    commitment to quality and attention to detail.
                  </p>
                  <p className="text-base text-white/50 font-body font-light leading-relaxed">
                    With a strong pan-India presence, we cater to wholesalers, designers, and businesses seeking
                    variety, durability, and elegance in fabrics. Our decades of expertise, combined with modern
                    techniques, allow us to stay ahead of trends while maintaining the authenticity of traditional
                    textile craftsmanship.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-[4/5] overflow-hidden border border-white/5">
                  <img
                    src="https://images.unsplash.com/photo-1634640249833-7307e385f148?w=800&q=80"
                    alt="Net fabric craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-white/5 text-center">
                    <p className="font-heading text-3xl font-light text-champagne">50+</p>
                    <p className="text-xs uppercase tracking-[0.15em] text-white/40 font-body mt-1">Years Legacy</p>
                  </div>
                  <div className="p-4 border border-white/5 text-center">
                    <p className="font-heading text-3xl font-light text-champagne">Pan-India</p>
                    <p className="text-xs uppercase tracking-[0.15em] text-white/40 font-body mt-1">Reach</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Mission & Vision */}
      <section className="py-24 px-6" data-testid="mission-vision-section">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal>
              <div className="p-8 border border-white/5 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-6 h-6 text-champagne" />
                  <h3 className="font-heading text-2xl font-medium text-white">Our Mission</h3>
                </div>
                <p className="text-base text-white/50 font-body font-light leading-relaxed">
                  To be the most trusted wholesale textile partner for fashion businesses across India, providing
                  premium-quality fabrics with unmatched variety, competitive pricing, and reliable service that empowers
                  our clients to create exceptional garments. We strive to maintain the authenticity of traditional
                  textile craftsmanship while embracing modern techniques.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="p-8 border border-champagne/20 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <Eye className="w-6 h-6 text-champagne" />
                  <h3 className="font-heading text-2xl font-medium text-white">Our Vision</h3>
                </div>
                <p className="text-base text-white/50 font-body font-light leading-relaxed">
                  To become a nationally recognized name in wholesale textiles, known for setting the benchmark in fabric
                  quality, innovation in textile sourcing, and building lasting partnerships with designers, boutiques,
                  and garment manufacturers across the country. Your Dreams We Create — that is our promise.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 bg-surface" data-testid="why-choose-section">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] font-medium text-champagne mb-4 font-body">
                Why Partner With Us
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-light tracking-tight text-white">
                The Suntex Advantage
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <div
                  data-testid={`why-choose-card-${index}`}
                  className="p-6 border border-white/5 hover:border-champagne/20 transition-all duration-500 group h-full"
                >
                  <item.icon className="w-8 h-8 text-champagne mb-5 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-heading text-xl font-medium text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-white/40 font-body font-light leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6" data-testid="about-cta-section">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl sm:text-4xl font-light tracking-tight text-white mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-base text-white/40 font-body font-light leading-relaxed mb-10 max-w-xl mx-auto">
              Connect with us to discuss your fabric requirements and discover how Suntex Traders can be your trusted
              textile partner. Over 50 years of legacy backs every thread we sell.
            </p>
            <Link
              to="/contact"
              data-testid="about-cta-btn"
              className="inline-flex items-center gap-2 bg-champagne text-obsidian px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium font-body hover:bg-champagne-light transition-colors duration-300"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
