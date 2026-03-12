export type Language = 'pt' | 'en';

export const DEFAULT_LANGUAGE: Language = 'pt';

export interface I18nStrings {
  home: string;
  gallery: string;
  contact: string;
  photography: string;
  heroTagline: string;
  exploreGallery: string;
  collectionTitle: string;
  featured: string;
  aboutMe: string;
  pathInPhotography: string;
  aboutDescription: string;
  aboutExtra: string;
  footer: {
    tagline: string;
    quickLinks: string;
    helpTitle: string;
    copyright: string;
  };
  prints: Record<
    string,
    {
      title: string;
      description: string;
    }
  >;
}

export class TextResources {
  private static data: Record<Language, I18nStrings> = {
    pt: {
      home: 'Início',
      gallery: 'Galeria',
      contact: 'Contato',
      photography: 'Fotografia',
      heroTagline: 'Fotos tiradas são memórias eternizadas',
      exploreGallery: 'Explorar Galeria',
      collectionTitle: 'Minha coleção de fotos',
      featured: 'Destaques',
      aboutMe: 'Sobre mim',
      pathInPhotography: 'Caminho na fotografia',
      aboutDescription: 'Comecei a me interessar por fotografia há pouco tempo, mas rapidamente me apaixonei por ela.',
      aboutExtra: 'É uma paixão capturar momentos, memórias que podem durar uma vida inteira. Ser revisitadas ou impressas na parede ou no celular para manter essas memórias frescas e presentes. E esse é o privilégio de ser fotógrafo. Entre em contato e eu ajudarei a congelar o tempo e as memórias em uma foto!',
      footer: {
        tagline: 'Fotos tiradas são memórias eternizadas.',
        quickLinks: 'Links rápidos',
        helpTitle: 'Deixe-me ajudar você',
        copyright: '© 2026 Daniel Santos Photography. Todos os direitos reservados.',
      },
      prints: {
        'teal-mushroom': {
          title: 'Cogumelo solitário',
          description: 'Depois da chuva, os cogumelos prosperam',
        },
        grandma: {
          title: 'Retrato Avó',
          description: 'Retrato de estúdio com iluminação dramática',
        },
        'paris-phanteon': {
          title: 'Panteão Francês',
          description: 'Paisagem urbana simétrica',
        },
        'crashing-waves': {
          title: 'Ondas quebrando',
          description: 'Ondas dramáticas do oceano contra rochas vulcânicas ao pôr do sol',
        },
        'fishing-kid': {
          title: 'Menino pescador',
          description: 'Ondas batem enquanto garoto pesca',
        },
        'construction-sight': {
          title: 'Canal de construção',
          description: 'Construção emergindo na névoa',
        },
      },
    },
    en: {
      home: 'Home',
      gallery: 'Gallery',
      contact: 'Contact',
      photography: 'Photography',
      heroTagline: 'Photos taken are eternalized memories',
      exploreGallery: 'Explore Gallery',
      collectionTitle: 'My collection of photos',
      featured: 'Featured',
      aboutMe: 'About me',
      pathInPhotography: 'Path in photography',
      aboutDescription: 'I started getting into photography not long ago, but quickly fell in love with it.',
      aboutExtra: 'It is a passion to capture moments, memories that can last a lifetime. Be revisited or printed on the wall or on our phones to keep those memories fresh and present. And that is the privilege of being a photographer. Contact me and I’ll help freeze time and memories into a photo!',
      footer: {
        tagline: 'Photos taken are eternalized memories.',
        quickLinks: 'Quick Links',
        helpTitle: 'Let me help you',
        copyright: '© 2026 Daniel Santos Photography. All rights reserved.',
      },
      prints: {
        'teal-mushroom': {
          title: 'Lonely mushroom',
          description: 'After the rain, mushrooms prosper',
        },
        grandma: {
          title: 'Grandma portrait',
          description: 'Studio portrait with dramatic lighting',
        },
        'paris-phanteon': {
          title: 'France Panthon',
          description: 'Symmetrical urban cityscape',
        },
        'crashing-waves': {
          title: 'Crashing waves',
          description: 'Dramatic ocean waves against volcanic rocks at sunset',
        },
        'fishing-kid': {
          title: 'Fishing kid',
          description: 'Waves crash while kid catches fish',
        },
        'construction-sight': {
          title: 'Construction sight',
          description: 'Construction over the fog',
        },
      },
    },
  };

  public static get(lang: Language): I18nStrings {
    return this.data[lang] || this.data[DEFAULT_LANGUAGE];
  }
}
