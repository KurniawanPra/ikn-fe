# Graph Report - ikn-revisi-2  (2026-07-21)

## Corpus Check
- 91 files · ~131,669 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 424 nodes · 958 edges · 25 communities (20 shown, 5 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3eaca99e`
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
- Reveal (scroll)
- Next Config

## God Nodes (most connected - your core abstractions)
1. `Icon()` - 40 edges
2. `formatIDR()` - 29 edges
3. `formatDate()` - 28 edges
4. `StatusBadge()` - 22 edges
5. `AdminPageHead()` - 21 edges
6. `compilerOptions` - 18 edges
7. `DataTable()` - 17 edges
8. `RowActions()` - 15 edges
9. `Reveal()` - 14 edges
10. `Breadcrumb()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `AdminCustomers()` --calls--> `formatDate()`  [EXTRACTED]
  app/(admin)/admin/customers/page.js → lib/format.ts
- `AdminNews()` --calls--> `formatDate()`  [EXTRACTED]
  app/(admin)/admin/news/page.js → lib/format.ts
- `AdminWhistleblowing()` --calls--> `formatDate()`  [EXTRACTED]
  app/(admin)/admin/whistleblowing/page.js → lib/format.ts
- `Berita()` --calls--> `formatDate()`  [EXTRACTED]
  app/(site)/berita/page.js → lib/format.ts
- `AdminAdditionalFees()` --calls--> `formatIDR()`  [EXTRACTED]
  app/(admin)/admin/additional-fees/page.js → lib/format.ts

## Import Cycles
- None detected.

## Communities (25 total, 5 thin omitted)

### Community 0 - "Next/React Dependencies"
Cohesion: 0.08
Nodes (24): next, dependencies, next, react, react-dom, devDependencies, @types/node, @types/react (+16 more)

### Community 1 - "Site Content Data"
Cohesion: 0.18
Nodes (11): metadata, metadata, akhlak, company, contact, locations, misi, nav (+3 more)

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
Cohesion: 0.14
Nodes (16): metadata, plexMono, poppins, CartProvider(), Footer(), HeroSubtitle(), HeroTitle(), LangToggle() (+8 more)

### Community 6 - "Icon & Theme Toggle"
Cohesion: 0.20
Nodes (7): metadata, AdminShell(), groups, Icon(), paths, PaymentProof(), ThemeToggle()

### Community 7 - "Rubber Tapping Imagery"
Cohesion: 0.60
Nodes (5): Natural Latex / Rubber Sap, Rubber Tree Latex Tapping Photo, Rubber Plantation Commodity, Rubber Tree (Karet / Hevea brasiliensis), Rubber Tapping (Penyadapan)

### Community 8 - "Language Provider"
Cohesion: 0.07
Nodes (33): metadata, metadata, metadata, metadata, metadata, AdminCustomers(), metadata, metadata (+25 more)

### Community 9 - "i18n Dictionary"
Cohesion: 0.12
Nodes (32): AdminAdditionalFees(), metadata, typeLabels, AdminOrderDetail(), statusActions, AdminOrders(), metadata, AdminDashboard() (+24 more)

### Community 10 - "Factory Imagery"
Cohesion: 0.67
Nodes (4): Industrial Factory Facility, IKN Project Asset, Pabrik 2-1 Factory Illustration, Industrial Manufacturing Concept

### Community 11 - "Production Imagery"
Cohesion: 0.50
Nodes (4): Agriculture / Plantation Commodity, Rubber Production Photo, Rubber Production Activity, Natural Rubber (Karet)

### Community 12 - "Berita Page"
Cohesion: 0.11
Nodes (24): AdminLogin(), metadata, LoginForm(), AccountGuard(), AccountNav(), links, AuthContext, AuthContextValue (+16 more)

### Community 13 - "Keberlanjutan Page"
Cohesion: 0.07
Nodes (29): AdditionalFee, AdminUser, BankAccount, Brochure, Certificate, Customer, CustomerLogo, CustomerStatus (+21 more)

### Community 14 - "Produk Page"
Cohesion: 0.16
Nodes (15): CartPage(), generateMetadata(), ProductDetail(), CheckoutPage(), AddToCart(), CartButton(), CartContext, useCart() (+7 more)

### Community 15 - "Tentang Page"
Cohesion: 0.33
Nodes (6): AdminProducts(), metadata, CategoryPage(), generateMetadata(), getCategory(), products

### Community 16 - "Hero Slider"
Cohesion: 0.15
Nodes (9): metadata, HeroSlider(), slides, Marquee(), VideoGallery(), capabilities, marquee, stats (+1 more)

### Community 17 - "Video Gallery"
Cohesion: 0.22
Nodes (6): reviews, Category, Product, Review, StatusLabel, StockStatus

### Community 18 - "Kontak Page"
Cohesion: 0.38
Nodes (5): bodies, generateMetadata(), NewsDetail(), newsBySlug(), newsItems

### Community 28 - "Reveal (scroll)"
Cohesion: 0.14
Nodes (10): Berita(), metadata, metadata, metadata, metadata, metadata, Breadcrumb(), Reveal() (+2 more)

## Knowledge Gaps
- **130 isolated node(s):** `metadata`, `typeLabels`, `metadata`, `metadata`, `metadata` (+125 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Icon()` connect `Icon & Theme Toggle` to `Site Content Data`, `Root Layout & Fonts`, `Language Provider`, `i18n Dictionary`, `Berita Page`, `Produk Page`, `Hero Slider`, `Kontak Page`, `Footer`, `Reveal (scroll)`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Why does `formatIDR()` connect `i18n Dictionary` to `Produk Page`, `Tentang Page`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `formatDate()` connect `i18n Dictionary` to `Language Provider`, `Kontak Page`, `Reveal (scroll)`, `Produk Page`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `metadata`, `typeLabels`, `metadata` to the rest of the system?**
  _130 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Next/React Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `jsconfig Path Aliases` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `Root Layout & Fonts` be split into smaller, more focused modules?**
  _Cohesion score 0.13675213675213677 - nodes in this community are weakly interconnected._