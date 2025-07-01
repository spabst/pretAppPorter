import { ItemCategory } from '@/types';
import { LocalizedPredefinedItem } from './index';

export const items: LocalizedPredefinedItem[] = [
  // TOOLS
  {
    id: 'drill',
    title: 'Taladro',
    category: ItemCategory.TOOLS,
    description: 'Taladro eléctrico para perforar y atornillar',
    icon: 'wrench.and.screwdriver.fill',
    tags: ['taladro', 'herramienta', 'eléctrico', 'agujeros']
  },
  {
    id: 'ladder',
    title: 'Escalera',
    category: ItemCategory.TOOLS,
    description: 'Escalera plegable de aluminio',
    icon: 'stairs',
    tags: ['escalera', 'aluminio', 'altura', 'trabajo']
  },
  {
    id: 'hammer',
    title: 'Martillo',
    category: ItemCategory.TOOLS,
    description: 'Martillo de carpintero',
    icon: 'hammer.fill',
    tags: ['martillo', 'clavos', 'carpintero']
  },
  
  // GARDEN
  {
    id: 'lawnmower',
    title: 'Cortacésped',
    category: ItemCategory.GARDEN,
    description: 'Cortacésped eléctrico para jardín',
    icon: 'leaf.fill',
    tags: ['cortacésped', 'eléctrico', 'jardín', 'césped']
  },
  
  // SPORTS
  {
    id: 'bicycle',
    title: 'Bicicleta',
    category: ItemCategory.SPORTS,
    description: 'Bicicleta urbana para adultos',
    icon: 'bicycle',
    tags: ['bicicleta', 'ciudad', 'transporte', 'deporte']
  },
  
  // Add more items as needed...
];