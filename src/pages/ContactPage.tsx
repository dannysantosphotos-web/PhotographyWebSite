import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We will get back to you soon.");
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container px-6 pt-28 pb-24">
        <div className="mb-12">
          <p className="text-body text-xs uppercase tracking-[0.3em] text-primary mb-2">Get in Touch</p>
          <h1 className="text-display text-4xl md:text-5xl font-bold text-foreground">Contact</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <p className="text-body text-muted-foreground leading-relaxed">
              Have questions about prints, custom orders, or shipping? We would love to hear from you.
            </p>
            <div className="space-y-5">
              <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-sm">
                <div className="w-10 h-10 gradient-teal rounded-sm flex items-center justify-center">
                  <Mail size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-body text-xs uppercase tracking-widest text-muted-foreground">Email</p>
                  <p className="text-body text-sm text-foreground">hello@noirprints.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-sm">
                <div className="w-10 h-10 gradient-teal rounded-sm flex items-center justify-center">
                  <Phone size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-body text-xs uppercase tracking-widest text-muted-foreground">Phone</p>
                  <p className="text-body text-sm text-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-sm">
                <div className="w-10 h-10 gradient-teal rounded-sm flex items-center justify-center">
                  <MapPin size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-body text-xs uppercase tracking-widest text-muted-foreground">Studio</p>
                  <p className="text-body text-sm text-foreground">Brooklyn, New York, NY</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-body text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-card border border-border rounded-sm px-4 py-3 text-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="text-body text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-card border border-border rounded-sm px-4 py-3 text-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="text-body text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-card border border-border rounded-sm px-4 py-3 text-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-3 px-8 py-3 gradient-teal text-primary-foreground text-body text-sm font-semibold uppercase tracking-widest rounded-sm hover:opacity-90 transition-all"
            >
              Send Message <Send size={14} />
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
