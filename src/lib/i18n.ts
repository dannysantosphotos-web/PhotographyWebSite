export type Language = 'pt' | 'en';

export const DEFAULT_LANGUAGE: Language = 'pt';

export interface I18nStrings {
  home: string;
  gallery: string;
  contact: string;
  contactTitle: string;
  contactSubtitle: string;
  contactDescription: string;
  contactEmailLabel: string;
  contactPhoneLabel: string;
  contactStudioLabel: string;
  contactFormNameLabel: string;
  contactFormEmailLabel: string;
  contactFormMessageLabel: string;
  contactFormSubmit: string;
  contactToastSuccess: string;
  photography: string;
  heroTagline: string;
  exploreGallery: string;
  collectionTitle: string;
  featured: string;
  aboutMe: string;
  pathInPhotography: string;
  aboutDescription: string;
  aboutExtra: string;
  sportsPhotographyTitle: string;
  sportsPhotographyDescription: string;
  portraitsPhotographyTitle: string;
  portraitsPhotographyDescription: string;
  streetPhotographyTitle: string;
  streetPhotographyDescription: string;
  photographyTypesLabel: string;
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
      contactTitle: 'Contacte-me',
      contactSubtitle: 'Entre em contato',
      contactDescription: 'Tem dúvidas sobre impressões, pedidos personalizados ou envio? Adoraríamos ouvir você.',
      contactEmailLabel: 'Email',
      contactPhoneLabel: 'Telefone',
      contactStudioLabel: 'Estúdio',
      contactFormNameLabel: 'Nome',
      contactFormEmailLabel: 'Email',
      contactFormMessageLabel: 'Mensagem',
      contactFormSubmit: 'Enviar mensagem',
      contactToastSuccess: 'Mensagem enviada! Entraremos em contato em breve.',
      photography: 'Fotografia',
      heroTagline: 'Fotos tiradas são memórias eternizadas',
      exploreGallery: 'Explorar Galeria',
      collectionTitle: 'Minha coleção de fotos',
      featured: 'Destaques',
      aboutMe: 'Sobre mim',
      pathInPhotography: 'Caminho na fotografia',
      aboutDescription: 'Comecei a me interessar por fotografia há pouco tempo, mas rapidamente me apaixonei por ela.',
      aboutExtra: 'É uma paixão capturar momentos, memórias que podem durar uma vida inteira. Ser revisitadas ou impressas na parede ou no celular para manter essas memórias frescas e presentes. E esse é o privilégio de ser fotógrafo. Entre em contato e eu ajudarei a congelar o tempo e as memórias em uma foto!',
      sportsPhotographyTitle: 'Fotografia esportiva',
      sportsPhotographyDescription: 'Ação de alta energia e movimento capturados em cada quadro.',
      portraitsPhotographyTitle: 'Fotografia de retratos',
      portraitsPhotographyDescription: 'Retratos pessoais com emoção expressiva e profundidade.',
      streetPhotographyTitle: 'Fotografia de rua',
      streetPhotographyDescription: 'Histórias urbanas, arquitetura e vida cotidiana em movimento.',
      photographyTypesLabel: 'Tipos de fotografia',
      footer: {
        tagline: 'Fotos tiradas são memórias eternizadas.',
        quickLinks: 'Links rápidos',
        helpTitle: 'Deixe-me ajudar você',
        copyright: '© 2026 Daniel Santos Photography. Todos os direitos reservados.',
      },
      prints: {
        'teal-mushroom': {
          title: 'Cogumelo solitário',
          description: 'Depois da chuva, os cogumelos prosperam.',
        },
        grandma: {
          title: 'Retrato da vovó',
          description: 'Retrato de estúdio com iluminação dramática.',
        },
        'paris-phanteon': {
          title: 'Panteão de Paris',
          description: 'Paisagem urbana simétrica ao redor do Panteão.',
        },
        'crashing-waves': {
          title: 'Ondas quebrando',
          description: 'Ondas dramáticas do oceano contra rochas vulcânicas ao pôr do sol.',
        },
        'fishing-kid': {
          title: 'Menino pescador',
          description: 'Ondas quebram enquanto o garoto pesca.',
        },
        'construction-sight': {
          title: 'Canteiro de obras',
          description: 'Construção emergindo na névoa.',
        },
      },
    },
    en: {
      home: 'Home',
      gallery: 'Gallery',
      contact: 'Contact',
      contactTitle: 'Get in touch',
      contactSubtitle: 'Reach out',
      contactDescription: 'Have questions about prints, custom orders, or shipping? We would love to hear from you.',
      contactEmailLabel: 'Email',
      contactPhoneLabel: 'Phone',
      contactStudioLabel: 'Studio',
      contactFormNameLabel: 'Name',
      contactFormEmailLabel: 'Email',
      contactFormMessageLabel: 'Message',
      contactFormSubmit: 'Send Message',
      contactToastSuccess: 'Message sent! We will get back to you soon.',
      photography: 'Photography',
      heroTagline: 'Photos taken are eternalized memories',
      exploreGallery: 'Explore Gallery',
      collectionTitle: 'My collection of photos',
      featured: 'Featured',
      aboutMe: 'About me',
      pathInPhotography: 'Path in photography',
      aboutDescription: 'I started getting into photography not long ago, but quickly fell in love with it.',
      aboutExtra: 'It is a passion to capture moments, memories that can last a lifetime. Be revisited or printed on the wall or on our phones to keep those memories fresh and present. And that is the privilege of being a photographer. Contact me and I’ll help freeze time and memories into a photo!',
      sportsPhotographyTitle: 'Sports photography',
      sportsPhotographyDescription: 'High-energy action and movement captured in every frame.',
      portraitsPhotographyTitle: 'Portraits photography',
      portraitsPhotographyDescription: 'Personal portraits with expressive emotion and depth.',
      streetPhotographyTitle: 'Street photography',
      streetPhotographyDescription: 'Urban stories, architecture, and everyday life in motion.',
      photographyTypesLabel: 'Photography types',
      footer: {
        tagline: 'Photos taken are eternalized memories.',
        quickLinks: 'Quick Links',
        helpTitle: 'Let me help you',
        copyright: '© 2026 Daniel Santos Photography. All rights reserved.',
      },
      prints: {
        'teal-mushroom': {
          title: 'Lonely Mushroom',
          description: 'After the rain, mushrooms thrive.',
        },
        grandma: {
          title: 'Grandma Portrait',
          description: 'Studio portrait with dramatic lighting.',
        },
        'paris-phanteon': {
          title: 'Paris Panthéon',
          description: 'Symmetrical cityscape around the Panthéon.',
        },
        'crashing-waves': {
          title: 'Crashing Waves',
          description: 'Dramatic ocean waves against volcanic rocks at sunset.',
        },
        'fishing-kid': {
          title: 'Fishing Kid',
          description: 'Waves crash as the kid fishes.',
        },
        'construction-sight': {
          title: 'Construction Site',
          description: 'Construction emerging through the fog.',
        },
      },
    },
  };

  public static get(lang: Language): I18nStrings {
    return this.data[lang] || this.data[DEFAULT_LANGUAGE];
  }
}
