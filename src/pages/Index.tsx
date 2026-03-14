import { Link } from 'react-router-dom';
import heroImage from '@/assets/from_the_sky.jpg';
import heroVideo from '@/assets/Timeline 1.mov';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/lib/language-context';
import { TextResources } from '@/lib/i18n';
import Footer from '@/components/Footer';
import PrintCard from '@/components/PrintCard';
import { prints } from '@/lib/prints-data';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const featured = prints.slice(0, 3);
  const { language } = useLanguage();
  const t = TextResources.get(language);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section id="headerSection" className="relative md:h-screen h-auto min-h-[75vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden pt-16 pb-16">
        <div className="absolute inset-0">
          {/* <img src={heroImage} alt="Fotografia" className="w-full h-full object-cover" /> */}
          <video
            src={heroVideo}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        </div>
        <div id="dashboardTitle" className="relative z-10 text-center px-6 w-full max-w-3xl py-8">
          <p className="text-body text-sm uppercase tracking-[0.3em] text-primary mb-4">{t.photography}</p>
          <h1 className="text-display text-5xl md:text-7xl lg:text-8xl font-black text-foreground leading-[0.95] mb-6">
            Daniel
            <span className="text-gradient-teal">Santos</span>
          </h1>
          <p className="text-body text-lg text-muted-foreground max-w-md mx-auto mb-8 md:mb-10">
            {t.heroTagline}
          </p>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-3 px-8 py-4 gradient-teal text-primary-foreground text-body text-sm font-semibold uppercase tracking-widest rounded-full hover:opacity-90 transition-all"
          >
            {t.exploreGallery} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Featured Prints */}
      <section className="container px-6 pt-12 md:pt-24 pb-24 mt-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-body text-xs uppercase tracking-[0.3em] text-primary mb-2">{t.collectionTitle}</p>
            <h2 className="text-display text-4xl font-bold text-foreground">{t.featured}</h2>
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
          <p className="text-body text-xs uppercase tracking-[0.3em] text-primary mb-4">{t.aboutMe}</p>
          <h2 className="text-display text-3xl font-bold text-foreground mb-6">{t.pathInPhotography}</h2>
          <p className="text-body text-muted-foreground leading-relaxed">
            {t.aboutDescription}
          </p>
          <br />
          <p>{t.aboutExtra}</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
