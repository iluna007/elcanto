export const MAPBOX_STYLE = 'mapbox://styles/ikerluna/cmsc3stlz00i001qodk2a7cta'
export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN ?? ''

export const MAP_CENTER = {
  lat: 11.269862702012793,
  lng: -85.88029830629897,
  zoom: 13.8,
  pitch: 55,
  bearing: -28,
}

/** Área delimitada de navegación [[sw lng, sw lat], [ne lng, ne lat]] */
export const MAP_BOUNDS = [
  [-85.892, 11.262],
  [-85.872, 11.278],
]

export const MAP_ZOOM = {
  min: 12.5,
  max: 18,
}

export const PROJECT_STATUSES = {
  disponible: 'Disponible',
  desarrollo: 'En desarrollo',
  proximamente: 'Próximamente',
}

export const properties = [
  {
    id: 'bungalow',
    slug: 'bungalow',
    name: 'Bungalow',
    location: 'El Encanto, Nacascolo',
    tagline: 'Refugio tropical con piscina privada',
    status: 'disponible',
    category: 'Bungalow',
    bedrooms: 3,
    fullBath: 3,
    halfBath: 1,
    description:
      'Una expresión refinada de la arquitectura tropical contemporánea, el Bungalow de El Encanto equilibra sofisticación y confort diario. Espacios sociales amplios, integración interior-exterior y áreas de descanso crean una residencia donde el lujo natural se encuentra con la elegancia atemporal.',
    closingText:
      'Inmerso en un paisaje tropical exuberante, el Bungalow es un santuario privado donde arquitectura y naturaleza coexisten en armonía. Su diseño horizontal, las áreas de agua y la vida al aire libre ofrecen serenidad y lujo discreto.',
    price: 'Consultar disponibilidad',
    totalFootage: '2,450 sqft',
    acFootage: '2,180 sqft',
    image: '/casas/bungalow-hero.jpg',
    heroImage: '/casas/bungalow-hero.jpg',
    link: '/proyectos/bungalow',
    fillColor: '#40916c',
    fillHover: '#52b788',
    lineColor: '#b7e4c7',
    accentColor: '#d8f3dc',
    fillOpacity: 0.38,
    polygon: [
      [-85.88155, 11.27085],
      [-85.88055, 11.27095],
      [-85.88035, 11.27015],
      [-85.88135, 11.27005],
      [-85.88155, 11.27085],
    ],
    gallery: [
      { src: '/casas/bungalow-hero.jpg', caption: 'Bungalow — Vista principal' },
      { src: '/casas/bungalow-render.jpg', caption: 'Bungalow — Render exterior' },
      { src: '/casas/bungalow-floorplan.jpg', caption: 'Bungalow — Plano con piscina' },
    ],
    floorPlans: [
      { label: 'Planta principal', image: '/casas/bungalow-floorplan.jpg' },
    ],
    floors: [
      {
        name: 'Planta principal',
        rooms: [
          'Entrada',
          '3 habitaciones',
          '3 baños completos',
          'Sala de estar',
          'Comedor',
          'Cocina',
          'Terraza',
          'Piscina privada',
          'Jardín tropical',
        ],
      },
    ],
    mainFeatures: [
      'SALA DE ESTAR',
      'COMEDOR',
      'COCINA ABIERTA',
      'PISCINA PRIVADA',
      'TERRAZA EXTERIOR',
      '3 HABITACIONES',
      'VISTAS AL ENTORNO NATURAL',
    ],
    address: 'El Encanto, Nacascolo, Rivas, Nicaragua',
    nearTo: ['Playa El Coco', 'San Juan del Sur', 'Reserva natural costera'],
    closeTo: ['Senderos ecológicos', 'Club de playa', 'Áreas verdes'],
  },
  {
    id: 'casitas',
    slug: 'casitas',
    name: 'Casitas',
    location: 'El Encanto, Nacascolo',
    tagline: 'Hogares familiares de diseño flexible',
    status: 'disponible',
    category: 'Casitas',
    bedrooms: '3–4',
    fullBath: 4,
    halfBath: 1,
    description:
      'Las Casitas de El Encanto ofrecen planos flexibles de 3 y 4 habitaciones pensados para familias que buscan calidad, funcionalidad y conexión con la naturaleza. Acabados premium y espacios versátiles definen cada unidad.',
    closingText:
      'Diseñadas para la vida contemporánea en el trópico, las Casitas combinan privacidad, confort y acceso directo al entorno natural de la comunidad El Encanto.',
    price: 'Desde $385,000 USD',
    totalFootage: '2,800 – 3,400 sqft',
    acFootage: '2,500 – 3,100 sqft',
    image: '/casas/casitas-hero.jpg',
    heroImage: '/casas/casitas-hero.jpg',
    link: '/proyectos/casitas',
    fillColor: '#1d7596',
    fillHover: '#219ebc',
    lineColor: '#90e0ef',
    accentColor: '#caf0f8',
    fillOpacity: 0.38,
    polygon: [
      [-85.88045, 11.27075],
      [-85.87955, 11.27085],
      [-85.87935, 11.27005],
      [-85.88025, 11.26995],
      [-85.88045, 11.27075],
    ],
    gallery: [
      { src: '/casas/casitas-hero.jpg', caption: 'Casita — Render ortogonal' },
      { src: '/casas/casitas-masterplan.jpg', caption: 'Casita — Masterplan' },
      { src: '/casas/casitas-floorplan.jpg', caption: 'Casita — Planta baja' },
    ],
    floorPlans: [
      { label: 'Planta baja', image: '/casas/casitas-floorplan.jpg' },
      { label: 'Masterplan', image: '/casas/casitas-masterplan.jpg' },
    ],
    floors: [
      {
        name: 'Planta baja',
        rooms: [
          'Entrada',
          'Sala',
          'Comedor',
          'Cocina',
          'Habitaciones',
          'Baños',
          'Terraza',
          'Área de servicio',
        ],
      },
      {
        name: 'Segundo nivel',
        rooms: ['Habitaciones adicionales', 'Baños', 'Terraza superior', 'Closets'],
      },
    ],
    mainFeatures: [
      '3–4 HABITACIONES',
      'PLANOS FLEXIBLES',
      'TERRAZA',
      'COCINA MODERNA',
      'ACABADOS PREMIUM',
      'DISEÑO FAMILIAR',
    ],
    address: 'El Encanto, Nacascolo, Rivas, Nicaragua',
    nearTo: ['Playa El Coco', 'Comercio local Nacascolo', 'Rutas hacia Rivas'],
    closeTo: ['Amenidades El Encanto', 'Senderos', 'Áreas comunes'],
  },
  {
    id: 'suenos-home-models',
    slug: 'suenos-home-models',
    name: 'Sueños Home Models',
    location: 'El Encanto, Nacascolo',
    tagline: 'Colección de modelos residenciales exclusivos',
    status: 'desarrollo',
    category: 'Suenos Home Models',
    bedrooms: 'Varios modelos',
    fullBath: '3–6',
    halfBath: '1–2',
    description:
      'Sueños Home Models reúne una colección curada de residencias — Guanacaste, Malinche, Ceiba, Pochote y El Ceibo — cada una con identidad arquitectónica propia y espacios diseñados para el confort tropical de alto nivel.',
    closingText:
      'Cada modelo Sueños Home representa una visión distinta del hogar tropical: desde líneas modernas hasta espacios generosos para familias y retiros vacacionales de lujo.',
    price: 'Modelos personalizables',
    totalFootage: '2,200 – 4,500 sqft',
    acFootage: '2,000 – 4,100 sqft',
    image: '/casas/suenos-guanacaste.jpg',
    heroImage: '/casas/suenos-guanacaste.jpg',
    link: '/proyectos/suenos-home-models',
    fillColor: '#bc6c25',
    fillHover: '#dda15e',
    lineColor: '#faedcd',
    accentColor: '#fefae0',
    fillOpacity: 0.36,
    polygon: [
      [-85.88125, 11.26955],
      [-85.88035, 11.26965],
      [-85.88015, 11.26885],
      [-85.88105, 11.26875],
      [-85.88125, 11.26955],
    ],
    gallery: [
      { src: '/casas/suenos-guanacaste.jpg', caption: 'La Guanacaste' },
      { src: '/casas/suenos-malinche.jpg', caption: 'El Malinche' },
      { src: '/casas/suenos-ceiba.jpg', caption: 'La Ceiba' },
      { src: '/casas/suenos-pochote.jpg', caption: 'La Pochote' },
    ],
    floorPlans: [{ label: 'La Guanacaste', image: '/casas/suenos-guanacaste.jpg' }],
    floors: [
      {
        name: 'Modelos disponibles',
        rooms: [
          'Guanacaste Hybrid — 3 BR',
          'Guanacaste Original — 3 BR',
          'El Malinche — Model A',
          'La Ceiba — Model C',
          'La Pochote — Model D',
          'El Ceibo — Sueños Home',
        ],
      },
    ],
    mainFeatures: [
      'MÚLTIPLES MODELOS',
      'DISEÑO PERSONALIZABLE',
      'VIDA INTERIOR-EXTERIOR',
      'ESPACIOS SOCIALES',
      'JARDINES TROPICALES',
      'ACABADOS DE AUTOR',
    ],
    address: 'El Encanto, Nacascolo, Rivas, Nicaragua',
    nearTo: ['Playa El Coco', 'San Juan del Sur', 'Nacascolo'],
    closeTo: ['Masterplan El Encanto', 'Áreas verdes', 'Servicios de la comunidad'],
    subModels: [
      { name: 'Guanacaste Hybrid', beds: '3 BR' },
      { name: 'Guanacaste Original', beds: '3 BR' },
      { name: 'El Malinche', beds: 'Model A' },
      { name: 'La Ceiba', beds: 'Model C' },
      { name: 'La Pochote', beds: 'Model D' },
      { name: 'El Ceibo', beds: 'Sueños Home' },
    ],
  },
  {
    id: 'villa-de-casbah',
    slug: 'villa-de-casbah',
    name: 'Villa de Casbah',
    location: 'El Encanto, Nacascolo',
    tagline: 'Elegancia courtyard con patio central',
    status: 'proximamente',
    category: 'Villa de Casbah',
    bedrooms: '3–4',
    fullBath: 5,
    halfBath: 2,
    description:
      'Villa de Casbah es una expresión sofisticada de la arquitectura con patio central. Sus espacios sociales generosos, cocina premium y áreas de piscina crean una residencia donde el lujo tropical alcanza su máxima expresión.',
    closingText:
      'Definida por su elegante diseño courtyard, fuentes de agua tranquilas y transición fluida entre interior y exterior, Villa de Casbah ofrece un ambiente de lujo sereno en el corazón de El Encanto.',
    price: 'Consultar disponibilidad',
    totalFootage: '3,800 sqft',
    acFootage: '3,450 sqft',
    image: '/casas/villa-hero.jpg',
    heroImage: '/casas/villa-hero.jpg',
    link: '/proyectos/villa-de-casbah',
    fillColor: '#6a4c93',
    fillHover: '#9d4edd',
    lineColor: '#e0aaff',
    accentColor: '#f3d9ff',
    fillOpacity: 0.38,
    polygon: [
      [-85.88015, 11.26945],
      [-85.87925, 11.26955],
      [-85.87905, 11.26875],
      [-85.87995, 11.26865],
      [-85.88015, 11.26945],
    ],
    gallery: [
      { src: '/casas/villa-hero.jpg', caption: 'Villa de Casbah — Courtyard' },
      { src: '/casas/villa-living.jpg', caption: 'Sala de estar' },
      { src: '/casas/villa-kitchen.jpg', caption: 'Cocina' },
      { src: '/casas/villa-courtyard.jpg', caption: 'Patio central' },
      { src: '/casas/villa-master.jpg', caption: 'Master bedroom' },
      { src: '/casas/villa-pool.jpg', caption: 'Área de piscina' },
    ],
    floorPlans: [{ label: 'Planta 3–4 BR', image: '/casas/villa-floorplan.jpg' }],
    floors: [
      {
        name: 'Planta principal',
        rooms: [
          'Entrada',
          'Living room',
          'Comedor',
          'Cocina premium',
          'Courtyard central',
          'Habitaciones',
          'Baños',
          'Piscina',
          'Terraza',
        ],
      },
    ],
    mainFeatures: [
      'COURTYARD CENTRAL',
      'LIVING ROOM',
      'COCINA PREMIUM',
      'MASTER SUITE',
      'PISCINA CON TERRAZA',
      'DISEÑO 3–4 HABITACIONES',
    ],
    address: 'El Encanto, Nacascolo, Rivas, Nicaragua',
    nearTo: ['Playa El Coco', 'San Juan del Sur', 'Península de Nicoya'],
    closeTo: ['Amenidades El Encanto', 'Senderos naturales', 'Áreas de retiro'],
  },
]

export const statusFilters = [
  { key: 'all', label: 'Todos' },
  { key: 'disponible', label: PROJECT_STATUSES.disponible },
  { key: 'desarrollo', label: PROJECT_STATUSES.desarrollo },
  { key: 'proximamente', label: PROJECT_STATUSES.proximamente },
]

export function getPropertyBySlug(slug) {
  return properties.find((p) => p.slug === slug)
}

export function getStatusLabel(status) {
  return PROJECT_STATUSES[status] ?? status
}
