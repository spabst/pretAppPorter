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
  {
    id: 'screwdriver_set',
    title: 'Schraubendreher-Set',
    category: ItemCategory.TOOLS,
    description: 'Komplettes Set von Schraubendrehern verschiedener Größen',
    icon: 'wrench.fill',
    tags: ['schraubendreher', 'set', 'schrauben', 'reparatur']
  },
  {
    id: 'saw',
    title: 'Säge',
    category: ItemCategory.TOOLS,
    description: 'Handsäge für Holz',
    icon: 'scissors',
    tags: ['säge', 'holz', 'schneiden']
  },
  {
    id: 'level',
    title: 'Wasserwaage',
    category: ItemCategory.TOOLS,
    description: 'Wasserwaage für präzise Messungen',
    icon: 'ruler.fill',
    tags: ['wasserwaage', 'messen', 'präzise', 'bau']
  },
  {
    id: 'wrench_set',
    title: 'Schraubenschlüssel-Set',
    category: ItemCategory.TOOLS,
    description: 'Set von Schraubenschlüsseln und Steckschlüsseln',
    icon: 'wrench.fill',
    tags: ['schraubenschlüssel', 'steckschlüssel', 'mechanik', 'schrauben']
  },
  {
    id: 'pliers',
    title: 'Zange',
    category: ItemCategory.TOOLS,
    description: 'Universalzange für Elektriker',
    icon: 'wrench.adjustable.fill',
    tags: ['zange', 'elektriker', 'drähte', 'griff']
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
  {
    id: 'garden_hose',
    title: 'Gartenschlauch',
    category: ItemCategory.GARDEN,
    description: 'Bewässerungsschlauch mit Spritzpistole',
    icon: 'drop.fill',
    tags: ['schlauch', 'bewässerung', 'garten', 'wasser']
  },
  {
    id: 'pruning_shears',
    title: 'Gartenschere',
    category: ItemCategory.GARDEN,
    description: 'Professionelle Schere zum Beschneiden von Pflanzen',
    icon: 'scissors',
    tags: ['gartenschere', 'beschneiden', 'pflanzen', 'garten']
  },
  {
    id: 'wheelbarrow',
    title: 'Schubkarre',
    category: ItemCategory.GARDEN,
    description: 'Schubkarre zum Transport von Erde und Materialien',
    icon: 'cart.fill',
    tags: ['schubkarre', 'transport', 'erde', 'garten']
  },
  {
    id: 'rake',
    title: 'Rechen',
    category: ItemCategory.GARDEN,
    description: 'Rechen zum Sammeln von Blättern',
    icon: 'leaf.fill',
    tags: ['rechen', 'blätter', 'reinigung', 'garten']
  },
  {
    id: 'shovel',
    title: 'Spaten',
    category: ItemCategory.GARDEN,
    description: 'Spaten zum Graben und Pflanzen',
    icon: 'hand.raised.fill',
    tags: ['spaten', 'graben', 'pflanzen', 'erde']
  },

  // KITCHEN
  {
    id: 'stand_mixer',
    title: 'Küchenmaschine',
    category: ItemCategory.KITCHEN,
    description: 'Küchenroboter mit Zubehör',
    icon: 'fork.knife.circle.fill',
    tags: ['küchenmaschine', 'roboter', 'küche', 'backen']
  },
  {
    id: 'food_processor',
    title: 'Zerkleinerer',
    category: ItemCategory.KITCHEN,
    description: 'Elektrischer Multifunktions-Zerkleinerer',
    icon: 'gear',
    tags: ['zerkleinerer', 'elektrisch', 'gemüse', 'küche']
  },
  {
    id: 'pressure_cooker',
    title: 'Schnellkochtopf',
    category: ItemCategory.KITCHEN,
    description: 'Schnellkochtopf für schnelles Kochen',
    icon: 'flame.fill',
    tags: ['schnellkochtopf', 'druck', 'kochen', 'schnell']
  },
  {
    id: 'blender',
    title: 'Stabmixer',
    category: ItemCategory.KITCHEN,
    description: 'Stabmixer',
    icon: 'tornado',
    tags: ['stabmixer', 'smoothie', 'suppen']
  },
  {
    id: 'juicer',
    title: 'Entsafter',
    category: ItemCategory.KITCHEN,
    description: 'Zentrifugal-Entsafter für Fruchtsäfte',
    icon: 'drop.circle.fill',
    tags: ['entsafter', 'säfte', 'obst', 'gemüse']
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
  {
    id: 'mountain_bike',
    title: 'Mountainbike',
    category: ItemCategory.SPORTS,
    description: 'Mountainbike für Trails und Berge',
    icon: 'bicycle',
    tags: ['mountainbike', 'berg', 'trails', 'offroad']
  },
  {
    id: 'tennis_racket',
    title: 'Tennisschläger',
    category: ItemCategory.SPORTS,
    description: 'Professioneller Tennisschläger',
    icon: 'figure.tennis',
    tags: ['tennis', 'schläger', 'sport', 'platz']
  },
  {
    id: 'soccer_ball',
    title: 'Fußball',
    category: ItemCategory.SPORTS,
    description: 'Offizieller Ball für Spiele',
    icon: 'soccerball',
    tags: ['fußball', 'ball', 'spiel', 'sport']
  },
  {
    id: 'skateboard',
    title: 'Skateboard',
    category: ItemCategory.SPORTS,
    description: 'Komplettes Skateboard für Anfänger',
    icon: 'figure.skating',
    tags: ['skateboard', 'anfänger', 'straße', 'jugend']
  },
  {
    id: 'yoga_mat',
    title: 'Yogamatte',
    category: ItemCategory.SPORTS,
    description: 'Rutschfeste Matte für Yoga und Pilates',
    icon: 'figure.yoga',
    tags: ['yoga', 'pilates', 'matte', 'fitness']
  },

  // ELECTRONICS
  {
    id: 'projector',
    title: 'Projektor',
    category: ItemCategory.ELECTRONICS,
    description: 'Full-HD-Projektor für Präsentationen',
    icon: 'tv.fill',
    tags: ['projektor', 'präsentationen', 'filme', 'bildschirm']
  },
  {
    id: 'speaker_bluetooth',
    title: 'Bluetooth-Lautsprecher',
    category: ItemCategory.ELECTRONICS,
    description: 'Tragbarer drahtloser Lautsprecher',
    icon: 'speaker.wave.3.fill',
    tags: ['lautsprecher', 'bluetooth', 'musik', 'tragbar']
  },
  {
    id: 'camera_dslr',
    title: 'Spiegelreflexkamera',
    category: ItemCategory.ELECTRONICS,
    description: 'Digitalkamera mit Objektiven',
    icon: 'camera.fill',
    tags: ['kamera', 'spiegelreflex', 'fotos', 'objektive']
  },
  {
    id: 'tablet',
    title: 'Tablet',
    category: ItemCategory.ELECTRONICS,
    description: '10-Zoll-Tablet für Arbeit und Freizeit',
    icon: 'ipad',
    tags: ['tablet', 'arbeit', 'freizeit', 'digital']
  },
  {
    id: 'headphones',
    title: 'Kopfhörer',
    category: ItemCategory.ELECTRONICS,
    description: 'Drahtlose Kopfhörer mit Geräuschunterdrückung',
    icon: 'headphones',
    tags: ['kopfhörer', 'drahtlos', 'musik', 'geräuschunterdrückung']
  },

  // HOUSEHOLD
  {
    id: 'vacuum_cleaner',
    title: 'Staubsauger',
    category: ItemCategory.HOUSEHOLD,
    description: 'Kabelloser wiederaufladbarer Staubsauger',
    icon: 'wind',
    tags: ['staubsauger', 'reinigung', 'haus', 'kabellos']
  },
  {
    id: 'iron',
    title: 'Bügeleisen',
    category: ItemCategory.HOUSEHOLD,
    description: 'Dampfbügeleisen',
    icon: 'flame.fill',
    tags: ['bügeleisen', 'bügeln', 'dampf', 'kleidung']
  },
  {
    id: 'sewing_machine',
    title: 'Nähmaschine',
    category: ItemCategory.HOUSEHOLD,
    description: 'Elektrische Nähmaschine',
    icon: 'scissors',
    tags: ['nähen', 'maschine', 'kleidung', 'reparatur']
  },
  {
    id: 'carpet_cleaner',
    title: 'Teppichreiniger',
    category: ItemCategory.HOUSEHOLD,
    description: 'Maschine zum Waschen von Teppichen',
    icon: 'shower.fill',
    tags: ['teppiche', 'reinigung', 'waschen', 'haus']
  },
  {
    id: 'steamer',
    title: 'Dampfreiniger',
    category: ItemCategory.HOUSEHOLD,
    description: 'Dampfreiniger für Böden',
    icon: 'drop.fill',
    tags: ['dampf', 'böden', 'reinigung', 'hygiene']
  },

  // AUTOMOTIVE
  {
    id: 'car_jack',
    title: 'Wagenheber',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Hydraulischer Wagenheber zum Radwechsel',
    icon: 'car.fill',
    tags: ['wagenheber', 'auto', 'räder', 'wechsel']
  },
  {
    id: 'jumper_cables',
    title: 'Starthilfekabel',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Kabel zum Starten einer leeren Batterie',
    icon: 'bolt.fill',
    tags: ['kabel', 'batterie', 'starthilfe', 'notfall']
  },
  {
    id: 'tire_pressure_gauge',
    title: 'Reifendruckmesser',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Digitaler Messer für Reifendruck',
    icon: 'speedometer',
    tags: ['reifendruckmesser', 'reifen', 'druck', 'kontrolle']
  },
  {
    id: 'car_vacuum',
    title: 'Auto-Staubsauger',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Tragbarer Staubsauger für Autos',
    icon: 'car.circle.fill',
    tags: ['staubsauger', 'auto', 'reinigung', 'tragbar']
  },

  // BOOKS
  {
    id: 'cookbook',
    title: 'Kochbuch',
    category: ItemCategory.BOOKS,
    description: 'Italienisches Kochbuch',
    icon: 'book.fill',
    tags: ['rezepte', 'kochen', 'italienisch', 'küche']
  },
  {
    id: 'travel_guide',
    title: 'Reiseführer',
    category: ItemCategory.BOOKS,
    description: 'Reiseführer für Destinationen',
    icon: 'map.fill',
    tags: ['reise', 'tourismus', 'führer', 'destinationen']
  },
  {
    id: 'language_book',
    title: 'Sprachbuch',
    category: ItemCategory.BOOKS,
    description: 'Fremdsprachenkurs',
    icon: 'textbook.fill',
    tags: ['sprachen', 'kurs', 'lernen', 'fremdsprache']
  },
  {
    id: 'diy_manual',
    title: 'Heimwerker-Handbuch',
    category: ItemCategory.BOOKS,
    description: 'Anleitung für Hausarbeiten',
    icon: 'wrench.and.screwdriver.fill',
    tags: ['heimwerken', 'haus', 'reparaturen', 'handbuch']
  },

  // OTHER
  {
    id: 'camping_tent',
    title: 'Campingzelt',
    category: ItemCategory.OTHER,
    description: 'Wasserdichtes Zelt für 4 Personen',
    icon: 'house.fill',
    tags: ['zelt', 'camping', 'outdoor', 'wasserdicht']
  },
  {
    id: 'sleeping_bag',
    title: 'Schlafsack',
    category: ItemCategory.OTHER,
    description: 'Schlafsack für niedrige Temperaturen',
    icon: 'bed.double.fill',
    tags: ['schlafsack', 'schlafen', 'camping']
  },
  {
    id: 'cooler',
    title: 'Kühlbox',
    category: ItemCategory.OTHER,
    description: 'Thermotasche für Picknicks und Reisen',
    icon: 'snowflake',
    tags: ['kühlbox', 'thermo', 'picknick', 'reisen']
  },
  {
    id: 'baby_stroller',
    title: 'Kinderwagen',
    category: ItemCategory.OTHER,
    description: 'Klappbarer Kinderwagen',
    icon: 'baby.carriage.fill',
    tags: ['kinderwagen', 'kinder', 'klappbar', 'familie']
  },
  {
    id: 'high_chair',
    title: 'Hochstuhl',
    category: ItemCategory.OTHER,
    description: 'Verstellbarer Hochstuhl für Kinder',
    icon: 'chair.fill',
    tags: ['hochstuhl', 'kinder', 'füttern', 'verstellbar']
  },
  {
    id: 'party_tent',
    title: 'Partyzelt',
    category: ItemCategory.OTHER,
    description: 'Klappbarer Pavillon für Partys',
    icon: 'house.fill',
    tags: ['pavillon', 'partys', 'garten', 'schatten']
  },
  {
    id: 'board_games',
    title: 'Brettspiele',
    category: ItemCategory.OTHER,
    description: 'Sammlung von Brettspielen',
    icon: 'gamecontroller.fill',
    tags: ['spiele', 'brett', 'familie', 'unterhaltung']
  },
  {
    id: 'musical_keyboard',
    title: 'Keyboard',
    category: ItemCategory.OTHER,
    description: 'Elektronisches Keyboard mit 61 Tasten',
    icon: 'piano',
    tags: ['keyboard', 'musik', 'spielen', 'elektronisch']
  },
  {
    id: 'guitar',
    title: 'Gitarre',
    category: ItemCategory.OTHER,
    description: 'Akustische Gitarre für Anfänger',
    icon: 'music.note',
    tags: ['gitarre', 'akustisch', 'musik', 'anfänger']
  },
  {
    id: 'art_easel',
    title: 'Staffelei',
    category: ItemCategory.OTHER,
    description: 'Verstellbare Staffelei zum Malen',
    icon: 'paintbrush.fill',
    tags: ['staffelei', 'malen', 'kunst', 'malerei']
  }
];