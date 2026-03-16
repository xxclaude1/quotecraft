# QuoteCraft — Project Intelligence

## Overview
QuoteCraft is a quote building and estimation tool for Australian tradies and small home-service operators. It runs as a PWA, works fully offline, and produces professional PDF quotes. The target user has big hands, a cracked phone screen, and zero patience for enterprise software.

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Vite + React 18 | No SSR needed — this is a client-side PWA. Vite gives fastest DX. |
| Language | TypeScript (strict) | Type safety across data model, stores, and components. |
| Styling | Tailwind CSS v4 | Custom design tokens, no component library. Every component built from scratch. |
| State | Zustand | Lightweight, no boilerplate. One store per domain (quotes, clients, settings). |
| Forms | React Hook Form | Performant form state for the quote builder's many inputs. |
| Local DB | Dexie.js (IndexedDB) | Offline-first persistence. All data lives locally. |
| PDF | @react-pdf/renderer | Client-side PDF generation — no server needed. |
| Drag & Drop | @dnd-kit | Line item reordering in quote builder. |
| Routing | React Router v6 | File-based-ish routing with data loaders. |
| Icons | Lucide React | Used sparingly. Labels > icons for this audience. |
| PWA | vite-plugin-pwa | Service worker, offline caching, install prompt. |
| Deployment | Netlify (static) | Simple static hosting with automatic deploys. |

## Architecture

### Folder Structure
```
src/
├── assets/              # Static assets, fonts
├── components/
│   ├── layout/          # Shell, Nav, PageHeader
│   ├── quote/           # QuoteBuilder, LineItemRow, TotalsPanel, QuoteForm
│   ├── dashboard/       # QuoteList, StatsStrip, StatusBadge
│   ├── clients/         # ClientList, ClientForm
│   ├── templates/       # TemplateList, TemplateEditor
│   ├── pricebook/       # PriceBookList, PriceBookForm
│   ├── settings/        # SettingsForm, LogoUpload
│   └── ui/              # Shared primitives: Button, Input, Select, Badge, etc.
├── pages/               # Route-level page components
├── store/               # Zustand stores (quoteStore, clientStore, settingsStore)
├── db/                  # Dexie database schema and helpers
├── hooks/               # Custom React hooks
├── utils/               # Pure utility functions (formatting, calculations)
├── types/               # TypeScript interfaces and type definitions
└── main.tsx             # App entry point
```

### Data Flow
1. **All reads come from IndexedDB via Dexie** — no loading spinners for local data.
2. **Zustand stores** hold UI state (current quote being edited, active filters, nav state).
3. **React Hook Form** manages the quote builder form state and validation.
4. **Writes go to Dexie** first, then Zustand state updates reactively.
5. **Auto-save**: Quote builder saves to IndexedDB on every field change (debounced 500ms).

## Design System

### Colors
```
--color-bg:           #F5F2ED   (warm off-white, like sandstone)
--color-bg-alt:       #EDE9E3   (alternating row background)
--color-surface:      #FFFFFF   (input backgrounds, elevated surfaces)
--color-dark:         #1A1A1A   (primary text, nav bar)
--color-accent:       #E8580C   (high-vis orange — CTAs, active states, totals ONLY)
--color-text:         #1A1A1A   (primary text)
--color-text-muted:   #6B6560   (secondary text, labels)
--color-border:       #DDD8D0   (dividers, input borders)
--color-success:      #2A7D6E   (accepted, success states)
--color-error:        #B84233   (declined, errors, delete)
--color-warning:      #D4A017   (expired, warnings)
```

### Typography
- **Headings**: `"DM Mono", monospace` — industrial, like gauge readings
- **Body**: `"Inter", sans-serif` — clean, legible
- **Numbers/Prices**: Always `"DM Mono", monospace` — prices are the most important data
- **Font weights**: Light for labels (300), Regular for body (400), Semibold for emphasis (600), Bold for values/totals (700)

### Spacing Scale
Uses Tailwind's default scale. Key values:
- Component internal padding: `p-3` (12px) to `p-4` (16px)
- Section gaps: `gap-6` (24px) to `gap-8` (32px)
- Page padding: `px-4` mobile, `px-8` desktop

