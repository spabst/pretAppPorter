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
  {
    id: 'screwdriver_set',
    title: 'Jeu de Tournevis',
    category: ItemCategory.TOOLS,
    description: 'Jeu complet de tournevis de différentes tailles',
    icon: 'wrench.fill',
    tags: ['tournevis', 'jeu', 'vis', 'réparation']
  },
  {
    id: 'saw',
    title: 'Scie',
    category: ItemCategory.TOOLS,
    description: 'Scie manuelle pour bois',
    icon: 'scissors',
    tags: ['scie', 'bois', 'coupe']
  },
  {
    id: 'level',
    title: 'Niveau à Bulle',
    category: ItemCategory.TOOLS,
    description: 'Niveau à bulle pour mesures précises',
    icon: 'ruler.fill',
    tags: ['niveau', 'mesure', 'précis', 'construction']
  },
  {
    id: 'wrench_set',
    title: 'Jeu de Clés',
    category: ItemCategory.TOOLS,
    description: 'Jeu de clés anglaises et à tube',
    icon: 'wrench.fill',
    tags: ['clés', 'anglaises', 'mécanique', 'boulons']
  },
  {
    id: 'pliers',
    title: 'Pinces',
    category: ItemCategory.TOOLS,
    description: 'Pinces universelles pour électricien',
    icon: 'wrench.adjustable.fill',
    tags: ['pinces', 'électricien', 'fils', 'prise']
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
  {
    id: 'garden_hose',
    title: 'Tuyau d\'Arrosage',
    category: ItemCategory.GARDEN,
    description: 'Tuyau d\'arrosage avec pistolet',
    icon: 'drop.fill',
    tags: ['tuyau', 'arrosage', 'jardin', 'eau']
  },
  {
    id: 'pruning_shears',
    title: 'Sécateur',
    category: ItemCategory.GARDEN,
    description: 'Sécateur professionnel pour tailler les plantes',
    icon: 'scissors',
    tags: ['sécateur', 'taille', 'plantes', 'jardin']
  },
  {
    id: 'wheelbarrow',
    title: 'Brouette',
    category: ItemCategory.GARDEN,
    description: 'Brouette pour transporter terre et matériaux',
    icon: 'cart.fill',
    tags: ['brouette', 'transport', 'terre', 'jardin']
  },
  {
    id: 'rake',
    title: 'Râteau',
    category: ItemCategory.GARDEN,
    description: 'Râteau pour ramasser les feuilles',
    icon: 'leaf.fill',
    tags: ['râteau', 'feuilles', 'nettoyage', 'jardin']
  },
  {
    id: 'shovel',
    title: 'Bêche',
    category: ItemCategory.GARDEN,
    description: 'Bêche pour creuser et planter',
    icon: 'hand.raised.fill',
    tags: ['bêche', 'creuser', 'planter', 'terre']
  },

  // KITCHEN
  {
    id: 'stand_mixer',
    title: 'Robot Pâtissier',
    category: ItemCategory.KITCHEN,
    description: 'Robot de cuisine avec accessoires',
    icon: 'fork.knife.circle.fill',
    tags: ['robot', 'pâtissier', 'cuisine', 'gâteaux']
  },
  {
    id: 'food_processor',
    title: 'Robot Ménager',
    category: ItemCategory.KITCHEN,
    description: 'Robot ménager électrique multifonction',
    icon: 'gear',
    tags: ['robot', 'électrique', 'légumes', 'cuisine']
  },
  {
    id: 'pressure_cooker',
    title: 'Autocuiseur',
    category: ItemCategory.KITCHEN,
    description: 'Autocuiseur pour cuisson rapide',
    icon: 'flame.fill',
    tags: ['autocuiseur', 'pression', 'cuisson', 'rapide']
  },
  {
    id: 'blender',
    title: 'Mixeur Plongeant',
    category: ItemCategory.KITCHEN,
    description: 'Mixeur plongeant',
    icon: 'tornado',
    tags: ['mixeur', 'plongeant', 'smoothie', 'soupes']
  },
  {
    id: 'juicer',
    title: 'Centrifugeuse',
    category: ItemCategory.KITCHEN,
    description: 'Centrifugeuse pour jus de fruits',
    icon: 'drop.circle.fill',
    tags: ['centrifugeuse', 'jus', 'fruits', 'légumes']
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
  {
    id: 'mountain_bike',
    title: 'VTT',
    category: ItemCategory.SPORTS,
    description: 'VTT pour sentiers et montagne',
    icon: 'bicycle',
    tags: ['VTT', 'montagne', 'sentiers', 'tout-terrain']
  },
  {
    id: 'tennis_racket',
    title: 'Raquette de Tennis',
    category: ItemCategory.SPORTS,
    description: 'Raquette de tennis professionnelle',
    icon: 'figure.tennis',
    tags: ['tennis', 'raquette', 'sport', 'court']
  },
  {
    id: 'soccer_ball',
    title: 'Ballon de Football',
    category: ItemCategory.SPORTS,
    description: 'Ballon officiel pour matchs',
    icon: 'soccerball',
    tags: ['football', 'ballon', 'match', 'sport']
  },
  {
    id: 'skateboard',
    title: 'Planche à Roulettes',
    category: ItemCategory.SPORTS,
    description: 'Planche à roulettes complète pour débutants',
    icon: 'figure.skating',
    tags: ['skateboard', 'débutants', 'rue', 'jeunes']
  },
  {
    id: 'yoga_mat',
    title: 'Tapis de Yoga',
    category: ItemCategory.SPORTS,
    description: 'Tapis antidérapant pour yoga et pilates',
    icon: 'figure.yoga',
    tags: ['yoga', 'pilates', 'tapis', 'fitness']
  },

  // ELECTRONICS
  {
    id: 'projector',
    title: 'Projecteur',
    category: ItemCategory.ELECTRONICS,
    description: 'Projecteur Full HD pour présentations',
    icon: 'tv.fill',
    tags: ['projecteur', 'présentations', 'films', 'écran']
  },
  {
    id: 'speaker_bluetooth',
    title: 'Enceinte Bluetooth',
    category: ItemCategory.ELECTRONICS,
    description: 'Haut-parleur sans fil portable',
    icon: 'speaker.wave.3.fill',
    tags: ['enceinte', 'bluetooth', 'musique', 'portable']
  },
  {
    id: 'camera_dslr',
    title: 'Appareil Photo Reflex',
    category: ItemCategory.ELECTRONICS,
    description: 'Appareil photo numérique avec objectifs',
    icon: 'camera.fill',
    tags: ['appareil photo', 'reflex', 'photos', 'objectifs']
  },
  {
    id: 'tablet',
    title: 'Tablette',
    category: ItemCategory.ELECTRONICS,
    description: 'Tablette 10 pouces pour travail et loisirs',
    icon: 'ipad',
    tags: ['tablette', 'travail', 'loisirs', 'numérique']
  },
  {
    id: 'headphones',
    title: 'Casque Audio',
    category: ItemCategory.ELECTRONICS,
    description: 'Casque sans fil à réduction de bruit',
    icon: 'headphones',
    tags: ['casque', 'sans fil', 'musique', 'réduction bruit']
  },

  // HOUSEHOLD
  {
    id: 'vacuum_cleaner',
    title: 'Aspirateur',
    category: ItemCategory.HOUSEHOLD,
    description: 'Aspirateur sans fil rechargeable',
    icon: 'wind',
    tags: ['aspirateur', 'nettoyage', 'maison', 'sans fil']
  },
  {
    id: 'iron',
    title: 'Fer à Repasser',
    category: ItemCategory.HOUSEHOLD,
    description: 'Fer à repasser à vapeur',
    icon: 'flame.fill',
    tags: ['fer', 'repassage', 'vapeur', 'vêtements']
  },
  {
    id: 'sewing_machine',
    title: 'Machine à Coudre',
    category: ItemCategory.HOUSEHOLD,
    description: 'Machine à coudre électrique',
    icon: 'scissors',
    tags: ['coudre', 'machine', 'vêtements', 'réparation']
  },
  {
    id: 'carpet_cleaner',
    title: 'Nettoyeur de Tapis',
    category: ItemCategory.HOUSEHOLD,
    description: 'Machine pour nettoyer les tapis',
    icon: 'shower.fill',
    tags: ['tapis', 'nettoyage', 'lavage', 'maison']
  },
  {
    id: 'steamer',
    title: 'Nettoyeur Vapeur',
    category: ItemCategory.HOUSEHOLD,
    description: 'Nettoyeur vapeur pour sols',
    icon: 'drop.fill',
    tags: ['vapeur', 'sols', 'nettoyage', 'hygiène']
  },

  // AUTOMOTIVE
  {
    id: 'car_jack',
    title: 'Cric Hydraulique',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Cric hydraulique pour changer les roues',
    icon: 'car.fill',
    tags: ['cric', 'voiture', 'roues', 'changement']
  },
  {
    id: 'jumper_cables',
    title: 'Câbles de Démarrage',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Câbles pour démarrer batterie déchargée',
    icon: 'bolt.fill',
    tags: ['câbles', 'batterie', 'démarrage', 'urgence']
  },
  {
    id: 'tire_pressure_gauge',
    title: 'Manomètre Pneus',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Manomètre numérique pour pression pneus',
    icon: 'speedometer',
    tags: ['manomètre', 'pneus', 'pression', 'contrôle']
  },
  {
    id: 'car_vacuum',
    title: 'Aspirateur Voiture',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Aspirateur portable pour voiture',
    icon: 'car.circle.fill',
    tags: ['aspirateur', 'voiture', 'nettoyage', 'portable']
  },

  // BOOKS
  {
    id: 'cookbook',
    title: 'Livre de Recettes',
    category: ItemCategory.BOOKS,
    description: 'Livre de recettes de cuisine italienne',
    icon: 'book.fill',
    tags: ['recettes', 'cuisine', 'italienne', 'cuisiner']
  },
  {
    id: 'travel_guide',
    title: 'Guide Touristique',
    category: ItemCategory.BOOKS,
    description: 'Guide de voyage pour destinations',
    icon: 'map.fill',
    tags: ['voyage', 'tourisme', 'guide', 'destinations']
  },
  {
    id: 'language_book',
    title: 'Manuel de Langues',
    category: ItemCategory.BOOKS,
    description: 'Cours de langue étrangère',
    icon: 'textbook.fill',
    tags: ['langues', 'cours', 'apprendre', 'étrangère']
  },
  {
    id: 'diy_manual',
    title: 'Manuel Bricolage',
    category: ItemCategory.BOOKS,
    description: 'Guide pour travaux domestiques',
    icon: 'wrench.and.screwdriver.fill',
    tags: ['bricolage', 'maison', 'réparations', 'manuel']
  },

  // OTHER
  {
    id: 'camping_tent',
    title: 'Tente de Camping',
    category: ItemCategory.OTHER,
    description: 'Tente pour 4 personnes imperméable',
    icon: 'house.fill',
    tags: ['tente', 'camping', 'plein air', 'imperméable']
  },
  {
    id: 'sleeping_bag',
    title: 'Sac de Couchage',
    category: ItemCategory.OTHER,
    description: 'Sac de couchage pour basses températures',
    icon: 'bed.double.fill',
    tags: ['sac', 'couchage', 'dormir', 'camping']
  },
  {
    id: 'cooler',
    title: 'Glacière',
    category: ItemCategory.OTHER,
    description: 'Sac isotherme pour pique-niques et voyages',
    icon: 'snowflake',
    tags: ['glacière', 'isotherme', 'pique-nique', 'voyages']
  },
  {
    id: 'baby_stroller',
    title: 'Poussette',
    category: ItemCategory.OTHER,
    description: 'Poussette pliable pour enfants',
    icon: 'baby.carriage.fill',
    tags: ['poussette', 'enfants', 'pliable', 'famille']
  },
  {
    id: 'high_chair',
    title: 'Chaise Haute',
    category: ItemCategory.OTHER,
    description: 'Chaise haute pour enfants réglable',
    icon: 'chair.fill',
    tags: ['chaise haute', 'enfants', 'repas', 'réglable']
  },
  {
    id: 'party_tent',
    title: 'Tonnelle',
    category: ItemCategory.OTHER,
    description: 'Tonnelle pliable pour fêtes',
    icon: 'house.fill',
    tags: ['tonnelle', 'fêtes', 'jardin', 'ombre']
  },
  {
    id: 'board_games',
    title: 'Jeux de Société',
    category: ItemCategory.OTHER,
    description: 'Collection de jeux de société',
    icon: 'gamecontroller.fill',
    tags: ['jeux', 'société', 'plateau', 'famille']
  },
  {
    id: 'musical_keyboard',
    title: 'Clavier Musical',
    category: ItemCategory.OTHER,
    description: 'Clavier électronique 61 touches',
    icon: 'piano',
    tags: ['clavier', 'musique', 'jouer', 'électronique']
  },
  {
    id: 'guitar',
    title: 'Guitare',
    category: ItemCategory.OTHER,
    description: 'Guitare acoustique pour débutants',
    icon: 'music.note',
    tags: ['guitare', 'acoustique', 'musique', 'débutants']
  },
  {
    id: 'art_easel',
    title: 'Chevalet de Peinture',
    category: ItemCategory.OTHER,
    description: 'Chevalet réglable pour peindre',
    icon: 'paintbrush.fill',
    tags: ['chevalet', 'peinture', 'art', 'peindre']
  }
];