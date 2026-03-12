import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { TextResources } from '@/lib/i18n';

export default function Footer() {
  const { language } = useLanguage();
  const t = TextResources.get(language);

  return (
    <footer className="border-t border-border bg-card">
      <div className="container px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-display text-lg font-bold text-foreground mb-4">
              Daniel<span className="text-gradient-teal">Santos</span>
            </h3>
            <p className="text-body text-sm text-muted-foreground leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>
          <div>
            <h4 className="text-body text-sm font-semibold uppercase tracking-widest text-foreground mb-4">{t.footer.quickLinks}</h4>
            <div className="space-y-2 text-body text-sm text-muted-foreground">
              <a href="/gallery" className="block hover:text-primary transition-colors">{t.gallery}</a>
              <a href="/contact" className="block hover:text-primary transition-colors">{t.contact}</a>
              {/* <a href="/cart" className="block hover:text-primary transition-colors">Cart</a> */}
            </div>
          </div>
          <div>
            <h4 className="text-body text-sm font-semibold uppercase tracking-widest text-foreground mb-4">Let me help you</h4>
            <div className="space-y-3 text-body text-sm text-muted-foreground">
              <div className="flex items-center gap-3"><Mail size={14} className="text-primary" /> dannysantos.photos@gmail.com</div>
              <div className="flex items-center gap-3"><Phone size={14} className="text-primary" /> +351 916432446</div>
              <div className="flex items-center gap-3"><MapPin size={14} className="text-primary" /> Porto, PT</div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-body text-xs text-muted-foreground">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
