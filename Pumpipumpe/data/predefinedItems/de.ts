import { ItemCategory } from '@/types';
import { LocalizedPredefinedItem } from './index';

export const items: LocalizedPredefinedItem[] = [
  // TOOLS
  {
    id: 'drill',
    title: 'Bohrmaschine',
    category: ItemCategory.TOOLS,
    description: 'Elektrische Bohrmaschine zum Bohren und Schrauben',
    icon: 'wrench.and.screwdriver.fill',
    tags: ['bohrmaschine', 'werkzeug', 'elektrisch', 'löcher']
  },
  {
    id: 'ladder',
    title: 'Leiter',
    category: ItemCategory.TOOLS,
    description: 'Klappbare Aluminiumleiter',
    icon: 'stairs',
    tags: ['leiter', 'aluminium', 'höhe', 'arbeit']
  },
  {
    id: 'hammer',
    title: 'Hammer',
    category: ItemCategory.TOOLS,
    description: 'Zimmermanns-Hammer',
    icon: 'hammer.fill',
    tags: ['hammer', 'nägel', 'zimmermann']
  },
  
  // GARDEN
  {
    id: 'lawnmower',
    title: 'Rasenmäher',
    category: ItemCategory.GARDEN,
    description: 'Elektrischer Rasenmäher für den Garten',
    icon: 'leaf.fill',
    tags: ['rasenmäher', 'elektrisch', 'garten', 'gras']
  },
  
  // SPORTS
  {
    id: 'bicycle',
    title: 'Fahrrad',
    category: ItemCategory.SPORTS,
    description: 'Stadtfahrrad für Erwachsene',
    icon: 'bicycle',
    tags: ['fahrrad', 'stadt', 'transport', 'sport']
  },
  
  // Add more items as needed...
];