export const SITE = {
  name: 'Technical Creator Blog',
  title: 'Structural Engineering · Steel Design · Python & AI · Investing',
  description:
    'Technical blog on structural engineering, steel design & Tekla, Python & C# automation, AI agents & RAG, stock market compounding, and quantum tech.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
  author: 'Your Name',
  email: 'hello@yourdomain.com',
  twitter: '@yourhandle',
  github: 'https://github.com/yourhandle',
  linkedin: 'https://linkedin.com/in/yourhandle',
  defaultImage: '/og-default.png',
  links: {
    twitter: 'https://twitter.com/yourhandle',
    github: 'https://github.com/yourhandle',
    linkedin: 'https://linkedin.com/in/yourhandle',
    newsletter: '#newsletter',
  },
} as const;
