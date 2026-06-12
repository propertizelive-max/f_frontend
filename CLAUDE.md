# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md
##----------------

# CLAUDE.md
This file provides guidance to Claude Code when working on the Furniture user side  Frontend.
# Project Overview
This project is the Customer/User Frontend for a Furniture E-Commerce Platform.
The user side  panel allows administrators to:
* View business analytics
* Manage product categories
* Manage products
* Manage customer orders
* Monitor platform performance
The frontend communicates with a NestJS backend through REST APIs.
# Tech Stack
Frontend:
* Next.js 15 (App Router)
React 19
* TypeScript
* Tailwind CSS
* Shadcn UI
* React Router
* React Query (TanStack Query)
* Axios
* React Hook Form
* Zod Validation
* Recharts
Backend:
* NestJS
* PostgreSQL
* JWT Authentication
* REST API

# The user wants complete API integration documentation for the customer/user-facing side of the furniture web backend. The target audience is frontend developers who need to know exactly how to authenticate, pass tokens/cookies, and call every public and protected endpoint.  using the source information gathered below.

   ---
   Source Files Identified

───────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
  Module   │                                                                           Key Files                                                                            │
───────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
Auth       │ src/auth/auth.controller.ts, src/auth/auth.service.ts, src/auth/jwt.strategy.ts, src/auth/google.strategy.ts, src/auth/auth.module.ts                          │
───────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
   │ User       │ src/user/user.controller.ts, src/user/user.service.ts, src/user/entity/user.entity.ts                                                                          │
 ├────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
   │ Categories │ src/categories/categories.controller.ts, src/categories/dto/*.ts, src/categories/entity/category.entity.ts                                                     │
   ├────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
Products   │ src/products/products.controller.ts, src/products/products-by-category.controller.ts, src/products/dto/*.ts, src/products/entity/*.ts, src/products/enums/*.ts │                  ↓
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤                  ↑
   │ Orders     │ src/orders/orders.controller.ts, src/orders/dto/*.ts, src/orders/entity/*.ts, src/orders/enums/*.ts                                                            │
   ├────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
   │ Core Setup │ src/main.ts, src/common/guards/*.ts, src/common/decorators/current-user.decorator.ts, src/common/enums/role.enum.ts                                            │
   └────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

   ---
   What the Documentation Must Cover

   1. Overview & Base URL

   - Base URL pattern (http://localhost:3000)
   - Content-Type defaults
   - Auth strategy summary

   2. Authentication

   - Google OAuth flow: GET /auth/google → browser redirect → GET /auth/google/callback → sets accessToken cookie + redirects to frontend
   - User Registration: POST /user/signin (creates account, no token returned)
   - Token delivery: httpOnly cookie accessToken (30 min expiry) or Bearer header
   - Cookie settings: httpOnly: true, secure in prod, sameSite: 'none' in prod / 'lax' in dev, maxAge: 1800000
   - JWT payload: { sub, email, role }
   - How to attach on every protected request: two methods shown (axios withCredentials + manual Authorization: Bearer)
   - No refresh token: expired token → redirect to /auth/google
   - Axios instance setup (complete working example)
                                                                                                                                                                                                    ↓
   3. Public Routes (no auth required)

   Categories                                                                                                                                                                                       ↓

   ┌────────┬─────────────────┬─────────────────────────────────────────────┐
   │ Method │      Route      │                 Description                 │
   ├────────┼─────────────────┼─────────────────────────────────────────────┤
   │ GET    │ /categories     │ List all categories (paginated, filterable) │
   ├────────┼─────────────────┼─────────────────────────────────────────────┤
   │ GET    │ /categories/:id │ Get single category by UUID                 │
   └────────┴─────────────────┴─────────────────────────────────────────────┘

   Query params for list: page, limit, search, sortBy, order, isActive

   Response shape: CategoryResponseDto → { id, name, slug, description, imageUrl, isActive, createdAt, updatedAt }

   Products

   ┌────────┬──────────────────────────────────┬──────────────────────────────────────────────────┐
   │ Method │              Route               │                   Description                    │
   ├────────┼──────────────────────────────────┼──────────────────────────────────────────────────┤
   │ GET    │ /products                        │ List all active products (paginated, filterable) │
   ├────────┼──────────────────────────────────┼──────────────────────────────────────────────────┤
   │ GET    │ /products/:id                    │ Get single active product by UUID                │
   ├────────┼──────────────────────────────────┼──────────────────────────────────────────────────┤
   │ GET    │ /categories/:categoryId/products │ List products by category                        │
   └────────┴──────────────────────────────────┴──────────────────────────────────────────────────┘                                                                                                 ↓

   Query params for list: page, limit, search, categoryId, status, isFeatured, minPrice, maxPrice, sortBy, order

   Response shape: ProductResponseDto with nested images[] and category object

   4. Protected Routes (JWT required, Role: USER)
                                                                                                                                                                                                    ↓
   Cart — base: /cart

   ┌────────┬─────────────────────┬─────────────────────────┐                                                                                                                                       ↓
   │ Method │        Route        │       Description       │
   ├────────┼─────────────────────┼─────────────────────────┤
   │ GET    │ /cart               │ Get current user's cart │                                                                                                                                       ↓
   ├────────┼─────────────────────┼─────────────────────────┤
   │ POST   │ /cart/items         │ Add item to cart        │                                                                                                                                       ↓
   ├────────┼─────────────────────┼─────────────────────────┤
   │ PATCH  │ /cart/items/:itemId │ Update item quantity    │                                                                                                                                       ↓
   ├────────┼─────────────────────┼─────────────────────────┤
   │ DELETE │ /cart/items/:itemId │ Remove item from cart   │
───────┼─────────────────────┼─────────────────────────┤                                                                                                                                       ↓
   │ DELETE │ /cart/clear         │ Clear entire cart       │
   └────────┴─────────────────────┴─────────────────────────┘                                                                                                                                       ↓

   Request/response shapes documented with full DTOs. Limits: max 10 unique products.

   Orders — base: /orders
                                                                                                                                                                                                    ↓
   ┌────────┬────────────────────┬───────────────────────┐
   │ Method │       Route        │      Description      │                                                                                                                                          ↓
   ├────────┼────────────────────┼───────────────────────┤
   │ POST   │ /orders/checkout   │ Place order from cart │                                                                                                                                          ↓
   ├────────┼────────────────────┼───────────────────────┤
   │ GET    │ /orders/my-orders  │ List user's orders    │
   ├────────┼────────────────────┼───────────────────────┤                                                                                                                                          ↓
   │ GET    │ /orders/:id        │ Get single order      │
   ├────────┼────────────────────┼───────────────────────┤
   │ PATCH  │ /orders/:id/cancel │ Cancel an order       │                                                                                                                                          ↓
   └────────┴────────────────────┴───────────────────────┘

   Full CheckoutDto documented (address, payment method). Enums: OrderStatus, PaymentStatus, PaymentMethod.                                                                                         ↓

   5. Frontend Integration Guide
                                                                                                                                                                                                    ↓
   - Complete Axios instance with baseURL, withCredentials: true, interceptor for 401 handling
   - Cookie-based auth walkthrough (browser handles automatically after OAuth)
   - Bearer token alternative (extract from login response, store in memory, attach to header)                                                                                                      ↓
   - Error handling patterns (401 → re-auth, 403 → role error, 422 → validation)
   - CORS requirement: frontend must run at FRONTEND_HOST and send credentials: include
   - Real code examples for each section (login flow, add to cart, checkout, list orders)                                                                                                           ↓

   ---
   Implementation Approach

   1. Read all the source files listed above
   2. Produce a single structured Markdown API integration document                                                                                                                                 ↓
   3. Target audience: frontend developer with no backend knowledge

   The output document will be placed at:                                                                                                                                                           ↓
   F:\propertize\furniture_website\Backend\furniture-web-backend\docs\customer-api-integration.md
                                                                                                                                                                                                    ↓
   ---
rification                                                                                                                                                                                     ↓

   After generation, manually verify:
   - All 15 endpoints are documented (2 auth, 2 category, 3 product, 5 cart, 4 order)
   - Request/response examples are accurate to actual DTOs                                                                                                                                          ↓
   - Cookie and Bearer examples are both present
Axios setup code is complete and runnableRoute Protection
Route Protection
Public Routes:
/
/products
/product/[slug]
/categories
/login
/register
/auth/callback
Protected Routes:
/account
/orders
/wishlist
/checkout
/addresses
/profile
Middleware checks:
accessToken cookie existence only.
Do not verify JWT inside middleware.
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
