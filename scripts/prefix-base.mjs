#!/usr/bin/env node
/**
 * Post-build base-path prefixer for GitHub Pages.
 *
 * Astro emits root-absolute hrefs/srcs (e.g. href="/about/", src="/brand/x.svg").
 * On a GHP project page at /<repo>/, those 404. This script rewrites every HTML/CSS/JS
 * file under dist/ to prefix root-absolute paths with the configured base.
 *
 * - Skips fully-qualified URLs (http://, https://, mailto:, tel:, #, //, data:)
 * - Skips already-prefixed paths
 * - Handles href, src, srcset, content (OG meta), and url() inside CSS
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join, extname } from 'node:path';

const ROOT = resolve('./dist');
const BASE = '/sree-veeranjaneya-green-energy';

const EXTS = new Set(['.html', '.xml', '.css', '.js', '.json']);
const SKIP_PREFIXES = ['http://', 'https://', '//', 'mailto:', 'tel:', '#', 'data:', 'javascript:'];

function shouldRewrite(path) {
  if (!path) return false;
  if (SKIP_PREFIXES.some(p => path.startsWith(p))) return false;
  if (!path.startsWith('/')) return false;
  if (path.startsWith(BASE + '/') || path === BASE) return false;
  return true;
}

function prefix(path) {
  return shouldRewrite(path) ? BASE + path : path;
}

function rewriteAttr(content, attr) {
  // attr="/path" or attr='/path'
  return content.replace(
    new RegExp(`(\\s${attr}=)(["'])([^"']+)\\2`, 'g'),
    (_, pre, quote, val) => `${pre}${quote}${prefix(val)}${quote}`,
  );
}

function rewriteSrcset(content) {
  return content.replace(
    /(\ssrcset=)(["'])([^"']+)\2/g,
    (_, pre, quote, val) => {
      const fixed = val
        .split(',')
        .map(part => {
          const trimmed = part.trim();
          const [url, ...rest] = trimmed.split(/\s+/);
          return [prefix(url), ...rest].join(' ');
        })
        .join(', ');
      return `${pre}${quote}${fixed}${quote}`;
    },
  );
}

function rewriteCssUrls(content) {
  return content.replace(
    /url\((["']?)([^)"']+)\1\)/g,
    (m, quote, val) => `url(${quote}${prefix(val)}${quote})`,
  );
}

function rewriteXmlLoc(content) {
  // sitemap-0.xml uses <loc>https://kalasagar.github.io/...</loc> — site URL handled by config,
  // but inner paths inside rss like <link>/path</link> need the prefix.
  return content.replace(
    /<link>(\/[^<]*)<\/link>/g,
    (_, val) => `<link>${prefix(val)}</link>`,
  );
}

function walk(dir, cb) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, cb);
    else if (EXTS.has(extname(p))) cb(p);
  }
}

let touched = 0;
walk(ROOT, (file) => {
  const original = readFileSync(file, 'utf8');
  let out = original;
  if (file.endsWith('.html')) {
    for (const attr of ['href', 'src', 'content']) {
      out = rewriteAttr(out, attr);
    }
    out = rewriteSrcset(out);
  } else if (file.endsWith('.xml')) {
    out = rewriteXmlLoc(out);
  } else if (file.endsWith('.css')) {
    out = rewriteCssUrls(out);
  } else if (file.endsWith('.js')) {
    // JS may have inlined string literals like "/banners/..."
    out = out.replace(
      /(["'])(\/(?!\/)[\w\-./]+\.(?:png|jpg|jpeg|webp|avif|svg|ico|css|js|json|xml|mp4|webm|pdf|woff2?))\1/g,
      (_, quote, val) => `${quote}${prefix(val)}${quote}`,
    );
  } else if (file.endsWith('.json')) {
    // sitemap-related JSON or manifest — leave alone unless necessary
  }
  if (out !== original) {
    writeFileSync(file, out);
    touched += 1;
  }
});

console.log(`prefix-base: rewrote ${touched} files with base "${BASE}"`);
