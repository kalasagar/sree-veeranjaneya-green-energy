# Deploying SVGE to GitHub Pages

The repo is configured to publish to `https://kalasagar.github.io/sree-veeranjaneya-green-energy/` via GitHub Actions.

## One-time setup

1. Push the repo to `github.com/kalasagar/sree-veeranjaneya-green-energy` (done — see git origin).
2. GitHub web UI → repo **Settings** → **Pages**.
3. Under "Build and deployment":
   - **Source:** GitHub Actions
4. Save. The first build runs automatically on the next push to `main`.

## Set up the contact form (Formspree)

The contact form posts to `https://formspree.io/f/<id>`. Right now the form has a placeholder ID. Replace it:

1. Sign up free at <https://formspree.io/>.
2. Create a new form. Set the destination email to `svge.india@gmail.com`.
3. Copy the form ID (looks like `xayzwvut`).
4. Edit `src/pages/contact.astro` — find `REPLACE_WITH_FORMSPREE_ID` and replace.
5. Commit and push. Site rebuilds automatically.

Formspree free tier: 50 submissions/month. Pre-construction volume will not exceed that.

## How a deploy works

```
git push origin main
     │
     ▼
GitHub Actions workflow (.github/workflows/deploy.yml)
     │
     ├─ Checkout
     ├─ Setup Node 22
     ├─ npm ci
     ├─ npm run build       # Astro build + scripts/prefix-base.mjs (rewrites paths for the /<repo>/ subpath)
     └─ Upload dist/ to GitHub Pages
     │
     ▼
Live at https://kalasagar.github.io/sree-veeranjaneya-green-energy/
```

Each push triggers a fresh deploy. Build time is ~30 s end-to-end.

## What the base-path prefixer does

GitHub Pages serves project sites at `/<repo>/`, not at `/`. Astro emits root-absolute hrefs like `href="/about/"` — those would 404 on GHP. The post-build script `scripts/prefix-base.mjs` walks `dist/` and prefixes every internal href/src/srcset/CSS-url with `/sree-veeranjaneya-green-energy`.

Source code stays clean (root-absolute). Only the deployed `dist/` is rewritten.

## Custom domain (when you buy one)

Once you own e.g. `svge-energy.in`:

1. Add `public/CNAME` with the bare domain (`svge-energy.in`).
2. In `astro.config.mjs`, set `site: 'https://svge-energy.in'` and **remove** the `base:` line.
3. Delete `scripts/prefix-base.mjs` from the build step in `package.json` (no longer needed at root).
4. Update `src/lib/site.ts` `url:` to `https://svge-energy.in`.
5. In your domain registrar, add a CNAME record pointing the apex to `kalasagar.github.io`.
6. Push. GitHub Pages picks up the CNAME and serves the site at the apex.

## Common gotchas

| Symptom | Fix |
|---|---|
| 404 on internal navigation | The base-path prefixer didn't run. Check that `npm run build` succeeded — it should print `prefix-base: rewrote N files`. |
| Build fails on `node` version | Workflow pins `node-version: 22`. If you change it, also update `package.json` `engines.node`. |
| Contact form returns CORS or 405 | The Formspree ID is still the placeholder. Replace in `src/pages/contact.astro`. |
| Custom domain not picked up | DNS propagation can take up to 24 h. Use `dig svge-energy.in +short` to verify the CNAME. |
| Sitemap shows old domain | `src/lib/site.ts` `url:` and `astro.config.mjs` `site:` both need to match the new domain. |
