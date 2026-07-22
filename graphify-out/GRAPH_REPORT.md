# Graph Report - fe  (2026-07-22)

## Corpus Check
- 115 files · ~140,343 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 490 nodes · 1127 edges · 24 communities (21 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.57)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a4001e3f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Icon.tsx
- catalog.ts
- commerce.ts
- useAuth
- AuthProvider.tsx
- compilerOptions
- types.ts
- package.json
- site.ts
- Reveal.tsx
- Breadcrumb.tsx
- Footer.tsx
- page.tsx
- api.ts
- layout.tsx
- HeroSlider.tsx
- next.config.mjs
- next-env.d.ts

## God Nodes (most connected - your core abstractions)
1. `formatIDR()` - 33 edges
2. `useAuth()` - 31 edges
3. `formatDate()` - 28 edges
4. `AdminPageHead()` - 21 edges
5. `compilerOptions` - 18 edges
6. `Column` - 17 edges
7. `DataTable()` - 17 edges
8. `useLang()` - 15 edges
9. `RowActions()` - 15 edges
10. `Reveal()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `AuthCard()` --calls--> `useAuth()`  [EXTRACTED]
  app/(auth)/login/page.tsx → components/AuthProvider.tsx
- `Berita()` --calls--> `formatDate()`  [EXTRACTED]
  app/(site)/berita/page.tsx → lib/format.ts
- `AdminAdditionalFees()` --calls--> `formatIDR()`  [EXTRACTED]
  app/(admin)/admin/additional-fees/page.tsx → lib/format.ts
- `AdminCustomers()` --calls--> `formatDate()`  [EXTRACTED]
  app/(admin)/admin/customers/page.tsx → lib/format.ts
- `AdminNews()` --calls--> `formatDate()`  [EXTRACTED]
  app/(admin)/admin/news/page.tsx → lib/format.ts

## Import Cycles
- None detected.

## Communities (24 total, 3 thin omitted)

### Community 0 - "Icon.tsx"
Cohesion: 0.06
Nodes (37): metadata, typeLabels, metadata, metadata, metadata, metadata, metadata, AdminCustomers() (+29 more)

### Community 1 - "catalog.ts"
Cohesion: 0.07
Nodes (28): metadata, CategoryPage(), generateMetadata(), metadata, generateMetadata(), ProductDetail(), AdminProduct, emptyForm (+20 more)

### Community 2 - "commerce.ts"
Cohesion: 0.13
Nodes (19): AdminAdditionalFees(), AdminDashboard(), metadata, pipeline, AdminPayments(), CartPage(), AddToCart(), AdminSalesChart() (+11 more)

### Community 3 - "useAuth"
Cohesion: 0.08
Nodes (30): metadata, metadata, AccountNav(), AdminShell(), groups, NavGroup, useAuth(), CustomerShell() (+22 more)

### Community 4 - "AuthProvider.tsx"
Cohesion: 0.07
Nodes (30): AuthCard(), AuthMode, metadata, metadata, metadata, metadata, AuthContext, AuthContextValue (+22 more)

### Community 5 - "compilerOptions"
Cohesion: 0.06
Nodes (30): ./*, dom, dom.iterable, ES2022, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts (+22 more)

### Community 6 - "types.ts"
Cohesion: 0.09
Nodes (30): adminUsers, customers, menuItems, monthLabels, permissionList, salesByMonth, salesSeries, wbsReports (+22 more)

### Community 7 - "package.json"
Cohesion: 0.08
Nodes (25): next, dependencies, next, react, react-dom, devDependencies, @types/node, @types/react (+17 more)

### Community 8 - "site.ts"
Cohesion: 0.16
Nodes (13): metadata, metadata, Marquee(), akhlak, capabilities, company, marquee, misi (+5 more)

### Community 9 - "Reveal.tsx"
Cohesion: 0.25
Nodes (3): metadata, Video, videos

### Community 10 - "Breadcrumb.tsx"
Cohesion: 0.11
Nodes (11): metadata, metadata, metadata, metadata, metadata, BreadcrumbItem, Reveal(), RevealProps (+3 more)

### Community 11 - "Footer.tsx"
Cohesion: 0.33
Nodes (3): contact, locations, nav

### Community 12 - "page.tsx"
Cohesion: 0.24
Nodes (7): Berita(), metadata, bodies, generateMetadata(), NewsDetail(), newsBySlug(), newsItems

### Community 13 - "api.ts"
Cohesion: 0.07
Nodes (42): AdminOrderDetail(), statusActions, metadata, metadata, CheckoutPage(), DEFAULT_SHIPPING, AdminPageHeadProps, NavItem (+34 more)

### Community 17 - "HeroSlider.tsx"
Cohesion: 0.22
Nodes (3): slides, IconProps, paths

## Knowledge Gaps
- **126 isolated node(s):** `metadata`, `typeLabels`, `metadata`, `metadata`, `metadata` (+121 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useAuth()` connect `useAuth` to `catalog.ts`, `commerce.ts`, `AuthProvider.tsx`, `api.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `formatIDR()` connect `commerce.ts` to `Icon.tsx`, `catalog.ts`, `api.ts`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `formatDate()` connect `Icon.tsx` to `catalog.ts`, `commerce.ts`, `page.tsx`, `api.ts`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `metadata`, `typeLabels`, `metadata` to the rest of the system?**
  _126 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Icon.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0639269406392694 - nodes in this community are weakly interconnected._
- **Should `catalog.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0700354609929078 - nodes in this community are weakly interconnected._
- **Should `commerce.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12923076923076923 - nodes in this community are weakly interconnected._