# Lenvik website

Portfolio site for **Lenvik Construction & Fabrication**: React + Vite, prerendered to static HTML, with content managed in Sanity and hosted on Netlify. Every service used here has a free tier.

```
lenvik/
├── web/         React + Vite site (vite-react-ssg, Tailwind CSS)
├── studio/      Sanity Studio: the CMS where staff edit content
└── netlify.toml Netlify build settings
```

## How it works

1. Staff edit projects, services, reviews and settings in Sanity Studio and press **Publish**.
2. A Sanity webhook calls a Netlify build hook.
3. Netlify runs `npm run build` in `web/`: `scripts/fetch-content.mjs` downloads all content into `src/data/content.json`, then `vite-react-ssg` renders every page (including one per project) to static HTML.
4. Quote requests open WhatsApp with the details pre-filled, and Web3Forms emails a copy to Lenvik.

Without a Sanity project configured, the site builds from `web/src/data/sample-content.json`, so you can work on it right away.

## Run locally

```bash
cd web
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs web/dist
```

## Setup checklist

### 1. Sanity (CMS)
1. Create a free account at [sanity.io](https://www.sanity.io) and a new project with a `production` dataset.
2. In `studio/`, copy `.env.example` to `.env` and fill in `SANITY_STUDIO_PROJECT_ID`.
3. `cd studio && npm install && npx sanity login && npm run dev`, then open http://localhost:3333.
4. Fill in **Site settings** first (phone, WhatsApp number, email, stats), then add services, projects, testimonials and FAQs.
5. `npm run deploy` publishes the Studio to `https://lenvik.sanity.studio` so staff can use it from anywhere.
6. In the Sanity dashboard, under **API → CORS origins**, nothing is needed: the site reads content at build time, not from the browser.

### 2. Web3Forms (email copy of quote requests)
1. Get a free access key at [web3forms.com](https://web3forms.com) using Lenvik's email address.
2. Add it as `VITE_WEB3FORMS_KEY` (in `web/.env` locally, and in Netlify's environment variables).

### 3. Netlify (hosting)
1. Push this repo to GitHub, then in Netlify choose **Add new site → Import from Git**. `netlify.toml` already sets the build.
2. Under **Site configuration → Environment variables**, add:
   - `SANITY_PROJECT_ID`, `SANITY_DATASET` (`production`)
   - `VITE_WEB3FORMS_KEY`
   - `VITE_SITE_URL` (e.g. `https://www.lenvik.com`, used for link previews)
3. Under **Build & deploy → Build hooks**, create a hook named "Sanity publish" and copy its URL.

### 4. Rebuild on publish
In Sanity's dashboard go to **API → Webhooks → Create webhook**:
- URL: the Netlify build hook URL
- Trigger on: Create, Update, Delete
- Filter: `!(_id in path("drafts.**"))` so drafts don't trigger builds
- HTTP method: POST

Netlify's free plan has a monthly credit allowance shared by builds and bandwidth. If staff publish many small edits, consider replacing the webhook with a once-a-day scheduled build.

### 5. Domain and email
- Point the domain at Netlify (keep DNS on Cloudflare if you want free email forwarding with Cloudflare Email Routing).
- Optional: add Cloudflare Web Analytics (free, no cookie banner) by pasting its script tag into `web/index.html`.

## Before launch

- [ ] Replace the hero video: `web/public/hero.mp4` is a **watermarked iStock preview** and must not go live. Upload a licensed or free (Pexels / Pixabay / Mixkit) clip in Site settings, or replace the file. Keep it under 5 MB, 1080p MP4.
- [ ] Replace every `[bracketed]` placeholder: stats, phone, WhatsApp number, email, hours, project details.
- [ ] Replace the sample testimonials with real client feedback.
- [ ] Add photos: service backdrops, project covers and galleries (striped placeholders show where they're missing).
- [ ] Confirm the service key points and FAQ answers with Lenvik.
