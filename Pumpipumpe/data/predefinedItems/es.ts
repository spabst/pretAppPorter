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
  {
    id: 'screwdriver_set',
    title: 'Juego de Destornilladores',
    category: ItemCategory.TOOLS,
    description: 'Juego completo de destornilladores de varios tamaños',
    icon: 'wrench.fill',
    tags: ['destornilladores', 'juego', 'tornillos', 'reparación']
  },
  {
    id: 'saw',
    title: 'Sierra',
    category: ItemCategory.TOOLS,
    description: 'Sierra manual para madera',
    icon: 'scissors',
    tags: ['sierra', 'madera', 'corte']
  },
  {
    id: 'level',
    title: 'Nivel',
    category: ItemCategory.TOOLS,
    description: 'Nivel de burbuja para mediciones precisas',
    icon: 'ruler.fill',
    tags: ['nivel', 'medida', 'preciso', 'construcción']
  },
  {
    id: 'wrench_set',
    title: 'Juego de Llaves',
    category: ItemCategory.TOOLS,
    description: 'Juego de llaves inglesas y de tubo',
    icon: 'wrench.fill',
    tags: ['llaves', 'inglesas', 'mecánica', 'pernos']
  },
  {
    id: 'pliers',
    title: 'Alicates',
    category: ItemCategory.TOOLS,
    description: 'Alicates universales para electricista',
    icon: 'wrench.adjustable.fill',
    tags: ['alicates', 'electricista', 'cables', 'agarre']
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
  {
    id: 'garden_hose',
    title: 'Manguera de Jardín',
    category: ItemCategory.GARDEN,
    description: 'Manguera de riego con pistola',
    icon: 'drop.fill',
    tags: ['manguera', 'riego', 'jardín', 'agua']
  },
  {
    id: 'pruning_shears',
    title: 'Tijeras de Podar',
    category: ItemCategory.GARDEN,
    description: 'Tijeras profesionales para podar plantas',
    icon: 'scissors',
    tags: ['tijeras', 'poda', 'plantas', 'jardín']
  },
  {
    id: 'wheelbarrow',
    title: 'Carretilla',
    category: ItemCategory.GARDEN,
    description: 'Carretilla para transportar tierra y materiales',
    icon: 'cart.fill',
    tags: ['carretilla', 'transporte', 'tierra', 'jardín']
  },
  {
    id: 'rake',
    title: 'Rastrillo',
    category: ItemCategory.GARDEN,
    description: 'Rastrillo para recoger hojas',
    icon: 'leaf.fill',
    tags: ['rastrillo', 'hojas', 'limpieza', 'jardín']
  },
  {
    id: 'shovel',
    title: 'Pala',
    category: ItemCategory.GARDEN,
    description: 'Pala para cavar y plantar',
    icon: 'hand.raised.fill',
    tags: ['pala', 'cavar', 'plantar', 'tierra']
  },

  // KITCHEN
  {
    id: 'stand_mixer',
    title: 'Batidora Amasadora',
    category: ItemCategory.KITCHEN,
    description: 'Robot de cocina con accesorios',
    icon: 'fork.knife.circle.fill',
    tags: ['batidora', 'robot', 'cocina', 'repostería']
  },
  {
    id: 'food_processor',
    title: 'Procesador de Alimentos',
    category: ItemCategory.KITCHEN,
    description: 'Procesador eléctrico multifunción',
    icon: 'gear',
    tags: ['procesador', 'eléctrico', 'verduras', 'cocina']
  },
  {
    id: 'pressure_cooker',
    title: 'Olla a Presión',
    category: ItemCategory.KITCHEN,
    description: 'Olla a presión para cocción rápida',
    icon: 'flame.fill',
    tags: ['olla', 'presión', 'cocción', 'rápida']
  },
  {
    id: 'blender',
    title: 'Batidora de Mano',
    category: ItemCategory.KITCHEN,
    description: 'Batidora de inmersión',
    icon: 'tornado',
    tags: ['batidora', 'inmersión', 'batido', 'sopas']
  },
  {
    id: 'juicer',
    title: 'Licuadora',
    category: ItemCategory.KITCHEN,
    description: 'Licuadora centrífuga para zumos de fruta',
    icon: 'drop.circle.fill',
    tags: ['licuadora', 'zumos', 'fruta', 'verduras']
  },

  // SPORTS
  {
    id: 'bicycle',
    title: 'Bicicleta',
    category: ItemCategory.SPORTS,
    description: 'Bicicleta de ciudad para adultos',
    icon: 'bicycle',
    tags: ['bicicleta', 'ciudad', 'transporte', 'deporte']
  },
  {
    id: 'mountain_bike',
    title: 'Bicicleta de Montaña',
    category: ItemCategory.SPORTS,
    description: 'Bicicleta de montaña para senderos y montaña',
    icon: 'bicycle',
    tags: ['bicicleta', 'montaña', 'senderos', 'todoterreno']
  },
  {
    id: 'tennis_racket',
    title: 'Raqueta de Tenis',
    category: ItemCategory.SPORTS,
    description: 'Raqueta profesional de tenis',
    icon: 'figure.tennis',
    tags: ['tenis', 'raqueta', 'deporte', 'cancha']
  },
  {
    id: 'soccer_ball',
    title: 'Balón de Fútbol',
    category: ItemCategory.SPORTS,
    description: 'Balón oficial para partidos',
    icon: 'soccerball',
    tags: ['fútbol', 'balón', 'partido', 'deporte']
  },
  {
    id: 'skateboard',
    title: 'Monopatín',
    category: ItemCategory.SPORTS,
    description: 'Monopatín completo para principiantes',
    icon: 'figure.skating',
    tags: ['monopatín', 'principiantes', 'calle', 'jóvenes']
  },
  {
    id: 'yoga_mat',
    title: 'Esterilla de Yoga',
    category: ItemCategory.SPORTS,
    description: 'Esterilla antideslizante para yoga y pilates',
    icon: 'figure.yoga',
    tags: ['yoga', 'pilates', 'esterilla', 'fitness']
  },

  // ELECTRONICS
  {
    id: 'projector',
    title: 'Proyector',
    category: ItemCategory.ELECTRONICS,
    description: 'Proyector Full HD para presentaciones',
    icon: 'tv.fill',
    tags: ['proyector', 'presentaciones', 'películas', 'pantalla']
  },
  {
    id: 'speaker_bluetooth',
    title: 'Altavoz Bluetooth',
    category: ItemCategory.ELECTRONICS,
    description: 'Altavoz inalámbrico portátil',
    icon: 'speaker.wave.3.fill',
    tags: ['altavoz', 'bluetooth', 'música', 'portátil']
  },
  {
    id: 'camera_dslr',
    title: 'Cámara Réflex',
    category: ItemCategory.ELECTRONICS,
    description: 'Cámara digital con objetivos',
    icon: 'camera.fill',
    tags: ['cámara', 'réflex', 'fotos', 'objetivos']
  },
  {
    id: 'tablet',
    title: 'Tablet',
    category: ItemCategory.ELECTRONICS,
    description: 'Tablet de 10 pulgadas para trabajo y ocio',
    icon: 'ipad',
    tags: ['tablet', 'trabajo', 'ocio', 'digital']
  },
  {
    id: 'headphones',
    title: 'Auriculares',
    category: ItemCategory.ELECTRONICS,
    description: 'Auriculares inalámbricos con cancelación de ruido',
    icon: 'headphones',
    tags: ['auriculares', 'inalámbricos', 'música', 'cancelación ruido']
  },

  // HOUSEHOLD
  {
    id: 'vacuum_cleaner',
    title: 'Aspiradora',
    category: ItemCategory.HOUSEHOLD,
    description: 'Aspiradora inalámbrica recargable',
    icon: 'wind',
    tags: ['aspiradora', 'limpieza', 'casa', 'inalámbrica']
  },
  {
    id: 'iron',
    title: 'Plancha',
    category: ItemCategory.HOUSEHOLD,
    description: 'Plancha de vapor',
    icon: 'flame.fill',
    tags: ['plancha', 'planchado', 'vapor', 'ropa']
  },
  {
    id: 'sewing_machine',
    title: 'Máquina de Coser',
    category: ItemCategory.HOUSEHOLD,
    description: 'Máquina de coser eléctrica',
    icon: 'scissors',
    tags: ['coser', 'máquina', 'ropa', 'reparación']
  },
  {
    id: 'carpet_cleaner',
    title: 'Limpiadora de Alfombras',
    category: ItemCategory.HOUSEHOLD,
    description: 'Máquina para lavar alfombras',
    icon: 'shower.fill',
    tags: ['alfombras', 'limpieza', 'lavado', 'casa']
  },
  {
    id: 'steamer',
    title: 'Limpiadora a Vapor',
    category: ItemCategory.HOUSEHOLD,
    description: 'Limpiadora a vapor para suelos',
    icon: 'drop.fill',
    tags: ['vapor', 'suelos', 'limpieza', 'higiene']
  },

  // AUTOMOTIVE
  {
    id: 'car_jack',
    title: 'Gato Hidráulico',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Gato hidráulico para cambiar ruedas',
    icon: 'car.fill',
    tags: ['gato', 'coche', 'ruedas', 'cambio']
  },
  {
    id: 'jumper_cables',
    title: 'Cables de Arranque',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Cables para arrancar batería descargada',
    icon: 'bolt.fill',
    tags: ['cables', 'batería', 'arranque', 'emergencia']
  },
  {
    id: 'tire_pressure_gauge',
    title: 'Medidor de Presión',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Medidor digital para presión de neumáticos',
    icon: 'speedometer',
    tags: ['medidor', 'neumáticos', 'presión', 'control']
  },
  {
    id: 'car_vacuum',
    title: 'Aspiradora de Coche',
    category: ItemCategory.AUTOMOTIVE,
    description: 'Aspiradora portátil para coches',
    icon: 'car.circle.fill',
    tags: ['aspiradora', 'coche', 'limpieza', 'portátil']
  },

  // BOOKS
  {
    id: 'cookbook',
    title: 'Libro de Recetas',
    category: ItemCategory.BOOKS,
    description: 'Libro de recetas de cocina italiana',
    icon: 'book.fill',
    tags: ['recetas', 'cocina', 'italiana', 'cocinar']
  },
  {
    id: 'travel_guide',
    title: 'Guía de Viaje',
    category: ItemCategory.BOOKS,
    description: 'Guía de viaje para destinos',
    icon: 'map.fill',
    tags: ['viaje', 'turismo', 'guía', 'destinos']
  },
  {
    id: 'language_book',
    title: 'Libro de Idiomas',
    category: ItemCategory.BOOKS,
    description: 'Curso de idioma extranjero',
    icon: 'textbook.fill',
    tags: ['idiomas', 'curso', 'aprender', 'extranjero']
  },
  {
    id: 'diy_manual',
    title: 'Manual de Bricolaje',
    category: ItemCategory.BOOKS,
    description: 'Guía para trabajos domésticos',
    icon: 'wrench.and.screwdriver.fill',
    tags: ['bricolaje', 'casa', 'reparaciones', 'manual']
  },

  // OTHER
  {
    id: 'camping_tent',
    title: 'Tienda de Campaña',
    category: ItemCategory.OTHER,
    description: 'Tienda impermeable para 4 personas',
    icon: 'house.fill',
    tags: ['tienda', 'camping', 'exterior', 'impermeable']
  },
  {
    id: 'sleeping_bag',
    title: 'Saco de Dormir',
    category: ItemCategory.OTHER,
    description: 'Saco de dormir para bajas temperaturas',
    icon: 'bed.double.fill',
    tags: ['saco', 'dormir', 'camping']
  },
  {
    id: 'cooler',
    title: 'Nevera Portátil',
    category: ItemCategory.OTHER,
    description: 'Bolsa térmica para picnics y viajes',
    icon: 'snowflake',
    tags: ['nevera', 'térmica', 'picnic', 'viajes']
  },
  {
    id: 'baby_stroller',
    title: 'Cochecito',
    category: ItemCategory.OTHER,
    description: 'Cochecito plegable para niños',
    icon: 'baby.carriage.fill',
    tags: ['cochecito', 'niños', 'plegable', 'familia']
  },
  {
    id: 'high_chair',
    title: 'Trona',
    category: ItemCategory.OTHER,
    description: 'Trona regulable para niños',
    icon: 'chair.fill',
    tags: ['trona', 'niños', 'comida', 'regulable']
  },
  {
    id: 'party_tent',
    title: 'Pérgola',
    category: ItemCategory.OTHER,
    description: 'Pérgola plegable para fiestas',
    icon: 'house.fill',
    tags: ['pérgola', 'fiestas', 'jardín', 'sombra']
  },
  {
    id: 'board_games',
    title: 'Juegos de Mesa',
    category: ItemCategory.OTHER,
    description: 'Colección de juegos de mesa',
    icon: 'gamecontroller.fill',
    tags: ['juegos', 'mesa', 'familia', 'entretenimiento']
  },
  {
    id: 'musical_keyboard',
    title: 'Teclado Musical',
    category: ItemCategory.OTHER,
    description: 'Teclado electrónico de 61 teclas',
    icon: 'piano',
    tags: ['teclado', 'música', 'tocar', 'electrónico']
  },
  {
    id: 'guitar',
    title: 'Guitarra',
    category: ItemCategory.OTHER,
    description: 'Guitarra acústica para principiantes',
    icon: 'music.note',
    tags: ['guitarra', 'acústica', 'música', 'principiantes']
  },
  {
    id: 'art_easel',
    title: 'Caballete de Pintura',
    category: ItemCategory.OTHER,
    description: 'Caballete regulable para pintar',
    icon: 'paintbrush.fill',
    tags: ['caballete', 'pintura', 'arte', 'pintar']
  }
];