# Section Patterns Catalog

Layout patterns extracted from ~5,100 existing section components across ~120 categories.
Each pattern describes a structural approach — not a style or color scheme.

**Usage:** Phase 2 selects one pattern per section. Phase 3 implements the selected
pattern with the project's style preset.

**Note:** Patterns describe LAYOUT only. Colors, typography, border-radius, shadows,
and animations are determined by the Style Preset, not by the pattern.

---

## Hero Patterns

### H-01: Two-Column Split

**Layout:** Two equal columns (50/50). Left column: badge, headline, description, 2-3 CTA buttons, optional stats row. Right column: large image, illustration, or video with optional floating cards/badges overlapping edges.
**Key idea:** The universal workhorse — balanced text-visual pairing gives equal weight to messaging and brand imagery.
**Element count:** Left: 1 badge + headline + description + 2-3 buttons + 3 stats. Right: 1 main visual + 2-4 floating elements.
**Best for:** SaaS products, e-commerce, app landing pages, real estate, corporate sites.
**Not for:** Portfolio-first or fullscreen immersive experiences.
**Responsive:** Columns stack vertically on mobile, image below text.

### H-02: Centered Text with Floating Elements

**Layout:** Single centered column (max-width constrained). All content stacked vertically: badge → headline → subtitle → buttons → stats. Absolutely positioned floating shapes/gradients animate around the text. No distinct image region.
**Key idea:** Minimal, focused narrative — floating background elements replace static imagery for concentrated attention on messaging.
**Element count:** 1 badge + headline + subtitle + 2 buttons + 3-4 stats. 4-6 floating background shapes.
**Best for:** B2B SaaS, event countdowns, typography-focused brands, presentation sites.
**Not for:** Product photography sites, e-commerce with hero images.
**Responsive:** Full-width content on mobile, floating elements hidden for performance.

### H-03: Fullscreen Image Carousel

**Layout:** 100vh × 100vw. Sequential image slides with fade/scale transitions. Content overlay positioned bottom-left or center. Navigation arrows + dot indicators at bottom.
**Key idea:** Visual storytelling through sequential imagery — each slide is a complete narrative moment.
**Element count:** Per slide: title + subtitle + 1 CTA. Controls: 2 arrows + 3-5 dots.
**Best for:** Travel/hospitality, luxury brands, lifestyle, photo portfolios.
**Not for:** Text-heavy messaging, accessibility-first sites, mobile-first only designs.
**Responsive:** Carousel functional on mobile with touch swipe; auto-play may pause.

### H-04: Full-Bleed Photo with Overlay

**Layout:** Full-bleed background image (60-70vh) with dark gradient overlay from bottom. Text content absolutely positioned at bottom-left or center. Optional secondary content section below on contrasting background.
**Key idea:** The image tells the story; text is secondary overlay creating cinematic presentation.
**Element count:** 1 badge + 1 title + 1 subtitle + optional price/location tag.
**Best for:** Real estate, photography, luxury fashion, hotels, automotive.
**Not for:** Text-heavy messaging, data-focused sites, conversion-dependent pages.
**Responsive:** Image height reduces to 50vh on tablet, text repositions to bottom-center.

### H-05: Geometric Composite Grid

**Layout:** Two columns — left: traditional text + buttons + stats. Right: CSS Grid composition of colored blocks, circles, nested rectangles creating a modular visual pattern (3×3 or custom grid).
**Key idea:** Right side showcases brand geometry or design system — combines marketing copy with design demonstration.
**Element count:** Left: badge + headline + description + 2-3 buttons + 3 stats. Right: 6-12 geometric shapes.
**Best for:** Design agencies, design systems, tech/software, premium brands.
**Not for:** Photography-first brands, minimal designs, small-screen experiences.
**Responsive:** Right grid simplifies on tablet, becomes horizontal scroll or stacked on mobile.

### H-06: Asymmetric Bold Editorial

**Layout:** Highly asymmetric grid (7/5 column split). Oversized typography occupying massive space. Image with rotation/skew transforms. High-contrast information boxes. Heavy borders (4px+), background watermark text.
**Key idea:** Defies traditional balance — maximizes contrast and visual tension. The layout itself becomes the statement.
**Element count:** 1 large headline + 1-2 accent blocks + 1 image + 2-3 info boxes + bottom grid (3 items).
**Best for:** Editorial/magazine sites, startup brands, arts/design studios, alternative aesthetics.
**Not for:** Corporate, medical/financial, e-commerce, accessibility-focused.
**Responsive:** Columns equalize on tablet, stacks vertically on mobile, rotations removed.

### H-07: Layered Elevation Cards

**Layout:** Two columns — left: text content. Right: stacked cards with progressive elevation shadows (z-depth). Cards offset vertically with glassmorphism (backdrop-blur). Interactive hover states elevate cards further.
**Key idea:** Creates 3D space through layering — communicates feature richness and modern tech stack through depth metaphor.
**Element count:** Left: badge + headline + description + 2 buttons + 3-4 features. Right: 3 layered cards with progress indicators.
**Best for:** SaaS dashboards, app landing pages, analytics tools, feature-heavy products.
**Not for:** Minimal designs, photo-heavy marketing, simple product messaging.
**Responsive:** Cards flatten on mobile (no offset), shadows become subtle.

### H-08: Terminal / HUD Display

**Layout:** Two columns — left: text with tech specs. Right: simulated tech interface with monospace font, scan-line overlays, bracket corner accents, data stream displays, wireframe objects or particle animations.
**Key idea:** Creates immersive tech environment — the right side becomes a "computer interface" rather than static image.
**Element count:** Left: status indicator + headline + description + 2-4 specs + 2 buttons. Right: header + 4-6 data lines + wireframe/animation + corner brackets.
**Best for:** Tech startups, AI/ML platforms, developer tools, gaming/esports.
**Not for:** Traditional businesses, elderly audiences, conservative brands.
**Responsive:** Terminal simplifies on tablet, becomes single card on mobile.

---

## Features / Benefits Patterns

### F-01: Symmetric Card Grid

**Layout:** 3-column responsive grid with equal-sized cards. Each card: icon (top), title, description. All items have equal visual weight with consistent spacing and dimensions.
**Key idea:** Democratic layout — every feature gets identical prominence, ideal when no feature outranks others.
**Element count:** 4-6 items for balanced grid.
**Best for:** SaaS features, tech platforms, tools with multiple capabilities, certifications display.
**Not for:** Services requiring hierarchy, storytelling-focused narratives.
**Responsive:** Cards reflow 3→2→1 columns naturally.

### F-02: Bento Box Asymmetric Grid

**Layout:** 2-4 column grid with mixed card sizes (1×1, 2×1, 2×2 spans). Featured items get larger cards with CTAs. Creates visual interest through intentional size variation.
**Key idea:** Intentional hierarchy through size — featured capabilities visually dominate while secondary ones support.
**Element count:** 8-12 items with mixed sizes.
**Best for:** Platforms with feature hierarchy, achievement showcases, award displays, use case grids.
**Not for:** Simple feature lists, mobile-first (loses visual impact when stacked).
**Responsive:** Becomes single-column on mobile, loses bento effect.

### F-03: Zigzag Alternating Rows

**Layout:** Vertical stack of 2-column rows that alternate content position: image-left/text-right, then image-right/text-left. Each row is a 50/50 split with generous whitespace.
**Key idea:** Storytelling through sequential presentation — each feature gets dedicated space for deep explanation.
**Element count:** 4-6 sections (each taking significant vertical space).
**Best for:** Educational content, step-by-step narratives, detailed feature explanations, guarantee breakdowns.
**Not for:** Quick feature scanning, mobile (wastes space on alternating images).
**Responsive:** Stacks to single column (content above visual) on mobile.

### F-04: Split Screen (50-50 Visual + List)

**Layout:** Full-viewport two-zone horizontal split. One half: large visual/illustration with floating stats. Other half: vertically stacked benefit items with icons.
**Key idea:** Hero-like immersion for features — generous whitespace creates premium perception.
**Element count:** 3-4 items per side maximum.
**Best for:** Key value propositions, mobile app presentations, premium positioning, certifications.
**Not for:** Many features (limited to 3-4), mobile viewing.
**Responsive:** Vertical stacking on mobile, visual becomes smaller banner.

### F-05: Comparison Table

**Layout:** Tabular grid with column headers (feature name + 3-4 product/tier columns). Feature rows grouped by category. Popular column visually highlighted (scale-up, accent border).
**Key idea:** Structured comparison — data-driven presentation for analytical buyers who need to evaluate differences.
**Element count:** 3-4 columns × 4-6 rows per category.
**Best for:** Feature comparisons, certification levels, award tiers, use case matrices.
**Not for:** Mobile-first, storytelling, design showcases.
**Responsive:** Horizontal scrolling on mobile or collapses to single-feature-per-row.

