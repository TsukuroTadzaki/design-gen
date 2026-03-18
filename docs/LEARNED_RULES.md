# Learned Rules

Condensed lessons from past project iterations. These represent real mistakes that were manually corrected by the designer.

**Priority:** These rules override generic best practices. If a rule here conflicts with TECH_GUIDE or DESIGN_PRINCIPLES — this file wins.

**Scope:** This file contains ONLY lessons not covered by other documents. For technical rules see `TECH_GUIDE.md`. For design principles see `DESIGN_PRINCIPLES.md`. For style tokens see `STYLE_PRESETS.md`.

**Update process:** After each design correction, extract the rule and add it here. If it's a technical rule (applies to all projects) — add to TECH_GUIDE instead. Only project-specific lessons belong here.

---

## Colors

- CTA buttons with muted/thematic colors (sand, olive, terracotta) have poor contrast — always use vibrant accent. SupMarket v4: sand accent as CTA was nearly invisible.
- One `@import "tailwindcss"` per project — only in globals.css. Project styles.css has ONLY CSS variable overrides + keyframes. Kashyrina v2: dual imports caused white screen.
- Test accent color as a button on both light AND dark section backgrounds before committing — what looks good on white may disappear on dark.

## Hero

- Floating photo collage: photos MUST have different sizes, different aspect ratios, slight rotation (1-3deg), and overlap. A neat grid with gaps defeats the purpose. Each photo needs unique dimensions + unique position + z-index layering. Center photo = largest + highest z-index. SupMarket v5: took 5 rounds to get right.
- Full-bleed photo hero with centered text is the most generic pattern — avoid unless brief specifically requests it.

## Layout

- Visual density must match the topic. Yoga/food/travel = medium-high density with many photos. Tech/SaaS = more whitespace. Tantra v1 was too minimal and empty for a yoga/spiritual topic.
- Section label badges ("CATALOG", "BENEFITS") on every section make them all look the same — use only where they add clarity, not as default pattern. SupMarket v4.

## Modals & Overlays

- Modals must have SOLID opaque background (`bg-white`), not semi-transparent (`bg-white/80`). Semi-transparent modals become unreadable when opened over sections with large dark headings. Remka v3.
- Decorative elements inside modals MUST be thematically unique per project — NOT recolored copies from another project. SupMarket v1: modal was identical to Tantra with different colors.
- "Call" button in header should be "Request callback" opening a form modal, not duplicating the phone link. Remka v3.

## E-Commerce Specific

- Catalog filters: horizontal chip filters above grid save space. Sidebar filters steal horizontal space from products. Default to horizontal unless catalog has many filter dimensions. SupMarket v4.
- Product cards need hover actions: wishlist heart, compare, share. Text label on buy button ("Buy"), not just icon. SupMarket v4.
- Display old price above new price for discount visibility — crossed out old price makes the deal obvious. SupMarket v4.
- Product detail page is mandatory — clicking a product card must navigate somewhere. SupMarket v3: no route existed, cards were dead ends.

## Photos & Media

- Photos are MANDATORY for visual/emotional topics (yoga, food, travel, lifestyle, restaurants). A design without photos for these industries looks empty and unfinished. Tantra v1 had zero photos.
- Use Unsplash URLs for placeholder photos during design phase — styled placeholder divs look amateurish.

## Typography

- Consider distinctive heading fonts (display/decorative) — default system sans-serif lacks character for many industries. SupMarket v4: DM Sans for headings added personality.

## Quality Multipliers

- Brief quality is proportional to design quality. Detailed brief with avatars + color psychology + visual language = best first generation (Kashyrina). Minimal brief = 3+ iterations (Remka).
- Micro-details (corner accents on hover, accent lines growing on hover, decorative gradient overlays) differentiate "generated" from "designed". Kashyrina v3.
- CSS keyframes > framer-motion for repeating animations (float, glow, shimmer, stagger). Lighter, more reliable, no bundle size. Kashyrina v3.

---

## Phase 3 Generation

### Header & Hero Interaction
- Hero section MUST have top padding equal to header height (pt-20 or similar) when header is fixed/sticky/absolute. Otherwise first content (badges, headings) hides behind the header. KavaBAR v1.
- Transparent header on hero requires readability check. If hero has a background image, navigation text may become invisible on light areas. Solutions (choose per project): (a) semi-transparent header bg `bg-background/60 backdrop-blur`, (b) dark gradient overlay at top of hero `bg-gradient-to-b from-black/50 via-black/25 to-transparent h-32`, (c) text-shadow on nav items `[text-shadow:0_1px_3px_rgba(0,0,0,0.8)]`, (d) ensure hero image is dark at top. Always test: is navigation readable over the hero? KavaBAR v1: white nav on light sky photo.

### Modals & Forms
- If design.json or plan.json specifies booking/callback/contact forms — actual Dialog or Sheet components MUST be generated with working form fields, submit handler (e.preventDefault + success state), and close button. CTA buttons that reference these forms MUST open the modal on click. NEVER generate a "Book" button that does nothing or just scrolls. KavaBAR v1: zero modals despite booking form in spec.

### Inner Page Heroes
- Home page hero is full presentation: large height (min-h-[70vh] or similar), full content (headline, subheadline, CTAs, trust badges, visual). Inner page heroes are compact headers: shorter height (py-16 md:py-24), only page title + subtitle or breadcrumb. Inner page hero should NEVER match home hero height. KavaBAR v1: all pages had full-height heroes.

### Button Visibility
- Secondary/ghost buttons MUST be visible on their section background. On accent background: use `bg-white text-accent` or `bg-background text-foreground`, NOT `bg-transparent text-white border-white` if text blends with bg. Always mentally test: is this button readable ON this specific section background? KavaBAR v1: white ghost button invisible on light accent CTA section.

### Carousel Layout Stability
- Carousel/slider containers MUST have fixed height based on the tallest possible item. Content below the carousel must NOT shift when slides change. Solutions: (a) set min-h on carousel wrapper, (b) use line-clamp to equalize text length, (c) use fixed-height cards. KavaBAR v1: testimonial carousel caused layout jump on every slide.

### Dark Section Visual Interest
- Large dark/colored sections need visual interest beyond solid background color. Add at least one: subtle texture/pattern overlay at low opacity, decorative SVG elements (large quote marks for testimonials, icons for features), gradient instead of flat color, or floating shapes. A large solid-color section looks empty and unfinished. KavaBAR v1: plain brown testimonials section looked cheap.

### Technical
- project.config.ts MUST use `export default { ... }` with real component imports, NOT string references like `component: 'Home'`. Styles import via `?inline`. KavaBAR v1.
- NEVER use single quotes for strings containing Ukrainian apostrophes (п'ється, об'єкт, м'який, etc.) — use double quotes or template literals. KavaBAR v1: MenuGridSection broke on apostrophe in п'ється.
- All navigation links MUST use ProjectLink from @/core/lib/project-context.tsx — NOT react-router-dom Link directly. Direct Link creates wrong paths (/menu instead of /project/{id}/menu). Same for useLocation → useProjectLocation. KavaBAR v1: 7 files had wrong imports.

---

## How to Update This File

After each design correction:
1. Check if the rule belongs here or in TECH_GUIDE (technical, applies to all projects → TECH_GUIDE)
2. Write a concise rule (one line) that prevents the mistake
3. Include project name and version where mistake was discovered
4. Add to the appropriate category above
5. If it contradicts an existing rule — replace the old one
