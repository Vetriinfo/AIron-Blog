# Technical Blog — Next.js

A modern, production-ready personal blog for a technical creator (structural engineering, steel design, Python/C# automation, AI agents, investing, emerging tech). Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and MDX.

## Quick Start

### Prerequisites

- Node.js 18.17+
- npm (or yarn/pnpm)

### Run locally

```bash
cd blog
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm start
```

---

## Project structure

```
blog/
├── app/                    # App Router pages and routes
│   ├── layout.tsx          # Root layout (fonts, theme, nav/footer)
│   ├── page.tsx            # Home
│   ├── blog/               # Blog listing and [slug] post
│   ├── about/
│   ├── projects/
│   ├── contact/
│   ├── sitemap.ts          # Generated sitemap
│   ├── robots.ts           # robots.txt
│   └── feed.xml/           # RSS feed route
├── components/             # Reusable UI
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ThemeProvider.tsx
│   ├── BlogPostContent.tsx
│   ├── TableOfContents.tsx
│   ├── MDXComponents.tsx
│   └── ...
├── content/
│   └── blog/               # MDX posts
├── lib/                    # Data and utilities
│   ├── mdx.ts              # Post loading, slugs, categories
│   ├── mdx-render.tsx      # MDX rendering with rehype/remark
│   ├── site.ts             # Site metadata
│   └── toc.ts              # TOC extraction
├── styles/
│   └── globals.css         # Tailwind + CSS variables
└── utils/                  # Helpers (cn, formatDate, slugify)
```

---

## Adding a new blog post

1. Create a new `.mdx` file in `content/blog/`, e.g. `my-post.mdx`.
2. Use this frontmatter:

```yaml
---
title: "Your Post Title"
description: "Short description for SEO and cards."
date: "2025-03-01"
category: "Structural Engineering"
tags: ["tag1", "tag2"]
published: true
---
```

3. Write the body in MDX (Markdown + JSX). Use `##` and `###` for headings (they appear in the table of contents).
4. Save; the post will show on the home page, blog list, sitemap, and RSS.

**Note:** GFM (tables, strikethrough) is optional. If you add `remark-gfm`, use a version compatible with your `next-mdx-remote` (e.g. `remark-gfm@3`); otherwise code blocks and standard Markdown work without it.

**Categories** (you can add more in `lib/mdx.ts`):

- Structural Engineering  
- Steel Design & Tekla  
- Python & C# Automation  
- AI Agents & RAG  
- Stock Market & Investing  
- Quantum & Emerging Tech  

---

## Deployment (Vercel)

1. Push the repo to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com](https://vercel.com) and **Import** the repository.
3. Set **Root Directory** to `blog` (if the Next app is inside `blog/`).
4. Add environment variable (optional):
   - `NEXT_PUBLIC_SITE_URL` = your production URL (e.g. `https://yourdomain.com`) for sitemap, RSS, and OG.
5. Deploy. Vercel will run `npm install` and `npm run build`.

**Custom domain:** In the Vercel project → Settings → Domains, add your domain and follow the DNS steps.

---

## Customizing theme and branding

### Site metadata

Edit `lib/site.ts`: `name`, `title`, `description`, `url`, `author`, `email`, social links, `defaultImage`.

### Colors and fonts

- **CSS variables** (light/dark) are in `styles/globals.css` (`:root` and `.dark`). Change `--surface`, `--ink`, `--brand`, etc.
- **Tailwind** in `tailwind.config.ts`: `colors.brand`, `fontFamily` (e.g. `--font-geist-sans` is set in `app/layout.tsx` via Next.js `next/font/google`). Swap fonts in `layout.tsx` and in `tailwind.config.ts` if needed.

### Navbar / Footer

- Links: `components/Navbar.tsx` (`NAV_LINKS`) and `components/Footer.tsx` (links and social).
- Logo/text: change the “Technical Blog” string in `Navbar` and the footer block in `Footer`.

### Newsletter

The newsletter block is in `components/NewsletterSection.tsx`. It currently uses a placeholder submit. To wire it up:

- Add an API route (e.g. `app/api/newsletter/route.ts`) that calls your provider (Buttondown, ConvertKit, Resend, etc.).
- In `NewsletterSection.tsx`, call that API in `handleSubmit` with the email.

---

## SEO and performance

- **Metadata**: Each page and each post sets `title` and `description`; posts use `generateMetadata` for dynamic SEO and Open Graph.
- **Sitemap**: `app/sitemap.ts` outputs `/sitemap.xml`.
- **RSS**: `app/feed.xml/route.ts` serves `/feed.xml`.
- **robots**: `app/robots.ts` allows all and points to the sitemap.
- **Images**: Use Next.js `Image` for blog images and set `NEXT_PUBLIC_SITE_URL` in production for absolute OG image URLs.

For Lighthouse: ensure `NEXT_PUBLIC_SITE_URL` is set in production, use semantic HTML (already in place), and keep images optimized via `next/image`.

---

## License

Private/project-specific. Adjust as needed.
