import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Shield, Gem, Handshake, Globe } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const HERO_IMAGE = '/assets/abouthero.jpg';

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
          <img src={HERO_IMAGE} alt="About Suntex Traders" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5F1]/30 via-[#F7F5F1]/60 to-[#F7F5F1]" />
        </div>
        <div className="relative z-10 text-center px-6">
          <p className="text-xs uppercase tracking-[0.3em] font-medium text-teal-dark mb-4 font-body animate-fade-in">Our Story</p>
          <h1 className="font-heading text-5xl sm:text-6xl font-light tracking-tight text-[#2D2D2D] animate-fade-up" data-testid="about-hero-title">
            About Suntex Traders
          </h1>
          <p className="font-body text-base text-[#2D2D2D]/50 font-light mt-4 animate-fade-up stagger-2 italic">
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
                <p className="text-xs uppercase tracking-[0.3em] font-medium text-teal-dark mb-4 font-body">Who We Are</p>
                <h2 className="font-heading text-3xl sm:text-4xl font-light tracking-tight text-[#2D2D2D] mb-6">
                  Over 50 Years of Textile Excellence
                </h2>
                <div className="space-y-4">
                  <p className="text-base text-[#2D2D2D]/60 font-body font-light leading-relaxed">
                    We are a trusted name in the textile industry, proudly serving as both manufacturers and wholesalers
                    of premium-quality fabrics for over 50 years. Rooted in a rich family legacy and based in
                    Surat — the textile hub of India — our company has grown into a well-established and experienced
                    enterprise known for reliability, craftsmanship, and consistency.
                  </p>
                  <p className="text-base text-[#2D2D2D]/60 font-body font-light leading-relaxed">
                    Under the leadership of <span className="text-teal-dark font-normal">Kavish Chopra</span>, we
                    specialize in a diverse range of fabrics including dyed, embroidered, and plain textiles. Our
                    extensive portfolio features knitted and woven fabrics, net and cancan net (ideal for gown linings),
                    embroidered fabrics, georgette, organza, viscose, and much more. Every product reflects our
                    commitment to quality and attention to detail.
                  </p>
                  <p className="text-base text-[#2D2D2D]/60 font-body font-light leading-relaxed">
                    With a strong pan-India presence, we cater to wholesalers, designers, and businesses seeking
                    variety, durability, and elegance in fabrics. Our decades of expertise, combined with modern
                    techniques, allow us to stay ahead of trends while maintaining the authenticity of traditional
                    textile craftsmanship.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-[4/5] overflow-hidden border border-[#E5E0D8] rounded-sm">
                  <img
                    src="/assets/abouthero1.jpg"
                    alt="Net fabric craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-[#E5E0D8] text-center bg-white rounded-sm">
                    <p className="font-heading text-3xl font-light text-teal-dark">50+</p>
                    <p className="text-xs uppercase tracking-[0.15em] text-[#2D2D2D]/40 font-body mt-1">Years Legacy</p>
                  </div>
                  <div className="p-4 border border-[#E5E0D8] text-center bg-white rounded-sm">
                    <p className="font-heading text-3xl font-light text-teal-dark">Pan-India</p>
                    <p className="text-xs uppercase tracking-[0.15em] text-[#2D2D2D]/40 font-body mt-1">Reach</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* Mission & Vision */}
      <section className="py-24 px-6" data-testid="mission-vision-section">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal>
              <div className="p-8 border border-[#E5E0D8] h-full bg-white rounded-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-6 h-6 text-teal" />
                  <h3 className="font-heading text-2xl font-medium text-[#2D2D2D]">Our Mission</h3>
                </div>
                <p className="text-base text-[#2D2D2D]/55 font-body font-light leading-relaxed">
                  To be the most trusted wholesale textile partner for fashion businesses across India, providing
                  premium-quality fabrics with unmatched variety, competitive pricing, and reliable service that empowers
                  our clients to create exceptional garments. We strive to maintain the authenticity of traditional
                  textile craftsmanship while embracing modern techniques.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="p-8 border border-teal/25 h-full bg-teal/5 rounded-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Eye className="w-6 h-6 text-teal-dark" />
                  <h3 className="font-heading text-2xl font-medium text-[#2D2D2D]">Our Vision</h3>
                </div>
                <p className="text-base text-[#2D2D2D]/55 font-body font-light leading-relaxed">
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
      <section className="py-24 px-6 bg-[#8EB5B2]/8" data-testid="why-choose-section">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] font-medium text-teal-dark mb-4 font-body">Why Partner With Us</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-light tracking-tight text-[#2D2D2D]">The Suntex Advantage</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <div
                  data-testid={`why-choose-card-${index}`}
                  className="p-6 border border-[#E5E0D8] hover:border-teal/30 transition-all duration-500 group h-full bg-white rounded-sm"
                >
                  <item.icon className="w-8 h-8 text-teal mb-5 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-heading text-xl font-medium text-[#2D2D2D] mb-3">{item.title}</h3>
                  <p className="text-sm text-[#2D2D2D]/45 font-body font-light leading-relaxed">{item.description}</p>
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
            <h2 className="font-heading text-3xl sm:text-4xl font-light tracking-tight text-[#2D2D2D] mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-base text-[#2D2D2D]/50 font-body font-light leading-relaxed mb-10 max-w-xl mx-auto">
              Connect with us to discuss your fabric requirements and discover how Suntex Traders can be your trusted
              textile partner. Over 50 years of legacy backs every thread we sell.
            </p>
            <Link
              to="/contact"
              data-testid="about-cta-btn"
              className="inline-flex items-center gap-2 bg-teal text-white px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium font-body hover:bg-teal-dark transition-colors duration-300 rounded-sm"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