### F-06: Stat-Centric Number Grid

**Layout:** 4-column grid where each card features a large prominent number (hero-sized), icon, title, description, and trend indicator badge.
**Key idea:** Numbers as the primary communication device — metrics speak louder than descriptions.
**Element count:** 4-8 stats.
**Best for:** Achievement milestones, trust-building metrics, award counts, certification numbers.
**Not for:** Feature descriptions, service contexts requiring detail.
**Responsive:** Reflows to 2→1 columns, maintains number prominence.

### F-07: Tabbed Content Switcher

**Layout:** Horizontal tab buttons at top, content area below that switches per tab. Each tab reveals icon + title + description + sub-features. Only one category visible at a time.
**Key idea:** Progressive disclosure — reduces cognitive overload by showing one category at a time.
**Element count:** 3-5 tabs × 2-3 benefits per tab.
**Best for:** Multi-category features, use case showcases, certification categories, guarantee tiers.
**Not for:** One-page viewing (requires interaction), simplicity-focused designs.
**Responsive:** Tab buttons scroll or stack on mobile, content reflows below.

---

## Services Patterns

### SV-01: Uniform Card Grid

**Layout:** 3-column responsive grid with identical cards. Each card: icon header, title, description, CTA link/button. Hover effects: shadow elevation, scale transform.
**Key idea:** Balanced symmetry with uniform dimensions — all services presented as equal options for browsing.
**Element count:** 6-9 service cards.
**Best for:** Multi-service businesses, consulting firms, agency offerings.
**Not for:** Single service focus, services needing detailed explanation.
**Responsive:** 3→2→1 columns on smaller screens.

### SV-02: Alternating Detail Showcase

**Layout:** Large sections alternating image-left/image-right, each taking 50% width. Full-height sections with abundant whitespace. Secondary content (specs, reviews) below each.
**Key idea:** Storytelling through sequential presentation with breathing room for premium perception per service.
**Element count:** 3-6 detailed service blocks.
**Best for:** Services requiring deep explanation, premium aspirational imagery, narrative marketing.
**Not for:** Quick browsing, many similar services (repetitive).
**Responsive:** Always 1-column on mobile (image top, text bottom).

### SV-03: Category Tab Filter

**Layout:** Horizontal filter bar (pills/tabs) above content grid. Animated category switching updates the grid dynamically. Optional count badges per category.
**Key idea:** Progressive disclosure — users select their area of interest first, then browse filtered services.
**Element count:** 4-6 category buttons, 6-8 services per view.
**Best for:** Multi-category services (dev, design, marketing), agencies with diverse offerings.
**Not for:** Single-category businesses, simple catalogs.
**Responsive:** Horizontal scrolling tabs on mobile + 1-column grid.

### SV-04: Service Detail Split

**Layout:** Two-column layout (60/40). Left: large service image or illustration. Right: service title, detailed description, feature bullet list, pricing info, CTA button. Often used for individual service pages.
**Key idea:** Deep-dive into a single service with visual context on one side and comprehensive details on the other.
**Element count:** 1 image + title + description + 4-6 bullet features + price + CTA.
**Best for:** Individual service pages, high-value services, consultation offerings.
**Not for:** Service overview listings, quick browsing.
**Responsive:** Stacks vertically, image above content.

### SV-05: Horizontal Detail List

**Layout:** Full-width list items (not grid). Large image left + rich content right on desktop. Number/icon prefix, metadata badges per item.
**Key idea:** Dense information hierarchy for comparison-focused users who need specs side-by-side.
**Element count:** 4-8 items.
**Best for:** Professional service packages with detailed specs, B2B service tiers.
**Not for:** Visual-first services, mobile-first experiences.
**Responsive:** Image-content stacks vertically on mobile.

---

## Products / Catalog Patterns

### PR-01: Product Card Grid

**Layout:** 3-4 column responsive grid with identical product cards. Each card: image (consistent aspect ratio), title, price, rating stars, CTA button. Hover effects: image scale, shadow.
**Key idea:** Uniform browsing grid — predictable card structure allows fast visual scanning across many products.
**Element count:** 8-12 product cards per page.
**Best for:** E-commerce catalogs, product showcases, store category pages.
**Not for:** Single product focus, service businesses.
**Responsive:** 4→3→2→1 columns.

### PR-02: Sidebar Filter + Grid

**Layout:** Left sticky sidebar (250-280px) with filter controls (categories, price range, rating, stock status). Right main area with sorted/filtered grid. Grid/list view toggle, results counter, sort dropdown.
**Key idea:** Power-user interface for refinement-based discovery with complex taxonomy navigation.
**Element count:** Sidebar: 3-5 filter groups. Grid: 8-12 products visible.
**Best for:** E-commerce with many attributes, marketplaces, technical catalogs.
**Not for:** Mobile (sidebar too wide), simple catalogs, browsing behavior.
**Responsive:** Sidebar hidden on mobile, filters move to bottom sheet/modal or top accordion.

### PR-03: Featured Hero + Related Grid

**Layout:** Large hero section (split-screen or full-width) for flagship product. Below: specs table/gallery + related items carousel or 3-item grid.
**Key idea:** Hero-driven with depth extension — conversion focus on one primary product with exploration below.
**Element count:** 1 featured + 3-6 related items.
**Best for:** Flagship products, new arrivals, campaign pages.
**Not for:** Browsing many items equally, inventory pages.
**Responsive:** Hero stacks vertically, related items become horizontal scroll.

### PR-04: Product Detail Split with Gallery

**Layout:** Two-column layout. Left: image gallery with thumbnail strip (vertical or horizontal) + main large image with lightbox. Right: title, rating, price, variant selectors (size/color), quantity control, add-to-cart CTA, description tabs below.
**Key idea:** Classic e-commerce product page — gallery for visual exploration, right side for purchase decision.
**Element count:** 4-8 gallery images + title + price + 2-3 selectors + CTA + tabbed description.
**Best for:** Any e-commerce product detail page, especially fashion, electronics, furniture.
**Not for:** Digital products, service pages.
**Responsive:** Gallery becomes horizontal carousel above content on mobile.

### PR-05: Magazine Category Layout

**Layout:** Large featured product card spanning full width at top (with overlay text, badge). Below: "Editor Picks" 3-column grid. Below that: wider 4-column latest products grid. Load more button at bottom.
**Key idea:** Editorial hierarchy — featured product anchors the page, curated picks add authority, latest grid adds breadth.
**Element count:** 1 featured + 3 picks + 4-8 latest items.
**Best for:** Curated shops, editorial commerce, lifestyle brands, seasonal collections.
**Not for:** Inventory-focused catalogs, search-driven shopping.
**Responsive:** Featured card maintains height, grids collapse 4→2→1.

### PR-06: Masonry Product Grid

**Layout:** CSS columns-based masonry with variable-height product cards. Cards have different aspect ratios creating Pinterest-style flow. Hover reveals action buttons (bookmark, quick-view).
**Key idea:** Visual variety through organic flow — prevents grid monotony for image-heavy catalogs.
**Element count:** 10-16 items with mixed heights.
**Best for:** Fashion, design products, handmade items, visual discovery shopping.
**Not for:** Data-heavy catalogs, uniform product types, comparison shopping.
**Responsive:** Columns reduce 4→3→2→1, masonry effect preserved.

### PR-07: Category Navigation Hub

**Layout:** Grid of category cards (2-3 columns), each with icon, title, product count, and brief description. Clicking navigates to filtered view. Optional: search bar above, breadcrumb navigation.
**Key idea:** Entry point for large catalogs — visual category cards replace text-only navigation.
**Element count:** 6-12 category cards.
**Best for:** Large stores with many departments, marketplaces, multi-brand shops.
**Not for:** Small catalogs, single-category stores.
**Responsive:** Grid reflows 3→2→1 columns.

---

## How It Works / Process Patterns

### W-01: Horizontal Step Grid with Connector

**Layout:** Steps arranged in a horizontal 3-4 column grid. Continuous horizontal line connecting step number badges across the top. Cards below with icon, title, description.
**Key idea:** Visual continuity without blocking content — the connecting line creates flow while cards provide detail.
**Element count:** 3-4 steps.
**Best for:** Straightforward linear processes, quick onboarding, service steps.
**Not for:** Complex branching workflows, processes with many steps (>6).
**Responsive:** Stacks to single column, connecting line disappears.

### W-02: Alternating Zigzag Timeline

**Layout:** Events alternate left-right from a central vertical line. Cards on alternating sides create zigzag pattern. Timeline dots with date labels at center.
**Key idea:** Maximum visual rhythm and space efficiency — the line acts as a spine for the narrative.
**Element count:** 5-6 events.
**Best for:** Company milestones, project history, product evolution narratives.
**Not for:** Action-focused process steps, time-constrained flows.
**Responsive:** Single column on left with dot markers on mobile.

