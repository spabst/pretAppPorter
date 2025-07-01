import { ItemCategory, ItemCondition } from '@/types';

export interface PredefinedItem {
  id: string;
  title: string;
  titleFr: string;
  category: ItemCategory;
  description: string;
  descriptionFr: string;
  icon: string;
  tags: string[];
  tagsFr: string[];
}

export const predefinedItems: PredefinedItem[] = [
  // TOOLS
  {
    id: 'drill',
    title: 'Trapano',
    titleFr: 'Perceuse',
    category: ItemCategory.TOOLS,
    description: 'Trapano elettrico per fori e avvitatura',
    descriptionFr: 'Perceuse électrique pour perçage et vissage',
    icon: 'wrench.and.screwdriver.fill',
    tags: ['trapano', 'utensile', 'elettrico', 'fori'],
    tagsFr: ['perceuse', 'outil', 'électrique', 'trous']
  },
  {
    id: 'ladder',
    title: 'Scala',
    titleFr: 'Échelle',
    category: ItemCategory.TOOLS,
    description: 'Scala pieghevole in alluminio',
    descriptionFr: 'Échelle pliante en aluminium',
    icon: 'stairs',
    tags: ['scala', 'alluminio', 'altezza', 'lavori'],
    tagsFr: ['échelle', 'aluminium', 'hauteur', 'travaux']
  },
  {
    id: 'hammer',
    title: 'Martello',
    titleFr: 'Marteau',
    category: ItemCategory.TOOLS,
    description: 'Martello da carpentiere',
    descriptionFr: 'Marteau de charpentier',
    icon: 'hammer.fill',
    tags: ['martello', 'chiodi', 'carpentiere'],
    tagsFr: ['marteau', 'clous', 'charpentier']
  },
  {
    id: 'screwdriver_set',
    title: 'Set Cacciaviti',
    titleFr: 'Jeu de Tournevis',
    category: ItemCategory.TOOLS,
    description: 'Set completo di cacciaviti varie misure',
    descriptionFr: 'Jeu complet de tournevis de différentes tailles',
    icon: 'wrench.fill',
    tags: ['cacciaviti', 'set', 'viti', 'riparazione'],
    tagsFr: ['tournevis', 'jeu', 'vis', 'réparation']
  },
  {
    id: 'saw',
    title: 'Sega',
    titleFr: 'Scie',
    category: ItemCategory.TOOLS,
    description: 'Sega manuale per legno',
    descriptionFr: 'Scie manuelle pour bois',
    icon: 'scissors',
    tags: ['sega', 'legno', 'taglio'],
    tagsFr: ['scie', 'bois', 'coupe']
  },
  {
    id: 'level',
    title: 'Livella',
    titleFr: 'Niveau à Bulle',
    category: ItemCategory.TOOLS,
    description: 'Livella a bolla per misurazioni precise',
    descriptionFr: 'Niveau à bulle pour mesures précises',
    icon: 'ruler.fill',
    tags: ['livella', 'misura', 'preciso', 'costruzione'],
    tagsFr: ['niveau', 'mesure', 'précis', 'construction']
  },
  {
    id: 'wrench_set',
    title: 'Set Chiavi',
    titleFr: 'Jeu de Clés',
    category: ItemCategory.TOOLS,
    description: 'Set di chiavi inglesi e a tubo',
    descriptionFr: 'Jeu de clés anglaises et à tube',
    icon: 'wrench.fill',
    tags: ['chiavi', 'inglesi', 'meccanica', 'bulloni'],
    tagsFr: ['clés', 'anglaises', 'mécanique', 'boulons']
  },
  {
    id: 'pliers',
    title: 'Pinze',
    titleFr: 'Pinces',
    category: ItemCategory.TOOLS,
    description: 'Pinze universali per elettricista',
    descriptionFr: 'Pinces universelles pour électricien',
    icon: 'wrench.adjustable.fill',
    tags: ['pinze', 'elettricista', 'fili', 'presa'],
    tagsFr: ['pinces', 'électricien', 'fils', 'prise']
  },

  // GARDEN
  {
    id: 'lawnmower',
    title: 'Tosaerba',
    titleFr: 'Tondeuse',
    category: ItemCategory.GARDEN,
    description: 'Tosaerba elettrico per giardino',
    descriptionFr: 'Tondeuse électrique pour jardin',
    icon: 'leaf.fill',
    tags: ['tosaerba', 'elettrico', 'giardino', 'erba'],
    tagsFr: ['tondeuse', 'électrique', 'jardin', 'herbe']
  },
  {
    id: 'garden_hose',
    title: 'Tubo da Giardino',
    titleFr: 'Tuyau d\'Arrosage',
    category: ItemCategory.GARDEN,
    description: 'Tubo per irrigazione con pistola',
    descriptionFr: 'Tuyau d\'arrosage avec pistolet',
    icon: 'drop.fill',
    tags: ['tubo', 'irrigazione', 'giardino', 'acqua'],
    tagsFr: ['tuyau', 'arrosage', 'jardin', 'eau']
  },
  {
    id: 'pruning_shears',
    title: 'Forbici da Potatura',
    titleFr: 'Sécateur',
    category: ItemCategory.GARDEN,
    description: 'Forbici professionali per potare piante',
    descriptionFr: 'Sécateur professionnel pour tailler les plantes',
    icon: 'scissors',
    tags: ['forbici', 'potatura', 'piante', 'giardino'],
    tagsFr: ['sécateur', 'taille', 'plantes', 'jardin']
  },
  {
    id: 'wheelbarrow',
    title: 'Carriola',
    titleFr: 'Brouette',
    category: ItemCategory.GARDEN,
    description: 'Carriola per trasporto terra e materiali',
    descriptionFr: 'Brouette pour transporter terre et matériaux',
    icon: 'cart.fill',
    tags: ['carriola', 'trasporto', 'terra', 'giardino'],
    tagsFr: ['brouette', 'transport', 'terre', 'jardin']
  },
  {
    id: 'rake',
    title: 'Rastrello',
    titleFr: 'Râteau',
    category: ItemCategory.GARDEN,
    description: 'Rastrello per raccogliere foglie',
    descriptionFr: 'Râteau pour ramasser les feuilles',
    icon: 'leaf.fill',
    tags: ['rastrello', 'foglie', 'pulizia', 'giardino'],
    tagsFr: ['râteau', 'feuilles', 'nettoyage', 'jardin']
  },
  {
    id: 'shovel',
    title: 'Vanga',
    titleFr: 'Bêche',
    category: ItemCategory.GARDEN,
    description: 'Vanga per scavare e piantare',
    descriptionFr: 'Bêche pour creuser et planter',
    icon: 'hand.raised.fill',
    tags: ['vanga', 'scavare', 'piantare', 'terra'],
    tagsFr: ['bêche', 'creuser', 'planter', 'terre']
  },

  // KITCHEN
  {
    id: 'stand_mixer',
    title: 'Impastatrice',
    titleFr: 'Robot Pâtissier',
    category: ItemCategory.KITCHEN,
    description: 'Robot da cucina con accessori',
    descriptionFr: 'Robot de cuisine avec accessoires',
    icon: 'fork.knife.circle.fill',
    tags: ['impastatrice', 'robot', 'cucina', 'dolci'],
    tagsFr: ['robot', 'pâtissier', 'cuisine', 'gâteaux']
  },
  {
    id: 'food_processor',
    title: 'Tritatutto',
    titleFr: 'Robot Ménager',
    category: ItemCategory.KITCHEN,
    description: 'Tritatutto elettrico multifunzione',
    descriptionFr: 'Robot ménager électrique multifonction',
    icon: 'gear',
    tags: ['tritatutto', 'elettrico', 'verdure', 'cucina'],
    tagsFr: ['robot', 'électrique', 'légumes', 'cuisine']
  },
  {
    id: 'pressure_cooker',
    title: 'Pentola a Pressione',
    titleFr: 'Autocuiseur',
    category: ItemCategory.KITCHEN,
    description: 'Pentola a pressione per cottura veloce',
    descriptionFr: 'Autocuiseur pour cuisson rapide',
    icon: 'flame.fill',
    tags: ['pentola', 'pressione', 'cottura', 'veloce'],
    tagsFr: ['autocuiseur', 'pression', 'cuisson', 'rapide']
  },
  {
    id: 'blender',
    title: 'Frullatore',
    titleFr: 'Mixeur Plongeant',
    category: ItemCategory.KITCHEN,
    description: 'Frullatore ad immersione',
    descriptionFr: 'Mixeur plongeant',
    icon: 'tornado',
    tags: ['frullatore', 'immersione', 'smoothie', 'zuppe'],
    tagsFr: ['mixeur', 'plongeant', 'smoothie', 'soupes']
  },
  {
    id: 'juicer',
    title: 'Centrifuga',
    titleFr: 'Centrifugeuse',
    category: ItemCategory.KITCHEN,
    description: 'Centrifuga per succhi di frutta',
    descriptionFr: 'Centrifugeuse pour jus de fruits',
    icon: 'drop.circle.fill',
    tags: ['centrifuga', 'succhi', 'frutta', 'verdura'],
    tagsFr: ['centrifugeuse', 'jus', 'fruits', 'légumes']
  },

  // SPORTS
  {
    id: 'bicycle',
    title: 'Bicicletta',
    titleFr: 'Vélo',
    category: ItemCategory.SPORTS,
    description: 'Bicicletta da città per adulti',
    descriptionFr: 'Vélo de ville pour adultes',
    icon: 'bicycle',
    tags: ['bicicletta', 'città', 'trasporto', 'sport'],
    tagsFr: ['vélo', 'ville', 'transport', 'sport']
  },
  {
    id: 'mountain_bike',
    title: 'Mountain Bike',
    titleFr: 'VTT',
    category: ItemCategory.SPORTS,
    description: 'Mountain bike per sentieri e montagna',
    descriptionFr: 'VTT pour sentiers et montagne',
    icon: 'bicycle',
    tags: ['mountain bike', 'montagna', 'sentieri', 'offroad'],
    tagsFr: ['VTT', 'montagne', 'sentiers', 'tout-terrain']
  },
  {
    id: 'tennis_racket',
    title: 'Racchetta da Tennis',
    titleFr: 'Raquette de Tennis',
    category: ItemCategory.SPORTS,
    description: 'Racchetta professionale da tennis',
    descriptionFr: 'Raquette de tennis professionnelle',
    icon: 'figure.tennis',
    tags: ['tennis', 'racchetta', 'sport', 'campo'],
    tagsFr: ['tennis', 'raquette', 'sport', 'court']
  },
  {
    id: 'soccer_ball',
    title: 'Pallone da Calcio',
    titleFr: 'Ballon de Football',
    category: ItemCategory.SPORTS,
    description: 'Pallone ufficiale per partite',
    descriptionFr: 'Ballon officiel pour matchs',
    icon: 'soccerball',
    tags: ['calcio', 'pallone', 'partita', 'sport'],
    tagsFr: ['football', 'ballon', 'match', 'sport']
  },
  {
    id: 'skateboard',
    title: 'Skateboard',
    titleFr: 'Planche à Roulettes',
    category: ItemCategory.SPORTS,
    description: 'Skateboard completo per principianti',
    descriptionFr: 'Planche à roulettes complète pour débutants',
    icon: 'figure.skating',
    tags: ['skateboard', 'principianti', 'strada', 'giovani'],
    tagsFr: ['skateboard', 'débutants', 'rue', 'jeunes']
  },
  {
    id: 'yoga_mat',
    title: 'Tappetino Yoga',
    titleFr: 'Tapis de Yoga',
    category: ItemCategory.SPORTS,
    description: 'Tappetino antiscivolo per yoga e pilates',
    descriptionFr: 'Tapis antidérapant pour yoga et pilates',
    icon: 'figure.yoga',
    tags: ['yoga', 'pilates', 'tappetino', 'fitness'],
    tagsFr: ['yoga', 'pilates', 'tapis', 'fitness']
  },

  // ELECTRONICS
  {
    id: 'projector',
    title: 'Proiettore',
    titleFr: 'Projecteur',
    category: ItemCategory.ELECTRONICS,
    description: 'Proiettore Full HD per presentazioni',
    descriptionFr: 'Projecteur Full HD pour présentations',
    icon: 'tv.fill',
    tags: ['proiettore', 'presentazioni', 'film', 'schermo'],
    tagsFr: ['projecteur', 'présentations', 'films', 'écran']
  },
  {
    id: 'speaker_bluetooth',
    title: 'Cassa Bluetooth',
    titleFr: 'Enceinte Bluetooth',
    category: ItemCategory.ELECTRONICS,
    description: 'Altoparlante wireless portatile',
    descriptionFr: 'Haut-parleur sans fil portable',
    icon: 'speaker.wave.3.fill',
    tags: ['cassa', 'bluetooth', 'musica', 'portatile'],
    tagsFr: ['enceinte', 'bluetooth', 'musique', 'portable']
  },
  {
    id: 'camera_dslr',
    title: 'Fotocamera Reflex',
    titleFr: 'Appareil Photo Reflex',
    category: ItemCategory.ELECTRONICS,
    description: 'Fotocamera digitale con obiettivi',
    descriptionFr: 'Appareil photo numérique avec objectifs',
    icon: 'camera.fill',
    tags: ['fotocamera', 'reflex', 'foto', 'obiettivi'],
    tagsFr: ['appareil photo', 'reflex', 'photos', 'objectifs']
  },
  {
    id: 'tablet',
    title: 'Tablet',
    titleFr: 'Tablette',
    category: ItemCategory.ELECTRONICS,
    description: 'Tablet 10 pollici per lavoro e svago',
    descriptionFr: 'Tablette 10 pouces pour travail et loisirs',
    icon: 'ipad',
    tags: ['tablet', 'lavoro', 'svago', 'digitale'],
    tagsFr: ['tablette', 'travail', 'loisirs', 'numérique']
  },
  {
    id: 'headphones',
    title: 'Cuffie',
    titleFr: 'Casque Audio',
    category: ItemCategory.ELECTRONICS,
    description: 'Cuffie wireless noise-cancelling',
    descriptionFr: 'Casque sans fil à réduction de bruit',
    icon: 'headphones',
    tags: ['cuffie', 'wireless', 'musica', 'noise-cancelling'],
    tagsFr: ['casque', 'sans fil', 'musique', 'réduction bruit']
  },

  // HOUSEHOLD
  {
    id: 'vacuum_cleaner',
    title: 'Aspirapolvere',
    titleFr: 'Aspirateur',
    category: ItemCategory.HOUSEHOLD,
    description: 'Aspirapolvere senza fili ricaricabile',
    descriptionFr: 'Aspirateur sans fil rechargeable',
    icon: 'wind',
    tags: ['aspirapolvere', 'pulizia', 'casa', 'senza fili'],
    tagsFr: ['aspirateur', 'nettoyage', 'maison', 'sans fil']
  },
  {
    id: 'iron',
    title: 'Ferro da Stiro',
    titleFr: 'Fer à Repasser',
    category: ItemCategory.HOUSEHOLD,
    description: 'Ferro da stiro a vapore',
    descriptionFr: 'Fer à repasser à vapeur',
    icon: 'flame.fill',
    tags: ['ferro', 'stiro', 'vapore', 'vestiti'],
    tagsFr: ['fer', 'repassage', 'vapeur', 'vêtements']
  },
  {
    id: 'sewing_machine',
    title: 'Macchina da Cucire',
    titleFr: 'Machine à Coudre',
    category: ItemCategory.HOUSEHOLD,
    description: 'Macchina da cucire elettrica',
    descriptionFr: 'Machine à coudre électrique',
    icon: 'scissors',
    tags: ['cucire', 'macchina', 'vestiti', 'riparazione'],
    tagsFr: ['coudre', 'machine', 'vêtements', 'réparation']
  },
  {
    id: 'carpet_cleaner',
    title: 'Pulitore Tappeti',
    titleFr: 'Nettoyeur de Tapis',
    category: ItemCategory.HOUSEHOLD,
    description: 'Macchina per lavaggio tappeti',
    descriptionFr: 'Machine pour nettoyer les tapis',
    icon: 'shower.fill',
    tags: ['tappeti', 'pulizia', 'lavaggio', 'casa'],
    tagsFr: ['tapis', 'nettoyage', 'lavage', 'maison']
  },
  {
    id: 'steamer',
    title: 'Pulitore a Vapore',
    titleFr: 'Nettoyeur Vapeur',
    category: ItemCategory.HOUSEHOLD,
    description: 'Pulitore a vapore per pavimenti',
    descriptionFr: 'Nettoyeur vapeur pour sols',
    icon: 'drop.fill',
    tags: ['vapore', 'pavimenti', 'pulizia', 'igiene'],
    tagsFr: ['vapeur', 'sols', 'nettoyage', 'hygiène']
  },

  // AUTOMOTIVE
  {
    id: 'car_jack',
    title: 'Cric Auto',
    titleFr: 'Cric Hydraulique',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Cric idraulico per cambiare ruote',
    descriptionFr: 'Cric hydraulique pour changer les roues',
    icon: 'car.fill',
    tags: ['cric', 'auto', 'ruote', 'cambio'],
    tagsFr: ['cric', 'voiture', 'roues', 'changement']
  },
  {
    id: 'jumper_cables',
    title: 'Cavi Batteria',
    titleFr: 'Câbles de Démarrage',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Cavi per avviamento batteria scarica',
    descriptionFr: 'Câbles pour démarrer batterie déchargée',
    icon: 'bolt.fill',
    tags: ['cavi', 'batteria', 'avviamento', 'emergenza'],
    tagsFr: ['câbles', 'batterie', 'démarrage', 'urgence']
  },
  {
    id: 'tire_pressure_gauge',
    title: 'Manometro Gomme',
    titleFr: 'Manomètre Pneus',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Manometro digitale per pressione gomme',
    descriptionFr: 'Manomètre numérique pour pression pneus',
    icon: 'speedometer',
    tags: ['manometro', 'gomme', 'pressione', 'controllo'],
    tagsFr: ['manomètre', 'pneus', 'pression', 'contrôle']
  },
  {
    id: 'car_vacuum',
    title: 'Aspirapolvere Auto',
    titleFr: 'Aspirateur Voiture',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Aspirapolvere portatile per auto',
    descriptionFr: 'Aspirateur portable pour voiture',
    icon: 'car.circle.fill',
    tags: ['aspirapolvere', 'auto', 'pulizia', 'portatile'],
    tagsFr: ['aspirateur', 'voiture', 'nettoyage', 'portable']
  },

  // BOOKS
  {
    id: 'cookbook',
    title: 'Libro di Ricette',
    titleFr: 'Livre de Recettes',
    category: ItemCategory.BOOKS,
    description: 'Ricettario della cucina italiana',
    descriptionFr: 'Livre de recettes de cuisine italienne',
    icon: 'book.fill',
    tags: ['ricette', 'cucina', 'italiana', 'cucinare'],
    tagsFr: ['recettes', 'cuisine', 'italienne', 'cuisiner']
  },
  {
    id: 'travel_guide',
    title: 'Guida Turistica',
    titleFr: 'Guide Touristique',
    category: ItemCategory.BOOKS,
    description: 'Guida di viaggio per destinazioni',
    descriptionFr: 'Guide de voyage pour destinations',
    icon: 'map.fill',
    tags: ['viaggio', 'turismo', 'guida', 'destinazioni'],
    tagsFr: ['voyage', 'tourisme', 'guide', 'destinations']
  },
  {
    id: 'language_book',
    title: 'Libro di Lingue',
    titleFr: 'Manuel de Langues',
    category: ItemCategory.BOOKS,
    description: 'Corso di lingua straniera',
    descriptionFr: 'Cours de langue étrangère',
    icon: 'textbook.fill',
    tags: ['lingue', 'corso', 'imparare', 'straniera'],
    tagsFr: ['langues', 'cours', 'apprendre', 'étrangère']
  },
  {
    id: 'diy_manual',
    title: 'Manuale Fai-da-te',
    titleFr: 'Manuel Bricolage',
    category: ItemCategory.BOOKS,
    description: 'Guida per lavori domestici',
    descriptionFr: 'Guide pour travaux domestiques',
    icon: 'wrench.and.screwdriver.fill',
    tags: ['fai-da-te', 'casa', 'riparazioni', 'manuale'],
    tagsFr: ['bricolage', 'maison', 'réparations', 'manuel']
  },

  // OTHER
  {
    id: 'camping_tent',
    title: 'Tenda da Campeggio',
    titleFr: 'Tente de Camping',
    category: ItemCategory.OTHER,
    description: 'Tenda per 4 persone impermeabile',
    descriptionFr: 'Tente pour 4 personnes imperméable',
    icon: 'house.fill',
    tags: ['tenda', 'campeggio', 'outdoor', 'impermeabile'],
    tagsFr: ['tente', 'camping', 'plein air', 'imperméable']
  },
  {
    id: 'sleeping_bag',
    title: 'Sacco a Pelo',
    titleFr: 'Sac de Couchage',
    category: ItemCategory.OTHER,
    description: 'Sacco a pelo per temperature basse',
    descriptionFr: 'Sac de couchage pour basses températures',
    icon: 'bed.double.fill',
    tags: ['sacco', 'pelo', 'dormire', 'campeggio'],
    tagsFr: ['sac', 'couchage', 'dormir', 'camping']
  },
  {
    id: 'cooler',
    title: 'Borsa Frigo',
    titleFr: 'Glacière',
    category: ItemCategory.OTHER,
    description: 'Borsa termica per picnic e viaggi',
    descriptionFr: 'Sac isotherme pour pique-niques et voyages',
    icon: 'snowflake',
    tags: ['borsa', 'frigo', 'picnic', 'viaggi'],
    tagsFr: ['glacière', 'isotherme', 'pique-nique', 'voyages']
  },
  {
    id: 'baby_stroller',
    title: 'Passeggino',
    titleFr: 'Poussette',
    category: ItemCategory.OTHER,
    description: 'Passeggino pieghevole per bambini',
    descriptionFr: 'Poussette pliable pour enfants',
    icon: 'baby.carriage.fill',
    tags: ['passeggino', 'bambini', 'pieghevole', 'famiglia'],
    tagsFr: ['poussette', 'enfants', 'pliable', 'famille']
  },
  {
    id: 'high_chair',
    title: 'Seggiolone',
    titleFr: 'Chaise Haute',
    category: ItemCategory.OTHER,
    description: 'Seggiolone per bambini regolabile',
    descriptionFr: 'Chaise haute pour enfants réglable',
    icon: 'chair.fill',
    tags: ['seggiolone', 'bambini', 'pappa', 'regolabile'],
    tagsFr: ['chaise haute', 'enfants', 'repas', 'réglable']
  },
  {
    id: 'party_tent',
    title: 'Gazebo',
    titleFr: 'Tonnelle',
    category: ItemCategory.OTHER,
    description: 'Gazebo pieghevole per feste',
    descriptionFr: 'Tonnelle pliable pour fêtes',
    icon: 'house.fill',
    tags: ['gazebo', 'feste', 'giardino', 'ombra'],
    tagsFr: ['tonnelle', 'fêtes', 'jardin', 'ombre']
  },
  {
    id: 'board_games',
    title: 'Giochi da Tavolo',
    titleFr: 'Jeux de Société',
    category: ItemCategory.OTHER,
    description: 'Collezione di giochi di società',
    descriptionFr: 'Collection de jeux de société',
    icon: 'gamecontroller.fill',
    tags: ['giochi', 'tavolo', 'società', 'famiglia'],
    tagsFr: ['jeux', 'société', 'plateau', 'famille']
  },
  {
    id: 'musical_keyboard',
    title: 'Tastiera Musicale',
    titleFr: 'Clavier Musical',
    category: ItemCategory.OTHER,
    description: 'Tastiera elettronica 61 tasti',
    descriptionFr: 'Clavier électronique 61 touches',
    icon: 'piano',
    tags: ['tastiera', 'musica', 'suonare', 'elettronica'],
    tagsFr: ['clavier', 'musique', 'jouer', 'électronique']
  },
  {
    id: 'guitar',
    title: 'Chitarra',
    titleFr: 'Guitare',
    category: ItemCategory.OTHER,
    description: 'Chitarra acustica per principianti',
    descriptionFr: 'Guitare acoustique pour débutants',
    icon: 'music.note',
    tags: ['chitarra', 'acustica', 'musica', 'principianti'],
    tagsFr: ['guitare', 'acoustique', 'musique', 'débutants']
  },
  {
    id: 'art_easel',
    title: 'Cavalletto da Pittura',
    titleFr: 'Chevalet de Peinture',
    category: ItemCategory.OTHER,
    description: 'Cavalletto regolabile per dipingere',
    descriptionFr: 'Chevalet réglable pour peindre',
    icon: 'paintbrush.fill',
    tags: ['cavalletto', 'pittura', 'arte', 'dipingere'],
    tagsFr: ['chevalet', 'peinture', 'art', 'peindre']
  }
];

export interface LocalizedItem {
  id: string;
  title: string;
  category: ItemCategory;
  description: string;
  icon: string;
  tags: string[];
}

export const getLocalizedItems = (language: 'it' | 'fr' | 'en' | 'de' | 'es' = 'it'): LocalizedItem[] => {
  return predefinedItems.map(item => ({
    id: item.id,
    title: language === 'fr' ? (item.titleFr || item.title) : item.title,
    category: item.category,
    description: language === 'fr' ? (item.descriptionFr || item.description) : item.description,
    icon: item.icon,
    tags: language === 'fr' ? (item.tagsFr || item.tags) : item.tags
  }));
};

export const getItemsByCategory = (category: ItemCategory, language: 'it' | 'fr' | 'en' | 'de' | 'es' = 'it'): LocalizedItem[] => {
  return getLocalizedItems(language).filter(item => item.category === category);
};

export const searchPredefinedItems = (query: string, language: 'it' | 'fr' | 'en' | 'de' | 'es' = 'it'): LocalizedItem[] => {
  const searchTerm = query.toLowerCase();
  const items = getLocalizedItems(language);
  
  return items.filter(item => 
    item.title.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};