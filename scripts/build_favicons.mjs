#!/usr/bin/env node
// Build favicon.ico + apple-touch-icon.png from the simplified leaf-flame mark.
// Run: node website/scripts/build_favicons.mjs

import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'public', 'brand', 'mark_simple.svg');
const PUBLIC = join(ROOT, 'public');

const svg = await readFile(SRC);

// apple-touch-icon: 180x180 with a paper-color rounded background.
const APPLE = 180;
const appleBg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${APPLE}" height="${APPLE}">
     <rect width="${APPLE}" height="${APPLE}" rx="36" ry="36" fill="#FAFAF7"/>
   </svg>`,
);
const appleMark = await sharp(svg).resize(140, 140).png().toBuffer();
await sharp(appleBg)
  .composite([{ input: appleMark, gravity: 'center' }])
  .png()
  .toFile(join(PUBLIC, 'apple-touch-icon.png'));

// favicon.ico — bundle 16, 32, 48 PNGs into an .ico
const sizes = [16, 32, 48];
const buffers = await Promise.all(
  sizes.map(async (s) => {
    const bg = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}">
         <rect width="${s}" height="${s}" rx="${Math.round(s * 0.2)}" ry="${Math.round(s * 0.2)}" fill="#FAFAF7"/>
       </svg>`,
    );
    const mark = await sharp(svg).resize(Math.round(s * 0.82), Math.round(s * 0.82)).png().toBuffer();
    return await sharp(bg).composite([{ input: mark, gravity: 'center' }]).png().toBuffer();
  }),
);

// Compose ICO manually (ICONDIR + ICONDIRENTRYs + image data).
function buildIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const headerSize = 6 + count * 16;
  const totalSize = headerSize + pngBuffers.reduce((a, b) => a + b.length, 0);
  const out = Buffer.alloc(totalSize);
  // ICONDIR
  out.writeUInt16LE(0, 0);         // reserved
  out.writeUInt16LE(1, 2);         // type = ICO
  out.writeUInt16LE(count, 4);     // count
  let offset = headerSize;
  for (let i = 0; i < count; i++) {
    const s = sizes[i];
    const e = 6 + i * 16;
    out.writeUInt8(s === 256 ? 0 : s, e);     // width
    out.writeUInt8(s === 256 ? 0 : s, e + 1); // height
    out.writeUInt8(0, e + 2);                  // palette
    out.writeUInt8(0, e + 3);                  // reserved
    out.writeUInt16LE(1, e + 4);               // color planes
    out.writeUInt16LE(32, e + 6);              // bpp
    out.writeUInt32LE(pngBuffers[i].length, e + 8); // size
    out.writeUInt32LE(offset, e + 12);         // offset
    pngBuffers[i].copy(out, offset);
    offset += pngBuffers[i].length;
  }
  return out;
}

const ico = buildIco(buffers, sizes);
await writeFile(join(PUBLIC, 'favicon.ico'), ico);

console.log('  [OK] apple-touch-icon.png (180x180)');
console.log(`  [OK] favicon.ico (${sizes.join(', ')}) — ${ico.length} bytes`);
