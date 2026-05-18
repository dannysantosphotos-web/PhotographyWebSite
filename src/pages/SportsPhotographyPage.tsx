import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/language-context';
import { TextResources } from '@/lib/i18n';

interface SportsPhoto {
  src: string;
  alt: string;
  label: string;
}

const sportsPhotos = import.meta.glob('../assets/sports_photos/**/*.{png,jpg,jpeg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const getPhotosByFolder = () => {
  return Object.entries(sportsPhotos).reduce<Record<string, SportsPhoto[]>>((groups, [path, src]) => {
    const segments = path.split('/');
    const folder = segments[segments.length - 2] ?? 'Other';
    const fileName = segments[segments.length - 1]?.replace(/\.[^/.]+$/, '') ?? 'photo';
    const label = fileName.replace(/[-_]/g, ' ');

    if (!groups[folder]) {
      groups[folder] = [];
    }

    groups[folder].push({
      src,
      alt: `${folder} photo ${label}`,
      label,
    });

    return groups;
  }, {});
};

export default function SportsPhotographyPage() {
  const { language } = useLanguage();
  const t = TextResources.get(language);
  const [searchParams] = useSearchParams();
  const photosByFolder = useMemo(getPhotosByFolder, []);
  const folders = useMemo(() => Object.keys(photosByFolder).sort(), [photosByFolder]);
  const selectedFolder = useMemo(() => {
    const folderParam = searchParams.get('folder') ?? '';
    return folders.includes(folderParam) ? folderParam : folders[0] ?? '';
  }, [folders, searchParams]);
  const [activeFolder, setActiveFolder] = useState(selectedFolder);
  const [orientations, setOrientations] = useState<Record<string, 'landscape' | 'portrait'>>({});
  const activePhotos = photosByFolder[activeFolder] ?? [];

  useEffect(() => {
    if (selectedFolder !== activeFolder) {
      setActiveFolder(selectedFolder);
    }
  }, [selectedFolder, activeFolder]);

  const handleImageLoad = useCallback((src: string, image: HTMLImageElement) => {
    const orientation = image.naturalWidth > image.naturalHeight ? 'landscape' : 'portrait';
    setOrientations((current) => {
      if (current[src] === orientation) return current;
      return { ...current, [src]: orientation };
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container px-6 pt-28 pb-24">
        <div className="mb-8 text-center">
          <p className="text-body text-xs uppercase tracking-[0.3em] text-primary mb-2">{t.sportsPhotographyPageLabel}</p>
          <h1 className="text-display text-4xl md:text-5xl font-bold text-foreground">
            {t.sportsPhotographyPageHeading}
          </h1>
          <p className="mt-4 text-body text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.sportsPhotographyPageSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {folders.map((folder) => (
            <Link
              key={folder}
              to={`?folder=${encodeURIComponent(folder)}`}
              className={`text-body text-xs px-4 py-2 border rounded-full uppercase tracking-widest transition-all ${
                activeFolder === folder
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'
              }`}
            >
              {t.sportsPhotographyTabs[folder] ?? folder}
            </Link>
          ))}
        </div>

        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {activePhotos.map((photo) => {
            const isLandscape = orientations[photo.src] === 'landscape';

            return (
              <div
                key={photo.src}
                className={`overflow-hidden rounded-[24px] border border-border bg-card shadow-lg shadow-black/5 transition-all ${
                  isLandscape ? 'col-span-2' : 'col-span-1'
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  onLoad={(event) => handleImageLoad(photo.src, event.currentTarget)}
                  className="w-full h-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
