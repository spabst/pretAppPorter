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
  {
    id: 'screwdriver_set',
    title: 'Set Cacciaviti',
    category: ItemCategory.TOOLS,
    description: 'Set completo di cacciaviti varie misure',
    icon: 'wrench.fill',
    tags: ['cacciaviti', 'set', 'viti', 'riparazione']
  },
  {
    id: 'saw',
    title: 'Sega',
    category: ItemCategory.TOOLS,
    description: 'Sega manuale per legno',
    icon: 'scissors',
    tags: ['sega', 'legno', 'taglio']
  },
  {
    id: 'level',
    title: 'Livella',
    category: ItemCategory.TOOLS,
    description: 'Livella a bolla per misurazioni precise',
    icon: 'ruler.fill',
    tags: ['livella', 'misura', 'preciso', 'costruzione']
  },
  {
    id: 'wrench_set',
    title: 'Set Chiavi',
    category: ItemCategory.TOOLS,
    description: 'Set di chiavi inglesi e a tubo',
    icon: 'wrench.fill',
    tags: ['chiavi', 'inglesi', 'meccanica', 'bulloni']
  },
  {
    id: 'pliers',
    title: 'Pinze',
    category: ItemCategory.TOOLS,
    description: 'Pinze universali per elettricista',
    icon: 'wrench.adjustable.fill',
    tags: ['pinze', 'elettricista', 'fili', 'presa']
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
  {
    id: 'garden_hose',
    title: 'Tubo da Giardino',
    category: ItemCategory.GARDEN,
    description: 'Tubo per irrigazione con pistola',
    icon: 'drop.fill',
    tags: ['tubo', 'irrigazione', 'giardino', 'acqua']
  },
  {
    id: 'pruning_shears',
    title: 'Forbici da Potatura',
    category: ItemCategory.GARDEN,
    description: 'Forbici professionali per potare piante',
    icon: 'scissors',
    tags: ['forbici', 'potatura', 'piante', 'giardino']
  },
  {
    id: 'wheelbarrow',
    title: 'Carriola',
    category: ItemCategory.GARDEN,
    description: 'Carriola per trasporto terra e materiali',
    icon: 'cart.fill',
    tags: ['carriola', 'trasporto', 'terra', 'giardino']
  },
  {
    id: 'rake',
    title: 'Rastrello',
    category: ItemCategory.GARDEN,
    description: 'Rastrello per raccogliere foglie',
    icon: 'leaf.fill',
    tags: ['rastrello', 'foglie', 'pulizia', 'giardino']
  },
  {
    id: 'shovel',
    title: 'Vanga',
    category: ItemCategory.GARDEN,
    description: 'Vanga per scavare e piantare',
    icon: 'hand.raised.fill',
    tags: ['vanga', 'scavare', 'piantare', 'terra']
  },

  // KITCHEN
  {
    id: 'stand_mixer',
    title: 'Impastatrice',
    category: ItemCategory.KITCHEN,
    description: 'Robot da cucina con accessori',
    icon: 'fork.knife.circle.fill',
    tags: ['impastatrice', 'robot', 'cucina', 'dolci']
  },
  {
    id: 'food_processor',
    title: 'Tritatutto',
    category: ItemCategory.KITCHEN,
    description: 'Tritatutto elettrico multifunzione',
    icon: 'gear',
    tags: ['tritatutto', 'elettrico', 'verdure', 'cucina']
  },
  {
    id: 'pressure_cooker',
    title: 'Pentola a Pressione',
    category: ItemCategory.KITCHEN,
    description: 'Pentola a pressione per cottura veloce',
    icon: 'flame.fill',
    tags: ['pentola', 'pressione', 'cottura', 'veloce']
  },
  {
    id: 'blender',
    title: 'Frullatore',
    category: ItemCategory.KITCHEN,
    description: 'Frullatore ad immersione',
    icon: 'tornado',
    tags: ['frullatore', 'immersione', 'smoothie', 'zuppe']
  },
  {
    id: 'juicer',
    title: 'Centrifuga',
    category: ItemCategory.KITCHEN,
    description: 'Centrifuga per succhi di frutta',
    icon: 'drop.circle.fill',
    tags: ['centrifuga', 'succhi', 'frutta', 'verdura']
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
  {
    id: 'mountain_bike',
    title: 'Mountain Bike',
    category: ItemCategory.SPORTS,
    description: 'Mountain bike per sentieri e montagna',
    icon: 'bicycle',
    tags: ['mountain bike', 'montagna', 'sentieri', 'offroad']
  },
  {
    id: 'tennis_racket',
    title: 'Racchetta da Tennis',
    category: ItemCategory.SPORTS,
    description: 'Racchetta professionale da tennis',
    icon: 'figure.tennis',
    tags: ['tennis', 'racchetta', 'sport', 'campo']
  },
  {
    id: 'soccer_ball',
    title: 'Pallone da Calcio',
    category: ItemCategory.SPORTS,
    description: 'Pallone ufficiale per partite',
    icon: 'soccerball',
    tags: ['calcio', 'pallone', 'partita', 'sport']
  },
  {
    id: 'skateboard',
    title: 'Skateboard',
    category: ItemCategory.SPORTS,
    description: 'Skateboard completo per principianti',
    icon: 'figure.skating',
    tags: ['skateboard', 'principianti', 'strada', 'giovani']
  },
  {
    id: 'yoga_mat',
    title: 'Tappetino Yoga',
    category: ItemCategory.SPORTS,
    description: 'Tappetino antiscivolo per yoga e pilates',
    icon: 'figure.yoga',
    tags: ['yoga', 'pilates', 'tappetino', 'fitness']
  },

  // ELECTRONICS
  {
    id: 'projector',
    title: 'Proiettore',
    category: ItemCategory.ELECTRONICS,
    description: 'Proiettore Full HD per presentazioni',
    icon: 'tv.fill',
    tags: ['proiettore', 'presentazioni', 'film', 'schermo']
  },
  {
    id: 'speaker_bluetooth',
    title: 'Cassa Bluetooth',
    category: ItemCategory.ELECTRONICS,
    description: 'Altoparlante wireless portatile',
    icon: 'speaker.wave.3.fill',
    tags: ['cassa', 'bluetooth', 'musica', 'portatile']
  },
  {
    id: 'camera_dslr',
    title: 'Fotocamera Reflex',
    category: ItemCategory.ELECTRONICS,
    description: 'Fotocamera digitale con obiettivi',
    icon: 'camera.fill',
    tags: ['fotocamera', 'reflex', 'foto', 'obiettivi']
  },
  {
    id: 'tablet',
    title: 'Tablet',
    category: ItemCategory.ELECTRONICS,
    description: 'Tablet 10 pollici per lavoro e svago',
    icon: 'ipad',
    tags: ['tablet', 'lavoro', 'svago', 'digitale']
  },
  {
    id: 'headphones',
    title: 'Cuffie',
    category: ItemCategory.ELECTRONICS,
    description: 'Cuffie wireless noise-cancelling',
    icon: 'headphones',
    tags: ['cuffie', 'wireless', 'musica', 'noise-cancelling']
  },

  // HOUSEHOLD
  {
    id: 'vacuum_cleaner',
    title: 'Aspirapolvere',
    category: ItemCategory.HOUSEHOLD,
    description: 'Aspirapolvere senza fili ricaricabile',
    icon: 'wind',
    tags: ['aspirapolvere', 'pulizia', 'casa', 'senza fili']
  },
  {
    id: 'iron',
    title: 'Ferro da Stiro',
    category: ItemCategory.HOUSEHOLD,
    description: 'Ferro da stiro a vapore',
    icon: 'flame.fill',
    tags: ['ferro', 'stiro', 'vapore', 'vestiti']
  },
  {
    id: 'sewing_machine',
    title: 'Macchina da Cucire',
    category: ItemCategory.HOUSEHOLD,
    description: 'Macchina da cucire elettrica',
    icon: 'scissors',
    tags: ['cucire', 'macchina', 'vestiti', 'riparazione']
  },
  {
    id: 'carpet_cleaner',
    title: 'Pulitore Tappeti',
    category: ItemCategory.HOUSEHOLD,
    description: 'Macchina per lavaggio tappeti',
    icon: 'shower.fill',
    tags: ['tappeti', 'pulizia', 'lavaggio', 'casa']
  },
  {
    id: 'steamer',
    title: 'Pulitore a Vapore',
    category: ItemCategory.HOUSEHOLD,
    description: 'Pulitore a vapore per pavimenti',
    icon: 'drop.fill',
    tags: ['vapore', 'pavimenti', 'pulizia', 'igiene']
  },

  // AUTOMOTIVE
  {
    id: 'car_jack',
    title: 'Cric Auto',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Cric idraulico per cambiare ruote',
    icon: 'car.fill',
    tags: ['cric', 'auto', 'ruote', 'cambio']
  },
  {
    id: 'jumper_cables',
    title: 'Cavi Batteria',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Cavi per avviamento batteria scarica',
    icon: 'bolt.fill',
    tags: ['cavi', 'batteria', 'avviamento', 'emergenza']
  },
  {
    id: 'tire_pressure_gauge',
    title: 'Manometro Gomme',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Manometro digitale per pressione gomme',
    icon: 'speedometer',
    tags: ['manometro', 'gomme', 'pressione', 'controllo']
  },
  {
    id: 'car_vacuum',
    title: 'Aspirapolvere Auto',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Aspirapolvere portatile per auto',
    icon: 'car.circle.fill',
    tags: ['aspirapolvere', 'auto', 'pulizia', 'portatile']
  },

  // BOOKS
  {
    id: 'cookbook',
    title: 'Libro di Ricette',
    category: ItemCategory.BOOKS,
    description: 'Ricettario della cucina italiana',
    icon: 'book.fill',
    tags: ['ricette', 'cucina', 'italiana', 'cucinare']
  },
  {
    id: 'travel_guide',
    title: 'Guida Turistica',
    category: ItemCategory.BOOKS,
    description: 'Guida di viaggio per destinazioni',
    icon: 'map.fill',
    tags: ['viaggio', 'turismo', 'guida', 'destinazioni']
  },
  {
    id: 'language_book',
    title: 'Libro di Lingue',
    category: ItemCategory.BOOKS,
    description: 'Corso di lingua straniera',
    icon: 'textbook.fill',
    tags: ['lingue', 'corso', 'imparare', 'straniera']
  },
  {
    id: 'diy_manual',
    title: 'Manuale Fai-da-te',
    category: ItemCategory.BOOKS,
    description: 'Guida per lavori domestici',
    icon: 'wrench.and.screwdriver.fill',
    tags: ['fai-da-te', 'casa', 'riparazioni', 'manuale']
  },

  // OTHER
  {
    id: 'camping_tent',
    title: 'Tenda da Campeggio',
    category: ItemCategory.OTHER,
    description: 'Tenda per 4 persone impermeabile',
    icon: 'house.fill',
    tags: ['tenda', 'campeggio', 'outdoor', 'impermeabile']
  },
  {
    id: 'sleeping_bag',
    title: 'Sacco a Pelo',
    category: ItemCategory.OTHER,
    description: 'Sacco a pelo per temperature basse',
    icon: 'bed.double.fill',
    tags: ['sacco', 'pelo', 'dormire', 'campeggio']
  },
  {
    id: 'cooler',
    title: 'Borsa Frigo',
    category: ItemCategory.OTHER,
    description: 'Borsa termica per picnic e viaggi',
    icon: 'snowflake',
    tags: ['borsa', 'frigo', 'picnic', 'viaggi']
  },
  {
    id: 'baby_stroller',
    title: 'Passeggino',
    category: ItemCategory.OTHER,
    description: 'Passeggino pieghevole per bambini',
    icon: 'baby.carriage.fill',
    tags: ['passeggino', 'bambini', 'pieghevole', 'famiglia']
  },
  {
    id: 'high_chair',
    title: 'Seggiolone',
    category: ItemCategory.OTHER,
    description: 'Seggiolone per bambini regolabile',
    icon: 'chair.fill',
    tags: ['seggiolone', 'bambini', 'pappa', 'regolabile']
  },
  {
    id: 'party_tent',
    title: 'Gazebo',
    category: ItemCategory.OTHER,
    description: 'Gazebo pieghevole per feste',
    icon: 'house.fill',
    tags: ['gazebo', 'feste', 'giardino', 'ombra']
  },
  {
    id: 'board_games',
    title: 'Giochi da Tavolo',
    category: ItemCategory.OTHER,
    description: 'Collezione di giochi di società',
    icon: 'gamecontroller.fill',
    tags: ['giochi', 'tavolo', 'società', 'famiglia']
  },
  {
    id: 'musical_keyboard',
    title: 'Tastiera Musicale',
    category: ItemCategory.OTHER,
    description: 'Tastiera elettronica 61 tasti',
    icon: 'piano',
    tags: ['tastiera', 'musica', 'suonare', 'elettronica']
  },
  {
    id: 'guitar',
    title: 'Chitarra',
    category: ItemCategory.OTHER,
    description: 'Chitarra acustica per principianti',
    icon: 'music.note',
    tags: ['chitarra', 'acustica', 'musica', 'principianti']
  },
  {
    id: 'art_easel',
    title: 'Cavalletto da Pittura',
    category: ItemCategory.OTHER,
    description: 'Cavalletto regolabile per dipingere',
    icon: 'paintbrush.fill',
    tags: ['cavalletto', 'pittura', 'arte', 'dipingere']
  }
];