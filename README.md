# becca-worthington.com

Portfolio website for Becca Worthington, an actor, singer and dancer.

- **Becca edits everything** in a web-based editor (Sanity Studio) from Safari on her iPad. She never touches this code.
- **This repository** holds the design and structure. A developer only needs it to change the look or add new kinds of sections.

> Becca's plain-English guide is in [EDITING-GUIDE.md](EDITING-GUIDE.md).

---

## How it fits together

```
 Becca (iPad, Safari)
        │  edits & clicks "Publish"
        ▼
 Sanity Studio  ─────────────►  Sanity content database (hosted by Sanity, free plan)
 becca-worthington.sanity.studio          │
                                          │ webhook on publish
                                          ▼
                              Netlify rebuilds the site (≈1 min)
                                          │
                                          ▼
                              www.becca-worthington.com (static HTML)
```

**Live preview.** The editor's first tab ("Live preview", Sanity's Presentation tool) shows the real
website in a frame, including *unpublished drafts*. Becca can tap any text or photo to edit it, and drag
sections and videos to reorder them. To make that work, the same `site/` code is deployed a **second time** as a
small "preview site":

| | Public site | Preview site |
|---|---|---|
| Who sees it | everyone | only the editor's Live preview tab |
| Rendering | static HTML, rebuilt on publish | on demand (Netlify functions) |
| Content | published only | drafts + invisible click-to-edit markers |
| Env vars | `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET` | same, **plus** `SANITY_PREVIEW_SITE=true`, `SANITY_API_READ_TOKEN`, `PUBLIC_SANITY_STUDIO_URL` |

How preview mode switches on: the editor loads `/api/preview/enable?sanity-preview-secret=…` and the site checks the
one-time secret, then sets a `sanity-preview` cookie (`src/preview/enable.ts`, `src/middleware.ts`). Pages then
fetch drafts through `previewClient` (`src/lib/sanity.ts`). The page asks `/api/preview/version` every 1.5 s and
re-renders itself when content changes (`src/components/PreviewMode.astro`). Click-to-edit tags for images and
reorderable lists come from `sanityAttr()` in `src/lib/visualEditing.ts`. **Always wrap content in `clean()` before
using it in an attribute, URL or `<title>`.**

