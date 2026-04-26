import { useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import ScrollReveal from '../components/ScrollReveal';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['541, Padmavati Textile Market', 'Ring Road, Surat, Gujarat, India'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['Kavish Chopra', '+91 93747 39016'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['suntextraders@gmail.com'],
  },
  {
    icon: Clock,
    title: 'Business Hours',
    lines: ['Mon - Sat: 11:00 AM - 9:00 PM'],
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      const subject = encodeURIComponent(`Website Enquiry from ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
      window.open(`mailto:suntextraders@gmail.com?subject=${subject}&body=${body}`, '_self');
      toast.success('Message sent successfully! We will get back to you soon.');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <main data-testid="contact-page">
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] font-medium text-teal-dark mb-4 font-body animate-fade-in">Get in Touch</p>
          <h1 className="font-heading text-5xl sm:text-6xl font-light tracking-tight text-[#2D2D2D] mb-4 animate-fade-up" data-testid="contact-hero-title">
            Contact Us
          </h1>
          <p className="text-base text-[#2D2D2D]/50 font-body font-light max-w-xl mx-auto animate-fade-up stagger-2">
            Have a question or ready to place an order? We would love to hear from you.
          </p>
        </div>
      </section>

      <section className="px-6 pb-12" data-testid="contact-info-section">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_INFO.map((info, index) => (
            <ScrollReveal key={info.title} delay={index * 0.1}>
              <div
                data-testid={`contact-info-card-${index}`}
                className="p-6 border border-[#E5E0D8] hover:border-teal/30 transition-all duration-500 text-center group bg-white rounded-sm"
              >
                <info.icon className="w-6 h-6 text-teal mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-[#2D2D2D]/70 mb-2 font-body">{info.title}</h3>
                {info.lines.map((line, i) => (
                  <p key={i} className="text-sm text-[#2D2D2D]/50 font-body font-light">{line}</p>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24" data-testid="contact-form-section">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
          <ScrollReveal>
            <div className="p-8 border border-[#E5E0D8] bg-white rounded-sm">
              <h2 className="font-heading text-2xl sm:text-3xl font-light text-[#2D2D2D] mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs uppercase tracking-[0.15em] text-[#2D2D2D]/60 font-body">Your Name</Label>
                  <Input
                    id="name" name="name" data-testid="contact-input-name" placeholder="Enter your name"
                    value={form.name} onChange={handleChange}
                    className="bg-[#F7F5F1] border-[#E5E0D8] text-[#2D2D2D] placeholder:text-[#2D2D2D]/25 focus:border-teal/50 font-body font-light rounded-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs uppercase tracking-[0.15em] text-[#2D2D2D]/60 font-body">Email Address</Label>
                  <Input
                    id="email" name="email" type="email" data-testid="contact-input-email" placeholder="Enter your email"
                    value={form.email} onChange={handleChange}
                    className="bg-[#F7F5F1] border-[#E5E0D8] text-[#2D2D2D] placeholder:text-[#2D2D2D]/25 focus:border-teal/50 font-body font-light rounded-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs uppercase tracking-[0.15em] text-[#2D2D2D]/60 font-body">Message</Label>
                  <Textarea
                    id="message" name="message" data-testid="contact-input-message" placeholder="Tell us about your requirements..."
                    rows={5} value={form.message} onChange={handleChange}
                    className="bg-[#F7F5F1] border-[#E5E0D8] text-[#2D2D2D] placeholder:text-[#2D2D2D]/25 focus:border-teal/50 font-body font-light resize-none rounded-sm"
                  />
                </div>
                <button
                  type="submit" disabled={sending} data-testid="contact-submit-btn"
                  className="ripple-container w-full flex items-center justify-center gap-2 bg-teal text-white px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium font-body hover:bg-teal-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
                >
                  {sending ? 'Sending...' : 'Send Message'} <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="border border-[#E5E0D8] overflow-hidden h-full min-h-[400px] rounded-sm" data-testid="google-map">
              <iframe
                title="Suntex Traders Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238132.28709036788!2d72.65865044130508!3d21.159185631498858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border: 0 }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