### W-03: Radial / Circular Hub

**Layout:** Steps positioned radially around a central circle. Interactive active state highlights one step at a time. Details displayed in center or below.
**Key idea:** Cyclical/iterative process visualization — emphasizes continuous feedback loops.
**Element count:** 3-4 steps (fits visually on circle).
**Best for:** Iterative processes, continuous improvement cycles, agile methodologies.
**Not for:** Sequential linear workflows, first-time user onboarding.
**Responsive:** Converts to 2×2 grid on mobile, center hub becomes detail card below.

### W-04: Bordered Column Stack

**Layout:** Cards stack vertically with thick left border accent (3-4px) in brand accent. Number badge top-left. Clean hierarchy with minimal spacing.
**Key idea:** Minimal, content-forward — subtle directional indicator with excellent readability.
**Element count:** 4-7 steps.
**Best for:** Professional/business processes, detailed workflows, corporate documentation.
**Not for:** Playful/creative designs, visual-heavy processes.
**Responsive:** Full-width stacking, border maintains visual continuity.

### W-05: Icon-Dot Ribbon

**Layout:** Icons in circles arranged in a single horizontal row with connecting lines. Minimalist — no cards or detailed content, just icons + labels below each.
**Key idea:** Quick process visualization — space-efficient icon-heavy communication.
**Element count:** 5-7 steps.
**Best for:** Quick reference guides, feature summaries, mobile-first designs.
**Not for:** Steps requiring detailed descriptions, complex explanations.
**Responsive:** Scrollable horizontal strip on mobile, connectors hide.

### W-06: Tabbed Step Carousel

**Layout:** Horizontal tabs/buttons at top showing step names. Clicking reveals full card content for that step. Progress bar shows completion status. One step visible at a time.
**Key idea:** Focused attention on single step — reduces cognitive load through progressive revelation.
**Element count:** 4-5 steps.
**Best for:** Detailed onboarding, wizard-style flows, processes needing deep explanation per step.
**Not for:** Overview-style sections, processes users need to see all at once.
**Responsive:** Horizontal scrolling tab bar on mobile, full-width content area.

---

## Testimonials / Reviews Patterns

### T-01: Classic Card Grid

**Layout:** 2-3 column responsive grid with equal cards. Each card: star rating top, quote text, divider, small circular avatar + name + role at bottom.
**Key idea:** Clean, scannable — all testimonials get equal weight for broad social proof.
**Element count:** 4-6 testimonials.
**Best for:** General social proof, B2B trust-building, service businesses.
**Not for:** Single featured testimonial, visual-heavy brands.
**Responsive:** Grid reflows 3→2→1 columns.

### T-02: Large Avatar Hero

**Layout:** Cards with extra-large circular avatar (120-192px) centered above text. Large centered quote below. Rating displayed as floating badge on avatar.
**Key idea:** People-centric — the avatar drives visual hierarchy, making testimonials feel personal and credible.
**Element count:** 3-4 testimonials.
**Best for:** Personal services, coaching, wellness, premium brands.
**Not for:** Anonymous reviews, B2B enterprise.
**Responsive:** Natural column reflow, avatar sizes may reduce.

### T-03: Horizontal Scroll Carousel

**Layout:** Horizontal scrollable row of fixed-width cards. Each card: portrait image top, quote text + stats below. Hidden scrollbar with scroll snap points.
**Key idea:** Image-centric engagement — scroll interaction creates discovery feel for browsing many testimonials.
**Element count:** 5+ testimonials (visible 2-3 at a time).
**Best for:** Visual brands, lifestyle services, photography-adjacent businesses.
**Not for:** Accessibility-focused, text-heavy reviews.
**Responsive:** Full-width single card on mobile with swipe.

### T-04: Video Testimonial Grid

**Layout:** 2-3 column grid with 16:9 aspect ratio cards. Video thumbnail with play button overlay. Small avatar + metadata below. Duration and view count overlaid on thumbnail.
**Key idea:** Video-first social proof — leverages video's credibility for higher trust impact.
**Element count:** 4-6 video testimonials.
**Best for:** Service businesses, SaaS, education platforms, coaching.
**Not for:** Quick-scan pages, low-bandwidth audiences.
**Responsive:** Grid reflows, video maintains aspect ratio.

### T-05: Featured + Supporting Two-Tier

**Layout:** Top: large featured hero testimonial (2-column: video/photo left + full quote right, large avatar). Below: 3-column grid of smaller supporting cards (smaller avatars, brief quotes).
**Key idea:** Hierarchical social proof — one premium testimonial anchors trust, supporting ones add volume.
**Element count:** 1 featured + 3-6 supporting.
**Best for:** High-conversion pages, premium services, products with one standout testimonial.
**Not for:** Equal-weight social proof, simple trust sections.
**Responsive:** Featured stacks vertically, supporting grid reflows.

### T-06: Professional Case Study Layout

**Layout:** Vertical stack of full-width cards. Medium avatar in left sidebar with verified badge. Long-form journal-style quote. Skill tags, relationship info, and results metrics below.
**Key idea:** Depth over breadth — treats testimonials as rich profiles or case studies with quantifiable results.
**Element count:** 2-4 detailed testimonials.
**Best for:** B2B enterprise, consulting, professional services, high-ticket products.
**Not for:** Quick social proof, consumer products.
**Responsive:** Single column stack, maintains rich metadata.

### T-07: Filtered Category Tabs with Metrics

**Layout:** Tab navigation at top (Service/Product/Support categories). Grid below filtered by active tab. Each card includes satisfaction percentage bar and metric labels alongside standard quote.
**Key idea:** Quantified social proof — categorical filtering + embedded metrics add analytical credibility.
**Element count:** 3-5 tabs × 3-4 testimonials per tab.
**Best for:** SaaS with multiple products, multi-service businesses, data-driven brands.
**Not for:** Simple testimonial sections, emotional/story-driven brands.
**Responsive:** Tabs scroll horizontally, cards stack.

---

## Pricing Patterns

### P-01: Three-Card Center Emphasis

**Layout:** Three pricing cards in horizontal grid. Center card scaled larger with "Popular"/"Recommended" badge. Side cards have hover scale effects. Feature checklist in each card.
**Key idea:** Visual hierarchy through scaling — the recommended plan "floats" above others.
**Element count:** 3 cards, 4-7 features each, 1 CTA per card.
**Best for:** SaaS with clear tier differentiation (Basic/Pro/Enterprise).
**Not for:** 4+ tiers, mobile-first apps (scaling breaks responsiveness).
**Responsive:** Single column stack on mobile, scale removed.

### P-02: Feature Comparison Table

**Layout:** Plans as column headers in dense table. Features organized by category rows. Cells contain check/cross icons or values. Hover effects on rows. Sticky header on desktop.
**Key idea:** Data-driven transparency — direct feature comparison without marketing fluff.
**Element count:** 3-4 plan columns, 4-5 categories, 15-20 features total.
**Best for:** Enterprise B2B SaaS, complex products, compliance-heavy solutions.
**Not for:** Simple 3-tier plans, visual/creative products, mobile-heavy audiences.
**Responsive:** Card-based accordion per plan on mobile.

### P-03: Interactive Calculator Split

**Layout:** Two-column layout. Left: interactive calculator with sliders, incrementers, toggles. Right: dynamic feature list + real-time price result. Price updates as inputs change.
**Key idea:** Personalized pricing — customers build their own plan, increasing engagement and trust.
**Element count:** 2-3 input controls, 1 dynamic price display, 4-6 features, 1 CTA.
**Best for:** Per-seat/per-user pricing, usage-based billing, enterprise configurators.
**Not for:** Simple fixed plans, mobile-first (layout breaks).
**Responsive:** Stacks vertically, calculator on top.

### P-04: Monthly/Yearly Toggle Grid

**Layout:** Standard 3-column card grid with toggle switch above. Cards update prices on toggle with "Save X%" badge appearing for yearly selection.
**Key idea:** Incentivize commitment — annual plans appear cheaper through psychological pricing anchoring.
**Element count:** 1 toggle, 3 cards, 2 price points per card, savings display.
**Best for:** SaaS subscriptions, products with annual discounts.
**Not for:** Enterprise, one-time purchases, same-price plans.
**Responsive:** Toggle stays at top, cards stack to single column.

### P-05: Flash Deal Grid with Live Timers

**Layout:** Responsive grid (1-3 columns) with individual countdown timers on each card. Cards display: product name, deal price, original price, discount percentage badge, live countdown (HH:MM:SS), stock progress bar with claimed/remaining counts.
**Key idea:** Time urgency + inventory scarcity combined on same card for FOMO-driven conversion.
**Element count:** 8-12 elements per card (prices, timer, stock bar, badges, CTA).
**Best for:** E-commerce flash sales, limited inventory, time-sensitive promotions.
**Not for:** Subscription pricing, feature comparison, B2B.
**Responsive:** Grid scales 3→2→1 columns.

