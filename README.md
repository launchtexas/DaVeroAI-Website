# DaVero AI — Website

Marketing website for **DaVero AI**, an agentic AI company that turns business platforms into finished, end-to-end workflows — built, run and continuously improved by AI agents, with the client's team approving every result.

> Private repository. All content, brand assets and imagery belong to DaVero AI.

## Tech stack

| Area | Choice |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, static pre-rendering) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui primitives |
| Font | Inter, self-hosted via `next/font/local` |
| Contact form | Next.js route handler + [Resend](https://resend.com) email API |
| Hosting | Vercel (recommended) |

## Pages

| Route | Purpose |
|---|---|
| `/` | Home: positioning, the last mile, method, why DaVero AI |
| `/agentic-ai` | What the last mile is and why it matters |
| `/services` | Implement, build agents, run and tune |
| `/approach` | The five-step engagement and the delivery pod |
| `/governance` | Human-in-the-loop controls and governance practices |
| `/industries` | Domains and platforms we work around |
| `/insights` | Market context and articles |
| `/about` | Mission, strategy, delivery pod and founder |
| `/contact` | Enquiry form |
| `/privacy`, `/terms` | Legal pages |

## Getting started

Requires Node.js 20 or later.

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes, for the form | Resend API key with sending access |
| `CONTACT_TO` | No | Inbox that receives enquiries (default `ask@daveroai.com`) |
| `CONTACT_FROM` | No | Sender address; its domain must be verified in Resend |

Without `RESEND_API_KEY` the form endpoint returns `503` and the form shows its failure state with an email fallback. Never commit `.env.local`.

## Contact form

`POST /api/contact` (`app/api/contact/route.ts`) validates every field server-side with the same rules as the browser (`lib/contact-rules.ts`), drops spam-trap submissions, limits body size to 10 KB and each IP to 5 submissions per 10 minutes, then sends a plain-text email through Resend with `reply_to` set to the visitor.

## Project structure

```
app/               Routes, layouts, metadata, icons and the contact API
components/site/   Site sections, header, footer and illustrations
components/ui/     shadcn/ui primitives
lib/               Page content, contact logic and validation rules
public/            Brand logos and images
docs/              Brief, design spec, copy, governance copy, QA report, source material
```

## Content and design sources

- `docs/content.md` — approved page copy
- `docs/design.md` — design system and page layouts
- `docs/governance.md` — governance page copy and sources
- `docs/qa.md` — latest QA report
- `docs/source/brand-kit/` — official DaVero AI brand kit v1.0 (logos, colours, guidelines)

## Quality bar

- WCAG 2.2 AA, verified with axe (0 violations)
- Reduced-motion fallbacks for all animation
- Lighthouse (Home): 96 performance on mobile, 100 on desktop; 100 accessibility, best practices and SEO

## Deployment

Import the repository into Vercel, set the environment variables above for each environment, and deploy. Verify the sending domain in Resend before going live.
