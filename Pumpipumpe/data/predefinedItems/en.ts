import { ItemCategory } from '@/types';
import { LocalizedPredefinedItem } from './index';

export const items: LocalizedPredefinedItem[] = [
  // TOOLS
  {
    id: 'drill',
    title: 'Drill',
    category: ItemCategory.TOOLS,
    description: 'Electric drill for drilling and screwing',
    icon: 'wrench.and.screwdriver.fill',
    tags: ['drill', 'tool', 'electric', 'holes']
  },
  {
    id: 'ladder',
    title: 'Ladder',
    category: ItemCategory.TOOLS,
    description: 'Foldable aluminum ladder',
    icon: 'stairs',
    tags: ['ladder', 'aluminum', 'height', 'work']
  },
  {
    id: 'hammer',
    title: 'Hammer',
    category: ItemCategory.TOOLS,
    description: 'Carpenter hammer',
    icon: 'hammer.fill',
    tags: ['hammer', 'nails', 'carpenter']
  },
  
  // GARDEN
  {
    id: 'lawnmower',
    title: 'Lawnmower',
    category: ItemCategory.GARDEN,
    description: 'Electric lawnmower for garden',
    icon: 'leaf.fill',
    tags: ['lawnmower', 'electric', 'garden', 'grass']
  },
  
  // SPORTS
  {
    id: 'bicycle',
    title: 'Bicycle',
    category: ItemCategory.SPORTS,
    description: 'City bicycle for adults',
    icon: 'bicycle',
    tags: ['bicycle', 'city', 'transport', 'sport']
  },
  
  // Add more items as needed...
];