### P-06: Pros vs. Cons Split

**Layout:** Two-column layout divided by color zones. Left column (positive accent): pros list with check icons. Right column (negative accent): cons list with cross icons. Clear visual separation.
**Key idea:** Explicit positive/negative framing — psychological positioning for decision-making contexts.
**Element count:** 5 pros + 3 cons (variable).
**Best for:** Product evaluation, comparison content, objective reviews.
**Not for:** Objective spec comparison, feature tables.
**Responsive:** Columns stack on mobile, accent indicators maintained.

---

## FAQ Patterns

### Q-01: Single-Column Accordion

**Layout:** Full-width accordion items in single column. Questions expand/collapse vertically. Clean borders or subtle dividers. Optional search bar in header and contact CTA at bottom.
**Key idea:** The universal FAQ layout — simple, accessible, familiar to all users.
**Element count:** 8-15 questions.
**Best for:** Medium-sized FAQs, most business types, accessibility-first.
**Not for:** Very large FAQs (>20 questions without grouping).
**Responsive:** Naturally responsive, works identically on all screens.

### Q-02: Category-Grouped Accordion

**Layout:** Two-level hierarchy: category headers with icons, nested accordion questions within each. Both levels expand/collapse independently. Category-specific accent indicators.
**Key idea:** Organized complexity — users navigate to their topic first, then find specific answers.
**Element count:** 4-6 categories, 3-5 questions each.
**Best for:** Large categorized FAQs, complex products, multi-service businesses.
**Not for:** Simple FAQs (<10 questions).
**Responsive:** Full-width stacking, categories become collapsible sections.

### Q-03: Tab-Filtered Accordion

**Layout:** Horizontal tabs at top for categories. Only one tab's accordion content shown at a time. Combines tab switching with accordion expand/collapse within.
**Key idea:** Cleaner UX than nested accordions — dedicated space per category without visual overload.
**Element count:** 3-5 tabs, 4-8 questions per tab.
**Best for:** Medium-large FAQs with clear categories, product documentation.
**Not for:** Quick scans, very few questions.
**Responsive:** Tabs scroll horizontally, accordion full-width below.

### Q-04: Two-Column Flat Display

**Layout:** Two-column grid with all Q/A pairs visible simultaneously (no accordion). Questions and answers displayed as static pairs with clean typography.
**Key idea:** No interaction required — everything visible at once for quick scanning.
**Element count:** 6-10 Q/A pairs (short answers).
**Best for:** Short FAQs with concise answers, documentation-style.
**Not for:** Long answers, many questions (page becomes too long).
**Responsive:** Single column on mobile.

### Q-05: Sidebar Navigation

**Layout:** Left sticky sidebar with clickable category list. Right panel shows selected category's FAQs. Content updates when category is selected.
**Key idea:** Persistent navigation — scales well for documentation-like FAQ content with many categories.
**Element count:** 5-8 categories, 3-6 questions per category.
**Best for:** Large documentation-like FAQs, knowledge bases, support centers.
**Not for:** Simple FAQs, mobile-first (sidebar takes too much space).
**Responsive:** Sidebar becomes top dropdown or collapses on mobile.

---

## CTA / Contact Patterns

### C-01: Centered Single Column

**Layout:** Vertically stacked content, centered horizontally. Heading, subheading, 1-3 buttons or simple form (email input + submit). Max-width constrained container.
**Key idea:** Simplicity and focus — linear top-to-bottom flow captures attention for a single action.
**Element count:** Title + subtitle + 1-3 buttons or 1 input + 1 button.
**Best for:** Newsletter signups, product launches, webinar registrations, announcement banners.
**Not for:** Complex multi-field forms, regional inquiries.
**Responsive:** Buttons stack vertically, input fields go full-width.

### C-02: Form + Information Sidebar

**Layout:** Left column: main form (60-70% width). Right column: stacked contact info cards with icons (phone, email, address, hours). Clear visual separation.
**Key idea:** Detailed form + contextual reference simultaneously — professional B2B approach.
**Element count:** 8-15 form fields + 3-4 info cards.
**Best for:** Enterprise inquiries, vendor registration, professional contact, multi-office companies.
**Not for:** Simple CTAs, mobile-first experiences.
**Responsive:** Single column on mobile, sidebar info becomes cards below form.

### C-03: Sales Funnel Stack

**Layout:** Three vertical tiers: hero with headline + subtext (top), benefit/feature grid 3-4 columns (middle), prominent CTA form in accented container (bottom).
**Key idea:** Build conviction top-to-bottom: attention → benefits → commitment. Each section increases user readiness.
**Element count:** Heading + 3-4 benefit cards + 3-8 form fields + CTA.
**Best for:** SaaS signups, marketplace seller registration, developer platform onboarding.
**Not for:** Quick contact forms, emergency support tickets.
**Responsive:** Grid reduces columns, form expands full-width.

### C-04: Multi-Step Wizard

**Layout:** Horizontal step indicator at top (numbered circles with connecting lines). Current step's form fields displayed. Next/back buttons. Step indicators show active/completed/upcoming states.
**Key idea:** Break complexity into digestible steps — progress indicator reduces abandonment.
**Element count:** 3-5 steps, 4-8 form fields per step, navigation buttons.
**Best for:** Appointment booking, service selection + checkout, account creation, surveys.
**Not for:** Quick CTAs, single-field forms, information lookups.
**Responsive:** Step bar compresses or becomes vertical, fields stack single column.

### C-05: Category Selector + Form

**Layout:** Grid of 4-8 category/priority selector cards. User clicks to select (visual state change). Selected card highlighted. Form fields appear below. Single submit button.
**Key idea:** Qualify leads upfront — route different inquiry types before collecting details.
**Element count:** 4-8 category cards + 4-6 form fields + submit.
**Best for:** Support tickets, priority selection, department routing, lead qualification.
**Not for:** Simple CTAs, complex multi-step processes.
**Responsive:** Card grid reduces 4→2→1 columns, form stays single column.

### C-06: Trust-Building Guarantee Block

**Layout:** Centered card with large icon/illustration top. Prominent headline + benefit text. Trust element (guarantee badge, lock icon) in highlighted box. Single prominent CTA. Small disclaimer text.
**Key idea:** Address purchase anxiety — guarantee messaging removes risk at the final decision point.
**Element count:** Icon + headline + guarantee box + CTA + disclaimer.
**Best for:** Final CTA before purchase, money-back guarantees, privacy reassurance.
**Not for:** Contact form routing, service inquiries, appointment booking.
**Responsive:** Card maintains centered layout, icon may shrink on mobile.

---

## Team / About Patterns

### A-01: Classic Card Grid

**Layout:** 3-4 column responsive grid with uniform cards. Photo on top (square or portrait), name + role below, optional social icons and short bio.
**Key idea:** Standard team showcase — uniform treatment gives every member equal visibility.
**Element count:** 6-12+ members.
**Best for:** Executive teams, diverse teams, formal professional settings.
**Not for:** Single-leader focus, narrative-heavy about sections.
**Responsive:** Grid stacks 4→2→1 columns.

### A-02: Editorial Split Screen

**Layout:** Full-height alternating left/right image-text blocks, one per leader. Image 50% width, text 50% with large headings, achievement lists, social links.
**Key idea:** Magazine-style profiles — each leader gets editorial-quality presentation with storytelling space.
**Element count:** 2-5 leaders.
**Best for:** C-suite profiles, premium positioning, leadership narratives.
**Not for:** Large teams, role-focused presentations.
**Responsive:** Image stacks above text, side-by-side on desktop.

### A-03: Minimal Roster List

**Layout:** Horizontal rows with columns: number/avatar | name | role/specialization | position. Small circular avatars (60-80px). Text-only roles with horizontal separators.
**Key idea:** Typography-first, data-focused — emphasizes information hierarchy with minimal visual flourish.
**Element count:** 5-15+ members.
**Best for:** Internal directories, specialist rosters, professional services.
**Not for:** Creative/design teams, visual storytelling.
**Responsive:** Single column rows, text stays horizontal.

### A-04: Image Hover Reveal

**Layout:** Square/portrait image cards (aspect 3:4 to 4:5). Info (bio, skills, social) appears on hover via semi-transparent overlay. Photos are the primary visual.
**Key idea:** Image-centric — photos tell the story, details appear on demand without cluttering the view.
**Element count:** 4-8 members.
**Best for:** Creative teams, design roles, portfolio-style presentation.
**Not for:** Role-heavy, data-heavy presentations, touch-first mobile.
**Responsive:** Overlay becomes always-visible info section on mobile.

