// SVGE site — single source of truth for copy, stats, and structured data.
// Voice: operator-formal with editorial restraint. Lead with a fact + a date.
// Scale framing: this one plant only. No portfolio talk. No founder emotion.
// PII guardrails: founder ages, residential addresses, individual rupee figures, IRR/DSCR are off-limits.

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
    "A 4-TPD Compressed Bio-Gas plant under SATAT in coastal Andhra Pradesh. Indian Oil Letter of Intent issued 04.10.2024 (ref IndianOil/SATAT/01/3931). Tech partner Raj Process Equipments, Pune. Built to IS 16087:2016 spec, WHITE pollution category, on a 2-year commissioning clock.",
  url: 'https://kalasagar.github.io/sree-veeranjaneya-green-energy',
  email: 'svge.india@gmail.com',
  // Phone intentionally not published until plant is operational.

  // ---- HERO MANIFESTO (home page — approved as-is by user) ----
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
    { value: '~₹33', unit: 'Cr', k: 'Total project cost', framing: 'Promoter-led, public-sector term loan, ₹6.7 Cr confirmed central incentives.' },
    { value: 'WHITE', k: 'CPCB category', framing: 'Lowest-impact tier — energy-crop CBG plants are classified WHITE.' },
  ] satisfies Stat[],

  impactStats: [
    {
      value: '~29,000',
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
      value: '~120',
      k: 'Direct + indirect jobs',
      framing: '47 on plant payroll, plus aggregators, drivers, and farmer suppliers in a 40-km radius.',
    },
  ] satisfies Stat[],

  // ---- "WHY THIS PLANT, WHY NOW" — DIFFERENTIATORS ----
  differentiators: [
    {
      title: 'The IOCL Letter of Intent is already in hand.',
      body:
        'IOCL issued our Letter of Intent on 04.10.2024 (ref IndianOil/SATAT/01/3931). The plant we are building has a contracted buyer for every cubic metre of gas it produces. Commercial Agreement validity is 15 years, indexed to a published procurement price floor of Rs. 46/kg + taxes through 31.03.2029. Most plants approved under SATAT are still chasing offtake; we are not.',
    },
    {
      title: 'No fund clock. No exit pressure.',
      body:
        'Construction is promoter-led, backed by a 10-year public-sector term loan and ₹6.7 crore of confirmed central-government incentives — MNRE Capital Financial Assistance, AGRL Ministry support, and the FOM Market Development Assistance scheme. There is no investor demanding we cut corners on a quarter. We finish what we start.',
    },
    {
      title: 'The feedstock is at the doorstep.',
      body:
        'The plant runs on Napier grass grown within 40 km of Thatipadu, plus paddy straw and cattle dung from the same belt. Vizianagaram and Srikakulam together hold among the densest paddy-acreage concentrations in coastal Andhra Pradesh. Feedstock supply is not the question. Logistics, contracts, and 14-day payment discipline are. That is what we work on.',
    },
  ],

  // ---- AUDIENCE INTENT CHIPS (used on /contact/) ----
  intents: [
    {
      label: 'I want to supply feedstock',
      href: '/farmers/',
      hint: 'Farmer, aggregator, FPO — Napier grass, paddy straw, cattle dung within 40 km.',
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
      hint: 'First hiring tranche begins around plant commissioning (target Q3 2026).',
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
  rocName: 'ROC Vijayawada',
  registrationNumber: '115061',
  smallCompany: true,
  founded: '2024-06-12',
  // The company was incorporated as an OPC on 12-06-2024 and converted to a
  // two-director Private Limited on 25-10-2025 when Deepika joined as Director.
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
    // Concentric distance rings used by RadiusMap.
    distances: [
      { km: 8, label: 'Regidi Amadalavalasa', kind: 'town' },
      { km: 24, label: 'Bobbili', kind: 'town' },
      { km: 33, label: 'Rajam (registered office)', kind: 'office' },
      { km: 40, label: 'Feedstock catchment', kind: 'supply' },
      { km: 75, label: 'IOCL retail-outlet dispatch cap (LoI cl. 5)', kind: 'dispatch' },
      { km: 122, label: 'Visakhapatnam port', kind: 'port' },
    ] as { km: number; label: string; kind: 'town' | 'office' | 'supply' | 'dispatch' | 'port' }[],
  },
  capacity: {
    cbgTpd: 4,
    rawGasNm3PerDay: 9600,
    solarKw: 500,
    workingHoursDay: 24,
    workingDaysYear: 360,
    methaneMinPct: 90,
    standard: 'IS 16087:2016',
    digesterType: 'CSTR',
    digesterCount: 4,
    digesterDiameterM: 26,
    digesterHeightM: 8.63,
    digesterTotalVolumeM3: 15402,
    hydraulicRetentionTimeDays: 34,
    organicLoadingRateKgPerM3Day: 1.75,
    purification: '2-tower VPSA',
    gasDryerDewPointC: -40,
    compressionBar: 250,
  },

  // ---- FINANCING (qualitative shape only — no rupee line items) ----
  financing: {
    totalCr: 33.27,
    structure: 'promoter-led with a 10-year public-sector term loan and family contribution',
    termYears: 10,
    incentivesCr: 6.7,
    incentivesDetail: 'MNRE Capital Financial Assistance + AGRL Ministry support + FOM Market Development Assistance under Ministry of Chemicals & Fertilizers',
    taxHolidayYears: 5,
    taxHolidayBasis: 'Income Tax Act provision for CBG plants',
  },

  // ---- IOCL LETTER OF INTENT ----
  loi: {
    issuer: 'Indian Oil Corporation (Alternate Energy & Sustainable Development)',
    issuerSignatory: 'F. Mazumdar, General Manager (AE)',
    reference: 'IndianOil/SATAT/01/3931',
    date: '2024-10-04',
    nieoiReference: 'CBG73',
    nieoiReleased: '2024-08-01',
    applicationDate: '2024-08-30',
    quantityTpd: 4.0,
    commissioningDeadline: '2026-10-04',
    commercialAgreementYears: 15,
    priceFloorRsKg: 46,
    priceFloorThrough: '2029-03-31',
    iocPriceLadderRevised: '2025-06-01',
    iocCnglinkagePct: 85,
  },

  // ---- STATUTORY CLEARANCES ----
  clearances: {
    category: 'WHITE' as 'WHITE' | 'GREEN' | 'ORANGE' | 'RED',
    categoryBasis: 'Agri-biomass / energy-crop CBG plant; CPCB classification',
    environmentalClearanceRequired: false,
    obtained: [
      { item: 'Local Body Clearance', authority: 'Panchayat / Municipal' },
      { item: 'Electricity Load', authority: 'Electricity Board' },
      { item: 'Pollution Consent to Establish', authority: 'State PCB (Water Act 1974 + Air Act 1981)' },
      { item: 'Inspector of Factories Approval', authority: 'Factories Act 1948' },
    ],
    applied: [
      { item: 'Fire safety NoC', authority: 'Fire Department' },
      { item: 'PESO Online Approval', authority: 'PESO (Gas Cylinder Rules 2016)' },
      { item: 'PESO Approval Stamping', authority: 'PESO (Gas Cylinder Rules 2016)' },
    ],
    afterCOD: [
      { item: 'Pollution Consent to Operate', authority: 'State PCB' },
    ],
  },

  // ---- TEAM & EMPLOYMENT ----
  team: {
    plantHeadcount: 47,
    totalJobs: 120,
    localHirePolicy: 'Local hire first — operations, lab, aggregation, accounts, driving, watchmen.',
    catchmentRadiusKm: 40,
    // Coarse role-band split for TeamComposition. Plant + extended supply chain.
    roleBands: [
      { band: 'Operations & shift', plant: 22, extended: 0, note: 'Plant operators, control room, shift supervisors.' },
      { band: 'Maintenance & utilities', plant: 11, extended: 0, note: 'Mechanical, electrical, instrumentation, civil upkeep.' },
      { band: 'Lab, QC & dispatch', plant: 8, extended: 0, note: 'Gas analysers, IS 16087 sampling, dispatch slip integrity.' },
      { band: 'Aggregation & accounts', plant: 6, extended: 73, note: 'Farmer-side: drivers, aggregators, accounts, watchmen, contract harvest crews within 40 km.' },
    ],
  },

  // ---- INDUSTRY CONTEXT (R1 facts, dated) ----
  industry: {
    satatLaunchedYear: 2018,
    satatTargetPlants: 5000,
    satatTargetMmtpa: 15,
    satatCommissioned: 80,                 // 30.11.2024 (MoPNG Year-End Review 2024)
    satatUnderConstruction: 72,            // same source
    satatCommissionedAsOfDate: '2024-11-30',
    andhraPlantsCommissioned: 7,           // GOBARdhan portal snapshot end-2025
    asOfDate: '2025-12-31',
    sources: [
      { label: 'MoPNG Year-End Review 2024', url: 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2090844' },
      { label: 'GOBARdhan portal', url: 'https://gobardhan.co.in/' },
    ],
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
      role: 'CBG offtake — Letter of Intent issued 04.10.2024',
      note: 'Under the Ministry of Petroleum & Natural Gas SATAT scheme. 15-year Commercial Agreement validity. Floor procurement price Rs. 46/kg through 31.03.2029, indexed thereafter to CNG retail prices.',
    },
    {
      name: 'Raj Process Equipments & Systems Pvt Ltd, Pune',
      role: 'Plant technology partner — SATAT-approved EPC',
      note: 'CSTR anaerobic digester, two-tower VPSA biogas upgrading, compression and cascade dispatch system, all-instrument SCADA. 1,500+ installations across 31+ countries.',
    },
    {
      name: 'Government of India',
      role: 'Scheme alignment',
      note: 'SATAT · GOBARdhan · MNRE National Bioenergy Programme Phase-I CFA · FOM Market Development Assistance under Ministry of Chemicals & Fertilizers.',
    },
  ],

  // ---- FOUNDERS (operator-formal voice) ----
  promoters: [
    {
      name: 'Pogiri Suri Rao (Suresh Babu)',
      role: 'Managing Director',
      din: '10665806',
      share: '70%',
      story:
        "Suresh runs SVGE as Managing Director (DIN 10665806). He has built and managed construction and trading businesses across Srikakulam since 1998, and continues as Managing Director of Ram Hanumathe Constructions (OPC) Pvt Ltd (U43900AP2024OPC115316). He bought the 2.63-acre Thatipadu plot for SVGE in 2024.",
      quote:
        "I've spent thirty years building things people walk past every day in Srikakulam. SVGE is the first that pays farmers in this district to stop burning the field.",
      quoteDraft: true,
      credentials: 'M.Sc. (Mathematics), M.Sc. (Physics), M.Ed. Also Managing Director, Ram Hanumathe Constructions (OPC) Pvt Ltd.',
    },
    {
      name: 'Pogiri Deepika',
      role: 'Director',
      din: '11358672',
      share: '30%',
      story:
        'Deepika joined the SVGE board on 25.10.2025 as Director (DIN 11358672) when the company expanded from a single-director structure to a two-director Private Limited. She handles land, regulatory paperwork, and farmer relationships — the least romantic and most important work in any infrastructure project.',
      quote:
        'My job is to make sure the paperwork never delays a payment.',
      quoteDraft: true,
      credentials: 'Director, SVGE — joined October 2025.',
    },
  ],

  // ---- VALUES AS BEHAVIOURAL PROMISES ----
  values: [
    {
      k: 'We use the tech that already works',
      v: 'SATAT-approved anaerobic digestion and two-tower VPSA upgrading from Raj Process Equipments. No bespoke chemistry, no science experiments.',
    },
    {
      k: 'We pay farmers within 14 days',
      v: 'Every supply slip, every time, into a bank account. No 60-day arrears, no \'next week\' delays.',
    },
    {
      k: 'We measure what we promise',
      v: "From the day concrete is poured, we publish one monthly update: CH₄ purity, dispatched tonnes, farmer payments made, one financial number, one thing that went wrong.",
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
    { date: '2024-10-04', label: 'IOCL Letter of Intent issued (ref IndianOil/SATAT/01/3931)', done: true },
    { date: '2025-10-25', label: 'Converted to two-director Private Limited; Deepika joined as Director', done: true },
    { date: '2026-Q2', label: 'Pre-construction · site readiness', done: true, current: true },
    { date: '2026-Q3', label: 'Construction begins · first monthly public update', done: false },
    { date: '2026-10-04', label: 'IOCL commissioning deadline (LoI clause 2)', done: false },
    { date: '2027', label: 'Commissioning + commercial dispatch to IOCL retail outlets', done: false },
  ],

  // ---- SOCIAL ----
  social: {
    linkedin: 'https://www.linkedin.com/company/svge',
  },

  // ---- NAV ----
  // V3 consolidation: 11 routes → 7. /plant absorbs /process + /process/engineering;
  // /build absorbs /project + /impact; /work absorbs /partners + /careers; /press
  // absorbs /news. Old routes redirect via astro.config.mjs.
  nav: [
    { href: '/', label: 'Home' },
    { href: '/about/', label: 'About' },
    { href: '/plant/', label: 'Plant' },
    { href: '/build/', label: 'Build' },
    { href: '/farmers/', label: 'Farmers' },
    { href: '/work/', label: 'Work' },
    { href: '/press/', label: 'Press' },
    { href: '/contact/', label: 'Contact' },
  ],
  navSecondary: [] as { href: string; label: string }[],

  // ---- STATUS (used by StatusStrip on every page) ----
  status: {
    phase: 'pre-construction' as 'pre-construction' | 'construction' | 'commissioning' | 'operational',
    phaseLabel: 'Pre-construction',
    label: 'Pre-construction · LoI active',
    lastUpdate: '2026-05-15',
    note: 'Construction begins Q3 2026 · LoI commissioning deadline 04.10.2026',
    href: '/press/#journal',
    clearancesObtained: 4,
    clearancesTotal: 7,
    // Ordered phase chips for StatusStrip phase indicator.
    phases: ['Pre-construction', 'Construction', 'Commissioning', 'Operational'] as const,
  },

  // ---- PER-ROUTE TONAL ACCENT (set as data-tone on <body>) ----
  tones: {
    '/': 'field',
    '/about/': 'paper',
    '/plant/': 'lab',
    '/build/': 'lender',
    '/farmers/': 'harvest',
    '/work/': 'lender',
    '/press/': 'ink',
    '/contact/': 'paper',
  } as Record<string, 'field' | 'paper' | 'lab' | 'lender' | 'harvest' | 'ink' | 'forest'>,

  // ---- DAILY MASS-FLOW (drives CBGSankey + DayInTheData) ----
  massFlow: {
    feedstockTpd: 72,
    napierTpd: 50,
    paddyStrawTpd: 14,
    dungTpd: 8,
    waterRecycledM3PerDay: 145,
    slurryToDigesterM3PerDay: 216,
    rawBiogasNm3PerDay: 9600,
    cbgTpd: 4,
    cbgMethanePct: 90,
    fomSolidTph: 1,
    fomLiquidM3PerDay: 52,
    cascadesPerDay: 4,
    // Roughly 75 km radius cap means most loads route to local IOCL retail outlets.
    dispatchKmCap: 75,
  },

  // ---- "WHAT 4 TPD LOOKS LIKE" (drives ComparisonCards) ----
  comparisons: [
    { value: '~9,600', unit: 'Nm³/day', label: 'Raw biogas', framing: 'Volume at standard temperature & pressure.', source: 'DPR §4.2' },
    { value: '~80', unit: 'buses/day', label: 'Equivalent CNG fuelling', framing: 'A 12-m city bus at typical CNG mileage uses ~50 kg/day.', source: 'Derived from CBG output × CNG bus consumption' },
    { value: '~29,000', unit: 'TPA', label: 'Feedstock out of burn cycle', framing: 'Paddy straw + Napier + dung diverted from open-field burning or waste.', source: 'DPR §3.1 feedstock plan' },
    { value: '~365', unit: 'TPA', label: 'Solid FOM returned to soil', framing: 'Fermented Organic Manure shipped back to farmer fields.', source: 'DPR §4.6 digestate' },
    { value: '~10,000', unit: 'tCO₂e/yr', label: 'Avoided emissions', framing: 'Versus straw burning + diesel/CNG displacement. SATAT scheme indicative.', source: 'MoPNG SATAT prospectus' },
    { value: '~120', unit: 'jobs', label: 'Direct + indirect roles', framing: '47 plant payroll + 73 aggregation/transport/farmer-side roles in the 40-km radius.', source: 'DPR §5 manpower plan' },
  ],

  // ---- FARMER CALCULATOR (yield × price constants) ----
  // Coarse, conservative ranges intended for "what could my plot earn" sketching,
  // not contract numbers. All in INR.
  crops: [
    { id: 'napier', label: 'Napier grass (contract)', yieldTpaPerHa: 70, ratePerTonneInr: 1200, harvestsPerYear: 6, note: 'Perennial; 5-year offtake contract; 6 harvests/yr' },
    { id: 'paddyStraw', label: 'Paddy straw (post-harvest)', yieldTpaPerHa: 4, ratePerTonneInr: 1800, harvestsPerYear: 2, note: 'Otherwise burned; cleared in 2 windows/yr' },
    { id: 'dung', label: 'Cattle dung (per animal/yr)', yieldTpaPerHa: 2, ratePerTonneInr: 1500, harvestsPerYear: 12, note: 'Per cattle head/yr basis; monthly pickup' },
  ],

  // ---- GLOSSARY (drives SpecGlossary) ----
  glossary: [
    { term: 'CBG', long: 'Compressed Bio-Gas', def: 'Upgraded biogas with ≥90% methane, compressed to 250 bar for transport in cascade cylinders. Spec defined by IS 16087:2016.' },
    { term: 'CSTR', long: 'Continuously Stirred Tank Reactor', def: 'Anaerobic digester design where slurry is kept in suspension by mechanical stirring. The SVGE plant runs four CSTRs of 26 m × 8.63 m each.' },
    { term: 'HRT', long: 'Hydraulic Retention Time', def: 'Average time a unit of slurry spends inside the digester. SVGE design HRT is 34 days — long enough for methanogens to complete digestion.' },
    { term: 'OLR', long: 'Organic Loading Rate', def: 'Mass of volatile solids fed per cubic metre of digester volume per day. SVGE design OLR is 1.75 kg VS/m³/day — conservative for CSTR.' },
    { term: 'VS', long: 'Volatile Solids', def: 'The biodegradable fraction of feedstock dry matter. The digester only digests VS; the rest passes through as digestate.' },
    { term: 'VPSA', long: 'Vacuum Pressure Swing Adsorption', def: 'Two-tower process that separates methane from CO₂ + trace gases by alternately adsorbing under pressure and desorbing under vacuum. SVGE uses a 2-tower VPSA from Raj Process.' },
    { term: 'PSA', long: 'Pressure Swing Adsorption', def: 'Gas-drying technique using adsorbent beds cycled by pressure. Drops the dew point of CBG to −40 °C, well below IS 16087.' },
    { term: 'IS 16087:2016', long: 'Indian standard for BioCNG/CBG', def: 'BIS specification for compressed biogas as automotive fuel. Sets minimum methane (≥90%), maximum CO₂ (≤4%), O₂ (≤0.5%), total sulphur (≤20 mg/m³), and water dew point (≤5 mg/m³).' },
    { term: 'FOM', long: 'Fermented Organic Manure', def: 'The solid digestate fraction after slurry separation. Stable, fibrous, sold back to farmers as a soil amendment under the Ministry of C&F MDA scheme.' },
    { term: 'SATAT', long: 'Sustainable Alternative Towards Affordable Transportation', def: 'MoPNG scheme launched 2018 to procure CBG via Letters of Intent issued by OMCs (IOCL/BPCL/HPCL). Targets 5,000 plants and 15 MMTPA CBG nationally.' },
    { term: 'LoI', long: 'Letter of Intent', def: "Indian Oil's commitment to procure CBG at a published floor price for a defined Commercial Agreement validity. SVGE's LoI was issued 04.10.2024, ref IndianOil/SATAT/01/3931." },
    { term: 'CFA', long: 'Capital Financial Assistance', def: 'A grant component under MNRE National Bioenergy Programme Phase-I. One of three central incentives contributing to SVGE\'s ₹6.7 Cr block.' },
    { term: 'MDA', long: 'Market Development Assistance', def: 'Ministry of Chemicals & Fertilizers subsidy for selling FOM (fermented organic manure). Applies per-tonne to dispatches off the plant.' },
    { term: 'PESO', long: 'Petroleum and Explosives Safety Organisation', def: 'Indian regulator under MoCI. Approves CBG cascade design, dispenser safety, and on-site storage under Gas Cylinder Rules 2016. SVGE has applied; approval is sequenced for pre-commissioning.' },
    { term: 'WHITE category', long: 'CPCB pollution category', def: 'The lowest-impact CPCB tier. Energy-crop CBG plants are classified WHITE — only basic Consent to Establish + Consent to Operate are required.' },
  ],

  // ---- RFP CATEGORIES (drives /work#rfps) ----
  rfps: [
    { id: 'civil', label: 'Civil works & ground prep', status: 'open', scope: 'Site grading, CSTR foundations, control room, perimeter. ~2.63 acres at Thatipadu.', contact: 'svge.india@gmail.com' },
    { id: 'epc', label: 'EPC integration support', status: 'awarded', scope: 'Process integration is awarded to Raj Process Equipments & Systems, Pune. Sub-contractor RFPs for specific skids may open.', contact: 'svge.india@gmail.com' },
    { id: 'logistics', label: 'CBG cascade logistics', status: 'open', scope: 'Cascade trailers (250 bar IS 15319) for dispatch to IOCL retail outlets within ~75 km.', contact: 'svge.india@gmail.com' },
    { id: 'feedstock', label: 'Feedstock aggregation', status: 'open', scope: 'Paddy-straw aggregation crews, Napier contract farming, dung pickup routes within 40 km radius.', contact: 'svge.india@gmail.com' },
    { id: 'fom', label: 'FOM offtake & distribution', status: 'open', scope: 'Liquid + solid FOM offtake. ~365 TPA solid + ~52 m³/day liquid. MDA-eligible.', contact: 'svge.india@gmail.com' },
    { id: 'instruments', label: 'Instrumentation & SCADA', status: 'discussion', scope: 'Gas analysers (CH₄ / CO₂ / O₂ / H₂S), dew-point sensors, integration with dispatch SCADA.', contact: 'svge.india@gmail.com' },
  ] as { id: string; label: string; status: 'open' | 'discussion' | 'awarded'; scope: string; contact: string }[],

  // ---- BUILT-IN-PUBLIC PROMISE (used on /, /about/, footer) ----
  publicPromise:
    'We are pre-construction. From the day concrete is poured we will publish a monthly update — photos, one milestone hit, one missed, one financial number, one thing that went wrong. That is the trust mechanic.',
};
