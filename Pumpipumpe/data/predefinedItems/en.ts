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
  {
    id: 'screwdriver_set',
    title: 'Screwdriver Set',
    category: ItemCategory.TOOLS,
    description: 'Complete set of screwdrivers in various sizes',
    icon: 'wrench.fill',
    tags: ['screwdrivers', 'set', 'screws', 'repair']
  },
  {
    id: 'saw',
    title: 'Saw',
    category: ItemCategory.TOOLS,
    description: 'Manual saw for wood',
    icon: 'scissors',
    tags: ['saw', 'wood', 'cutting']
  },
  {
    id: 'level',
    title: 'Level',
    category: ItemCategory.TOOLS,
    description: 'Bubble level for precise measurements',
    icon: 'ruler.fill',
    tags: ['level', 'measure', 'precise', 'construction']
  },
  {
    id: 'wrench_set',
    title: 'Wrench Set',
    category: ItemCategory.TOOLS,
    description: 'Set of wrenches and socket wrenches',
    icon: 'wrench.fill',
    tags: ['wrenches', 'socket', 'mechanics', 'bolts']
  },
  {
    id: 'pliers',
    title: 'Pliers',
    category: ItemCategory.TOOLS,
    description: 'Universal pliers for electricians',
    icon: 'wrench.adjustable.fill',
    tags: ['pliers', 'electrician', 'wires', 'grip']
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
  {
    id: 'garden_hose',
    title: 'Garden Hose',
    category: ItemCategory.GARDEN,
    description: 'Irrigation hose with spray gun',
    icon: 'drop.fill',
    tags: ['hose', 'irrigation', 'garden', 'water']
  },
  {
    id: 'pruning_shears',
    title: 'Pruning Shears',
    category: ItemCategory.GARDEN,
    description: 'Professional shears for pruning plants',
    icon: 'scissors',
    tags: ['shears', 'pruning', 'plants', 'garden']
  },
  {
    id: 'wheelbarrow',
    title: 'Wheelbarrow',
    category: ItemCategory.GARDEN,
    description: 'Wheelbarrow for transporting soil and materials',
    icon: 'cart.fill',
    tags: ['wheelbarrow', 'transport', 'soil', 'garden']
  },
  {
    id: 'rake',
    title: 'Rake',
    category: ItemCategory.GARDEN,
    description: 'Rake for collecting leaves',
    icon: 'leaf.fill',
    tags: ['rake', 'leaves', 'cleaning', 'garden']
  },
  {
    id: 'shovel',
    title: 'Shovel',
    category: ItemCategory.GARDEN,
    description: 'Shovel for digging and planting',
    icon: 'hand.raised.fill',
    tags: ['shovel', 'digging', 'planting', 'soil']
  },

  // KITCHEN
  {
    id: 'stand_mixer',
    title: 'Stand Mixer',
    category: ItemCategory.KITCHEN,
    description: 'Kitchen robot with accessories',
    icon: 'fork.knife.circle.fill',
    tags: ['mixer', 'robot', 'kitchen', 'baking']
  },
  {
    id: 'food_processor',
    title: 'Food Processor',
    category: ItemCategory.KITCHEN,
    description: 'Electric multifunction food processor',
    icon: 'gear',
    tags: ['processor', 'electric', 'vegetables', 'kitchen']
  },
  {
    id: 'pressure_cooker',
    title: 'Pressure Cooker',
    category: ItemCategory.KITCHEN,
    description: 'Pressure cooker for fast cooking',
    icon: 'flame.fill',
    tags: ['pressure cooker', 'pressure', 'cooking', 'fast']
  },
  {
    id: 'blender',
    title: 'Blender',
    category: ItemCategory.KITCHEN,
    description: 'Immersion blender',
    icon: 'tornado',
    tags: ['blender', 'immersion', 'smoothie', 'soups']
  },
  {
    id: 'juicer',
    title: 'Juicer',
    category: ItemCategory.KITCHEN,
    description: 'Centrifugal juicer for fruit juices',
    icon: 'drop.circle.fill',
    tags: ['juicer', 'juices', 'fruit', 'vegetables']
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
  {
    id: 'mountain_bike',
    title: 'Mountain Bike',
    category: ItemCategory.SPORTS,
    description: 'Mountain bike for trails and mountains',
    icon: 'bicycle',
    tags: ['mountain bike', 'mountain', 'trails', 'offroad']
  },
  {
    id: 'tennis_racket',
    title: 'Tennis Racket',
    category: ItemCategory.SPORTS,
    description: 'Professional tennis racket',
    icon: 'figure.tennis',
    tags: ['tennis', 'racket', 'sport', 'court']
  },
  {
    id: 'soccer_ball',
    title: 'Soccer Ball',
    category: ItemCategory.SPORTS,
    description: 'Official ball for matches',
    icon: 'soccerball',
    tags: ['soccer', 'ball', 'match', 'sport']
  },
  {
    id: 'skateboard',
    title: 'Skateboard',
    category: ItemCategory.SPORTS,
    description: 'Complete skateboard for beginners',
    icon: 'figure.skating',
    tags: ['skateboard', 'beginners', 'street', 'youth']
  },
  {
    id: 'yoga_mat',
    title: 'Yoga Mat',
    category: ItemCategory.SPORTS,
    description: 'Non-slip mat for yoga and pilates',
    icon: 'figure.yoga',
    tags: ['yoga', 'pilates', 'mat', 'fitness']
  },

  // ELECTRONICS
  {
    id: 'projector',
    title: 'Projector',
    category: ItemCategory.ELECTRONICS,
    description: 'Full HD projector for presentations',
    icon: 'tv.fill',
    tags: ['projector', 'presentations', 'movies', 'screen']
  },
  {
    id: 'speaker_bluetooth',
    title: 'Bluetooth Speaker',
    category: ItemCategory.ELECTRONICS,
    description: 'Portable wireless speaker',
    icon: 'speaker.wave.3.fill',
    tags: ['speaker', 'bluetooth', 'music', 'portable']
  },
  {
    id: 'camera_dslr',
    title: 'DSLR Camera',
    category: ItemCategory.ELECTRONICS,
    description: 'Digital camera with lenses',
    icon: 'camera.fill',
    tags: ['camera', 'dslr', 'photos', 'lenses']
  },
  {
    id: 'tablet',
    title: 'Tablet',
    category: ItemCategory.ELECTRONICS,
    description: '10-inch tablet for work and leisure',
    icon: 'ipad',
    tags: ['tablet', 'work', 'leisure', 'digital']
  },
  {
    id: 'headphones',
    title: 'Headphones',
    category: ItemCategory.ELECTRONICS,
    description: 'Wireless noise-cancelling headphones',
    icon: 'headphones',
    tags: ['headphones', 'wireless', 'music', 'noise-cancelling']
  },

  // HOUSEHOLD
  {
    id: 'vacuum_cleaner',
    title: 'Vacuum Cleaner',
    category: ItemCategory.HOUSEHOLD,
    description: 'Cordless rechargeable vacuum cleaner',
    icon: 'wind',
    tags: ['vacuum', 'cleaning', 'home', 'cordless']
  },
  {
    id: 'iron',
    title: 'Iron',
    category: ItemCategory.HOUSEHOLD,
    description: 'Steam iron',
    icon: 'flame.fill',
    tags: ['iron', 'ironing', 'steam', 'clothes']
  },
  {
    id: 'sewing_machine',
    title: 'Sewing Machine',
    category: ItemCategory.HOUSEHOLD,
    description: 'Electric sewing machine',
    icon: 'scissors',
    tags: ['sewing', 'machine', 'clothes', 'repair']
  },
  {
    id: 'carpet_cleaner',
    title: 'Carpet Cleaner',
    category: ItemCategory.HOUSEHOLD,
    description: 'Machine for carpet washing',
    icon: 'shower.fill',
    tags: ['carpets', 'cleaning', 'washing', 'home']
  },
  {
    id: 'steamer',
    title: 'Steam Cleaner',
    category: ItemCategory.HOUSEHOLD,
    description: 'Steam cleaner for floors',
    icon: 'drop.fill',
    tags: ['steam', 'floors', 'cleaning', 'hygiene']
  },

  // AUTOMOTIVE
  {
    id: 'car_jack',
    title: 'Car Jack',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Hydraulic jack for changing wheels',
    icon: 'car.fill',
    tags: ['jack', 'car', 'wheels', 'change']
  },
  {
    id: 'jumper_cables',
    title: 'Jumper Cables',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Cables for starting dead battery',
    icon: 'bolt.fill',
    tags: ['cables', 'battery', 'start', 'emergency']
  },
  {
    id: 'tire_pressure_gauge',
    title: 'Tire Pressure Gauge',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Digital gauge for tire pressure',
    icon: 'speedometer',
    tags: ['gauge', 'tires', 'pressure', 'check']
  },
  {
    id: 'car_vacuum',
    title: 'Car Vacuum',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Portable vacuum for cars',
    icon: 'car.circle.fill',
    tags: ['vacuum', 'car', 'cleaning', 'portable']
  },

  // BOOKS
  {
    id: 'cookbook',
    title: 'Cookbook',
    category: ItemCategory.BOOKS,
    description: 'Italian cuisine recipe book',
    icon: 'book.fill',
    tags: ['recipes', 'cooking', 'italian', 'cook']
  },
  {
    id: 'travel_guide',
    title: 'Travel Guide',
    category: ItemCategory.BOOKS,
    description: 'Travel guide for destinations',
    icon: 'map.fill',
    tags: ['travel', 'tourism', 'guide', 'destinations']
  },
  {
    id: 'language_book',
    title: 'Language Book',
    category: ItemCategory.BOOKS,
    description: 'Foreign language course',
    icon: 'textbook.fill',
    tags: ['languages', 'course', 'learn', 'foreign']
  },
  {
    id: 'diy_manual',
    title: 'DIY Manual',
    category: ItemCategory.BOOKS,
    description: 'Guide for home repairs',
    icon: 'wrench.and.screwdriver.fill',
    tags: ['diy', 'home', 'repairs', 'manual']
  },

  // OTHER
  {
    id: 'camping_tent',
    title: 'Camping Tent',
    category: ItemCategory.OTHER,
    description: 'Waterproof tent for 4 people',
    icon: 'house.fill',
    tags: ['tent', 'camping', 'outdoor', 'waterproof']
  },
  {
    id: 'sleeping_bag',
    title: 'Sleeping Bag',
    category: ItemCategory.OTHER,
    description: 'Sleeping bag for low temperatures',
    icon: 'bed.double.fill',
    tags: ['sleeping bag', 'sleep', 'camping']
  },
  {
    id: 'cooler',
    title: 'Cooler',
    category: ItemCategory.OTHER,
    description: 'Thermal bag for picnics and trips',
    icon: 'snowflake',
    tags: ['cooler', 'thermal', 'picnic', 'trips']
  },
  {
    id: 'baby_stroller',
    title: 'Baby Stroller',
    category: ItemCategory.OTHER,
    description: 'Foldable stroller for children',
    icon: 'baby.carriage.fill',
    tags: ['stroller', 'children', 'foldable', 'family']
  },
  {
    id: 'high_chair',
    title: 'High Chair',
    category: ItemCategory.OTHER,
    description: 'Adjustable high chair for children',
    icon: 'chair.fill',
    tags: ['high chair', 'children', 'feeding', 'adjustable']
  },
  {
    id: 'party_tent',
    title: 'Party Tent',
    category: ItemCategory.OTHER,
    description: 'Foldable gazebo for parties',
    icon: 'house.fill',
    tags: ['gazebo', 'parties', 'garden', 'shade']
  },
  {
    id: 'board_games',
    title: 'Board Games',
    category: ItemCategory.OTHER,
    description: 'Collection of board games',
    icon: 'gamecontroller.fill',
    tags: ['games', 'board', 'family', 'entertainment']
  },
  {
    id: 'musical_keyboard',
    title: 'Musical Keyboard',
    category: ItemCategory.OTHER,
    description: '61-key electronic keyboard',
    icon: 'piano',
    tags: ['keyboard', 'music', 'play', 'electronic']
  },
  {
    id: 'guitar',
    title: 'Guitar',
    category: ItemCategory.OTHER,
    description: 'Acoustic guitar for beginners',
    icon: 'music.note',
    tags: ['guitar', 'acoustic', 'music', 'beginners']
  },
  {
    id: 'art_easel',
    title: 'Art Easel',
    category: ItemCategory.OTHER,
    description: 'Adjustable easel for painting',
    icon: 'paintbrush.fill',
    tags: ['easel', 'painting', 'art', 'paint']
  }
];