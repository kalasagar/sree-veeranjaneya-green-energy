#!/usr/bin/env node
// Per-page OG cards.
// For each route, darken its banner crop and overlay title + tagline.
// Output: public/og/<slug>.png at 1200x630.
//
// Pages without a photographic banner get a forest-green wash fallback.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public');
const OUT_DIR = join(PUBLIC, 'og');

const W = 1200;
const H = 630;
const FOREST = '#1B5E20';
const SAFFRON = '#E65100';
const PAPER = '#FAFAF7';
const SLATE = '#37474F';

// Slug -> { title, sub, banner (basename in public/banners, or null) }
// Slug list matches the current 7-route IA (V4.1).
const PAGES = [
  { slug: 'home',             title: 'Burned in the field today. Burned in your engine tomorrow.', sub: 'Compressed Bio-Gas, built in public — Vizianagaram, Andhra Pradesh.',         banner: 'hero_paddy_dawn' },
  { slug: 'about',            title: 'One plant. Two directors. A 2-year clock.',                  sub: 'A two-director Andhra company on a 24-month commissioning clock from IOCL.',   banner: 'about_founder_field' },
  { slug: 'plant',            title: 'Feedstock to fuel. Eight steps. One drawing.',               sub: '4 TPD CBG · IS 16087:2016 spec · 2-tower VPSA · Raj Process, Pune.',           banner: 'project_plant_render' },
  { slug: 'build',            title: 'The capital, the clearances, the clock.',                    sub: '₹33 Cr promoter-led · ₹6.7 Cr central incentives · WHITE category.',          banner: 'build_concrete_pour' },
  { slug: 'build-data-room',  title: 'Lender data room.',                                          sub: 'One-pager: LoI, financing, clearances, commissioning timeline.',              banner: 'build_data_room' },
  { slug: 'farmers',          title: 'Pay in 14 days. By bank transfer.',                          sub: 'Paddy straw, Napier grass, cattle dung — within 40 km of Thatipadu.',          banner: 'farmers_hands_straw' },
  { slug: 'work',             title: 'Work with us.',                                              sub: 'Open RFPs · careers · partner intake. EPC sub-contracting, cascade logistics, FOM offtake.', banner: 'work_meeting_table' },
  { slug: 'press',            title: 'Press kit.',                                                 sub: 'Boilerplate, fact sheet, brand pack, founder quotes.',                         banner: 'press_kit' },
  { slug: 'contact',          title: 'Pick the door that fits.',                                   sub: 'Routes faster than a generic form.',                                           banner: 'contact_doorway' },
  { slug: 'news',             title: 'Built in public. Monthly receipts.',                         sub: 'One photo. One milestone hit. One missed. One thing that went wrong.',         banner: 'news_journal' },
  { slug: 'privacy',          title: 'Privacy policy.',                                            sub: 'What we collect, what we keep, how to delete.',                                banner: null },
  { slug: 'terms',            title: 'Terms of use.',                                              sub: 'Editorial use, accuracy, contract scope.',                                     banner: null },
  { slug: '404',              title: 'That page is not here.',                                     sub: 'The IA was consolidated. Try /plant, /build, /work, or /press.',               banner: null },
];

