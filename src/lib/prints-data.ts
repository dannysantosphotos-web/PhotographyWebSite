import printPortrait from '@/assets/wooden.jpg';
import printUrban from '@/assets/water_leaf.jpg';
import printOcean from '@/assets/print-ocean.jpg';
import printForest from '@/assets/print-forest.jpg';
import printArchitecture from '@/assets/print-architecture.jpg';
import heroImage from '@/assets/from_the_sky.jpg';

export interface PrintData {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  sizes: { label: string; price: number }[];
}

export const prints: PrintData[] = [
  {
    id: 'golden-mountains',
    title: 'Golden Mountains',
    description: 'Misty mountain ranges bathed in golden hour light',
    image: heroImage,
    category: 'Landscape',
    sizes: [
      { label: '8×10"', price: 45 },
      { label: '16×20"', price: 95 },
      { label: '24×36"', price: 195 },
    ],
  },
  {
    id: 'luminous-portrait',
    title: 'Luminous',
    description: 'Studio portrait with dramatic chiaroscuro lighting',
    image: printPortrait,
    category: 'Portrait',
    sizes: [
      { label: '8×10"', price: 55 },
      { label: '16×20"', price: 120 },
      { label: '24×36"', price: 225 },
    ],
  },
  {
    id: 'neon-nights',
    title: 'Neon Nights',
    description: 'Urban cityscape with neon reflections on wet streets',
    image: printUrban,
    category: 'Urban',
    sizes: [
      { label: '8×10"', price: 45 },
      { label: '16×20"', price: 95 },
      { label: '24×36"', price: 195 },
    ],
  },
  {
    id: 'crashing-waves',
    title: 'Crashing Waves',
    description: 'Dramatic ocean waves against volcanic rocks at sunset',
    image: printOcean,
    category: 'Seascape',
    sizes: [
      { label: '8×10"', price: 45 },
      { label: '16×20"', price: 95 },
      { label: '24×36"', price: 195 },
    ],
  },
  {
    id: 'forest-light',
    title: 'Forest Light',
    description: 'Sunbeams piercing through a misty ancient forest',
    image: printForest,
    category: 'Nature',
    sizes: [
      { label: '8×10"', price: 50 },
      { label: '16×20"', price: 110 },
      { label: '24×36"', price: 210 },
    ],
  },
  {
    id: 'geometric-shadow',
    title: 'Geometric Shadow',
    description: 'Architectural study in light and geometric form',
    image: printArchitecture,
    category: 'Architecture',
    sizes: [
      { label: '8×10"', price: 45 },
      { label: '16×20"', price: 95 },
      { label: '24×36"', price: 195 },
    ],
  },
];
