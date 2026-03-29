import { Link } from 'react-router-dom';
import { useState } from 'react';
import heroImage from '@/assets/from_the_sky.jpg';
import heroVideo from '@/assets/Timeline 1.mov';
import Navbar from '@/components/Navbar';
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const imageImporter = (glob: Record<string, string>) =>
  Object.entries(glob)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url);

const sportsPhotos = imageImporter(
  import.meta.glob('../assets/sports_photos/*.{png,jpg,jpeg}', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Record<string, string>,
);
const streetPhotos = imageImporter(
  import.meta.glob('../assets/street_photos/*.{png,jpg,jpeg}', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Record<string, string>,
);
const portraitPhotos = imageImporter(
  import.meta.glob('../assets/portrait_photos/*.{png,jpg,jpeg}', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Record<string, string>,
);

const createPhotographyPhotos = (images: string[], category: string) =>
  images.map((src, index) => {
    const fileName = src.split('/').pop()?.replace(/\.[^/.]+$/, '') ?? `${category}-${index + 1}`;
    const label = fileName.replace(/[-_]/g, ' ');
    return {
      src,
      alt: `${category} photo ${index + 1}`,
      label,
    };
  });
import { useLanguage } from '@/lib/language-context';
import { TextResources } from '@/lib/i18n';
import Footer from '@/components/Footer';
import PrintCard from '@/components/PrintCard';
import { prints } from '@/lib/prints-data';
import { ArrowRight } from 'lucide-react';

interface PhotographyPhoto {
  src: string;
  alt: string;
  label: string;
}

const PhotographyCarousel = ({
  id,
  photos,
}: {
  id: string;
  photos: PhotographyPhoto[];
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);

  return (
    <Carousel
      className="overflow-visible"
      opts={{
        className: "center",
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        variableWidth: false,
        afterChange: (current) => {
          setSelectedIndex(current);
        },
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              centerMode: true,
              centerPadding: '0px',
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 640,
            settings: {
              centerMode: true,
              centerPadding: '0px',
              slidesToShow: 1,
            },
          },
        ],
      }}
      setApi={setApi}
    >
      <CarouselContent className="overflow-visible">
        {photos.map((photo, index) => {
          const isActive = selectedIndex === index;
          return (
            <CarouselItem
              key={photo.label}
              className="w-full"
            >
              <div
                className={`overflow-hidden rounded-[32px] border border-border bg-card shadow-lg shadow-black/5 transition-all duration-300 ${
                  isActive
                    ? 'opacity-100 scale-100'
                    : 'opacity-50 scale-90'
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-[460px] w-full object-cover transition duration-500 hover:scale-105"
                />
                {/* <div className="p-4">
                  <p className="text-body font-semibold text-foreground">{photo.label}</p>
                </div> */}
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

const Index = () => {
  const featured = prints.slice(0, 3);
  const { language } = useLanguage();
  const t = TextResources.get(language);
  const photographySections = [
    {
      title: t.sportsPhotographyTitle,
      description: t.sportsPhotographyDescription,
      photos: createPhotographyPhotos(sportsPhotos, 'Sports'),
    },
    {
      title: t.portraitsPhotographyTitle,
      description: t.portraitsPhotographyDescription,
      photos: createPhotographyPhotos(portraitPhotos, 'Portraits'),
    },
    {
      title: t.streetPhotographyTitle,
      description: t.streetPhotographyDescription,
      photos: createPhotographyPhotos(streetPhotos, 'Street'),
    },
  ];

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

        <div className="mt-16 space-y-20">
          {photographySections.map((section) => (
            <section key={section.title} className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-body text-xs uppercase tracking-[0.3em] text-primary mb-2">{t.photographyTypesLabel}</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">{section.title}</h3>
                </div>
                <p className="max-w-2xl text-body text-sm text-muted-foreground">{section.description}</p>
              </div>
              <div className="relative">
                <PhotographyCarousel id={section.title} photos={section.photos} />
              </div>
            </section>
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
