# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # start dev server (Turbopack, http://localhost:3000)
pnpm build    # production build
pnpm lint     # eslint (flat config, eslint-config-next)
```

No test runner is set up yet — don't add one speculatively.

## Stack

Next.js 16 (App Router, Turbopack) + TypeScript + Tailwind CSS v4 + shadcn/ui (Radix base, `radix-nova` style). Package manager is pnpm — see `packageManager` in `package.json`.

- `src/app/` — routes (App Router). `layout.tsx` loads the three theme fonts, sets `<html lang="es">`, and mounts `SiteHeader`/`SiteFooter` globally — individual pages should not render their own header/footer.
  - `/` home, `/catalogo` full product grid, `/producto/[slug]` product detail (static params from `PRODUCTS`, calls `notFound()` for unknown slugs), `/nosotros`, `/contacto`, `not-found.tsx` custom 404.
- `src/components/ui/` — shadcn/ui primitives, generated via `pnpm dlx shadcn@latest add <component>`. Don't hand-edit these beyond what the CLI produces; re-run `add` to update.
- `src/components/` — bespoke site components (`seal-stamp.tsx`, `specimen-card.tsx`, `site-header.tsx`, `site-footer.tsx`).
- `src/lib/products.ts` — single source of truth for product data (`PRODUCTS`, `getProductBySlug`). No CMS/backend yet — add products here.
- `src/lib/whatsapp.ts` — `whatsappLink(message)` builds a `wa.me` link. `WHATSAPP_NUMBER` is a placeholder; replace with the real business number.
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge), the shadcn convention for merging class names.
- `components.json` — shadcn config (aliases, base color, style). Edit here before re-running `add`, not in individual component files.

## Design system

Nos Fleurs is a flower/bouquet storefront. The visual direction is a **"catálogo de herbario"** (herbarium catalog) concept — bouquets presented as sealed specimens rather than a typical pastel florist site. Full rationale lives in conversation history; the tokens are the source of truth going forward. Note: visible "N.° XXX" catalog numbering on product images/cards was deliberately removed (felt cluttered/duplicated) — don't reintroduce it without checking first; the `not-found.tsx` "N.° 404" is a distinct joke on the real HTTP status code, not part of that convention.

- Color and font tokens are defined as CSS custom properties in `src/app/globals.css` (`:root`), then re-exposed to Tailwind via the `@theme inline` block. Custom tokens beyond the shadcn defaults: `--moss`, `--bloom` (primary/CTA), `--brass` (accent), matching Tailwind utilities `text-moss`, `bg-primary`, `text-brass`, etc.
- Three font roles, loaded in `layout.tsx` via `next/font/google` and mapped to `--font-heading` (Fraunces, italic display), `--font-sans` (Inter, body), `--font-mono` (IBM Plex Mono, catalog numbers/prices).
- `--radius` is intentionally small (`0.25rem`) for the ledger/stamped aesthetic — don't bump it up to shadcn's default without reconsidering the direction.
- No dark mode is implemented (the `.dark` variant block was removed from `globals.css`); this is a single-theme site by design.
- `SealStamp` (`src/components/seal-stamp.tsx`) is the signature recurring motif — a circular brass stamp SVG reused across hero and product cards. Reach for it instead of inventing a new decorative element.

When adding new UI, prefer shadcn/ui components (`pnpm dlx shadcn@latest add <name>`) over hand-rolling — they already read the theme tokens above.
