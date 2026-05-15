// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // GitHub Pages project site: served at kalasagar.github.io/sree-veeranjaneya-green-energy/
  site: 'https://kalasagar.github.io',
  base: '/sree-veeranjaneya-green-energy',
  trailingSlash: 'always',
  build: { format: 'directory' },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  vite: { plugins: [tailwindcss()] },
  // V3 IA consolidation — old URLs redirect into the 7 new routes.
  redirects: {
    '/process/': '/plant/',
    '/process/engineering/': '/plant/',
    '/project/': '/build/',
    '/impact/': '/build/',
    '/partners/': '/work/',
    '/careers/': '/work/',
    '/news/': '/press/',
  },
  integrations: [
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});
