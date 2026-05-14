# SVGE Website

Astro 6 static site for Sree Veeranjaneya Green Energy Pvt Ltd.

## Stack

- **Framework:** Astro 6 (static output, zero JS by default)
- **Styling:** Tailwind v4 + custom CSS variables (brand)
- **Content:** MDX support for rich blog/news posts
- **Map:** Leaflet + OpenStreetMap (no API key)
- **Forms:** Cloudflare Pages Function `/api/contact` → MailChannels relay → `svge.india@gmail.com`
- **Hosting:** Cloudflare Pages (free tier — unlimited bandwidth, builds)

## Local dev

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # static output → ./dist/
npm run preview      # serve the built output locally
```

Requires **Node 22+**.

## Brand assets

Locked winner mark at `public/brand/mark.svg`. All raster sizes (`mark_{16..2048}.png`),
favicons, LinkedIn banner, and OG image are in `public/brand/`.

To re-vectorize from a different winning candidate, regenerate the brand kit:

```bash
cd ../   # back to ~/personal/svge
/Users/spogiri/personal/creative-studio/.venv/bin/python scripts/vectorize.py r3:c11_paddy_frame_leaf_v1
cp brand/WINNER/* website/public/brand/
```

## Deploy to Cloudflare Pages

### One-time setup

1. Push this repo to GitHub (suggested: org `svge-india`, repo `website`).
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Pick `svge-india/website`, branch `main`.
4. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** `22` (set env var `NODE_VERSION=22` if needed)
5. **Save and Deploy.** Cloudflare gives you `svge.pages.dev`.

### Environment variables (Pages → Settings → Environment variables)

| Variable | Value | Purpose |
|---|---|---|
| `CONTACT_TO` | `svge.india@gmail.com` | Where contact form mails go |
| `CONTACT_FROM` | `noreply@svge.pages.dev` | Sender envelope |

### What goes live where

- `/`, `/about/`, `/project/`, ... → static HTML served from CF edge
- `/api/contact` → Cloudflare Pages Function (free, no paid Workers plan)
- `/sitemap-index.xml`, `/sitemap-0.xml` → generated at build
- `/robots.txt`, `/_headers` → static
- All `/brand/*` and `/_astro/*` → immutable 1y cache

## Custom domain (later)

When you buy a domain (e.g. `svge-energy.in`):
1. Cloudflare → Pages → Custom domains → Add.
2. Update DNS to point at `<project>.pages.dev`.
3. Update `astro.config.mjs` `site:` and `src/lib/site.ts` `url:`.
4. Update `CONTACT_FROM` to e.g. `noreply@svge-energy.in`.

## Lighthouse target

After deploy:
```bash
npx lighthouse https://svge.pages.dev --quiet --chrome-flags="--headless"
```
Target: ≥95 on Performance / A11y / Best Practices / SEO.

## Repo conventions

- All static facts live in `src/lib/site.ts` — single source of truth.
- Pages in `src/pages/` are kebab-case; output uses `trailingSlash: 'always'`.
- News/blog posts go in `src/content/news/*.mdx` (collection in Phase 2).
- Don't commit `.env*` files.

## Status

| Section | Status |
|---|---|
| Brand kit wired | ✅ |
| Home, About, Project, Process, Impact, Partners, Contact | ✅ |
| Leaflet plant map | ✅ |
| JSON-LD Organization | ✅ |
| Sitemap, robots, security headers | ✅ |
| OG / social cards | ✅ |
| Contact form (CF Pages Function + MailChannels) | ✅ |
| News content collection | ⏳ Phase 2 |
| Telugu i18n | ⏳ Phase 2 |
