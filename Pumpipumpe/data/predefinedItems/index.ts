import { ItemCategory } from '@/types';
import { SupportedLanguage } from '@/i18n/languages';
import { items as itemsIt } from './it';
import { items as itemsFr } from './fr';
import { items as itemsEn } from './en';
import { items as itemsDe } from './de';
import { items as itemsEs } from './es';

export interface PredefinedItemBase {
  id: string;
  category: ItemCategory;
  icon: string;
}

export interface LocalizedPredefinedItem extends PredefinedItemBase {
  title: string;
  description: string;
  tags: string[];
}

const itemsByLanguage = {
  it: itemsIt,
  fr: itemsFr,
  en: itemsEn,
  de: itemsDe,
  es: itemsEs
};

export const getPredefinedItems = (language: SupportedLanguage = 'it'): LocalizedPredefinedItem[] => {
  return itemsByLanguage[language] || itemsByLanguage.it;
};

export const getItemsByCategory = (category: ItemCategory, language: SupportedLanguage = 'it'): LocalizedPredefinedItem[] => {
  return getPredefinedItems(language).filter(item => item.category === category);
};

export const searchPredefinedItems = (query: string, language: SupportedLanguage = 'it'): LocalizedPredefinedItem[] => {
  const searchTerm = query.toLowerCase();
  const items = getPredefinedItems(language);
  
  return items.filter(item => 
    item.title.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};