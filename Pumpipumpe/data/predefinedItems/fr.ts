import { ItemCategory } from '@/types';
import { LocalizedPredefinedItem } from './index';

export const items: LocalizedPredefinedItem[] = [
  // TOOLS
  {
    id: 'drill',
    title: 'Perceuse',
    category: ItemCategory.TOOLS,
    description: 'Perceuse électrique pour perçage et vissage',
    icon: 'wrench.and.screwdriver.fill',
    tags: ['perceuse', 'outil', 'électrique', 'trous']
  },
  {
    id: 'ladder',
    title: 'Échelle',
    category: ItemCategory.TOOLS,
    description: 'Échelle pliante en aluminium',
    icon: 'stairs',
    tags: ['échelle', 'aluminium', 'hauteur', 'travaux']
  },
  {
    id: 'hammer',
    title: 'Marteau',
    category: ItemCategory.TOOLS,
    description: 'Marteau de charpentier',
    icon: 'hammer.fill',
    tags: ['marteau', 'clous', 'charpentier']
  },
  
  // GARDEN
  {
    id: 'lawnmower',
    title: 'Tondeuse',
    category: ItemCategory.GARDEN,
    description: 'Tondeuse électrique pour jardin',
    icon: 'leaf.fill',
    tags: ['tondeuse', 'électrique', 'jardin', 'herbe']
  },
  
  // SPORTS
  {
    id: 'bicycle',
    title: 'Vélo',
    category: ItemCategory.SPORTS,
    description: 'Vélo de ville pour adultes',
    icon: 'bicycle',
    tags: ['vélo', 'ville', 'transport', 'sport']
  },
  
  // Add more items as needed...
];