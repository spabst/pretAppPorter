import { ItemCategory } from '@/types';
import { LocalizedPredefinedItem } from './index';

export const items: LocalizedPredefinedItem[] = [
  // TOOLS
  {
    id: 'drill',
    title: 'Trapano',
    category: ItemCategory.TOOLS,
    description: 'Trapano elettrico per fori e avvitatura',
    icon: 'wrench.and.screwdriver.fill',
    tags: ['trapano', 'utensile', 'elettrico', 'fori']
  },
  {
    id: 'ladder',
    title: 'Scala',
    category: ItemCategory.TOOLS,
    description: 'Scala pieghevole in alluminio',
    icon: 'stairs',
    tags: ['scala', 'alluminio', 'altezza', 'lavori']
  },
  {
    id: 'hammer',
    title: 'Martello',
    category: ItemCategory.TOOLS,
    description: 'Martello da carpentiere',
    icon: 'hammer.fill',
    tags: ['martello', 'chiodi', 'carpentiere']
  },
  
  // GARDEN
  {
    id: 'lawnmower',
    title: 'Tosaerba',
    category: ItemCategory.GARDEN,
    description: 'Tosaerba elettrico per giardino',
    icon: 'leaf.fill',
    tags: ['tosaerba', 'elettrico', 'giardino', 'erba']
  },
  
  // SPORTS
  {
    id: 'bicycle',
    title: 'Bicicletta',
    category: ItemCategory.SPORTS,
    description: 'Bicicletta da città per adulti',
    icon: 'bicycle',
    tags: ['bicicletta', 'città', 'trasporto', 'sport']
  },
  
  // Add more items as needed...
];