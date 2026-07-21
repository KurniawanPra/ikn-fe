# Graph Report - ikn-revisi-2  (2026-07-21)

## Corpus Check
- 105 files · ~134,712 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 490 nodes · 1053 edges · 33 communities (28 shown, 5 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `68d2ba56`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Next/React Dependencies
- Site Content Data
- Sitemap Reference (image)
- jsconfig Path Aliases
- Homepage UI Mock (image)
- Root Layout & Fonts
- Icon & Theme Toggle
- Rubber Tapping Imagery
- Language Provider
- i18n Dictionary
- Factory Imagery
- Production Imagery
- Berita Page
- Keberlanjutan Page
- Produk Page
- Tentang Page
- Hero Slider
- Video Gallery
- Kontak Page
- Login Page
- Home Page
- Footer
- Hero Subtitle
- Footer.tsx
- CustomerCompanyForm.tsx
- page.tsx
- Reveal (scroll)
- Next Config

## God Nodes (most connected - your core abstractions)
1. `formatIDR()` - 29 edges
2. `formatDate()` - 28 edges
3. `useAuth()` - 27 edges
4. `AdminPageHead()` - 21 edges
5. `compilerOptions` - 18 edges
6. `Column` - 17 edges
7. `DataTable()` - 17 edges
8. `RowActions()` - 15 edges
9. `Reveal()` - 14 edges
10. `useCart()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `AdminAdditionalFees()` --calls--> `formatIDR()`  [EXTRACTED]
  app/(admin)/admin/additional-fees/page.tsx → lib/format.ts
- `AdminLoginForm()` --calls--> `useAuth()`  [EXTRACTED]
  app/(admin)/admin/login/page.tsx → components/AuthProvider.tsx
- `LoginForm()` --calls--> `useAuth()`  [EXTRACTED]
  app/(site)/login/page.tsx → components/AuthProvider.tsx
- `AdminCustomers()` --calls--> `formatDate()`  [EXTRACTED]
  app/(admin)/admin/customers/page.tsx → lib/format.ts
- `AdminNews()` --calls--> `formatDate()`  [EXTRACTED]
  app/(admin)/admin/news/page.tsx → lib/format.ts

## Import Cycles
- None detected.

## Communities (33 total, 5 thin omitted)

### Community 0 - "Next/React Dependencies"
Cohesion: 0.08
Nodes (24): next, dependencies, next, react, react-dom, devDependencies, @types/node, @types/react (+16 more)

### Community 1 - "Site Content Data"
Cohesion: 0.19
Nodes (12): metadata, Marquee(), akhlak, capabilities, company, marquee, misi, news (+4 more)

### Community 2 - "Sitemap Reference (image)"
Cohesion: 0.22
Nodes (10): Fitur Bahasa (Indonesia - Inggris language feature), IKN Revisi Web Project, About Us Section (History, Vision and Mission, Contact Us), Business Section (Resiprene Products, Rubber Articles Products), Media Section (Galery, News), Sustainability Section (Certificate, Our Customers, Brochures, Whistle Blowing System, Reach Compliance), Google Sheets-style Spreadsheet UI, Status: Open (all items) (+2 more)

### Community 3 - "jsconfig Path Aliases"
Cohesion: 0.06
Nodes (30): ./*, dom, dom.iterable, ES2022, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts (+22 more)

### Community 4 - "Homepage UI Mock (image)"
Cohesion: 0.40
Nodes (6): Homepage Screenshot, Content Section, Hero Section, IKN Project Web UI, Landing Page Layout, Navigation Bar

### Community 5 - "Root Layout & Fonts"
Cohesion: 0.11
Nodes (20): metadata, plexMono, poppins, CartProvider(), HeroSubtitle(), HeroTitle(), LangToggle(), LanguageContext (+12 more)

### Community 6 - "Icon & Theme Toggle"
Cohesion: 0.20
Nodes (7): metadata, AdminShell(), groups, NavGroup, Theme, ThemeToggle(), roleLabels

### Community 7 - "Rubber Tapping Imagery"
Cohesion: 0.60
Nodes (5): Natural Latex / Rubber Sap, Rubber Tree Latex Tapping Photo, Rubber Plantation Commodity, Rubber Tree (Karet / Hevea brasiliensis), Rubber Tapping (Penyadapan)

### Community 8 - "Language Provider"
Cohesion: 0.05
Nodes (43): AdminAdditionalFees(), metadata, typeLabels, metadata, metadata, metadata, metadata, metadata (+35 more)

### Community 9 - "i18n Dictionary"
Cohesion: 0.09
Nodes (29): AdminCustomers(), AdminNews(), AdminOrderDetail(), statusActions, AdminOrders(), metadata, AdminDashboard(), metadata (+21 more)

### Community 10 - "Factory Imagery"
Cohesion: 0.67
Nodes (4): Industrial Factory Facility, IKN Project Asset, Pabrik 2-1 Factory Illustration, Industrial Manufacturing Concept

### Community 11 - "Production Imagery"
Cohesion: 0.50
Nodes (4): Agriculture / Plantation Commodity, Rubber Production Photo, Rubber Production Activity, Natural Rubber (Karet)

### Community 12 - "Berita Page"
Cohesion: 0.16
Nodes (18): AdminLoginForm(), AuthContext, AuthContextValue, AuthProvider(), isAccount(), readSession(), Account, AdminAccount (+10 more)

### Community 13 - "Keberlanjutan Page"
Cohesion: 0.06
Nodes (42): OrderTracking(), adminUsers, customers, dashboardStats, menuItems, permissionList, wbsReports, wbsStatusLabels (+34 more)

### Community 14 - "Produk Page"
Cohesion: 0.10
Nodes (19): CheckoutPage(), DEFAULT_SHIPPING, AddToCart(), AdminPageHeadProps, NavItem, CartButton(), CartContext, CartContextValue (+11 more)

### Community 15 - "Tentang Page"
Cohesion: 0.24
Nodes (7): metadata, AccountNav(), links, useAuth(), CustomerShell(), pageTitle(), CustomerGuard()

### Community 17 - "Video Gallery"
Cohesion: 0.21
Nodes (6): metadata, metadata, CustomerAddresses(), CustomerProfileForm(), getCustomerProfile(), CustomerAddress

### Community 18 - "Kontak Page"
Cohesion: 0.38
Nodes (5): bodies, generateMetadata(), NewsDetail(), newsBySlug(), newsItems

### Community 19 - "Login Page"
Cohesion: 0.18
Nodes (5): metadata, slides, IconProps, paths, sustainability

### Community 20 - "Home Page"
Cohesion: 0.39
Nodes (6): AdminPayments(), CustomerOrderDetail(), PaymentProof(), bankById(), getOrderForCustomer(), shippingById()

### Community 21 - "Footer"
Cohesion: 0.19
Nodes (6): metadata, metadata, metadata, Reveal(), RevealProps, certificates

### Community 23 - "Footer.tsx"
Cohesion: 0.33
Nodes (3): contact, locations, nav

### Community 28 - "Reveal (scroll)"
Cohesion: 0.15
Nodes (5): metadata, metadata, BreadcrumbItem, brochures, customerLogos

## Knowledge Gaps
- **126 isolated node(s):** `metadata`, `typeLabels`, `metadata`, `metadata`, `metadata` (+121 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useAuth()` connect `Tentang Page` to `Root Layout & Fonts`, `Icon & Theme Toggle`, `i18n Dictionary`, `Berita Page`, `Video Gallery`, `Home Page`, `CustomerCompanyForm.tsx`, `page.tsx`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `formatIDR()` connect `i18n Dictionary` to `Language Provider`, `Home Page`, `Produk Page`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `formatDate()` connect `i18n Dictionary` to `Language Provider`, `Kontak Page`, `Home Page`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `metadata`, `typeLabels`, `metadata` to the rest of the system?**
  _126 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Next/React Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `jsconfig Path Aliases` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `Root Layout & Fonts` be split into smaller, more focused modules?**
  _Cohesion score 0.11397849462365592 - nodes in this community are weakly interconnected._