### Component Conventions
- **NO floating cards with shadows.** Use flat sections with subtle border dividers.
- **NO rounded pill buttons.** Buttons use `rounded` (4px) max. Square/slightly-rounded feels mechanical.
- **Tables look like inventory sheets** — tight rows, alternating backgrounds, monospace numbers right-aligned.
- **Navigation feels like physical tabs** — chunky, clear, one-tap targets.
- **Inputs**: Large tap targets (min 44px height), numeric keypad for number fields (`inputmode="decimal"`).
- **Transitions**: 100-150ms max. Snappy, mechanical. No floaty animations.
- **Delete**: Swipe-to-reveal pattern, not modals.

### Status Colors
| Status | Color | Usage |
|--------|-------|-------|
| Draft | `text-text-muted bg-bg-alt` | Grey, subdued |
| Sent | `text-accent bg-accent/10` | Orange, attention |
| Accepted | `text-success bg-success/10` | Teal, positive |
| Declined | `text-error bg-error/10` | Red-clay, negative |
| Expired | `text-text-muted/50 bg-bg-alt` | Faded, desaturated |

## Coding Conventions

### File Naming
- Components: `PascalCase.tsx` (e.g., `QuoteBuilder.tsx`)
- Hooks: `camelCase.ts` prefixed with `use` (e.g., `useAutoSave.ts`)
- Stores: `camelCase.ts` suffixed with `Store` (e.g., `quoteStore.ts`)
- Utils: `camelCase.ts` (e.g., `formatCurrency.ts`)
- Types: `camelCase.ts` (e.g., `quote.ts`)

### Component Pattern
```tsx
// Always named exports, never default
export function ComponentName({ prop }: Props) {
  // hooks first
  // derived state
  // handlers
  // render
}
```

### TypeScript
- `strict: true` in tsconfig
- No `any` — use `unknown` and narrow
- All data model types in `src/types/`
- Prefer interfaces over type aliases for objects

### Import Order
1. React / React libraries
2. Third-party libraries
3. Local components
4. Local hooks / stores / utils
5. Types
6. Styles / assets

## Data Model

See `src/types/` for complete interfaces. Key entities:
- `Business` — Settings/profile for the tradie's business
- `Client` — Contact in the client book
- `Quote` — A quote with line items, totals, status
- `LineItem` — Individual item within a quote
- `SavedLineItem` — Reusable line item in the price book
- `QuoteTemplate` — Named set of line items for common jobs

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| No component library | Avoid generic SaaS look. Every component matches the workshop aesthetic. |
| Offline-first (Dexie/IndexedDB) | Tradies work on job sites with bad reception. App must work without internet. |
| Client-side PDF | No server dependency. Generate PDFs on-device, share via native share sheet. |
| Vite over Next.js | No SSR needed. Simpler build, faster DX, easier PWA setup. |
| No dark mode in MVP | Focus on perfecting one theme. Dark mode is Phase 2. |
| AUD/GST defaults | Australian market first. Internationalize later. |

## Common Patterns

### Adding a New Page
1. Create page component in `src/pages/PageName.tsx`
2. Add route in `src/App.tsx`
3. Add nav item in `src/components/layout/Nav.tsx`

### Adding a New Component
1. Create in appropriate `src/components/{domain}/` folder
2. Named export, TypeScript props interface
3. Use Tailwind classes matching design tokens
4. No inline styles

### Adding a New DB Table
1. Increment version in `src/db/database.ts`
2. Add table schema in the version upgrade
3. Add TypeScript interface in `src/types/`
4. Create Dexie table accessor

### Adding a New Store
1. Create in `src/store/`
2. Use Zustand `create` with TypeScript
3. Actions modify Dexie first, then update store state

## Commands

```bash
npm run dev      # Start dev server (port 5173)
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
npm run lint     # ESLint check
```

## Known Limitations / Future Work

### Deferred to Phase 2
- Cloud sync / multi-device
- Dark mode
- Client portal (clients view quotes online)
- Invoice generation (convert accepted quote to invoice)
- Photo attachments on quotes
- Import contacts from phone
- Analytics dashboard
- Team features (multiple users per business)

### Current Limitations
- All data is device-local only
- No authentication system
- PDF sharing uses browser download only (native share sheet in Phase 2)
- No quote expiry auto-detection (manual status change only)