function svgOverlay(title, sub) {
  // Word-wrap by hand: ~22 chars per line at this size for the title.
  const titleLines = wrap(title, 32);
  const subLines = wrap(sub, 56);
  const baselineY = 360;
  const titleLineH = 86;
  const subLineH = 36;

  const titleTspans = titleLines
    .map((l, i) => `<tspan x="80" dy="${i === 0 ? 0 : titleLineH}">${escape(l)}</tspan>`)
    .join('');
  const subTspans = subLines
    .map((l, i) => `<tspan x="80" dy="${i === 0 ? 0 : subLineH}">${escape(l)}</tspan>`)
    .join('');

  const subStartY = baselineY + titleLines.length * titleLineH + 30;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(10,20,16,0.20)"/>
        <stop offset="50%" stop-color="rgba(10,20,16,0.55)"/>
        <stop offset="100%" stop-color="rgba(10,20,16,0.80)"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <text x="80" y="80" font-family="ui-sans-serif,system-ui,Sora,sans-serif" font-size="22" font-weight="600" letter-spacing="0.18em" fill="${SAFFRON}">SVGE BIO · GRASS TO GAS · FARM TO FUEL</text>
    <text x="80" y="${baselineY}" font-family="ui-sans-serif,system-ui,Sora,sans-serif" font-weight="700" font-size="72" fill="${PAPER}" style="letter-spacing:-0.02em">${titleTspans}</text>
    <text x="80" y="${subStartY}" font-family="ui-sans-serif,system-ui,Sora,sans-serif" font-weight="400" font-size="28" fill="${PAPER}" opacity="0.92">${subTspans}</text>
    <rect x="80" y="${H - 80}" width="60" height="3" fill="${SAFFRON}"/>
    <text x="160" y="${H - 70}" font-family="ui-monospace,'IBM Plex Mono',monospace" font-size="16" fill="${PAPER}" opacity="0.75">Pre-construction · Vizianagaram, Andhra Pradesh</text>
  </svg>`;
}

function escape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function wrap(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if (!cur) { cur = w; continue; }
    if ((cur + ' ' + w).length > maxChars) { lines.push(cur); cur = w; }
    else cur += ' ' + w;
  }
  if (cur) lines.push(cur);
  return lines;
}

// Paper-tinted typographic SVG for pages without a photographic banner.
// Renders the brand mark, the title in display-serif-ish weight, and the
// subtitle below — no scrim, no shadow gradient, no photo crop.
function svgPaperCard(title, sub) {
  const titleLines = wrap(title, 28);
  const subLines = wrap(sub, 50);
  const titleStartY = 280;
  const titleLineH = 80;
  const titleTspans = titleLines
    .map((l, i) => `<tspan x="80" dy="${i === 0 ? 0 : titleLineH}">${escape(l)}</tspan>`)
    .join('');
  const subStartY = titleStartY + titleLines.length * titleLineH + 36;
  const subLineH = 36;
  const subTspans = subLines
    .map((l, i) => `<tspan x="80" dy="${i === 0 ? 0 : subLineH}">${escape(l)}</tspan>`)
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="${PAPER}"/>
    <!-- Saffron rule + brand-mark proxy (a saffron disc) at top-left -->
    <circle cx="100" cy="100" r="20" fill="${SAFFRON}"/>
    <text x="140" y="108" font-family="ui-sans-serif,system-ui,Sora,sans-serif" font-size="22" font-weight="700" letter-spacing="0.04em" fill="${SLATE}">SVGE Bio</text>
    <text x="80" y="180" font-family="ui-sans-serif,system-ui,Sora,sans-serif" font-size="14" font-weight="600" letter-spacing="0.22em" fill="${SAFFRON}">GRASS TO GAS · FARM TO FUEL</text>
    <rect x="80" y="200" width="60" height="3" fill="${SAFFRON}"/>

    <text x="80" y="${titleStartY}" font-family="ui-sans-serif,system-ui,Sora,sans-serif" font-weight="700" font-size="72" fill="${SLATE}" style="letter-spacing:-0.02em">${titleTspans}</text>
    <text x="80" y="${subStartY}" font-family="ui-sans-serif,system-ui,Sora,sans-serif" font-weight="400" font-size="24" fill="#475569">${subTspans}</text>

    <rect x="80" y="${H - 64}" width="${W - 160}" height="1" fill="${SLATE}" opacity="0.18"/>
    <text x="80" y="${H - 30}" font-family="ui-monospace,'IBM Plex Mono',monospace" font-size="14" fill="${SLATE}" opacity="0.6">Pre-construction · Vizianagaram, Andhra Pradesh</text>
  </svg>`;
}

async function buildCard(page) {
  const outPath = join(OUT_DIR, `${page.slug}.png`);

  let base;
  let overlay = null;
  if (page.banner) {
    const candidate = join(PUBLIC, 'banners', `${page.banner}.webp`);
    if (existsSync(candidate)) {
      base = sharp(candidate).resize(W, H, { fit: 'cover', position: 'centre' });
      overlay = Buffer.from(svgOverlay(page.title, page.sub));
    }
  }
  if (!base) {
    // Typographic paper card for pages without a photographic banner
    // (privacy, terms, 404, build-data-room, contact, news). Honest:
    // these aren't lead-magnet pages, so no photo is presented.
    base = sharp(Buffer.from(svgPaperCard(page.title, page.sub)));
  }

  await (overlay
    ? base.composite([{ input: overlay, top: 0, left: 0 }])
    : base
  )
    .png({ quality: 92, compressionLevel: 9 })
    .toFile(outPath);

  return outPath;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  for (const page of PAGES) {
    try {
      const path = await buildCard(page);
      console.log(`  [OK]  ${page.slug.padEnd(22)} -> ${path}`);
    } catch (e) {
      console.log(`  [FAIL] ${page.slug.padEnd(22)} ${e.message}`);
    }
  }
}

await main();