### A-05: Horizontal Scroll Carousel

**Layout:** Horizontal scroll container with fixed-width cards, snap points. One-at-a-time or partial multi-view reveal with scroll interaction.
**Key idea:** Motion-driven engagement — discovery through scrolling for larger teams.
**Element count:** 8+ members.
**Best for:** Marketing websites, large team showcases, engagement-focused.
**Not for:** Accessibility-critical apps, static reference layouts.
**Responsive:** Full-width vertical stack on mobile, horizontal scroll on desktop.

### A-06: Chronological Story Timeline

**Layout:** Vertical staggered alternating left-right blocks with timeline connector line. Each block: icon/year badge + image + narrative text. 4-6 chapters.
**Key idea:** Origin story visualization — shows company evolution through time with narrative depth.
**Element count:** 4-6 timeline entries.
**Best for:** About/history pages, origin stories, company milestones.
**Not for:** Team rosters, quick reference lookups.
**Responsive:** Single column with left-side timeline on mobile.

### A-07: Metrics Dashboard

**Layout:** Grid of stat cards (4-6) + progress bars + achievement lists + icons. Visual data hierarchy with large numbers, indicators, and progress visualization.
**Key idea:** Impact-focused about section — metrics and achievements tell the company story through numbers.
**Element count:** 4-6 stat cards + progress bars + achievement items.
**Best for:** About pages showing impact, company growth, environmental/social metrics.
**Not for:** Personal team introductions, small teams.
**Responsive:** 4→2→1 columns, charts scale proportionally.

---

## Portfolio / Projects / Gallery Patterns

### G-01: Masonry Layout

**Layout:** CSS columns with varied image heights. 3 different aspect ratios (tall 3:4, square 1:1, wide 3:2) flow into natural columns. Hover reveals gradient overlay with text.
**Key idea:** Organic visual flow — varied sizing creates interest and handles mixed-ratio content naturally.
**Element count:** 8-15 items.
**Best for:** Photography portfolios, mixed-media galleries, design showcases.
**Not for:** Uniform product catalogs, grid-aligned designs.
**Responsive:** Reduces from 3→2→1 columns.

### G-02: Uniform Grid

**Layout:** Strict CSS grid (2-4 columns) with identical aspect ratios (square or 4:3). Single gap value throughout, perfect alignment. Overlay on hover with centered title.
**Key idea:** Predictable, clean layout — uniform sizing creates professional, organized presentation.
**Element count:** 6-12 items.
**Best for:** Clean portfolio showcases, product photography, consistent brand imagery.
**Not for:** Mixed-ratio content, creative/artistic galleries.
**Responsive:** 4→3→2→1 columns.

### G-03: Carousel Slider

**Layout:** Single large item display (16:9) with navigation arrows and dot indicators. Thumbnail preview strip below (5-6 visible). Overlay with text on primary image.
**Key idea:** Sequential storytelling — each project gets full attention with cinematic presentation.
**Element count:** 5-10 items (viewed one at a time).
**Best for:** Featured project showcases, case study highlights, storytelling galleries.
**Not for:** Quick browsing, large collections needing overview.
**Responsive:** Thumbnails hide on mobile, arrows simplify.

### G-04: Lightbox Modal Gallery

**Layout:** Thumbnail grid (2-3 columns) as browsing view. Click opens fixed full-screen modal with large image, prev/next navigation, close button, counter ("3 of 6").
**Key idea:** Browse-then-focus — thumbnails for discovery, modal for immersion.
**Element count:** 6-20 thumbnails.
**Best for:** Photography galleries, event photos, product detail images.
**Not for:** Portfolio with descriptions, case-study formats.
**Responsive:** 3→2 column thumbnails, modal fills viewport.

### G-05: Fullscreen Immersive Sections

**Layout:** Vertical stack of full-screen sections (100vh each). Background image fills entire viewport with dark overlay. Large centered typography overlaid. One project per screen.
**Key idea:** Maximum impact — each project commands the entire viewport for dramatic presentation.
**Element count:** 4-8 projects.
**Best for:** Hero portfolios, luxury brand galleries, architectural photography.
**Not for:** Large collections, quick browsing, content-heavy galleries.
**Responsive:** Maintained on mobile with reduced text sizing.

### G-06: Category-Grouped Sections

**Layout:** Multiple separate sections, each with own 3-column grid. Section header with icon + accent bar per category. Visual separation between groups. Summary stats below.
**Key idea:** Organized portfolio — visual categorization lets visitors navigate to their area of interest.
**Element count:** 3-5 categories × 3-6 items each.
**Best for:** Multi-discipline portfolios, agencies with diverse work, categorized galleries.
**Not for:** Single-category portfolios, minimal designs.
**Responsive:** Category grids reduce columns independently.

### G-07: Case Study Cards with Metrics

**Layout:** 2-column grid of large cards. Each card: project image spanning full width, title, client name, challenge/solution summary, key result metrics in accent badges. CTA link to full case study.
**Key idea:** Results-oriented portfolio — each project entry emphasizes measurable outcomes, not just visuals.
**Element count:** 4-8 case study cards.
**Best for:** B2B agencies, consulting firms, performance-focused portfolios.
**Not for:** Visual-only galleries, personal art portfolios.
**Responsive:** Cards stack single column, metrics maintain visibility.

---

## Stats / Numbers Patterns

### N-01: Horizontal Counter Row

**Layout:** Single horizontal row of 4 stat items, evenly spaced. Each: large animated counter number, label below, optional icon above. Clean dividers between items.
**Key idea:** Impact at a glance — large numbers in a row create immediate impression of scale and authority.
**Element count:** 4 stats.
**Best for:** Trust-building, corporate about pages, service credibility sections.
**Not for:** Complex metrics with context, narrative-driven content.
**Responsive:** 4→2→1 columns or horizontal scroll.

### N-02: Circular Progress Indicators

**Layout:** 4-column grid with SVG-rendered circular progress bars with animated fill. Icon centered within each circle, percentage or number value displayed prominently.
**Key idea:** Visual progress — circles convey completion/performance intuitively beyond plain numbers.
**Element count:** 4-6 circular indicators.
**Best for:** Technical metrics, KPI dashboards, skill/competency displays.
**Not for:** Simple count-up stats, non-percentage metrics.
**Responsive:** 4→2→1 columns, circles scale proportionally.

### N-03: Vertical Timeline Milestones

**Layout:** Chronological vertical timeline with central gradient line. Milestone cards alternate left/right. Each card: year marker, icon badge, metric number, description.
**Key idea:** Numbers through time — shows growth trajectory and progression of achievements.
**Element count:** 5-8 milestones.
**Best for:** Company history with metrics, growth stories, annual reports.
**Not for:** Current-state-only stats, real-time dashboards.
**Responsive:** Single column on mobile with left-aligned timeline.

### N-04: Category Achievement Cards

**Layout:** 2-column grid of large cards. Each card: accent header bar with icon + title, followed by list of achievement items (label/value rows). Bottom banner with composite stats.
**Key idea:** Grouped metrics — categories create context and allow comparison between domains.
**Element count:** 4-6 categories, 3-5 items each.
**Best for:** Multi-department reports, categorized achievements, organizational dashboards.
**Not for:** Simple flat stat displays, single-metric emphasis.
**Responsive:** Cards stack single column, maintaining internal list layout.

### N-05: Countdown Timer Block

**Layout:** Centered layout with 4 large boxes (days, hours, minutes, seconds) in a horizontal row. Each box: large number + label below. Heading and description above. CTA below.
**Key idea:** Urgency creation — visual countdown drives action through time pressure.
**Element count:** 4 timer boxes + heading + CTA.
**Best for:** Product launches, event countdowns, sale endings, coming soon pages.
**Not for:** Evergreen content, static information pages.
**Responsive:** Timer boxes shrink but remain in row, or become 2×2 grid.

---

## Blog / News Patterns

### B-01: Featured + Grid

**Layout:** Large featured article full-width at top (image with gradient overlay, large title, metadata). Below: 2-3 column grid of smaller article cards with thumbnail, title, excerpt, metadata.
**Key idea:** Editorial hierarchy — the featured piece anchors the section while supporting articles provide breadth.
**Element count:** 1 featured + 4-6 grid items.
**Best for:** Company blogs, news sections, content marketing.
**Not for:** Equal-weight article lists, minimal designs.
**Responsive:** Featured stacks, grid reduces to 2→1 columns.

### B-02: Masonry Variable Grid

**Layout:** CSS Grid with variable row-span (3 columns, auto-rows). Cards of different heights. Images fill entire card with gradient overlay, title at bottom.
**Key idea:** Visual variety — Pinterest-style flow creates dynamic, engaging browse experience.
**Element count:** 6-12 articles.
**Best for:** Visual-heavy blogs, lifestyle content, photo-rich news.
**Not for:** Text-focused blogs, structured news feeds.
**Responsive:** Reduces to 2→1 columns, height variation maintained.

