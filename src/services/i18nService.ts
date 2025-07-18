import React from 'react';
// Internationalization service for multi-language support
export interface Translation {
  [key: string]: string | Translation;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const supportedLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' }
];

export const translations: { [key: string]: Translation } = {
  en: {
    nav: {
      home: 'Home',
      createVideo: 'Create Video',
      myOrders: 'My Orders',
      admin: 'Admin',
      getStarted: 'Get Started'
    },
    hero: {
      badge: 'Next-Generation AI Video Platform',
      headline: 'Transform Ideas Into',
      headlineHighlight: 'Visual Stories',
      subheadline: 'From training modules to product demos, create professional AI videos that engage, educate, and convert your audience',
      oneTimeProjects: 'One-time projects from $15',
      subscriptions: 'Subscriptions for teams',
      enterprise: 'Enterprise solutions',
      startCreating: 'Start Creating Today',
      seeInAction: 'See Drishya in Action',
      videosCreated: 'Videos Created',
      clientSatisfaction: 'Client Satisfaction',
      fastestTurnaround: 'Fastest Turnaround',
      acrossIndustries: 'Across all industries',
      consistentlyRated: 'Consistently rated 5-star',
      urgentProjects: 'For urgent projects',
      trustedBy: 'Trusted by businesses worldwide'
    },
    pricing: {
      flexiblePricing: 'Flexible Pricing for Every Business',
      chooseYourPlan: 'Choose Your',
      perfectPlan: 'Perfect Plan',
      subtitle: 'From one-time projects to enterprise solutions. Scale your video creation as your business grows.',
      basic: {
        name: 'Basic',
        price: 15,
        description: 'per video',
        delivery: '7-day delivery • 1 revision',
        features: [
          'Single video creation',
          'Basic AI avatar selection',
          'Up to 60 seconds video',
          'Standard script review',
          'Basic editing & effects',
          '7-day delivery',
          '1 revision included'
        ]
      },
      starter: {
        name: 'Starter',
        price: 100,
        description: '/month',
        delivery: '2 videos/week • 3-day delivery',
        monthlyVideos: '8 videos per month • Save 60% vs Basic',
        popular: 'Most Popular',
        features: [
          '2 videos per week (8/month)',
          'Premium AI avatar library',
          'Up to 3 minutes per video',
          'Script assistance included',
          'Professional editing',
          'Background music & graphics',
          '3-day delivery per video',
          '2 revisions per video',
          'Priority support',
          'Team collaboration tools'
        ]
      },
      enterprise: {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Pricing',
        delivery: 'Custom delivery timeline',
        features: [
          'Unlimited video creation',
          'Custom AI avatar training',
          'Unlimited video length',
          'Dedicated scriptwriting team',
          'Advanced editing & animations',
          'Custom graphics & branding',
          'White-label solutions',
          'API access & integrations',
          '24-hour delivery available',
          'Unlimited revisions',
          'Dedicated account manager',
          'Custom training & onboarding'
        ]
      },
      createVideo: 'Create Video',
      startSubscription: 'Start Subscription',
      contactSales: 'Contact Sales'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      createVideo: 'Crear Video',
      myOrders: 'Mis Pedidos',
      admin: 'Admin',
      getStarted: 'Comenzar'
    },
    hero: {
      badge: 'Plataforma de Video IA de Nueva Generación',
      headline: 'Transforma Ideas en',
      headlineHighlight: 'Historias Visuales',
      subheadline: 'Desde módulos de entrenamiento hasta demos de productos, crea videos profesionales con IA que involucran, educan y convierten a tu audiencia',
      oneTimeProjects: 'Proyectos únicos desde $15',
      subscriptions: 'Suscripciones para equipos',
      enterprise: 'Soluciones empresariales',
      startCreating: 'Comenzar a Crear Hoy',
      seeInAction: 'Ver Drishya en Acción',
      videosCreated: 'Videos Creados',
      clientSatisfaction: 'Satisfacción del Cliente',
      fastestTurnaround: 'Entrega Más Rápida',
      acrossIndustries: 'En todas las industrias',
      consistentlyRated: 'Calificado consistentemente 5 estrellas',
      urgentProjects: 'Para proyectos urgentes',
      trustedBy: 'Confiado por empresas en todo el mundo'
    },
    pricing: {
      flexiblePricing: 'Precios Flexibles para Cada Negocio',
      chooseYourPlan: 'Elige Tu',
      perfectPlan: 'Plan Perfecto',
      subtitle: 'Desde proyectos únicos hasta soluciones empresariales. Escala tu creación de videos mientras tu negocio crece.',
      basic: {
        name: 'Básico',
        price: 15,
        description: 'por video',
        delivery: 'Entrega en 7 días • 1 revisión',
        features: [
          'Creación de video único',
          'Selección básica de avatar IA',
          'Video de hasta 60 segundos',
          'Revisión estándar de guión',
          'Edición y efectos básicos',
          'Entrega en 7 días',
          '1 revisión incluida'
        ]
      },
      starter: {
        name: 'Inicial',
        price: 100,
        description: '/mes',
        delivery: '2 videos/semana • Entrega en 3 días',
        monthlyVideos: '8 videos por mes • Ahorra 60% vs Básico',
        popular: 'Más Popular',
        features: [
          '2 videos por semana (8/mes)',
          'Biblioteca premium de avatares IA',
          'Hasta 3 minutos por video',
          'Asistencia de guión incluida',
          'Edición profesional',
          'Música de fondo y gráficos',
          'Entrega en 3 días por video',
          '2 revisiones por video',
          'Soporte prioritario',
          'Herramientas de colaboración en equipo'
        ]
      },
      enterprise: {
        name: 'Empresarial',
        price: 'Personalizado',
        description: 'Precios',
        delivery: 'Cronograma de entrega personalizado',
        features: [
          'Creación ilimitada de videos',
          'Entrenamiento personalizado de avatar IA',
          'Duración ilimitada de video',
          'Equipo dedicado de redacción de guiones',
          'Edición avanzada y animaciones',
          'Gráficos y marca personalizados',
          'Soluciones de marca blanca',
          'Acceso API e integraciones',
          'Entrega en 24 horas disponible',
          'Revisiones ilimitadas',
          'Gerente de cuenta dedicado',
          'Entrenamiento y incorporación personalizada'
        ]
      },
      createVideo: 'Crear Video',
      startSubscription: 'Iniciar Suscripción',
      contactSales: 'Contactar Ventas'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      createVideo: 'Créer une Vidéo',
      myOrders: 'Mes Commandes',
      admin: 'Admin',
      getStarted: 'Commencer'
    },
    hero: {
      badge: 'Plateforme Vidéo IA de Nouvelle Génération',
      headline: 'Transformez les Idées en',
      headlineHighlight: 'Histoires Visuelles',
      subheadline: 'Des modules de formation aux démos de produits, créez des vidéos IA professionnelles qui engagent, éduquent et convertissent votre audience',
      oneTimeProjects: 'Projets uniques à partir de 15$',
      subscriptions: 'Abonnements pour équipes',
      enterprise: 'Solutions entreprise',
      startCreating: 'Commencer à Créer Aujourd\'hui',
      seeInAction: 'Voir Drishya en Action',
      videosCreated: 'Vidéos Créées',
      clientSatisfaction: 'Satisfaction Client',
      fastestTurnaround: 'Livraison la Plus Rapide',
      acrossIndustries: 'Dans toutes les industries',
      consistentlyRated: 'Noté constamment 5 étoiles',
      urgentProjects: 'Pour les projets urgents',
      trustedBy: 'Fait confiance par les entreprises du monde entier'
    },
    pricing: {
      flexiblePricing: 'Tarification Flexible pour Chaque Entreprise',
      chooseYourPlan: 'Choisissez Votre',
      perfectPlan: 'Plan Parfait',
      subtitle: 'Des projets uniques aux solutions d\'entreprise. Évoluez votre création vidéo à mesure que votre entreprise grandit.',
      basic: {
        name: 'Basique',
        price: 15,
        description: 'par vidéo',
        delivery: 'Livraison en 7 jours • 1 révision',
        features: [
          'Création de vidéo unique',
          'Sélection d\'avatar IA basique',
          'Vidéo jusqu\'à 60 secondes',
          'Révision de script standard',
          'Édition et effets basiques',
          'Livraison en 7 jours',
          '1 révision incluse'
        ]
      },
      starter: {
        name: 'Débutant',
        price: 100,
        description: '/mois',
        delivery: '2 vidéos/semaine • Livraison en 3 jours',
        monthlyVideos: '8 vidéos par mois • Économisez 60% vs Basique',
        popular: 'Le Plus Populaire',
        features: [
          '2 vidéos par semaine (8/mois)',
          'Bibliothèque premium d\'avatars IA',
          'Jusqu\'à 3 minutes par vidéo',
          'Assistance de script incluse',
          'Édition professionnelle',
          'Musique de fond et graphiques',
          'Livraison en 3 jours par vidéo',
          '2 révisions par vidéo',
          'Support prioritaire',
          'Outils de collaboration d\'équipe'
        ]
      },
      enterprise: {
        name: 'Entreprise',
        price: 'Personnalisé',
        description: 'Tarification',
        delivery: 'Calendrier de livraison personnalisé',
        features: [
          'Création vidéo illimitée',
          'Formation d\'avatar IA personnalisée',
          'Durée vidéo illimitée',
          'Équipe dédiée de rédaction de scripts',
          'Édition avancée et animations',
          'Graphiques et branding personnalisés',
          'Solutions en marque blanche',
          'Accès API et intégrations',
          'Livraison en 24h disponible',
          'Révisions illimitées',
          'Gestionnaire de compte dédié',
          'Formation et intégration personnalisées'
        ]
      },
      createVideo: 'Créer une Vidéo',
      startSubscription: 'Commencer l\'Abonnement',
      contactSales: 'Contacter les Ventes'
    }
  },
  de: {
    nav: {
      home: 'Startseite',
      createVideo: 'Video Erstellen',
      myOrders: 'Meine Bestellungen',
      admin: 'Admin',
      getStarted: 'Loslegen'
    },
    hero: {
      badge: 'KI-Video-Plattform der Nächsten Generation',
      headline: 'Verwandeln Sie Ideen in',
      headlineHighlight: 'Visuelle Geschichten',
      subheadline: 'Von Trainingsmodulen bis hin zu Produktdemos - erstellen Sie professionelle KI-Videos, die Ihr Publikum ansprechen, bilden und konvertieren',
      oneTimeProjects: 'Einmalige Projekte ab 15$',
      subscriptions: 'Abonnements für Teams',
      enterprise: 'Unternehmenslösungen',
      startCreating: 'Heute mit dem Erstellen Beginnen',
      seeInAction: 'Drishya in Aktion Sehen',
      videosCreated: 'Videos Erstellt',
      clientSatisfaction: 'Kundenzufriedenheit',
      fastestTurnaround: 'Schnellste Bearbeitungszeit',
      acrossIndustries: 'Branchenübergreifend',
      consistentlyRated: 'Durchgehend 5-Sterne bewertet',
      urgentProjects: 'Für dringende Projekte',
      trustedBy: 'Vertraut von Unternehmen weltweit'
    },
    pricing: {
      flexiblePricing: 'Flexible Preise für Jedes Unternehmen',
      chooseYourPlan: 'Wählen Sie Ihren',
      perfectPlan: 'Perfekten Plan',
      subtitle: 'Von einmaligen Projekten bis hin zu Unternehmenslösungen. Skalieren Sie Ihre Videoerstellung mit dem Wachstum Ihres Unternehmens.',
      basic: {
        name: 'Basis',
        price: 15,
        description: 'pro Video',
        delivery: '7-Tage Lieferung • 1 Überarbeitung',
        features: [
          'Einzelne Videoerstellung',
          'Basis KI-Avatar Auswahl',
          'Bis zu 60 Sekunden Video',
          'Standard Skript-Überprüfung',
          'Basis Bearbeitung & Effekte',
          '7-Tage Lieferung',
          '1 Überarbeitung inklusive'
        ]
      },
      starter: {
        name: 'Starter',
        price: 100,
        description: '/Monat',
        delivery: '2 Videos/Woche • 3-Tage Lieferung',
        monthlyVideos: '8 Videos pro Monat • Sparen Sie 60% vs Basis',
        popular: 'Am Beliebtesten',
        features: [
          '2 Videos pro Woche (8/Monat)',
          'Premium KI-Avatar Bibliothek',
          'Bis zu 3 Minuten pro Video',
          'Skript-Unterstützung inklusive',
          'Professionelle Bearbeitung',
          'Hintergrundmusik & Grafiken',
          '3-Tage Lieferung pro Video',
          '2 Überarbeitungen pro Video',
          'Prioritäts-Support',
          'Team-Kollaborations-Tools'
        ]
      },
      enterprise: {
        name: 'Unternehmen',
        price: 'Individuell',
        description: 'Preise',
        delivery: 'Individueller Lieferzeitplan',
        features: [
          'Unbegrenzte Videoerstellung',
          'Individuelles KI-Avatar Training',
          'Unbegrenzte Videolänge',
          'Dediziertes Drehbuch-Team',
          'Erweiterte Bearbeitung & Animationen',
          'Individuelle Grafiken & Branding',
          'White-Label Lösungen',
          'API-Zugang & Integrationen',
          '24-Stunden Lieferung verfügbar',
          'Unbegrenzte Überarbeitungen',
          'Dedizierter Account Manager',
          'Individuelles Training & Onboarding'
        ]
      },
      createVideo: 'Video Erstellen',
      startSubscription: 'Abonnement Starten',
      contactSales: 'Vertrieb Kontaktieren'
    }
  }
};

