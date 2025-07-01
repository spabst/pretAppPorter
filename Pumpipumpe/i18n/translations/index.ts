import { it } from './it';
import { fr } from './fr';
import { en } from './en';
import { de } from './de';
import { es } from './es';

export const translations = {
  it,
  fr,
  en,
  de,
  es
} as const;

export type TranslationKey = keyof typeof it;
export type Translations = typeof translations;