import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PrintCard from '@/components/PrintCard';
import { prints } from '@/lib/prints-data';
import { useState } from 'react';

const categories = ['All', ...Array.from(new Set(prints.map((p) => p.category)))];

export default function GalleryPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? prints : prints.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container px-6 pt-28 pb-24">
        <div className="mb-12">
          <p className="text-body text-xs uppercase tracking-[0.3em] text-primary mb-2">Collection</p>
          <h1 className="text-display text-4xl md:text-5xl font-bold text-foreground">Gallery</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-body text-xs px-4 py-2 border rounded-sm uppercase tracking-widest transition-all ${
                active === cat
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((print) => (
            <PrintCard key={print.id} print={print} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
