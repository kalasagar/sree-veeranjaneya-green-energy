#!/usr/bin/env node
// Generate responsive banner sizes (640w, 1024w, 1600w) from the 1920w sources.
// Output: public/banners/<name>-{640,1024,1600}.{avif,webp}
// Run: node website/scripts/generate_banner_sizes.mjs

import { readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BANNERS = join(__dirname, '..', 'public', 'banners');
const WIDTHS = [640, 1024, 1600];

const sources = (await readdir(BANNERS))
  .filter((f) => f.endsWith('.webp') && !/-(640|1024|1600)\.webp$/.test(f))
  .map((f) => f.replace(/\.webp$/, ''));

const results = [];
for (const name of sources) {
  const src = join(BANNERS, `${name}.webp`);
  for (const w of WIDTHS) {
    const avifOut = join(BANNERS, `${name}-${w}.avif`);
    const webpOut = join(BANNERS, `${name}-${w}.webp`);
    if (!existsSync(avifOut)) {
      await sharp(src).resize(w).avif({ quality: 60, effort: 6 }).toFile(avifOut);
    }
    if (!existsSync(webpOut)) {
      await sharp(src).resize(w).webp({ quality: 78, effort: 6 }).toFile(webpOut);
    }
    results.push({ name, w });
  }
  console.log(`  [OK] ${name} -> 640 / 1024 / 1600`);
}
console.log(`\n${results.length} variants written to ${BANNERS}`);
