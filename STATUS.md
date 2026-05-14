# SVGE — Pending Action Items & Resume Guide

_Last updated: 2026-05-14_

This file is the single source of truth for what's queued. Read it before resuming work, update it after every meaningful action.

---

## Where things stand right now

The website is content-complete and deploys cleanly:

- **16 static pages**, build in ~1.4 s
- **Lighthouse:** A11y 100 · Best Practices 100 · SEO 100 (on production) · Performance 88+ (improves with CDN)
- **Content gate** passed on `/`, `/about/`, `/farmers/` — see `~/personal/svge/reports/copy_critique_*.md`
- **Brand assets** locked: winner mark `c11_paddy_frame_leaf_v1`, full kit in `~/personal/svge/brand/WINNER/`
- **2 of 6 hero banners** generated (hero + about) via FLUX-schnell, compressed to AVIF/WebP
- **Veo prompts** written and structured to Google's official 5-component template — see `~/personal/svge/veo_prompts.md`
- **Deploy guide** for Cloudflare Pages — see `DEPLOY.md`
- **GitHub Pages** workflow at `.github/workflows/deploy.yml`

---

## Open items by priority

### P0 — Blocked on Imagen 4 quota reset (tomorrow ~12:30 PM IST)

These three knock out together. The Imagen daily quota resets at midnight Pacific.

#### 1. Remaining 4 hero banners

```bash
# Quota check
/Users/spogiri/personal/creative-studio/.venv/bin/python -c "
import os; from dotenv import load_dotenv; from pathlib import Path
load_dotenv(Path.home()/'personal/creative-studio/.env')
from google import genai; from google.genai.types import GenerateImagesConfig
c = genai.Client(api_key=os.environ['GOOGLE_API_KEY'])
try: r = c.models.generate_images(model='imagen-4.0-fast-generate-001',prompt='red dot',config=GenerateImagesConfig(number_of_images=1,aspect_ratio='1:1')); print('OK')
except Exception as e: print('LOCKED:', str(e)[:80])
"

# When OK:
/Users/spogiri/personal/creative-studio/.venv/bin/python /Users/spogiri/personal/svge/scripts/generate.py \
  --round banners_r1 \
  --prompts-file /Users/spogiri/personal/svge/banners/prompts.json \
  --workers 2

# Critique + pick winners
/Users/spogiri/personal/creative-studio/.venv/bin/python /Users/spogiri/personal/svge/scripts/critique.py \
  --round banners_r1 --prompts-file /Users/spogiri/personal/svge/banners/prompts.json \
  --workers 3 --model gemini-2.5-flash
/Users/spogiri/personal/creative-studio/.venv/bin/python /Users/spogiri/personal/svge/scripts/aggregate.py --round banners_r1
```

Then compress the 4 winners to AVIF/WebP and drop into `website/public/banners/`. Wire-in code is in `reports/banners_status.md`.

Banner pages to fill: `/project/`, `/farmers/`, `/impact/`, `/press/`.

#### 2. R4 logo round (optional regeneration)

Already have a winning logo (`c11_paddy_frame_leaf_v1`). R4 was queued to see if a hybrid paddy + digester variant scored higher. Low priority — the current winner is locked.

```bash
bash ~/personal/svge/scripts/retry_r4.sh
```

#### 3. Per-page OG images

Once banners are in, generate 1200×630 OG images per page from the corresponding banner + page title overlay. Update each page's `<Base ogImage="...">` prop.

### P1 — Veo video generation (user runs offline in Flow / Vertex AI)

Prompts are written and locked, following Google's official 5-component template, with full timestamp prompting and audio cues. See `~/personal/svge/veo_prompts.md`.

Two roles:

1. **Hero story film** — `hero_story_arc.mp4`, ~48 s, six 8-second beats (PROBLEM → PEOPLE → PLANT → PROCESS → PRODUCT → RETURN). Stitch with the `ffmpeg` recipe in the prompts file. Drop into `website/public/video/`.
2. **Six ambient section loops** — `hero_dawn_paddy_to_flame.mp4`, `about_founder_walk.mp4`, `farmers_hands_straw.mp4`, `impact_soil_fom.mp4`, `process_digester_dawn.mp4`, `closing_loop_cycle.mp4`. 4–8 s each, muted, looping.

