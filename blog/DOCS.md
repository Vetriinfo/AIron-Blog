# Docs — How to run, deploy, add posts, and customize

## Run locally

```bash
cd blog
npm install
npm run dev
```

- Dev server: [http://localhost:3000](http://localhost:3000) (with Turbopack).
- Build: `npm run build` then `npm start` for production mode.

---

## Deploy to Vercel

1. Push your repo to GitHub (or connect another Git provider).
2. In [Vercel](https://vercel.com): **Add New** → **Project** → import the repo.
3. If the Next.js app lives in the `blog` folder:
   - **Root Directory**: set to `blog`.
4. Optional env:
   - `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com` (for sitemap, RSS, OG).
5. **Deploy**. Vercel runs `npm install` and `npm run build` by default.

Custom domain: Project → **Settings** → **Domains** → add domain and configure DNS as shown.

---

## Add a new blog post (MDX)

1. Create `content/blog/your-slug.mdx` (the filename becomes the URL slug).
2. Frontmatter (YAML at the top):

```yaml
---
title: "Post Title"
description: "One or two sentences for SEO and previews."
date: "2025-03-01"
category: "Structural Engineering"
tags: ["optional", "tags"]
published: true
---
```

3. Write content in Markdown/MDX below the frontmatter. Use `##` and `###` for headings (they appear in the auto-generated TOC on the post page).
4. Set `published: false` to hide the post from the blog list and home (it can still be opened by URL if you link to it).

Categories must match one of the names used in the blog (e.g. "Steel Design & Tekla", "AI Agents & RAG"). To add new categories, edit `CATEGORIES` in `lib/mdx.ts`.

---

## Customize theme and branding

### Site info

- **`lib/site.ts`**: site name, title, description, URL, author, email, Twitter/GitHub/LinkedIn, default OG image path.

### Colors (light/dark)

- **`styles/globals.css`**: variables under `:root` (light) and `.dark` (dark). Tweak `--surface`, `--ink`, `--brand`, `--border` to change the look.

### Fonts

- **`app/layout.tsx`**: `Inter` and `JetBrains_Mono` from `next/font/google`. Replace with other Google fonts or local fonts.
- **`tailwind.config.ts`**: `theme.extend.fontFamily` references `--font-geist-sans` and `--font-geist-mono`; keep these in sync with the variable names you set in `layout.tsx`.

### Nav and footer

- **`components/Navbar.tsx`**: `NAV_LINKS` and the site title string.
- **`components/Footer.tsx`**: footer links, social links, newsletter CTA.

### Newsletter

- **`components/NewsletterSection.tsx`**: form and state. Replace the placeholder `fetch` in `handleSubmit` with a call to your API route (e.g. `POST /api/newsletter`) that forwards to your provider (Buttondown, ConvertKit, Resend, etc.).

---

## Key files

| Purpose              | File(s) |
|----------------------|--------|
| Post data & listing  | `lib/mdx.ts` |
| MDX rendering        | `lib/mdx-render.tsx`, `components/MDXComponents.tsx` |
| TOC                  | `lib/toc.ts`, `components/TableOfContents.tsx` |
| Theme (dark/light)   | `components/ThemeProvider.tsx`, `styles/globals.css` |
| SEO per post         | `app/blog/[slug]/page.tsx` (`generateMetadata`) |
| Sitemap / RSS        | `app/sitemap.ts`, `app/feed.xml/route.ts` |