### B-03: Sidebar Blog Layout

**Layout:** Two-column: main content 2/3 width with article list, sidebar 1/3 with widgets (search, categories with counts, popular posts). Articles display as horizontal cards (image left, content right).
**Key idea:** Classic blog structure — sidebar provides persistent navigation and discovery tools.
**Element count:** 4-8 articles + 3-4 sidebar widgets.
**Best for:** Content-heavy blogs, news portals, knowledge bases.
**Not for:** Minimal design, mobile-first (sidebar breaks).
**Responsive:** Sidebar moves below articles on mobile.

### B-04: Chronological Timeline

**Layout:** Vertical centered timeline with gradient line. Articles alternate left/right. Date displayed in separate box opposite content. Category badges on cards.
**Key idea:** Temporal narrative — articles organized by time create a story of progression and growth.
**Element count:** 4-8 articles.
**Best for:** Company news/updates, project logs, press releases, changelog-style content.
**Not for:** Topical blogs, user-facing content marketing.
**Responsive:** Single column on mobile, timeline dots remain on left.

### B-05: Minimal Typography List

**Layout:** Single column vertical list (max-width centered). No images. Pure typography: article number, title, excerpt, date + read time. Border dividers between items.
**Key idea:** Content-first minimalism — removes all visual noise, letting writing quality speak for itself.
**Element count:** 5-10 articles.
**Best for:** Personal blogs, long-form writing, editorial sites, whitepapers.
**Not for:** Visual brands, news portals, marketing blogs.
**Responsive:** Naturally responsive, identical on all screens.

### B-06: Compact Card Grid

**Layout:** 3-column grid with compact cards. Accent bar at card top indicating category. Category label + date in header, title + excerpt below, read more link at bottom.
**Key idea:** Category-coded cards — instant visual identification of content type through accent indicators.
**Element count:** 6-9 articles.
**Best for:** Multi-category blogs, startup content, organized news feeds.
**Not for:** Image-heavy blogs, editorial/magazine style.
**Responsive:** 3→2→1 columns.

---

## Events Patterns

### EV-01: Event List with Metadata

**Layout:** Single-column scrollable list. Each item: horizontal flex with date badge (left), image (center-left), content (center), CTA button (right). Chronological ordering.
**Key idea:** Scannable chronological display prioritizing quick date/time identification per event.
**Element count:** 6-8 per item (date box, image, title, location, time, CTA).
**Best for:** Conference agendas, webinar listings, networking events.
**Not for:** Calendar-heavy contexts, high event density (15+).
**Responsive:** Flex-direction changes to column on mobile, date badge compresses.

### EV-02: Card Grid with Category Filtering

**Layout:** Multi-column grid (2-3 columns). Equal-sized cards with top image, category badge overlay, content section (title, metadata list with icons, footer with price/button). Filter tabs above grid.
**Key idea:** Uniform event catalog allowing visual comparison across categories with prominent filtering.
**Element count:** 8-10 per card (image, badge, title, 3-4 metadata items, CTA).
**Best for:** Multi-day festivals, workshop series, event marketplaces.
**Not for:** Single-event pages, timeline displays.
**Responsive:** Grid columns reduce 3→2→1, image height stays fixed.

### EV-03: Full-Page Event Detail

**Layout:** Full-viewport hero image (60-70vh) with gradient overlay and title. Below: 2-column layout — left: article prose with agenda/timeline as bordered rows. Right sticky sidebar: info card (date, time, location, attendees), pricing badge, CTA buttons.
**Key idea:** Comprehensive event narrative combining immersive hero, detailed prose, and persistent registration panel.
**Element count:** 15-20 (hero, sidebar card, metadata items, agenda items, speaker cards).
**Best for:** Major conferences, launch events, professional certifications.
**Not for:** Quick-scan event lists, recurring event series.
**Responsive:** Hero height reduces, sidebar moves below content on mobile.

### EV-04: Calendar Month Grid

**Layout:** 7-column day grid representing a month. Cells display day number + event indicator pills. Header with month navigation arrows. Below: upcoming event list section. Optional modal for event creation.
**Key idea:** Month-at-a-glance overview with drill-down capability for scheduling context.
**Element count:** 42 grid cells + header + upcoming list (4-6 items).
**Best for:** Multi-event scheduling, internal calendars, event planning dashboards.
**Not for:** Marketing event pages, single-event focus.
**Responsive:** May switch to week/day view on mobile, event list becomes primary view.

---

## Partners / Brands Patterns

### PA-01: Logo Grid with Context Cards

**Layout:** 2-3 column grid of cards. Each card: logo/image in header area, company name, description, rating stars, partnership metadata below. Cards act as mini-profiles.
**Key idea:** Partners as credibility profiles — context (ratings, descriptions) adds trust beyond just logos.
**Element count:** 6-12 partner cards.
**Best for:** Strategic partnerships, vendor showcases, marketplace profiles.
**Not for:** Simple "Trusted by" strips, high-volume logo walls.
**Responsive:** Grid reflows 3→2→1 columns.

### PA-02: Infinite Horizontal Scroll

**Layout:** Single horizontal row of logos in auto-scrolling container. Duplicated array creates infinite loop effect. Pauses on hover. No pagination controls.
**Key idea:** Continuous motion creates engagement — works for high-volume partner lists without taking vertical space.
**Element count:** 10-30+ logos (6-8 visible at a time).
**Best for:** "Trusted by" sections, landing pages, high-volume partner networks.
**Not for:** Detailed partner info, accessibility-first sites (auto-play).
**Responsive:** Visible items reduce but scroll continues, animation speed adjusts.

### PA-03: Categorized Section Grid

**Layout:** Vertical stack of category sections. Each section: bold header with optional accent border, 3-column grid of partner logos/cards within. Clear visual separation between categories.
**Key idea:** Organized partner ecosystem — categories show partner diversity and help visitors find relevant partners.
**Element count:** 3-5 categories × 3-6 partners each.
**Best for:** Complex partner ecosystems, B2B platforms, specialized partner networks.
**Not for:** Small partner counts (<5), minimalist designs.
**Responsive:** 3→2→1 columns per category.

### PA-04: Bento Grid with Variable Sizing

**Layout:** 4-column CSS Grid with mixed cell sizes (1×1, 2×1, 2×2 spans). Featured partners get larger cells. Gradient overlays on hover.
**Key idea:** Visual hierarchy through size — important partners get more space, creating a magazine-like layout.
**Element count:** 8-16 logos in variable grid.
**Best for:** Premium brand showcases, when some partners deserve more prominence.
**Not for:** Equal-importance partners, mobile contexts (complex layout breaks).
**Responsive:** Normalizes to uniform 2→1 columns on smaller screens.

---

## Careers Patterns

### CA-01: Job Card Grid with Modal Detail

**Layout:** 2-column card grid of job listings. Each card: department badge, title, salary range, key requirements. Clicking opens full-screen modal with complete job details and application form.
**Key idea:** Browse-then-apply — grid for discovery, modal for deep-dive without page navigation.
**Element count:** 6-10 job cards + modal with 5-8 form fields.
**Best for:** Companies with many openings, tech companies, interactive career pages.
**Not for:** Single-position hiring, traditional corporate pages.
**Responsive:** Grid becomes single column, modal fills viewport.

### CA-02: Job List + Sticky Apply Sidebar

**Layout:** Vertical stack of full-width job cards (left). Right sticky sidebar with quick info, recruiter contact, and application form. Step-by-step application process timeline below.
**Key idea:** Persistent apply access — sticky sidebar keeps CTA visible while browsing job details.
**Element count:** 4-8 job cards + sidebar with form + process timeline.
**Best for:** Professional/technical roles, companies wanting to showcase hiring process.
**Not for:** Simple job boards, mobile-first.
**Responsive:** Sidebar moves below content, becomes full-width.

### CA-03: Narrative Career Detail

**Layout:** Single-column centered (max-width constrained). Top banner with job title + location + salary. Day-in-life timeline section. Growth path timeline (Year 1-4+). Benefits icon grid. Centered application form.
**Key idea:** Storytelling approach — shows what the role actually looks like day-to-day and long-term growth potential.
**Element count:** Banner + day schedule (5-8 time blocks) + growth path (4 stages) + benefits grid + form.
**Best for:** Entry-level positions, companies emphasizing culture, mentorship-focused roles.
**Not for:** Senior/executive positions, simple job listings.
**Responsive:** Single column throughout, naturally responsive.

---

## Location / Map Patterns

### LO-01: Full Map with Floating Card

