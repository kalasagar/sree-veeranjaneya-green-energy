// SVGE site — single source of truth for copy, stats, and structured data.
// Voice: insurgent / movement (Patagonia-style). Stat + brief framing line.
// Scale framing: this one plant only. No portfolio talk.

export type Source = { label: string; url?: string };
export type Stat = {
  value: string;
  unit?: string;
  k: string;
  framing?: string;
  source?: Source;
};

export const SITE = {
  // ---- IDENTITY ----
  name: 'Sree Veeranjaneya Green Energy',
  legalName: 'Sree Veeranjaneya Green Energy Private Limited',
  short: 'SVGE',
  tagline: 'Grass to Gas. Farm to Fuel.',
  description:
    "We're building a 4-tonne-per-day Compressed Bio-Gas plant in rural Andhra Pradesh — turning the paddy straw India would otherwise burn into the clean fuel Indian Oil already wants to buy, and the organic manure local fields desperately need.",
  url: 'https://kalasagar.github.io/sree-veeranjaneya-green-energy',
  email: 'svge.india@gmail.com',
  // Phone intentionally not published until plant is operational.

  // ---- HERO MANIFESTO ----
  hero: {
    eyebrow: 'India · Andhra Pradesh · Pre-construction',
    h1Top: 'Burned in the field today.',
    h1Mid: 'Burned in your engine tomorrow.',
    h1Bottom: "We're closing that loop.",
    sub:
      'Every winter, India burns ~14 million tonnes of paddy straw. Every year, India imports 85% of its crude oil. One small Compressed Bio-Gas plant in Thatipadu, Vizianagaram is our answer to both — clean fuel for Indian Oil under a signed Letter of Intent, and organic manure back to the farmers we buy from.',
    ctas: [
      { label: 'Read the project', href: '/project/', tone: 'primary' as const },
      { label: 'Are you a farmer?', href: '/farmers/', tone: 'ghost' as const },
    ],
  },

  // ---- STATS WITH SOURCES + EDITORIAL FRAMING ----
  stakeStats: [
    {
      value: '₹12',
      unit: 'lakh crore',
      k: "India's annual oil import bill",
      framing: 'Roughly the size of Telangana\'s entire state GDP, sent abroad as cash every year.',
      source: { label: 'PIB, FY24' },
    },
    {
      value: '~14',
      unit: 'Mt',
      k: 'Paddy straw burned each winter',
      framing: 'The cheapest carbon-abatement opportunity in India today, going up in smoke.',
      source: { label: 'NITI Aayog, 2023' },
    },
    {
      value: '27',
      unit: 'μg/m³',
      k: 'Annual PM2.5, Indo-Gangetic Plain',
      framing: 'Over five times the WHO safe limit. Straw burning is one big reason.',
      source: { label: 'CPCB' },
    },
  ] satisfies Stat[],

  plantStats: [
    { value: '4', unit: 'TPD', k: 'CBG output', framing: 'IS 16087:2016, ≥90% methane.' },
    { value: '9,600', unit: 'Nm³/day', k: 'Raw biogas' },
    { value: '500', unit: 'kW', k: 'Captive solar', framing: 'Plant runs on its own power.' },
    { value: '52', unit: 'm³/day', k: 'Liquid manure' },
    { value: '1', unit: 'TPH', k: 'Solid FOM', framing: 'Fermented Organic Manure, returned to farmer fields.' },
    { value: '2.63', unit: 'ac', k: 'Plant land', framing: 'Owned outright by the Managing Director.' },
    { value: '₹33.27', unit: 'Cr', k: 'Total project cost' },
    { value: '120', unit: 'months', k: 'Loan tenure', framing: '10-year term loan with SBI-style lender.' },
  ] satisfies Stat[],

  impactStats: [
    {
      value: '~26,000',
      unit: 'TPA',
      k: 'Feedstock pulled out of burn cycle',
      framing: 'Every tonne we buy is a tonne not set on fire.',
    },
    {
      value: '~365',
      unit: 'TPA',
      k: 'Organic manure returning to soil',
      framing: 'Rebuilding the soil organic carbon decades of chemical farming stripped out.',
    },
    {
      value: '4',
      unit: 'TPD',
      k: 'Clean CBG to IOCL',
      framing: 'Roughly the daily CNG for 80 city buses.',
    },
    {
      value: '500',
      unit: 'kW',
      k: 'Solar self-generation',
      framing: 'Our own electricity bill is zero.',
    },
  ] satisfies Stat[],

  // ---- "WHY THIS PLANT, WHY NOW" — DIFFERENTIATORS ----
  differentiators: [
    {
      title: 'The IOCL Letter of Intent is already in hand.',
      body:
        'Most plants approved under SATAT are still chasing offtake. We are not. Indian Oil has issued our LoI; the plant we are building has a guaranteed buyer for every cubic metre of gas it produces.',
    },
    {
      title: 'The founders own 100% of the equity.',
      body:
        '₹8.37 crore of personal cash sits on the line, alongside a ₹23.40 crore term loan and a ₹1.50 crore unsecured loan. There is no fund clock, no exit-pressure, no investor demanding we cut corners. We finish what we start.',
    },
    {
      title: 'The feedstock is at the doorstep.',
      body:
        'Vizianagaram and Srikakulam districts together hold among the densest paddy-acreage concentrations in coastal Andhra Pradesh within a 50 km radius of the plant (Min. of Agriculture & Farmers\' Welfare). Feedstock is not the question. Logistics, contracts, and payment discipline are. That is what we work on.',
    },
  ],

  // ---- AUDIENCE INTENT CHIPS (used on /contact/) ----
  intents: [
    {
      label: 'I want to supply feedstock',
      href: '/farmers/',
      hint: 'Farmer, aggregator, FPO — Napier grass, paddy straw, cattle dung.',
    },
    {
      label: "I'm an EPC / logistics / FOM partner",
      href: '/contact/#partner',
      hint: 'Sub-contracting, cascade trucks, manure offtake.',
    },
    {
      label: "I'm a journalist",
      href: '/press/',
      hint: 'Logo pack, founder bios, fact-sheet, contact.',
    },
    {
      label: 'I want to work at SVGE',
      href: '/careers/',
      hint: 'Hiring opens once construction begins.',
    },
    {
      label: 'Something else',
      href: '/contact/#general',
      hint: "We'll get back within two business days.",
    },
  ],

  // ---- REGISTRATION ----
  cin: 'U35101AP2024PTC115061',
  gst: '37ABNCS6700N1ZQ',
  udyam: 'UDYAM-AP-09-0027464',
  pan: 'ABNCS6700N',
  founded: '2024-06-12',
  registeredOffice: {
    line1: '6th Line, Maturgi Nagar',
    line2: 'Beside Donkala Mill, Rajam',
    district: 'Srikakulam',
    state: 'Andhra Pradesh',
    pin: '532127',
    country: 'India',
  },
  plant: {
    village: 'Thatipadu',
    mandal: 'Regidi Amadalavalasa',
    district: 'Vizianagaram',
    state: 'Andhra Pradesh',
    pin: '532440',
    lat: 18.487531,
    lng: 83.69774,
    landAcres: 2.63,
  },
  capacity: {
    cbgTpd: 4,
    rawGasNm3PerDay: 9600,
    solarKw: 500,
    workingHoursDay: 24,
    workingDaysYear: 360,
    methaneMinPct: 90,
    standard: 'IS 16087:2016',
  },
  financing: {
    totalCr: 33.27,
    equityCr: 8.37,
    equityPct: 25.15,
    termLoanCr: 23.4,
    termLoanPct: 70.34,
    unsecuredCr: 1.5,
    unsecuredPct: 4.51,
    tenureMonths: 120,
  },
  feedstock: ['Napier grass (contract farming)', 'Paddy straw', 'Cattle dung'],
  outputs: [
    { name: 'Compressed Bio-Gas (CBG)', volume: '4 TPD', buyer: 'Indian Oil Corporation' },
    { name: 'Liquid fermented manure', volume: '52 m³/day', buyer: 'Local farmers' },
    { name: 'Solid Fermented Organic Manure (FOM)', volume: '1 TPH', buyer: 'Local farmers' },
  ],

  // ---- PARTNERS ----
  partners: [
    {
      name: 'Indian Oil Corporation',
      role: 'CBG offtake (Letter of Intent)',
      note: 'Under the Ministry of Petroleum & Natural Gas SATAT scheme — 5,000 plants nationally, 15 MMTPA target.',
    },
    {
      name: 'Raj Process Equipments & Systems Pvt Ltd, Pune',
      role: 'Plant technology partner',
      note: 'SATAT-approved EPC. Anaerobic digester, two-tower VPSA purification, compression, and control systems.',
    },
    {
      name: 'Government of India',
      role: 'Scheme alignment',
      note: 'SATAT · GOBARdhan · MNRE National Bioenergy Programme Phase-I CFA.',
    },
  ],

  // ---- FOUNDERS (story-led, with drafted quotes) ----
  promoters: [
    {
      name: 'Pogiri Suri Rao (Suresh Babu)',
      role: 'Managing Director',
      din: '10665806',
      share: '70%',
      story:
        "Suresh grew up in Ponugutivalasa, started his first business at 26, and has run construction and trading companies across Srikakulam for over two decades. He bought the 2.63-acre Thatipadu plot in 2024 because he was tired of watching paddy straw burn at the edge of his hometown every November.",
      quote:
        "I'm 57. I've spent thirty years building things people walk past every day. Now I want to build a plant that pays the farmers around me to stop burning the field.",
      quoteDraft: true,
      credentials: 'M.Sc. (Mathematics), M.Sc. (Physics), M.Ed. Also Managing Director, Ram Hanumanthe Constructions (OPC) Pvt Ltd.',
    },
    {
      name: 'Pogiri Deepika',
      role: 'Director',
      din: '11358672',
      share: '30%',
      story:
        'Deepika is a 26-year-old co-director — rare on any Indian energy company board, rarer still in rural Andhra. She handles land, regulatory paperwork, and farmer relationships. The least romantic and most important work in any infrastructure project.',
      quote:
        'My only job is to make sure the paperwork never delays a payment.',
      quoteDraft: true,
      credentials: 'B.A. Real Estate background, family-business operations.',
    },
  ],

  // ---- VALUES AS BEHAVIOURAL PROMISES ----
  values: [
    {
      k: 'We use the tech that already works',
      v: 'SATAT-approved anaerobic digestion and VPSA purification. No bespoke chemistry, no science experiments on someone else\'s money.',
    },
    {
      k: 'We pay farmers within 14 days',
      v: 'Every supply slip, every time, into a bank account. No 60-day arrears, no \'next week\' delays.',
    },
    {
      k: 'We measure what we promise',
      v: "We will publish CH₄ purity, dispatched-tonnes, farmer-payments-made, and one financial number every month, from the day concrete is poured.",
    },
    {
      k: 'We start small and finish what we start',
      v: 'One plant. We get it right before we ever talk about a second. Boring, deliberate, on time.',
    },
  ],

  // ---- TIMELINE ----
  timeline: [
    { date: '2024-06-12', label: 'Company incorporated', done: true },
    { date: '2024-07', label: 'Land secured: 2.63 acres, Thatipadu', done: true },
    { date: '2025', label: 'Technology partner selected (Raj Process Equipments & Systems)', done: true },
    { date: '2025', label: 'IOCL Letter of Intent under SATAT', done: true },
    { date: '2026-05', label: 'Pre-construction · site readiness', done: true, current: true },
    { date: '2026', label: 'Construction commencement', done: false },
    { date: '2027', label: 'Commissioning (T+12 months from construction start)', done: false },
  ],

  // ---- SOCIAL ----
  social: {
    linkedin: 'https://www.linkedin.com/company/svge',
  },

  // ---- NAV ----
  // Primary nav lives in the header. Keep it ≤6 items so it doesn't scroll on mobile.
  // Audience-specific pages (Partners, Press, Careers) are reached via segmented CTAs and the footer.
  nav: [
    { href: '/', label: 'Home' },
    { href: '/about/', label: 'About' },
    { href: '/project/', label: 'Project' },
    { href: '/process/', label: 'Process' },
    { href: '/impact/', label: 'Impact' },
    { href: '/farmers/', label: 'Farmers' },
    { href: '/contact/', label: 'Contact' },
  ],
  navSecondary: [
    { href: '/partners/', label: 'Partners' },
    { href: '/press/', label: 'Press' },
    { href: '/careers/', label: 'Careers' },
  ],

  // ---- STATUS (used by the dismissible top chip) ----
  status: {
    phase: 'pre-construction' as 'pre-construction' | 'construction' | 'operational',
    label: 'Pre-construction',
    lastUpdate: '2026-05-14',
    note: 'Latest update on /news/',
    href: '/news/',
  },

  // ---- BUILT-IN-PUBLIC PROMISE (used on /, /about/, footer) ----
  publicPromise:
    'We are pre-construction. From the day concrete is poured we will publish a monthly update — photos, one milestone, one financial number, one thing that went wrong. That is the trust mechanic.',
};
