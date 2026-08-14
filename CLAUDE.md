# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # start dev server (Turbopack, http://localhost:3000)
pnpm build    # production build
pnpm lint     # eslint (flat config, eslint-config-next)
```

No test runner is set up yet — don't add one speculatively.

Copy `.env.example` to `.env.local` and set `ADMIN_USERNAME`/`ADMIN_PASSWORD` before using `/admin` — see [Admin panel](#admin-panel) below.

## Stack

Next.js 16 (App Router, Turbopack) + TypeScript + Tailwind CSS v4 + shadcn/ui (Radix base, `radix-nova` style). Package manager is pnpm — see `packageManager` in `package.json`.

- `src/app/` — routes (App Router). `layout.tsx` loads the three theme fonts, sets `<html lang="es">`, and mounts `SiteHeader`/`SiteFooter` globally — individual pages should not render their own header/footer.
  - `/` home, `/catalogo` full product grid (grouped by `Occasion`), `/producto/[slug]` product detail (static params from `getProducts()`, calls `notFound()` for unknown slugs), `/nosotros`, `/contacto`, `/cuidados`, `/preguntas-frecuentes`, `/envios-y-cambios`, `not-found.tsx` custom 404, `/admin/*` (see below).
- `src/components/ui/` — shadcn/ui primitives, generated via `pnpm dlx shadcn@latest add <component>`. Don't hand-edit these beyond what the CLI produces; re-run `add` to update.
- `src/components/` — bespoke site components (`seal-stamp.tsx`, `specimen-card.tsx`, `site-header.tsx`, `site-footer.tsx`, `mobile-nav.tsx`); `src/components/admin/product-form.tsx` is shared by the admin create/edit pages.
- `src/lib/nav.ts` — `NAV_LINKS`, the single source for the primary nav; shared by `site-header.tsx`, `mobile-nav.tsx`, and the footer's "Explorar" column so they can't drift out of sync.
- `src/lib/products.ts` — `getProducts()`/`saveProducts()` read and write `data/products.json` (via `node:fs`, server-only), plus `getProductBySlug`, `slugify`, `OCCASIONS`/`Occasion`. This is the only data store — no CMS/DB. Each product's `image` is a placeholder photo hotlinked from Pexels — swap for real photography when available.
- `src/lib/whatsapp.ts` — `whatsappLink(message)` builds a `wa.me` link; `WHATSAPP_DISPLAY` is the human-readable counterpart shown on `/contacto`. Both derive from the same placeholder `WHATSAPP_NUMBER` (Venezuela format) — replace it in this one file, not per-page.
- `src/lib/social.ts` — `INSTAGRAM_URL`/`INSTAGRAM_HANDLE`, both placeholders; replace with the real handle. Shared by the footer and the home Instagram gallery section.
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge), the shadcn convention for merging class names.
- Primary nav (header) stays to Catálogo/Nosotros/Contacto; secondary pages (Cuidados, Preguntas frecuentes, Envíos y cambios) live under the footer's "Ayuda" column only, to keep the header from getting crowded on mobile. `SiteHeader` is sticky (`sticky top-0`) and shows `NAV_LINKS` inline from `sm:` up; below that, `MobileNav` (a client component using shadcn's `Sheet`) renders a hamburger trigger instead. `/admin` is linked only from the footer's bottom bar — no public nav link, since it's not meant to be discoverable.
- `components.json` — shadcn config (aliases, base color, style). Edit here before re-running `add`, not in individual component files.

## Design system

Nos Fleurs is a flower/bouquet storefront serving Maracay, Aragua (Venezuela); prices are in USD (`$8.50`, decimal — not thousands-separated like ARS). The visual direction is a **"catálogo de herbario"** (herbarium catalog) concept — bouquets presented as sealed specimens rather than a typical pastel florist site. Full rationale lives in conversation history; the tokens are the source of truth going forward. Note: visible "N.° XXX" catalog numbering on product images/cards was deliberately removed (felt cluttered/duplicated) — don't reintroduce it without checking first; the `not-found.tsx` "N.° 404" is a distinct joke on the real HTTP status code, not part of that convention.

- Color and font tokens are defined as CSS custom properties in `src/app/globals.css` (`:root`), then re-exposed to Tailwind via the `@theme inline` block. Custom tokens beyond the shadcn defaults: `--moss`, `--bloom` (primary/CTA), `--brass` (accent), matching Tailwind utilities `text-moss`, `bg-primary`, `text-brass`, etc.
- Three font roles, loaded in `layout.tsx` via `next/font/google` and mapped to `--font-heading` (Fraunces, italic display), `--font-sans` (Inter, body), `--font-mono` (IBM Plex Mono, catalog numbers/prices).
- `--radius` is intentionally small (`0.25rem`) for the ledger/stamped aesthetic — don't bump it up to shadcn's default without reconsidering the direction.
- No dark mode is implemented (the `.dark` variant block was removed from `globals.css`); this is a single-theme site by design.
- `SealStamp` (`src/components/seal-stamp.tsx`) is the signature recurring motif — a circular brass stamp SVG reused across hero and product cards. Reach for it instead of inventing a new decorative element.

When adding new UI, prefer shadcn/ui components (`pnpm dlx shadcn@latest add <name>`) over hand-rolling — they already read the theme tokens above.

## Images

Product/gallery images use `next/image` pointed at hotlinked Pexels URLs (`images.pexels.com`, allowed via `images.remotePatterns` in `next.config.ts`). If you add images from a new host, add its hostname there too. The admin product form rejects image URLs outside `images.pexels.com` server-side (in `src/app/admin/actions.ts`) — without that check, a bad URL would 500 the public product/catalog pages at render time.

## Admin panel

`/admin` lets a single hardcoded admin edit the catalog (create/edit/delete products, all fields including `image`). Credentials come from `ADMIN_USERNAME`/`ADMIN_PASSWORD` env vars — set in `.env.local` (gitignored, never commit real values); `.env.example` documents the two required vars. There is no hardcoded fallback in code on purpose, so the real password never ends up in the (public) git history.

- `src/proxy.ts` — Next 16's replacement for `middleware.ts` (must live at `src/proxy.ts`, not project root, since this project uses `src/`). Redirects unauthenticated requests under `/admin/*` to `/admin/login`, and redirects an authenticated visitor away from `/admin/login`.
- `src/lib/auth-constants.ts` — cookie name/value shared between `proxy.ts` (Edge runtime, no `next/headers`) and `src/lib/auth.ts` (Node runtime, uses `next/headers` `cookies()`).
- `src/lib/auth.ts` — `checkCredentials`, `createSession`/`destroySession` (sets/clears the session cookie), `isAuthenticated`, `requireAdmin` (redirects to login if not authenticated — called at the top of every mutating Server Action in `src/app/admin/actions.ts` as defense in depth beyond the proxy).
- `src/app/admin/actions.ts` — all mutations (`login`, `logout`, `createProduct`, `updateProduct`, `deleteProduct`). Every mutation calls `revalidatePath` for `/`, `/catalogo`, `/admin`, and the affected `/producto/[slug]` — miss one of these and that page will keep serving stale cached data after an edit.

ponytail: auth is a single shared session cookie (no per-user sessions, no rate limiting) and product storage is a flat JSON file written via `fs`. Both are fine for local/dev use by one admin, but won't survive a read-only or ephemeral filesystem (e.g. Vercel) and aren't meant to scale past one admin — move to a real database (Postgres, per this workspace's stack preferences) and a proper auth provider before that matters.
