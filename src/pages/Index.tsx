import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-print.jpg';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PrintCard from '@/components/PrintCard';
import { prints } from '@/lib/prints-data';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const featured = prints.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Fine art photography" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        </div>
        <div className="relative z-10 text-center px-6 animate-fade-in">
          <p className="text-body text-sm uppercase tracking-[0.3em] text-primary mb-4">Fine Art Photography</p>
          <h1 className="text-display text-5xl md:text-7xl lg:text-8xl font-black text-foreground leading-[0.95] mb-6">
            Captured<br />
            <span className="text-gradient-teal">Moments</span>
          </h1>
          <p className="text-body text-lg text-muted-foreground max-w-md mx-auto mb-10">
            Museum-quality prints on archival paper. Own a piece of the extraordinary.
          </p>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-3 px-8 py-4 gradient-teal text-primary-foreground text-body text-sm font-semibold uppercase tracking-widest rounded-full hover:opacity-90 transition-all"
          >
            Explore Gallery <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Featured Prints */}
      <section className="container px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-body text-xs uppercase tracking-[0.3em] text-primary mb-2">Collection</p>
            <h2 className="text-display text-4xl font-bold text-foreground">Featured Prints</h2>
          </div>
          <Link to="/gallery" className="text-body text-sm text-primary hover:underline flex items-center gap-2">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((print) => (
            <PrintCard key={print.id} print={print} />
          ))}
        </div>
      </section>

      {/* About strip */}
      <section className="border-t border-b border-border bg-card">
        <div className="container px-6 py-20 text-center max-w-2xl mx-auto">
          <p className="text-body text-xs uppercase tracking-[0.3em] text-primary mb-4">About</p>
          <h2 className="text-display text-3xl font-bold text-foreground mb-6">Printed with Precision</h2>
          <p className="text-body text-muted-foreground leading-relaxed">
            Every print is produced by Gelato's global print-on-demand network using archival-grade inks
            and premium paper. Shipped directly to your door from the facility nearest to you, reducing
            environmental impact while ensuring gallery-worthy quality.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
