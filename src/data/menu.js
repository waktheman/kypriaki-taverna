const u = (id, w = 160) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${w}&q=70`

export const MENU_SECTIONS = [
  {
    id: 'meze',
    title: 'Meze',
    blurb: 'Small plates, big generosity — the way every Cypriot meal begins.',
    items: [
      {
        name: 'Halloumi Saganaki',
        description: 'Pan-seared halloumi, lemon, wild thyme.',
        price: '€8.50',
        image: u('photo-1559847844-5315695dadae'),
      },
      {
        name: 'Meze Platter',
        description: "Chef's selection of village appetizers to share.",
        price: '€16.99',
        image: u('photo-1544025162-d76694265947'),
      },
      {
        name: 'Keftedes',
        description: 'Village meatballs with mint and sundried tomato.',
        price: '€9.99',
        image: u('photo-1529042410759-befb1204b468'),
      },
      {
        name: 'Saganaki Flambé',
        description: 'Aged cheese, flamed table-side with lemon.',
        price: '€8.99',
        image: u('photo-1504674900247-0877df9cc836'),
      },
      {
        name: 'Tzatziki & Warm Pita',
        description: 'Strained yoghurt, cucumber, garlic, dill.',
        price: '€5.50',
        image: u('photo-1540189549336-e6e99c3679fe'),
      },
      {
        name: 'Taramosalata',
        description: 'Whipped cod roe with olive oil and lemon.',
        price: '€6.50',
        image: u('photo-1546069901-ba9599a7e63c'),
      },
    ],
  },
  {
    id: 'mains',
    title: 'Mains',
    blurb: 'From the charcoal and the wood oven — recipes unchanged since 1962.',
    items: [
      {
        name: 'Souvla',
        description: 'Rotisserie pork over Cypriot charcoal.',
        price: '€18.99',
        image: u('photo-1555939594-58d7cb561ad1'),
      },
      {
        name: 'Souvlaki',
        description: 'Charcoal-grilled pork skewers, tzatziki, warm pita.',
        price: '€14.99',
        image: u('photo-1529692236671-f1f6cf9683ba'),
      },
      {
        name: 'Kleftiko',
        description: 'Slow-roasted lamb shank, oregano, lemon jus.',
        price: '€21.99',
        image: u('photo-1600891964092-4316c288032e'),
      },
      {
        name: 'Moussaka',
        description: 'Layered aubergine, spiced lamb, béchamel gratin.',
        price: '€13.50',
        image: u('photo-1574894709920-11b28e7367e3'),
      },
      {
        name: 'Grilled Sea Bream',
        description: 'Whole fish, olive oil, wild oregano, lemon.',
        price: '€22.50',
        image: u('photo-1467003909585-2f8a72700288'),
      },
      {
        name: 'Sheftalia',
        description: 'Charcoal-grilled village sausage, parsley, onion.',
        price: '€12.99',
        image: u('photo-1558030006-450675393462'),
      },
    ],
  },
  {
    id: 'desserts',
    title: 'Desserts',
    blurb: 'Honey, filo, and orange blossom — sweetness the village way.',
    items: [
      {
        name: 'Loukoumades',
        description: 'Warm honey doughnuts, cinnamon, crushed pistachio.',
        price: '€6.99',
        image: u('photo-1551024506-0bccd828d307'),
      },
      {
        name: 'Galaktoboureko',
        description: 'Semolina custard in filo, orange-blossom syrup.',
        price: '€6.50',
        image: u('photo-1488477181946-6428a0291777'),
      },
      {
        name: 'Baklava',
        description: 'Layered filo, walnut, honey syrup.',
        price: '€5.99',
        image: u('photo-1519676867240-f03562e64548'),
      },
    ],
  },
  {
    id: 'drinks',
    title: 'Drinks',
    blurb: 'Native grapes, mountain spirits, and coffee brewed slow in copper.',
    items: [
      {
        name: 'Commandaria Reserve',
        description: "Sun-dried Xynisteri & Mavro. Cyprus' oldest wine.",
        price: '€9.50',
        image: u('photo-1510812431401-41d2bd2722f3'),
      },
      {
        name: 'Xynisteri, House White',
        description: 'Crisp, citrus, mineral. By the glass.',
        price: '€6.50',
        image: u('photo-1584916201218-f4242ceb4809'),
      },
      {
        name: 'Maratheftiko, House Red',
        description: 'Structured, dark fruit, native to Cyprus.',
        price: '€7.50',
        image: u('photo-1547595628-c61a29f496f0'),
      },
      {
        name: 'Zivania',
        description: 'Traditional grape spirit, served chilled.',
        price: '€5.00',
        image: u('photo-1514362545857-3bc16c4c7d1b'),
      },
      {
        name: 'Cyprus Coffee',
        description: 'Slow-brewed in copper briki.',
        price: '€3.50',
        image: u('photo-1495474472287-4d71bcdd2085'),
      },
    ],
  },
]

export const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1920&q=75',
  about: '/images/about.jpg',
  commandaria:
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=75',
  kleftiko:
    'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1200&q=75',
  souvlaVideoPoster: '/images/souvla-poster.jpg',
  kleftikoVideoPoster: '/images/kleftiko-poster.jpg',
  commandariaVideoPoster: '/images/commandaria-poster.jpg',
  gallery: [
    {
      src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=75',
      alt: 'Outdoor seating under vines at Kypriaki Taverna',
      tall: true,
    },
    {
      src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=75',
      alt: 'Our chef preparing the evening meze',
      tall: false,
    },
    {
      src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=75',
      alt: 'Souvla turning slowly over Cypriot charcoal',
      tall: true,
    },
    {
      src: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=75',
      alt: 'Sunset over the terrace in Paphos',
      tall: false,
    },
  ],
}

export const TESTIMONIALS = [
  {
    name: 'Maria K.',
    text: 'The souvla is the best I have eaten outside my grandmother’s yard. Slow, smoky, perfect.',
  },
  {
    name: 'James T.',
    text: 'We came for one dinner and returned four nights in a row. The kleftiko falls apart with a spoon.',
  },
  {
    name: 'Elena P.',
    text: 'Meze kept arriving until we surrendered. Every plate tasted like a Sunday in the village.',
  },
  {
    name: 'Andreas C.',
    text: 'Commandaria on the terrace at sunset — there is no better way to end a day in Paphos.',
  },
  {
    name: 'Sophie L.',
    text: 'Warm, unhurried, generous. The family treats you like a neighbour, not a tourist.',
  },
  {
    name: 'Dimitris N.',
    text: 'Halloumi seared over coals, bread still warm. Simple things done exactly right.',
  },
  {
    name: 'Hannah W.',
    text: 'The loukoumades alone are worth the flight. Honey, cinnamon, and pure happiness.',
  },
  {
    name: 'Costas M.',
    text: 'Three generations in the kitchen and you can taste every one of them. A Paphos institution.',
  },
]

export const FALLBACK_IMG =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><rect width="160" height="160" fill="#F5F1E8"/><circle cx="80" cy="80" r="34" fill="none" stroke="#C85A3C" stroke-width="3"/><circle cx="80" cy="80" r="22" fill="#D4AF6F" opacity="0.4"/></svg>`,
  )
