# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server on port 3001
npm run build    # production build
npm run lint     # ESLint (eslint.config.mjs, Next.js ruleset)
```

No test runner is configured yet.

## Stack

- **Next.js 16.2.6** App Router — see `node_modules/next/dist/docs/` for API specifics; this version has breaking changes vs training data
- **React 19**, **TypeScript 5** (`strict: true`), path alias `@/` → repo root
- **Tailwind CSS v4** — configured via `@theme inline {}` in `app/globals.css` directly; there is **no `tailwind.config.js`**. The `@import "tailwindcss"` syntax replaces the old config-file approach.
- **lucide-react v1** for icons (no brand icons — use inline SVG for Instagram/Pinterest/etc.)

## Architecture

### Rendering model

Server Components are the default. Only interactive leaf nodes carry `'use client'`:
- `NavActions`, `NewsletterForm` — interactive navbar/footer pieces
- `Button`, `Input` — forwarded-ref primitives
- `ProductCard` — wishlist toggle state
- All three custom hooks

Avoid pushing `'use client'` up the tree; keep Server Components as wrappers/containers.

### Directory map

Project Identity

 ┌────────────┬───────────────────────────────────────────────────┐
 │   Field    │                       Value                       │
 ├────────────┼───────────────────────────────────────────────────┤
 │ Brand      │ Nordic Hearth — Premium Scandinavian Furniture    │
 ├────────────┼───────────────────────────────────────────────────┤
 │ Framework  │ Next.js 16.2.6 (App Router)                       │
 ├────────────┼───────────────────────────────────────────────────┤
 │ React      │ 19.2.4                                            │
 ├────────────┼───────────────────────────────────────────────────┤
 │ Language   │ TypeScript 5 (strict)                             │
 ├────────────┼───────────────────────────────────────────────────┤
 │ Styling    │ Tailwind CSS v4 (inline @theme, no config file)   │
 ├────────────┼───────────────────────────────────────────────────┤
 │ Icons      │ lucide-react v1 (brand icons via inline SVG)      │
 ├────────────┼───────────────────────────────────────────────────┤
 │ Fonts      │ Geist (body), Playfair Display (headings/display) │
 ├────────────┼───────────────────────────────────────────────────┤
 │ Dev Port   │ 3001 (npm run dev)                                │
 ├────────────┼───────────────────────────────────────────────────┤
 │ Path alias │ @/ → repo root                                    │
 └────────────┴───────────────────────────────────────────────────┘

 ---
 Directory Map

 furniture_web_frontend/
 ├── app/
 │   ├── globals.css          # Tailwind import + @theme tokens + global rules
 │   ├── layout.tsx           # Root layout: Navbar + <main> + Footer
 │   ├── page.tsx             # Homepage: Hero / Categories / New Arrivals
 │   └── products/
 │       └── page.tsx         # Products page: Hero + ProductsClient + EditorialSection
 ├── components/
 │   ├── layout/
 │   │   ├── Container.tsx    # Max-width (1440px) wrapper, polymorphic `as` prop
 │   │   ├── Footer.tsx       # Dark footer: links, newsletter, social icons
 │   │   ├── NavActions.tsx   # Client: search/wishlist/cart/hamburger buttons
 │   │   ├── Navbar.tsx       # Sticky header + NAV_LINKS + NavActions
 │   │   ├── NewsletterForm.tsx  # Client: email signup with success state
 │   │   └── SectionHeading.tsx  # Title + optional subtitle + optional action
 │   ├── products/
 │   │   ├── FilterBar.tsx    # Client: dropdowns (material/size/price) + mobile pills
 │   │   ├── Pagination.tsx   # Prev/Next + smart page range (ellipsis)
 │   │   ├── ProductCard.tsx  # Client: image/title/price + wishlist toggle
 │   │   ├── ProductGrid.tsx  # Grid: loading skeletons / empty state / card list
 │   │   └── ProductsClient.tsx  # Client orchestrator: filters + sort + pagination
 │   ├── shared/
 │   │   └── EditorialSection.tsx  # 60/40 split: image left, brand story right
 │   └── ui/
 │       ├── Badge.tsx        # Label chip: default/new/sale/soldout/accent variants
 │       ├── Button.tsx       # forwardRef: primary/outline/ghost/accent + loading
 │       ├── Input.tsx        # forwardRef: label/error/hint support
 │       ├── Loader.tsx       # Animated spinner: sm/md/lg sizes
 │       └── SkeletonCard.tsx # Pulsing placeholder: 3/4 | 1/1 | 16/9 aspect ratio
 ├── constants/
 │   ├── navigation.ts        # NAV_LINKS, FOOTER_LINKS, SOCIAL_LINKS
 │   └── site.ts              # SITE: name, tagline, description, url, copyright
 ├── data/
 │   ├── categories.ts        # CATEGORIES[8]: Bar Stools, Beds, Coffee Tables…
 │   └── products.ts          # NEW_ARRIVALS[4] + PRODUCTS[12] with full metadata
 ├── hooks/
 │   ├── useDebounce.ts       # Generic debounced value (client)
 │   ├── useLocalStorage.ts   # State synced to localStorage (client)
 │   └── useMediaQuery.ts     # window.matchMedia boolean (client)
 ├── lib/
 │   └── utils.ts             # cn(), formatPrice(), slugify()
 ├── services/
 │   └── api.ts               # ApiResponse<T> discriminated union (placeholder)
 ├── store/
 │   └── index.ts             # Re-exports Cart, CartItem from @/types/cart
 ├── styles/
 │   └── animations.css       # fade-in, slide-in-right keyframes (import when needed)
 ├── types/
 │   ├── cart.ts              # CartItem, Cart interfaces
 │   ├── common.ts            # Size, Variant, Alignment, Status union types
 │   ├── filters.ts           # FilterState, FilterOption, DEFAULT_FILTERS, option arrays
 │   ├── navigation.ts        # NavLink, FooterColumn interfaces
 │   └── product.ts           # Product, ProductCardData, ProductListing, Category
 ├── CLAUDE.md                # Codebase guidance for Claude Code
 ├── AGENTS.md                # Warning: Next.js 16 has breaking changes
 ├── next.config.ts           # Empty (no custom config yet)
 ├── tsconfig.json            # strict, ES2017, @/* alias
 └── package.json             # Scripts + deps

### Design tokens

All defined in `app/globals.css` via `@theme inline {}` — use Tailwind utilities, never hardcode hex values in components.

| Token | Utility | Value |
|---|---|---|
| Cream | `bg-cream`, `text-cream` | `#F5F0EB` |
| Charcoal | `bg-charcoal`, `text-charcoal` | `#2C2C2C` |
| Accent | `bg-accent`, `text-accent` | `#C17A3A` |
| Accent Dark | `bg-accent-dark` | `#9E6238` |
| Muted | `text-muted` | `#6B6560` |
| Surface | `bg-surface` | `#EDE8DF` |
| Border | `border-border` | `#E8E4DF` |

Fonts: `font-sans` → Geist (body default), `.font-display` class → Playfair Display (headings/italic). Layout max-width: `1440px`, horizontal padding: `px-6 lg:px-14` (applied by `Container`).
