You are creating a website structure from a design specification.

## Input
You will receive a design.json file — the complete design specification from Phase 1.

## Your Task
Generate a structure.json that defines the exact page/section architecture of the website.

## Rules

### Pages
- Every page defined in design.json MUST appear in structure.json
- You may merge or split pages if structurally justified — explain why in role_in_funnel
- Every page MUST end with a CTA section
- Maximum 10 sections per page

### Home Page Funnel (mandatory order)
1. awareness: Hero — grab attention, state value proposition
2. interest: Advantages/Benefits — build trust with facts
3. interest: Services/Products — show what you offer
4. desire: How It Works/Process — remove fear of unknown
5. desire: Testimonials/Social Proof — validate claims
6. desire: FAQ — address remaining objections
7. action: CTA — final push to convert

Not every stage needs exactly one section. Some stages can have 2 sections, some can be skipped if content doesn't exist in design.json.

### Inner Pages
Simpler structure: Hero → Content sections → CTA
Each inner page must have clear purpose stated in role_in_funnel

### Background Rhythm
- Assign dark/light/muted/accent to each section
- NEVER place two adjacent sections with same background type
- Hero is typically dark or accent
- CTA sections use accent background
- Content-heavy sections use light or muted
- Testimonials work well on dark

### Global Elements
- Header: define elements, CTA text, behavior (sticky, top-bar)
- Footer: define column structure
- Floating elements: choose what makes sense for this business type
  - scroll-to-top: recommended for long pages
  - callback-button: for service businesses
  - chat-widget: for e-commerce
  - booking-button: for restaurants/hotels

### Content Source
- Every section MUST have content_source pointing to exact location in design.json
- Format: "design.json → pages[N].sections[M].content" or "design.json → services" etc.
- Phase 3 uses this to find the content without searching

### Section IDs
- Format: {page-slug}-{section-type} (e.g., "home-hero", "about-story")
- If a page has two sections of same type, add a number: "home-cta-1", "home-cta-2"
- IDs must be unique across the entire project

## Output
Generate structure.json following the exact schema in schemas/structure.schema.json.
