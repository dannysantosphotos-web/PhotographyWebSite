import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@/lib/language-context';
import { TextResources } from '@/lib/i18n';

export default function ContactPage() {
  const { language } = useLanguage();
  const t = TextResources.get(language);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const sendViaEmailJS = async () => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;

    if (!serviceId || !templateId || !userId) {
      throw new Error('EmailJS is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_USER_ID to your .env.');
    }

    const templateParams = {
      user_name: form.name,
      user_email: form.email,
      user_message: form.message,
      to_email: 'dannysantos.photos@gmail.com',
    };

    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: userId,
        template_params: templateParams,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`EmailJS error: ${res.status} ${errText}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendViaEmailJS();
      toast.success(t.contactToastSuccess);
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS error', error);
      toast.error(
        'Unable to send email from the site. Please contact using the email shown on the left.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container px-6 pt-28 pb-24">
        <div className="mb-12">
          <p className="text-body text-xs uppercase tracking-[0.3em] text-primary mb-2">{t.contactSubtitle}</p>
          <h1 className="text-display text-4xl md:text-5xl font-bold text-foreground">{t.contact}</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <p className="text-body text-muted-foreground leading-relaxed">
              {t.contactDescription}
            </p>
            <div className="space-y-5">
              <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-sm">
                <div className="w-10 h-10 gradient-teal rounded-full flex items-center justify-center">
                  <Mail size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-body text-xs uppercase tracking-widest text-muted-foreground">{t.contactEmailLabel}</p>
                  <p className="text-body text-sm text-foreground">dannysantos.photos@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-sm">
                <div className="w-10 h-10 gradient-teal rounded-full flex items-center justify-center">
                  <Phone size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-body text-xs uppercase tracking-widest text-muted-foreground">{t.contactPhoneLabel}</p>
                  <p className="text-body text-sm text-foreground">+351 916 432 446</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-sm">
                <div className="w-10 h-10 gradient-teal rounded-full flex items-center justify-center">
                  <MapPin size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-body text-xs uppercase tracking-widest text-muted-foreground">{t.contactStudioLabel}</p>
                  <p className="text-body text-sm text-foreground">Castelo de Paiva, Aveiro, PT</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-body text-xs uppercase tracking-widest text-muted-foreground mb-2 block">{t.contactFormNameLabel}</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-card border border-border rounded-sm px-4 py-3 text-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="text-body text-xs uppercase tracking-widest text-muted-foreground mb-2 block">{t.contactFormEmailLabel}</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-card border border-border rounded-sm px-4 py-3 text-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="text-body text-xs uppercase tracking-widest text-muted-foreground mb-2 block">{t.contactFormMessageLabel}</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-card border border-border rounded-sm px-4 py-3 text-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-3 px-8 py-3 gradient-teal text-primary-foreground text-body text-sm font-semibold uppercase tracking-widest rounded-full hover:opacity-90 transition-all"
              >
                {t.contactFormSubmit} <Send size={14} />
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
