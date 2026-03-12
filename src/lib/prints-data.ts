import woodFungus from '@/assets/wooden.jpg';
import grandma from '@/assets/grandma.jpg';
import tealMushroom from '@/assets/teal_mushroom.jpg';
import pantheon from '@/assets/paris_pantheon.jpg';
import angrySea from '@/assets/angry_sea.jpg';
import fishingKid from '@/assets/fishing_kid.jpg';
import grua from '@/assets/grua.jpg';

export interface PrintData {
  id: string;
  title: string; // key to i18n prints object
  description: string; // key to i18n prints object
  image: string;
  category: string;
  type: string;
  location: string;
  sizes: { label: string; price: number }[];
}

export const Styles = {
 nature: 'Nature',
 street: 'Street',
 landscape: 'Landscape',
 portrait: 'Portrait'
} as const;

export const prints: PrintData[] = [
  {
    id: 'teal-mushroom',
    title: 'teal-mushroom',
    description: 'teal-mushroom',
    image: tealMushroom,
    category: 'Portrait',
    type: Styles.nature,
    location: 'Castelo de Paiva',
    sizes: [
      { label: '8×10"', price: 45 },
      { label: '16×20"', price: 95 },
      { label: '24×36"', price: 195 },
    ],
  },
  {
    id: 'grandma',
    title: 'grandma',
    description: 'grandma',
    image: grandma,
    category: Styles.portrait,
    type: Styles.portrait,
    location: 'Home',
    sizes: [
      { label: '8×10"', price: 55 },
      { label: '16×20"', price: 120 },
      { label: '24×36"', price: 225 },
    ],
  },
  {
    id: 'paris-phanteon',
    title: 'paris-phanteon',
    description: 'paris-phanteon',
    image: pantheon,
    category: 'Urban',
    type: Styles.street,
    location: 'Castelo de Paiva',
    sizes: [
      { label: '8×10"', price: 45 },
      { label: '16×20"', price: 95 },
      { label: '24×36"', price: 195 },
    ],
  },
  {
    id: 'crashing-waves',
    title: 'crashing-waves',
    description: 'crashing-waves',
    image: angrySea,
    category: 'Seascape',
    type: Styles.street,
    location: 'Matosinhos',
    sizes: [
      { label: '8×10"', price: 45 },
      { label: '16×20"', price: 95 },
      { label: '24×36"', price: 195 },
    ],
  },
  {
    id: 'fishing-kid',
    title: 'fishing-kid',
    description: 'fishing-kid',
    image: fishingKid,
    category: 'Nature',
    type: Styles.street,
    location: 'Sorrento - Italy',
    sizes: [
      { label: '8×10"', price: 50 },
      { label: '16×20"', price: 110 },
      { label: '24×36"', price: 210 },
    ],
  },
  {
    id: 'construction-sight',
    title: 'construction-sight',
    description: 'construction-sight',
    image: grua,
    category: 'Architecture',
    type: Styles.street,
    location: 'Castelo de Paiva',
    sizes: [
      { label: '8×10"', price: 45 },
      { label: '16×20"', price: 95 },
      { label: '24×36"', price: 195 },
    ],
  },
];
