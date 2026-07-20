# Graph Report - D:/SMKAW02PDN/Laporan PKL/Project/ikn-revisi-2  (2026-07-20)

## Corpus Check
- 8 files · ~824,106 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 126 nodes · 102 edges · 30 communities (22 shown, 8 thin omitted)
- Extraction: 81% EXTRACTED · 19% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

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
- Next Config

## God Nodes (most connected - your core abstractions)
1. `Website Sitemap / Feature List` - 7 edges
2. `scripts` - 5 edges
3. `Landing Page Layout` - 4 edges
4. `Rubber Tree (Karet / Hevea brasiliensis)` - 4 edges
5. `compilerOptions` - 3 edges
6. `Website Feature Tracking Table (Table1)` - 3 edges
7. `Industrial Factory Facility` - 3 edges
8. `paths` - 2 edges
9. `@/*` - 2 edges
10. `next` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (30 total, 8 thin omitted)

### Community 0 - "Next/React Dependencies"
Cohesion: 0.12
Nodes (15): next, dependencies, next, react, react-dom, name, private, scripts (+7 more)

### Community 1 - "Site Content Data"
Cohesion: 0.13
Nodes (14): akhlak, capabilities, company, contact, locations, marquee, misi, nav (+6 more)

### Community 2 - "Sitemap Reference (image)"
Cohesion: 0.22
Nodes (10): Fitur Bahasa (Indonesia - Inggris language feature), IKN Revisi Web Project, About Us Section (History, Vision and Mission, Contact Us), Business Section (Resiprene Products, Rubber Articles Products), Media Section (Galery, News), Sustainability Section (Certificate, Our Customers, Brochures, Whistle Blowing System, Reach Compliance), Google Sheets-style Spreadsheet UI, Status: Open (all items) (+2 more)

### Community 3 - "jsconfig Path Aliases"
Cohesion: 0.33
Nodes (5): compilerOptions, baseUrl, paths, @/*, ./*

### Community 4 - "Homepage UI Mock (image)"
Cohesion: 0.40
Nodes (6): Homepage Screenshot, Content Section, Hero Section, IKN Project Web UI, Landing Page Layout, Navigation Bar

### Community 5 - "Root Layout & Fonts"
Cohesion: 0.40
Nodes (3): metadata, plexMono, poppins

### Community 7 - "Rubber Tapping Imagery"
Cohesion: 0.60
Nodes (5): Natural Latex / Rubber Sap, Rubber Tree Latex Tapping Photo, Rubber Plantation Commodity, Rubber Tree (Karet / Hevea brasiliensis), Rubber Tapping (Penyadapan)

### Community 9 - "i18n Dictionary"
Cohesion: 0.50
Nodes (3): languages, navTree, t

### Community 10 - "Factory Imagery"
Cohesion: 0.67
Nodes (4): Industrial Factory Facility, IKN Project Asset, Pabrik 2-1 Factory Illustration, Industrial Manufacturing Concept

### Community 11 - "Production Imagery"
Cohesion: 0.50
Nodes (4): Agriculture / Plantation Commodity, Rubber Production Photo, Rubber Production Activity, Natural Rubber (Karet)

## Knowledge Gaps
- **51 isolated node(s):** `metadata`, `metadata`, `poppins`, `plexMono`, `metadata` (+46 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 2 inferred relationships involving `Website Sitemap / Feature List` (e.g. with `Website Feature Tracking Table (Table1)` and `IKN Revisi Web Project`) actually correct?**
  _`Website Sitemap / Feature List` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `Landing Page Layout` (e.g. with `Homepage Screenshot` and `Content Section`) actually correct?**
  _`Landing Page Layout` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `Rubber Tree (Karet / Hevea brasiliensis)` (e.g. with `Natural Latex / Rubber Sap` and `Rubber Plantation Commodity`) actually correct?**
  _`Rubber Tree (Karet / Hevea brasiliensis)` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `metadata`, `metadata`, `poppins` to the rest of the system?**
  _51 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Next/React Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Should `Site Content Data` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._