The `<HeroVideo>` component is already built at `src/components/HeroVideo.astro`. Drop the MP4s in and add the component to the relevant pages.

### P1 — Founder portraits

Replace the initials avatars on `/about/` and the placeholder press kit on `/press/` with real photos:

- Suresh Babu, head-and-shoulders, plain shirt, daylight, neutral background
- Deepika, same setup
- Both shot the same day for visual consistency

Save as `website/public/team/suresh.jpg` and `website/public/team/deepika.jpg`, then update `src/pages/about.astro` and `src/pages/press.astro`. iPhone Portrait mode is sufficient.

### P2 — Founder quote approval

Six drafted founder quotes carry the `[Draft — pending founder approval]` chip:

- `src/lib/site.ts:promoters[].quote` — Suresh + Deepika
- `src/pages/press.astro` — surfaces the same quotes

Walk Suresh through the two quotes. Edit the strings, remove `quoteDraft: true`, push.

### P2 — Telugu mirror of `/farmers/`

Highest leverage P2 item. The /farmers/ page is the farmer-conversion gateway, and the audience reads Telugu as a first language.

- New file: `src/pages/te/farmers.astro` (or use Astro's i18n routing config)
- Translation prompt is straightforward — the page is already written in plain English specifically to translate cleanly

### P2 — `/process/` 3-POV TOC

The three-column POV explainer is dense. A short table-of-contents block at the top of `/process/` with anchors to "For the farmer / For the driver / For the auditor" would help orientation.

### P3 — Polish

- Inline the SVG mark in `<Header>` (saves ~34 KB on every page load)
- Build a one-page printable fact sheet at `/press/fact-sheet/` (auto-generated from `src/lib/site.ts`)
- View Transitions API for inter-page animation
- Sticky preheader chip: "Pre-construction · Latest update: see /news/"

### P3 — Construction-phase content

These activate the moment concrete is poured:

- First public update post on `/news/` (template: photo · milestone hit · milestone missed · one financial number · one thing that went wrong)
- WhatsApp Business number — publish then
- Plant construction photos throughout
- Final Telugu page launch

---

## Files / scripts to know about

| Path | What it does |
|---|---|
| `~/personal/svge/scripts/generate.py` | Imagen 4 batch with retry/quota detection |
| `~/personal/svge/scripts/generate_flux.py` | FLUX-schnell local fallback |
| `~/personal/svge/scripts/critique.py` | Gemini 2.5 multi-POV scorer (6 hats + 5 personas + 8 technical) |
| `~/personal/svge/scripts/aggregate.py` | Weighted leaderboard |
| `~/personal/svge/scripts/vectorize.py` | PNG → SVG via vtracer + brand-kit raster/favicon set |
| `~/personal/svge/scripts/retry_r4.sh` | R4 logo retry runner |
| `~/personal/svge/brand/WINNER/` | Locked brand kit (mark.svg, favicons, banner, OG image) |
| `~/personal/svge/banners/prompts.json` | Banner prompt spec for Imagen + FLUX |
| `~/personal/svge/veo_prompts.md` | All Veo prompts (story film + 6 loops) |
| `~/personal/svge/reports/copy_critique_*.md` | Multi-POV critique reports for / · /about/ · /farmers/ |
| `website/src/lib/site.ts` | Single source of truth for all copy / facts / nav |
| `website/DEPLOY.md` | Cloudflare Pages deploy guide |

---

## Resume protocol

When you sit back down:

1. Read this file top to bottom.
2. Check Imagen quota — if open, drain the P0 banner queue first.
3. Run `npm run dev` from `~/personal/svge/website/` — see the site, sanity check.
4. Pick from the priority list. Update the relevant section here as you finish.
