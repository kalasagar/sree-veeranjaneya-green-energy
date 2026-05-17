#!/usr/bin/env node
/**
 * Build a zipped brand pack from public/brand/ and ship it as
 * public/brand/svge-brand-pack.zip. Idempotent — overwrites on each run.
 *
 * Bundled:
 *   mark.svg, mark_512.png, mark_1024.png, mark_2048.png,
 *   mark_inverted_1024.png, linkedin_banner.png, og_image.png,
 *   plus a generated README.txt with brand notes + boilerplate.
 *
 * Usage:   node scripts/build_brand_pack.mjs
 * Invoked by: package.json's prebuild hook (added below).
 */
import { createWriteStream, existsSync, mkdirSync, statSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createDeflateRaw } from 'node:zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const brandDir = join(root, 'public', 'brand');
const outZip = join(brandDir, 'svge-brand-pack.zip');

const files = [
  'mark.svg',
  'mark_512.png',
  'mark_1024.png',
  'mark_2048.png',
  'mark_inverted_1024.png',
  'linkedin_banner.png',
  'og_image.png',
];

const readme = `SVGE Bio Brand Pack
====================

Sree Veeranjaneya Green Energy Private Limited
CIN U35101AP2024PTC115061
Thatipadu, Vizianagaram, Andhra Pradesh, India

The mark
--------
A forest-green leaf with a saffron flame on a paper field. The leaf is the
feedstock; the flame is what we turn it into. Use the mark on an off-white
or brand-green background; for dark backgrounds use the inverted PNG.

Palette
-------
Forest    #1B5E20
Saffron   #E65100
Gold      #FFB300
Paper     #FAFAF7
Ink       #0A0A0A
Slate     #2A2D34

Typography
----------
Display   Libre Bodoni
Body      Public Sans
Mono      IBM Plex Mono

Use
---
Editorial reuse with attribution is permitted. Don't recolour the mark,
distort its proportions, or place it on a busy photograph without
contrast scrim.

Press contact: svge.india@gmail.com
Press kit on the web: https://kalasagar.github.io/sree-veeranjaneya-green-energy/press/
`;

/* --- minimal stored (no-compression) zip writer --------------------------
 * Pure-Node zip without bundling a dependency. Uses STORED (method 0)
 * for PNG/JPG (already compressed) and DEFLATE (method 8) for text/SVG.
 * Both PKZIP-compatible.
 */
function crc32(buf) {
  let c, table = crc32.t;
  if (!table) {
    table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      table[n] = c >>> 0;
    }
    crc32.t = table;
  }
  c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function deflateRaw(buf) {
  return new Promise((resolve, reject) => {
    const z = createDeflateRaw();
    const chunks = [];
    z.on('data', (c) => chunks.push(c));
    z.on('end', () => resolve(Buffer.concat(chunks)));
    z.on('error', reject);
    z.end(buf);
  });
}

function dosTime(d) {
  return ((d.getHours() & 0x1F) << 11) | ((d.getMinutes() & 0x3F) << 5) | ((d.getSeconds() / 2) & 0x1F);
}
function dosDate(d) {
  return (((d.getFullYear() - 1980) & 0x7F) << 9) | (((d.getMonth() + 1) & 0xF) << 5) | (d.getDate() & 0x1F);
}

async function writeZip() {
  if (!existsSync(brandDir)) { console.error('brand dir missing:', brandDir); process.exit(1); }
  const now = new Date();
  const entries = [];
  let offset = 0;
  const out = createWriteStream(outZip);

  async function addEntry(name, data, compress) {
    const crc = crc32(data);
    const uncompressedSize = data.length;
    let compressed = data;
    let method = 0;
    if (compress) {
      compressed = await deflateRaw(data);
      method = 8;
    }
    const nameBuf = Buffer.from(name, 'utf8');
    const lfh = Buffer.alloc(30);
    lfh.writeUInt32LE(0x04034b50, 0);          // local file header sig
    lfh.writeUInt16LE(20, 4);                   // version needed
    lfh.writeUInt16LE(0, 6);                    // flags
    lfh.writeUInt16LE(method, 8);
    lfh.writeUInt16LE(dosTime(now), 10);
    lfh.writeUInt16LE(dosDate(now), 12);
    lfh.writeUInt32LE(crc, 14);
    lfh.writeUInt32LE(compressed.length, 18);   // compressed size
    lfh.writeUInt32LE(uncompressedSize, 22);    // uncompressed size
    lfh.writeUInt16LE(nameBuf.length, 26);      // file name length
    lfh.writeUInt16LE(0, 28);                    // extra length
    out.write(lfh);
    out.write(nameBuf);
    out.write(compressed);
    entries.push({ name: nameBuf, crc, compressedSize: compressed.length, uncompressedSize, method, offset });
    offset += lfh.length + nameBuf.length + compressed.length;
  }

  // Add README first
  await addEntry('README.txt', Buffer.from(readme, 'utf8'), true);

  // Add brand assets
  for (const f of files) {
    const path = join(brandDir, f);
    if (!existsSync(path)) { console.warn('  skip (missing):', f); continue; }
    const data = readFileSync(path);
    const compress = f.endsWith('.svg') || f.endsWith('.txt');
    await addEntry('SVGE-Bio-Brand-Pack/' + f, data, compress);
    console.log('  +', f, '(' + data.length + ' bytes)');
  }

  // Central directory
  const cdStart = offset;
  for (const e of entries) {
    const cd = Buffer.alloc(46);
    cd.writeUInt32LE(0x02014b50, 0);       // central dir header sig
    cd.writeUInt16LE(20, 4);                // version made by
    cd.writeUInt16LE(20, 6);                // version needed
    cd.writeUInt16LE(0, 8);                 // flags
    cd.writeUInt16LE(e.method, 10);
    cd.writeUInt16LE(dosTime(now), 12);
    cd.writeUInt16LE(dosDate(now), 14);
    cd.writeUInt32LE(e.crc, 16);
    cd.writeUInt32LE(e.compressedSize, 20);
    cd.writeUInt32LE(e.uncompressedSize, 24);
    cd.writeUInt16LE(e.name.length, 28);
    cd.writeUInt16LE(0, 30);                // extra len
    cd.writeUInt16LE(0, 32);                // comment len
    cd.writeUInt16LE(0, 34);                // disk no
    cd.writeUInt16LE(0, 36);                // int attrs
    cd.writeUInt32LE(0, 38);                // ext attrs
    cd.writeUInt32LE(e.offset, 42);
    out.write(cd);
    out.write(e.name);
    offset += cd.length + e.name.length;
  }
  const cdSize = offset - cdStart;

  // End of central directory
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);                 // disk
  eocd.writeUInt16LE(0, 6);                 // disk where CD starts
  eocd.writeUInt16LE(entries.length, 8);    // CD entries on this disk
  eocd.writeUInt16LE(entries.length, 10);   // total CD entries
  eocd.writeUInt32LE(cdSize, 12);
  eocd.writeUInt32LE(cdStart, 16);
  eocd.writeUInt16LE(0, 20);                // comment len
  out.write(eocd);
  out.end();

  await new Promise((r) => out.on('close', r));
  const sz = statSync(outZip).size;
  console.log('wrote', outZip, '(' + (sz / 1024).toFixed(1) + ' KB)');
}

writeZip().catch((e) => { console.error(e); process.exit(1); });
