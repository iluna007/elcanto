export const propertyTranslations = {
  en: {
    bungalow: {
      tagline: 'Tropical retreat with private pool',
      description:
        'A refined expression of contemporary tropical architecture, the El Encanto Bungalow balances sophistication with everyday comfort. Expansive social spaces, seamless indoor-outdoor living, and curated relaxation areas create a residence where natural luxury meets timeless elegance.',
      closingText:
        'Set within lush tropical landscape, the Bungalow is a private sanctuary where architecture and nature coexist in harmony. Its horizontal design, water features, and outdoor living offer serenity and understated luxury.',
      price: 'Availability upon request',
      mainFeatures: [
        'LIVING ROOM',
        'DINING ROOM',
        'OPEN KITCHEN',
        'PRIVATE POOL',
        'OUTDOOR TERRACE',
        '3 BEDROOMS',
        'NATURAL VIEWS',
      ],
      floors: [
        {
          name: 'Main floor',
          rooms: [
            'Entrance',
            '3 bedrooms',
            '3 full baths',
            'Living room',
            'Dining room',
            'Kitchen',
            'Terrace',
            'Private pool',
            'Tropical garden',
          ],
        },
      ],
      floorPlans: [{ label: 'Main floor' }],
      gallery: [
        { caption: 'Bungalow — Main view' },
        { caption: 'Bungalow — Exterior render' },
        { caption: 'Bungalow — Floor plan with pool' },
      ],
      nearTo: ['El Coco Beach', 'San Juan del Sur', 'Coastal nature reserve'],
      closeTo: ['Eco trails', 'Beach club', 'Green areas'],
    },
    casitas: {
      tagline: 'Flexible family homes',
      description:
        'El Encanto Casitas offer flexible 3 and 4 bedroom layouts designed for families seeking quality, functionality, and connection with nature. Premium finishes and versatile spaces define each unit.',
      closingText:
        'Designed for contemporary tropical living, Casitas combine privacy, comfort, and direct access to El Encanto’s natural surroundings.',
      price: 'From $385,000 USD',
      bedrooms: '3–4',
      mainFeatures: [
        '3–4 BEDROOMS',
        'FLEXIBLE PLANS',
        'TERRACE',
        'MODERN KITCHEN',
        'PREMIUM FINISHES',
        'FAMILY DESIGN',
      ],
      floors: [
        {
          name: 'Ground floor',
          rooms: ['Entrance', 'Living', 'Dining', 'Kitchen', 'Bedrooms', 'Baths', 'Terrace', 'Service area'],
        },
        {
          name: 'Upper level',
          rooms: ['Additional bedrooms', 'Baths', 'Upper terrace', 'Closets'],
        },
      ],
      floorPlans: [{ label: 'Ground floor' }, { label: 'Masterplan' }],
      gallery: [
        { caption: 'Casita — Orthogonal render' },
        { caption: 'Casita — Masterplan' },
        { caption: 'Casita — Ground floor plan' },
      ],
      nearTo: ['El Coco Beach', 'Nacascolo local shops', 'Routes to Rivas'],
      closeTo: ['El Encanto amenities', 'Trails', 'Common areas'],
    },
    'suenos-home-models': {
      tagline: 'Exclusive residential model collection',
      description:
        'Sueños Home Models brings together Guanacaste, Malinche, Ceiba, Pochote, and El Ceibo — each with its own architectural identity and spaces designed for high-end tropical comfort.',
      closingText:
        'Each Sueños Home model represents a distinct vision of tropical living: from modern lines to generous spaces for families and luxury retreats.',
      price: 'Customizable models',
      bedrooms: 'Various models',
      mainFeatures: [
        'MULTIPLE MODELS',
        'CUSTOM DESIGN',
        'INDOOR-OUTDOOR LIVING',
        'SOCIAL SPACES',
        'TROPICAL GARDENS',
        'SIGNATURE FINISHES',
      ],
      floors: [
        {
          name: 'Available models',
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
      floorPlans: [{ label: 'La Guanacaste' }],
      gallery: [
        { caption: 'La Guanacaste' },
        { caption: 'El Malinche' },
        { caption: 'La Ceiba' },
        { caption: 'La Pochote' },
      ],
      nearTo: ['El Coco Beach', 'San Juan del Sur', 'Nacascolo'],
      closeTo: ['El Encanto masterplan', 'Green areas', 'Community services'],
    },
    'villa-de-casbah': {
      tagline: 'Courtyard elegance',
      description:
        'Villa de Casbah is a sophisticated expression of courtyard architecture. Generous social spaces, a premium kitchen, and pool areas create a residence where tropical luxury reaches its fullest expression.',
      closingText:
        'Defined by elegant courtyard design, tranquil water features, and seamless indoor-outdoor transition, Villa de Casbah offers a serene luxury atmosphere at the heart of El Encanto.',
      price: 'Availability upon request',
      bedrooms: '3–4',
      mainFeatures: [
        'CENTRAL COURTYARD',
        'LIVING ROOM',
        'PREMIUM KITCHEN',
        'MASTER SUITE',
        'POOL WITH TERRACE',
        '3–4 BEDROOM DESIGN',
      ],
      floors: [
        {
          name: 'Main floor',
          rooms: [
            'Entrance',
            'Living room',
            'Dining',
            'Premium kitchen',
            'Central courtyard',
            'Bedrooms',
            'Baths',
            'Pool',
            'Terrace',
          ],
        },
      ],
      floorPlans: [{ label: '3–4 BR floor plan' }],
      gallery: [
        { caption: 'Villa de Casbah — Courtyard' },
        { caption: 'Living room' },
        { caption: 'Kitchen' },
        { caption: 'Central courtyard' },
        { caption: 'Master bedroom' },
        { caption: 'Pool area' },
      ],
      nearTo: ['El Coco Beach', 'San Juan del Sur', 'Nicoya Peninsula'],
      closeTo: ['El Encanto amenities', 'Nature trails', 'Retreat areas'],
    },
  },
}

export function mergePropertyTranslation(property, lang) {
  if (!property || lang === 'es') return property
  const tr = propertyTranslations.en[property.slug]
  if (!tr) return property

  return {
    ...property,
    ...tr,
    floorPlans: property.floorPlans.map((plan, i) => ({
      ...plan,
      label: tr.floorPlans?.[i]?.label ?? plan.label,
    })),
    gallery: property.gallery.map((item, i) => ({
      ...item,
      caption: tr.gallery?.[i]?.caption ?? item.caption,
    })),
  }
}