export class I18nService {
  private static instance: I18nService;
  private currentLanguage: string = 'en';
  private listeners: ((language: string) => void)[] = [];

  static getInstance(): I18nService {
    if (!I18nService.instance) {
      I18nService.instance = new I18nService();
    }
    return I18nService.instance;
  }

  constructor() {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('drishya-language');
    if (savedLanguage && this.isLanguageSupported(savedLanguage)) {
      this.currentLanguage = savedLanguage;
    } else {
      // Detect browser language
      const browserLanguage = navigator.language.split('-')[0];
      if (this.isLanguageSupported(browserLanguage)) {
        this.currentLanguage = browserLanguage;
      }
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  setLanguage(languageCode: string): void {
    if (this.isLanguageSupported(languageCode)) {
      this.currentLanguage = languageCode;
      localStorage.setItem('drishya-language', languageCode);
      this.notifyListeners();
    }
  }

  isLanguageSupported(languageCode: string): boolean {
    return supportedLanguages.some(lang => lang.code === languageCode);
  }

  translate(key: string): string {
    const keys = key.split('.');
    let value: any = translations[this.currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = translations['en'];
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if no translation found
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  }

  addLanguageChangeListener(callback: (language: string) => void): void {
    this.listeners.push(callback);
  }

  removeLanguageChangeListener(callback: (language: string) => void): void {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.currentLanguage));
  }

  getSupportedLanguages(): Language[] {
    return supportedLanguages;
  }

  getCurrentLanguageInfo(): Language {
    return supportedLanguages.find(lang => lang.code === this.currentLanguage) || supportedLanguages[0];
  }
}

// Hook for React components
export function useTranslation() {
  const i18n = I18nService.getInstance();
  const [currentLanguage, setCurrentLanguage] = React.useState(i18n.getCurrentLanguage());

  React.useEffect(() => {
    const handleLanguageChange = (language: string) => {
      setCurrentLanguage(language);
    };

    i18n.addLanguageChangeListener(handleLanguageChange);
    return () => i18n.removeLanguageChangeListener(handleLanguageChange);
  }, [i18n]);

  const t = React.useCallback((key: string) => i18n.translate(key), [currentLanguage]);
  
  return {
    t,
    currentLanguage,
    setLanguage: (lang: string) => i18n.setLanguage(lang),
    supportedLanguages: i18n.getSupportedLanguages(),
    currentLanguageInfo: i18n.getCurrentLanguageInfo()
  };
}

