import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { useState, useEffect } from 'react';
import { TextResources } from '@/lib/i18n';
import { useLanguage } from '@/lib/language-context';

export default function Navbar() {
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = TextResources.get(language);
  const isHome = location.pathname === '/';

  const languageOptions: Array<{ code: 'pt' | 'en'; label: string; flag: string }> = [
    { code: 'pt', label: 'Português', flag: '🇵🇹' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  const navLinks = [
    { to: '/', label: t.home },
    { to: '/gallery', label: t.gallery },
    { to: '/contact', label: t.contact },
  ];

  useEffect(() => {
    if (!isHome) {
      setVisible(true);
      return;
    }
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.25);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible
          ? 'bg-background/80 backdrop-blur-xl border-b border-border translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <nav className="container flex items-center justify-between h-16 px-6">
        <Link to="/" className="text-display text-xl font-bold tracking-wider text-foreground">
          Daniel<span className="text-gradient-teal">Santos</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-body text-sm font-medium tracking-widest uppercase transition-colors hover:text-primary ${
                location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="flex items-center gap-2">
            {languageOptions.map((item) => (
              <button
                key={item.code}
                onClick={() => setLanguage(item.code)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-body text-sm transition-all ${
                  language === item.code
                    ? 'border-teal-500 bg-teal-600 text-primary-foreground font-semibold shadow-[0_0_15px_rgba(56,189,248,0.35)]'
                    : 'border-border bg-background text-foreground hover:border-teal-500 hover:shadow-[0_0_15px_rgba(56,189,248,0.35)]'
                }`}
                aria-label={`Switch language to ${item.label}`}
              >
                <span>{item.flag}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* <Link to="/cart" className="relative p-2 text-foreground hover:text-primary transition-colors">
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 gradient-teal rounded-full text-xs font-bold flex items-center justify-center text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link> */}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 pb-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block text-body text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-wrap items-center gap-2">
            {languageOptions.map((item) => (
              <button
                key={item.code}
                onClick={() => setLanguage(item.code)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-body text-sm transition-all ${
                  language === item.code
                    ? 'border-teal-500 bg-teal-600 text-primary-foreground font-semibold shadow-[0_0_15px_rgba(56,189,248,0.35)]'
                    : 'border-border bg-background text-foreground hover:border-teal-500 hover:shadow-[0_0_15px_rgba(56,189,248,0.35)]'
                }`}
                aria-label={`Switch language to ${item.label}`}
              >
                <span>{item.flag}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <Link to="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-foreground">
            <ShoppingBag size={18} /> Cart ({totalItems})
          </Link>
        </div>
      )}
    </header>
  );
}