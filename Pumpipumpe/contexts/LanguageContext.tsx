import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'it' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': {
    it: 'Casa',
    fr: 'Accueil'
  },
  'nav.explore': {
    it: 'Esplora',
    fr: 'Explorer'
  },
  'nav.add': {
    it: 'Aggiungi',
    fr: 'Ajouter'
  },
  
  // Categories
  'category.tools': {
    it: 'Utensili',
    fr: 'Outils'
  },
  'category.garden': {
    it: 'Giardino',
    fr: 'Jardin'
  },
  'category.kitchen': {
    it: 'Cucina',
    fr: 'Cuisine'
  },
  'category.sports': {
    it: 'Sport',
    fr: 'Sports'
  },
  'category.electronics': {
    it: 'Elettronica',
    fr: 'Électronique'
  },
  'category.household': {
    it: 'Casa',
    fr: 'Ménage'
  },
  'category.automotive': {
    it: 'Auto',
    fr: 'Automobile'
  },
  'category.books': {
    it: 'Libri',
    fr: 'Livres'
  },
  'category.other': {
    it: 'Altro',
    fr: 'Autre'
  },
  
  // Common actions
  'action.search': {
    it: 'Cerca',
    fr: 'Rechercher'
  },
  'action.add_item': {
    it: 'Aggiungi Oggetto',
    fr: 'Ajouter un Objet'
  },
  'action.borrow': {
    it: 'Prendi in Prestito',
    fr: 'Emprunter'
  },
  'action.save': {
    it: 'Salva',
    fr: 'Sauvegarder'
  },
  'action.cancel': {
    it: 'Annulla',
    fr: 'Annuler'
  },
  
  // Form labels
  'form.title': {
    it: 'Titolo',
    fr: 'Titre'
  },
  'form.description': {
    it: 'Descrizione',
    fr: 'Description'
  },
  'form.category': {
    it: 'Categoria',
    fr: 'Catégorie'
  },
  'form.condition': {
    it: 'Condizione',
    fr: 'État'
  },
  
  // Condition states
  'condition.new': {
    it: 'Nuovo',
    fr: 'Neuf'
  },
  'condition.like_new': {
    it: 'Come Nuovo',
    fr: 'Comme Neuf'
  },
  'condition.good': {
    it: 'Buono',
    fr: 'Bon'
  },
  'condition.fair': {
    it: 'Discreto',
    fr: 'Correct'
  },
  'condition.poor': {
    it: 'Scarso',
    fr: 'Mauvais'
  },
  
  // Language selector
  'settings.language': {
    it: 'Lingua',
    fr: 'Langue'
  },
  'language.italian': {
    it: 'Italiano',
    fr: 'Italien'
  },
  'language.french': {
    it: 'Francese',
    fr: 'Français'
  },
  
  // Additional UI text
  'welcome.title': {
    it: 'Benvenuto in Pumpipumpe',
    fr: 'Bienvenue sur Pumpipumpe'
  },
  'welcome.subtitle': {
    it: 'Condividi e prendi in prestito oggetti con i tuoi vicini',
    fr: 'Partagez et empruntez des objets avec vos voisins'
  },
  'search.placeholder': {
    it: 'Cerca oggetti...',
    fr: 'Rechercher des objets...'
  },
  'items.available': {
    it: 'Disponibile',
    fr: 'Disponible'
  },
  'items.not_available': {
    it: 'Non disponibile',
    fr: 'Non disponible'
  },
  'filter.all_categories': {
    it: 'Tutte le categorie',
    fr: 'Toutes les catégories'
  },
  'filter.distance': {
    it: 'Distanza',
    fr: 'Distance'
  },
  'loading': {
    it: 'Caricamento...',
    fr: 'Chargement...'
  },
  'error.generic': {
    it: 'Si è verificato un errore',
    fr: 'Une erreur s\'est produite'
  },
  'success.item_added': {
    it: 'Oggetto aggiunto con successo',
    fr: 'Objet ajouté avec succès'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('it');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};