**Layout:** Map dominates section (full-width, tall embed). Floating white card positioned absolutely over map corner with address, directions button. Heading centered above.
**Key idea:** Map-first — the location speaks through geography, text is supplementary.
**Element count:** Heading + map + 1 floating info card.
**Best for:** Single flagship locations, elegant modern design, restaurants, hotels.
**Not for:** Multiple locations, mobile (floating card may cover map).
**Responsive:** Map stays tall, floating card repositions below on mobile.

### LO-02: Split Screen (Map + Contact Grid)

**Layout:** 2-column grid. Left: map embed. Right: stacked contact cards (address, phone, email, hours, fax) with icons and accent indicators.
**Key idea:** Comprehensive location info — map for visual context, contact cards for all communication channels.
**Element count:** Map + 5 contact info cards.
**Best for:** Businesses with multiple contact methods, professional services, offices.
**Not for:** Quick lookups, visual-first experiences.
**Responsive:** Stacks to single column, map above contacts.

### LO-03: Multiple Location Card Grid

**Layout:** 3-column grid of location cards (no map). Each card: city name, address, hours, phone/email links, CTA button. Consistent card sizing.
**Key idea:** Multi-branch overview — scannable grid for businesses with multiple physical locations.
**Element count:** 3-6 location cards, 6-8 items per card.
**Best for:** Multi-branch businesses, office listings, franchise networks.
**Not for:** Single location, detailed directions.
**Responsive:** 3→2→1 columns.

---

## Video / Media Patterns

### V-01: Video Thumbnail Grid with Modal

**Layout:** 3-column grid of video thumbnail cards. Each card: thumbnail image, play button overlay (centered circle), duration badge (bottom-right), title below. Clicking opens full-screen modal with embedded video player.
**Key idea:** Browse-then-watch — thumbnails for discovery, modal for focused viewing without page navigation.
**Element count:** 3-6 video cards + modal with player.
**Best for:** Product demos, tutorial collections, video testimonials.
**Not for:** Single-video sections, minimalist designs.
**Responsive:** Grid reflows 3→2→1, modal fills viewport.

### V-02: Centered Hero Video

**Layout:** Single large video player centered (16:9 aspect ratio) with play button overlay on poster image. Heading and description above. Optional transcript or key points below.
**Key idea:** Single-focus video — one video gets full attention as the hero element of the section.
**Element count:** Heading + description + 1 video player + optional text below.
**Best for:** Product launch videos, brand films, keynote recordings.
**Not for:** Multiple video collections, text-heavy sections.
**Responsive:** Video maintains aspect ratio, scales to container width.

### V-03: Split Content + Video

**Layout:** Two-column layout. One side: video player or thumbnail with play button. Other side: title, description, key takeaways list, CTA button.
**Key idea:** Video with context — supporting text guides the viewer on why they should watch.
**Element count:** Video + title + description + 3-4 bullet points + CTA.
**Best for:** Explainer videos, demo sections, course previews.
**Not for:** Video galleries, immersive experiences.
**Responsive:** Stacks vertically, video above content.

---

## Social Patterns

### SO-01: Social Links Card Grid

**Layout:** 3-column grid of cards. Each card: platform icon, platform name, description, CTA button linking to profile. Clean, uniform cards.
**Key idea:** Simple social directory — one card per platform for clear navigation to social profiles.
**Element count:** 4-6 platform cards.
**Best for:** Social media overview, footer alternative, "Find us" sections.
**Not for:** Analytics, live feeds, engagement metrics.
**Responsive:** 3→2→1 columns.

### SO-02: Multi-Platform Analytics Dashboard

**Layout:** Platform filter tabs at top. Below: 4-column grid of platform metric cards showing followers, engagement rate, post count. Metrics update based on selected platform tab.
**Key idea:** Social proof through numbers — platform metrics demonstrate reach and engagement credibility.
**Element count:** 4-6 platform tabs + 4 metric cards per platform.
**Best for:** Social media managers, influencer pages, agency showcases.
**Not for:** Simple profile links, consumer-facing sites.
**Responsive:** Tabs wrap, cards reflow 4→2→1.

### SO-03: Feed Dashboard with Activity List

**Layout:** Top: period filter buttons (week/month/year). Below: 3-column metrics summary cards. Below that: activity feed list with rows showing content title, engagement type, and status badge.
**Key idea:** Activity monitoring — combines summary metrics with detailed feed for content performance tracking.
**Element count:** Period filter + 3 metric cards + 5-8 feed items.
**Best for:** Content management dashboards, social monitoring, community management.
**Not for:** Public-facing pages, simple social links.
**Responsive:** Metrics reflow 3→1, feed list full-width.

---

## Header Patterns

### HD-01: Dual-Tier with Contact Bar

**Layout:** Two horizontal bars stacked. Top bar: contact info (phone, email) + social links. Main bar: logo (left), horizontal navigation (center/right), CTA button (far right). Top bar hides on scroll, main bar becomes sticky with shadow.
**Key idea:** Information-rich header — top bar surfaces contact details without cluttering navigation.
**Element count:** Top: 2-3 contact items + 3-4 social links. Main: logo + 5-7 nav links + CTA.
**Best for:** Service businesses, local businesses, professional services, e-commerce.
**Not for:** Minimal/portfolio sites, single-page apps.
**Responsive:** Top bar hidden on mobile, right-side drawer menu with contact info at bottom.

### HD-02: Transparent Scroll-Reactive

**Layout:** Single fixed bar, fully transparent on page load. On scroll: background fills in with blur, text colors invert, shadow appears. Smooth transition on all properties.
**Key idea:** Immersive start — header is invisible over hero content, materializes as user scrolls.
**Element count:** Logo + 5-7 nav links + CTA button.
**Best for:** Hero-driven landing pages, portfolio sites, luxury/lifestyle brands.
**Not for:** Content-heavy sites where nav is immediately needed, accessibility-first.
**Responsive:** Full-screen overlay menu on mobile.

### HD-03: E-commerce with Search

**Layout:** Single bar: logo (left), search input (center, hidden on mobile), action buttons right (search icon, cart with badge counter, user account icon). Cart shows dynamic item count.
**Key idea:** Action-oriented — search and cart are primary interactions, navigation is secondary.
**Element count:** Logo + search + 3 action buttons + nav links.
**Best for:** E-commerce, marketplaces, product catalogs.
**Not for:** Blog/editorial, service businesses, portfolio.
**Responsive:** Search becomes icon button on mobile, drawer includes search at top.

### HD-04: Decorative / Themed

**Layout:** Standard logo + links + CTA bar with decorative SVG wave/organic/geometric patterns at borders. Logo may include animated elements. Themed typography (serif for luxury, monospace for tech).
**Key idea:** Brand personality through decoration — header becomes a design statement beyond just navigation.
**Element count:** Logo + 4-6 nav links + CTA + decorative SVG elements.
**Best for:** Nature/wellness brands, artisan businesses, creative agencies, luxury sites.
**Not for:** Tech/SaaS, corporate, data-heavy sites.
**Responsive:** Collapsible dropdown menu, decorations simplify or hide.

### HD-05: Metrics Display Header

**Layout:** Logo (left) + inline metric cards on desktop (key stats with trend indicators). Navigation links secondary. Metrics use backdrop-blur cards.
**Key idea:** Live data in navigation — header doubles as a dashboard overview for data-driven products.
**Element count:** Logo + 3 metric cards + nav links + CTA.
**Best for:** Analytics dashboards, SaaS admin panels, internal tools.
**Not for:** Marketing sites, consumer products, content sites.
**Responsive:** Metric cards become stacked cards in mobile drawer.

---

## Footer Patterns

### FT-01: Classic 4-Column Brand-First

**Layout:** First column: logo + company description + social icons. Columns 2-4: organized link groups with category headers. Bottom bar: copyright + legal links + scroll-to-top button.
**Key idea:** The standard — clear information architecture with brand emphasis in first column.
**Element count:** Logo + description + social icons + 3 link groups (4-6 links each) + bottom bar.
**Best for:** Most business types, SaaS, e-commerce, corporate.
**Not for:** Single-page apps, minimal portfolio sites.
**Responsive:** Columns stack vertically, link groups become collapsible accordions.

### FT-02: Asymmetric Brand-Heavy (5:7 Split)

**Layout:** 12-column grid system. Left section (5 columns): large brand area with company info and social links. Right section (7 columns): 3 navigation columns.
**Key idea:** Brand dominance — 40% of footer dedicated to company identity, ideal for brand-building.
**Element count:** Large brand section + 3 nav columns + bottom bar.
**Best for:** Brand-focused companies, agencies, creative businesses.
**Not for:** Information-dense sites, e-commerce with many categories.
**Responsive:** Brand section full-width on mobile, nav columns stack below.

### FT-03: Newsletter + Multi-Column