| Folder | What it is | Tech |
|---|---|---|
| `site/` | The public website (and the preview site) | [Astro](https://astro.build) |
| `studio/` | The editor Becca logs into | [Sanity Studio](https://www.sanity.io/docs/studio) |

The public site has no server, database or plugin to maintain. If nobody touches this for years, it keeps working.

## Accounts (all should be owned by Becca)

| Service | Used for | Plan |
|---|---|---|
| Sanity (sanity.io) | The editor + content storage | Free |
| Netlify (netlify.com) | Hosting the site | Free |
| GitHub | Stores this code; Netlify builds from it | Free |
| Domain registrar | becca-worthington.com (renews every **Feb 24**) | ~$10–15/yr |

Developers should be added as members/collaborators, not owners.

---

## Working on it locally

Requires Node.js 22+.

```bash
# The website
cd site
npm install
npm run dev          # http://localhost:4321
```
With `SANITY_PREVIEW_SITE=true` in `site/.env`, local dev behaves like the preview site, so the deployed editor's
Live preview tab works against your local copy. `npm run build` respects the same flag: set
`SANITY_PREVIEW_SITE=false` to build the public static version.

```bash
# The editor
cd studio
npm install
npm run dev          # http://localhost:3333
```

**Sample mode:** if `site/.env` has no `PUBLIC_SANITY_PROJECT_ID`, the site uses the built-in sample content in `site/src/lib/sample.ts`. That's handy for design work without touching real content.

## Changing the look

- **Colors, fonts and spacing** are all in [`site/src/styles/theme.css`](site/src/styles/theme.css). Each theme is a block of CSS variables.
- **Adding a theme:** copy a `[data-theme="…"]` block in `theme.css`, then add the same value to `THEMES` in [`studio/schemas/singletons/settings.js`](studio/schemas/singletons/settings.js) so Becca can pick it.
- **Fonts** are loaded in [`site/src/layouts/Base.astro`](site/src/layouts/Base.astro) (Google Fonts link) and named in `theme.css`.

## Adding a new kind of section

Becca builds pages by stacking "sections" (Upcoming, Featured videos, Press quotes, Gallery, Text, Contact…). To add a new type:

1. **Editor side:** define it in [`studio/schemas/objects/sections.js`](studio/schemas/objects/sections.js) and add it to `sectionTypes` at the bottom.
2. **Site side:** create `site/src/components/sections/YourSection.astro` and register it in [`Sections.astro`](site/src/components/sections/Sections.astro).
3. If it needs images or references, extend the `sections` projection in [`site/src/lib/queries.ts`](site/src/lib/queries.ts).
4. Run `npx sanity schema validate` in `studio/` and `npm run build` in `site/`.

## Where content lives

| Editor menu item | Sanity document | Used by |
|---|---|---|
| Home page | `home` (singleton) | `site/src/pages/index.astro` |
| Resume & headshots | `resume` (singleton) | `site/src/pages/resume.astro` |
| Reels & videos | `reelsPage` (singleton) | `site/src/pages/reels.astro` + "Featured videos" section |
| Site settings | `settings` (singleton) | header, footer, theme, SEO, contact section |
| Projects | `project` (many) | `site/src/pages/projects/` + "Featured projects" section |

---

## Current setup (Nov 2026)

| Thing | Where |
|---|---|
| Code | github.com/mattslipari/becca-worthington (private) |
| Editor | https://becca-worthington.sanity.studio (Sanity project `5w8bw6qn`) |
| Public site | https://becca-worthington.netlify.app (Netlify; **behind Netlify login until launch**) |
| Preview site | https://becca-worthington-preview.netlify.app (Netlify; open, drafts need the editor's secret) |
| Rebuild on publish | Sanity webhook "Rebuild website on publish" → Netlify build hook "Sanity publish" (public site only). Filtered to page document types. |
| Preview read key | Sanity token "Website preview" (Viewer), stored in `site/.env` and the preview site's Netlify env |

**At launch:** turn off the Netlify login on the public site (Visitor access), then connect the domain (step 6).

## First-time setup / go-live checklist

Done once. Steps marked 🔑 need someone to sign in to an account.

### 1. Create the Sanity project 🔑
```bash
cd studio
npx sanity login                       # opens the browser
npx sanity projects create "Becca Worthington" --dataset production --dataset-visibility public
```
Copy the project ID it prints, then put it in **both** `studio/sanity.config.js` and `studio/sanity.cli.js`. The project ID is not a secret. (Already done: project `5w8bw6qn` in organization "Becca Worthington – Website", `orpkywxm1`.)

### 2. Load the starter content
```bash
cd studio
node scripts/make-sample-content.ts    # regenerates sample-content.ndjson from site/src/lib/sample.ts
npm run import-sample                  # only creates documents that don't exist yet
```
Photos aren't included, so upload headshots in the editor afterwards.

### 3. Put the editor online
```bash
cd studio
npm run deploy                         # → https://becca-worthington.sanity.studio
```
In [sanity.io/manage](https://www.sanity.io/manage) → project → **Members**, invite Becca (as Administrator when handing over).

### 4. Connect the website
1. Create `site/.env` from `site/.env.example` and fill in the project ID. Run `npm run dev` and check that real content shows.
2. 🔑 Push this repo to GitHub, then in Netlify choose **Add new site → Import from GitHub**. Build settings come from `netlify.toml` at the repo root.
3. In Netlify → **Site configuration → Environment variables**, add `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET=production`.

### 4b. Put the preview site online 🔑
1. In Netlify, import the **same repo a second time** (e.g. name it `becca-worthington-preview`), base directory `site`.
2. Environment variables: `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET=production`, `SANITY_PREVIEW_SITE=true`,
   `PUBLIC_SANITY_STUDIO_URL=https://becca-worthington.sanity.studio`, and `SANITY_API_READ_TOKEN`.
   The token is the read-only key "Website preview" (sanity.io/manage → API → Tokens; make a new Viewer token if lost).
3. Redeploy the editor so its Live preview tab points at that site:
   ```bash
   cd studio
   SANITY_STUDIO_PREVIEW_URL=https://becca-worthington-preview.netlify.app npm run deploy
   ```
   Also put that URL in `studio/presentation.js` as the default, so later deploys keep it.
4. Netlify → preview site → **Site configuration → Access & security → Visitor access**: the preview site must
   **not** require a Netlify login, or it can't load inside the editor (an iPad's Safari blocks logins inside embedded frames).
   It's safe: without the editor's one-time secret, visitors only see published content.

The preview site does **not** need the build hook. It's always live.

### 5. Auto-publish when Becca hits "Publish" 🔑
1. Netlify → **Site configuration → Build & deploy → Build hooks** → add hook "Sanity publish" and copy the URL.
2. sanity.io/manage → project → **API → Webhooks → Create webhook**:
   - URL: the Netlify build hook
   - Dataset: `production`
   - Trigger on: Create, Update, Delete
   - HTTP method: POST
   - Filter: leave empty

### 6. Move the domain off Wix 🔑
The domain is registered through **Wix** (expires Feb 24, 2027).
1. Test everything on the free `*.netlify.app` address first.
2. In Becca's Wix account: unlock the domain and get the transfer (EPP) code.
3. Transfer it to Cloudflare Registrar or Namecheap (≈5–7 days), or point its DNS at Netlify.
4. Netlify → **Domain management** → add `becca-worthington.com` and `www.becca-worthington.com`. HTTPS is automatic.
5. **Only cancel the Wix plan after the new site is live on the domain.**

### 7. Hand over 🔑
Transfer ownership of Sanity, Netlify and GitHub to Becca's accounts, and make sure the domain auto-renews on her card.