**Layout:** 6-column grid. First 2 columns: brand + newsletter form (email input + subscribe button). Columns 3-6: Product, Company, Resources, Legal. Contact info row below. Bottom bar with social icons.
**Key idea:** Lead generation built into footer — newsletter capture at the natural end of page scroll.
**Element count:** Newsletter form + 4 nav columns + contact row + bottom bar.
**Best for:** Content businesses, blogs, SaaS with lead-gen focus.
**Not for:** E-commerce checkout pages, minimal sites.
**Responsive:** Newsletter becomes full-width, columns stack.

### FT-04: Contact-Focused Service Footer

**Layout:** 4 columns: Brand + Nav + Nav + Contact details. Last column: contact info with icon-text pairs (phone, email, address, business hours).
**Key idea:** Service accessibility — contact details prominent for businesses where direct contact is primary conversion.
**Element count:** Brand + 2 nav columns + contact column with 4 info items.
**Best for:** Local service businesses, restaurants, clinics, repair services.
**Not for:** SaaS, fully-online businesses, large e-commerce.
**Responsive:** Contact column becomes top section on mobile for visibility.

### FT-05: Dark Tech Three-Tier

**Layout:** Three distinct horizontal tiers. Top: 2-column brand + mini feature cards. Middle: social links with borders + version info. Bottom: copyright + legal with monospace styling.
**Key idea:** Tech product identity — feature cards and terminal-style typography reinforce technical brand.
**Element count:** Feature cards (3) + social links + version info + legal links.
**Best for:** Developer tools, open-source projects, tech startups.
**Not for:** Consumer brands, service businesses, corporate.
**Responsive:** Feature cards stack, tiers maintain separation.

---

## E-commerce: Cart / Wishlist Patterns

### EC-01: Two-Column Cart with Sticky Summary

**Layout:** Left column (66%): product list with item images, quantity controls, remove buttons. Right column (34%): sticky order summary card with subtotal, discounts, shipping, total, checkout CTA.
**Key idea:** Separation of item management from order finalization — sticky summary keeps total visible on scroll.
**Element count:** Item list (3-8 items with controls) + summary card with 4-5 line items + CTA.
**Best for:** Desktop-first flows, multi-item orders, premium e-commerce.
**Not for:** Mobile-first, single-item checkouts.
**Responsive:** Summary moves below product list on mobile.

### EC-02: Minimal Single-Column Cart

**Layout:** Full-width single column. Items as horizontal rows (image | details | qty controls | price | delete). Summary collapsed at bottom as simple totals section.
**Key idea:** Reduces visual noise — each item is a single row, total at bottom, done.
**Element count:** 3-8 item rows + summary footer + CTA.
**Best for:** Mobile devices, lightweight MVP, simple product catalogs.
**Not for:** Multi-item complex orders, high-value transactions.
**Responsive:** Works equally well at all sizes, rows scale naturally.

### EC-03: Product Card Grid Wishlist

**Layout:** Responsive grid (1-4 columns). Each item is a product card: image with discount badge, title, rating stars, price, add-to-cart button, heart/remove button. Browse-oriented layout.
**Key idea:** Treats wishlist items like browsable products — aspirational browsing with easy cart conversion.
**Element count:** 6-12 product cards.
**Best for:** Fashion, lifestyle e-commerce, aspirational browsing.
**Not for:** Cart (purchasing flow), items needing quantity changes.
**Responsive:** 4→3→2→1 columns.

---

## E-commerce: Checkout / Payment Patterns

### CO-01: Multi-Section Single Page Checkout

**Layout:** Left column (66%): stacked form sections (shipping info, billing, payment method, review). Each section as distinct card with step number. Right column (34%): sticky order summary with item thumbnails, totals, apply coupon.
**Key idea:** Everything on one page — sections guide top-to-bottom without page transitions.
**Element count:** 4-5 form sections × 4-5 fields each + summary card.
**Best for:** Standard e-commerce, desktop checkout, one-time purchases.
**Not for:** Minimal/fast checkout, mobile-first.
**Responsive:** Becomes single-column stack, summary moves to top or bottom.

### CO-02: Step-by-Step Wizard Checkout

**Layout:** Horizontal progress bar at top with numbered steps (Shipping → Payment → Review → Confirm). Only current step's form visible. Next/back navigation. Order summary persistent on side or bottom.
**Key idea:** Focused complexity reduction — only one form at a time reduces cognitive load.
**Element count:** 3-5 steps, 3-6 fields per step, progress indicator.
**Best for:** Complex orders, subscription setup, multi-address shipping.
**Not for:** Quick purchases, returning customers with saved info.
**Responsive:** Progress bar simplifies to step counter, form full-width.

### CO-03: Saved Payment Methods Gallery

**Layout:** 3-column responsive grid of payment method cards. Each card: card brand logo, last 4 digits, expiry, holder name, status badge (verified/expiring), action buttons (set default, edit, delete).
**Key idea:** Visual card management — treats saved payment methods as discoverable, manageable items.
**Element count:** 3-6 payment cards + add new card CTA.
**Best for:** Returning customers, subscription services, premium checkout flows.
**Not for:** First-time buyers, simple one-payment flows.
**Responsive:** Grid reflows 3→2→1 columns.

---

## E-commerce: Shipping / Returns Patterns

### SH-01: Vertical Timeline Order Tracking

**Layout:** Left (66%): vertical timeline with status dots (active/completed/pending), connecting line, event cards with timestamp + status + location. Right (34%): estimated arrival card, map placeholder, ordered items list.
**Key idea:** Timeline metaphor for shipment progression — visual status flow familiar from social media.
**Element count:** 4-6 timeline events + delivery info card + items list.
**Best for:** Shipment tracking, real-time delivery visibility, multi-step logistics.
**Not for:** Simple "shipped" notifications, local pickup orders.
**Responsive:** Timeline full-width, sidebar stacks below on mobile.

### SH-02: Multi-Step Return Wizard

**Layout:** 4-step flow (Select Order → Select Items → Choose Refund Method → Review). Numbered step indicators with progress line. Step-specific content below. Sticky summary sidebar showing selected items count, total refund amount.
**Key idea:** Guided return process — each step hides irrelevant options, summary updates live.
**Element count:** 4 steps, item checkboxes, reason dropdowns, refund option cards, review textarea, summary sidebar.
**Best for:** Complex return policies, refund method selection, high-value items.
**Not for:** Quick returns, in-store returns.
**Responsive:** Wizard becomes full-width, summary stacks below.

### SH-03: Shipping Methods Comparison Table

**Layout:** Banner at top showing free shipping threshold progress bar. Below: comparison table with rows per shipping method — columns for method name/icon, delivery time, cost, features, select button.
**Key idea:** Transparent comparison enables informed shipping selection with incentive banner above.
**Element count:** Progress banner + 3-5 shipping method rows × 5 columns.
**Best for:** Multiple shipping options, international shipping, transparent pricing.
**Not for:** Single-method shipping, flat-rate only.
**Responsive:** Table becomes card grid on mobile, one card per shipping method.

### SH-04: Gift Card Designer with Preview

**Layout:** Two-column (60/40). Left: form controls — design palette grid, amount buttons + custom input, message textarea, recipient fields, delivery schedule. Right: live preview card that updates in real-time.
**Key idea:** Live customization preview — builds confidence and makes gifting fun through instant visual feedback.
**Element count:** Design options (4) + amount controls + message field + recipient fields + preview card.
**Best for:** Gift card purchases, personalization UX, occasion-driven shopping.
**Not for:** Bulk corporate purchases, speed-focused checkout.
**Responsive:** Preview moves below form on mobile.

---

## SEO / Marketing Patterns

### SE-01: Metrics Dashboard + Data Table

**Layout:** Horizontal row of 4 metric cards at top (icon, label, large value, change percentage). Below: data table with keyword/campaign data, position badges, trend indicators, sortable columns.
**Key idea:** KPI overview + detailed data — summary for quick scanning, table for deep analysis.
**Element count:** 4 metric cards + table with 4-6 columns × 4-8 rows.
**Best for:** SEO dashboards, campaign performance tracking, marketing analytics.
**Not for:** Customer-facing marketing pages, storytelling content.
**Responsive:** Metric cards reflow 4→2→1, table scrolls horizontally.

### SE-02: Campaign Card Grid with Status

**Layout:** Filter tabs at top (Active/Completed/All). Below: 3-column grid of campaign cards. Each card: title, status badge, progress bar with gradient fill, 2-column metrics grid (engagement %, ROI).
**Key idea:** Campaign portfolio view — quick visual comparison of multiple initiatives with performance data.
**Element count:** 3-6 tabs + 3-6 campaign cards with progress bars.
**Best for:** Marketing dashboards, campaign management, performance reporting.
**Not for:** Simple feature lists, public-facing content.
**Responsive:** Grid reflows 3→2→1 columns.
