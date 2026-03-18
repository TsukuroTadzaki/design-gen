# Design Principles — Creative & Marketing Guide

Principles that govern WHY design decisions are made. This document covers psychology, marketing strategy, visual hierarchy, and industry-specific guidance.

**This document does NOT cover:**
- HOW to write code → see `TECH_GUIDE.md`
- WHICH style to use → see `STYLE_PRESETS.md`
- WHICH layout pattern to use → see `SECTION_PATTERNS.md`
- WHAT mistakes to avoid → see `LEARNED_RULES.md`

---

## 1. Visual Hierarchy & Composition

### The F-Pattern & Z-Pattern
- **F-Pattern** for text-heavy sections: users scan left-to-right, then down the left side
- **Z-Pattern** for landing sections: top-left (logo) → top-right (nav) → bottom-left (headline) → bottom-right (CTA)
- Place the most important CTA at the **end of the Z-pattern** (bottom-right area)

### Visual Weight Distribution
Avoid symmetrical centered layouts everywhere. Create dynamic compositions with asymmetric weight:
```
WRONG (boring):           RIGHT (dynamic):
┌─────────────────┐      ┌─────────────────┐
│    [centered]    │      │ ████████         │
│    [centered]    │      │ ████████   ░░░░  │
│    [centered]    │      │            ░░░░  │
│  □ □ □ □ □ □    │      │ ░░  ████████████ │
└─────────────────┘      └─────────────────┘
```

### Golden Ratio in Layouts
- Use asymmetric splits: **60/40**, **65/35**, **70/30** — not always 50/50
- Content area to whitespace ratio: approximately 1:1.618
- Key element sizes should relate to each other proportionally

### Focal Points
- Every section needs **one clear focal point** — the element the eye goes to first
- Create focal points with: size contrast, color contrast, isolation (whitespace), motion
- Maximum 2 focal points per viewport — more creates confusion

---

## 2. Typography as Design Element

Typography is not just "text" — it's the primary visual element in many designs.

### Bold Typography Rules
- **Hero headings**: minimum `text-5xl md:text-7xl` — be bold, own the space
- **Accent numbers/stats**: use `text-6xl md:text-8xl` with font-light or font-black
- **Mix weights dramatically**: pair `font-black` headings with `font-light` subtitles
- **Letter spacing**: tight (`tracking-tighter`) for big headings, wide (`tracking-wider`) for small labels
- **Line height**: tight (`leading-tight`) for display text, relaxed (`leading-relaxed`) for body

### Typographic Hierarchy (per section)
```
Level 1: Section heading     — text-3xl md:text-5xl, font-bold
Level 2: Card/block title    — text-xl md:text-2xl, font-semibold
Level 3: Body text           — text-base md:text-lg, font-normal, text-muted
Level 4: Labels/captions     — text-xs uppercase tracking-wider, font-medium
```

### Typography Impact Techniques
- Split a heading across two lines with different visual treatments (weight, color, size)
- Use a single word in a dramatically larger size
- Outlined text for decorative headings (use sparingly)
- Overlapping text with images or shapes behind it

---

## 3. Color Psychology & Application

### Color Meanings (for choosing project palettes)

| Color | Psychology | Best for |
|-------|-----------|----------|
| **Blue** | Trust, stability, professionalism | Finance, corporate, SaaS, healthcare |
| **Green** | Growth, health, reliability | Eco, health, repair, finance, tech |
| **Red/Orange** | Urgency, energy, passion, action | Food, sales, entertainment, sports |
| **Purple** | Premium, creativity, mystery | Luxury, beauty, creative, education |
| **Yellow/Amber** | Optimism, warmth, attention | Retail, children, food, construction |
| **Cyan/Teal** | Modern, fresh, innovative | Tech, startups, digital services |
| **Black/Dark** | Premium, power, sophistication | Luxury, tech, fashion, automotive |
| **White/Light** | Clean, simple, trustworthy | Healthcare, minimalist brands, SaaS |

### 60-30-10 Rule
- **60%** — Dominant color (background, large surfaces)
- **30%** — Secondary color (cards, secondary surfaces, text)
- **10%** — Accent color (CTAs, highlights, icons, key elements)

### Accent Color Role (CRITICAL)
Accent color is for **action and attention** — CTA buttons, badges, highlights. It must be:
- **Vibrant and high-contrast** against the primary palette
- **Not used for backgrounds** of large surfaces — accent on CTA button = correct, accent on card background = waste
- **Tested visually**: put the accent button on both light and dark backgrounds — if it doesn't pop on either, change it

### Dark Theme Rules
- Never use pure black (#000000) — use near-black (#0a0a0a, #111827)
- Text on dark: gray-300 for body, white for headings — never pure white for body
- Accent colors need glow on dark backgrounds: `shadow-color/25`
- Dark sections need subtle texture (grid, dots, noise) to avoid feeling flat

### Light Theme Rules
- Background alternation: white → off-white → light gray
- Cards on light background need subtle borders OR shadows, never neither
- Text: gray-900 for headings, gray-500 for body — enough contrast

### Muted Color Readability
The muted-foreground color is used for secondary text. If it's too close to the background, text becomes invisible. Aim for at least 4.5:1 contrast ratio. Avoid "aesthetic" muted colors that look nice in a palette swatch but fail as body text.

---

## 4. Section Rhythm & Flow

### Background Alternation Pattern
```
Hero:           DARK    (strong first impression)
Services:       LIGHT   (easy scanning)
Why Us:         DARK    (re-engage attention)
How It Works:   LIGHT   (clear process)
Brands:         NEUTRAL (subtle divider)
Testimonials:   DARK    (cinematic feel for quotes)
CTA:            ACCENT  (colored/gradient, stands out)
```

Never have 3+ consecutive sections with the same background tone.

### Section Height Rhythm
Vary section heights intentionally:
```
Hero:           TALL      (py-28 md:py-40, min-h-[80vh])
Content:        MEDIUM    (py-20 md:py-28)
Stats/Brands:   COMPACT   (py-12 md:py-16)
CTA:            MEDIUM    (py-20 md:py-28)
```

### Transition Between Sections
Hard cuts between sections are fine — don't overcomplicate. If needed, use ONE of:
- Angled divider (clip-path or skewed pseudo-element)
- Overlapping element (card or image crossing section boundary)
- Shared background (two sections sharing a visual element)

---

## 5. Marketing & Conversion Principles

### Above-the-Fold (first viewport)
The hero section must answer three questions in 3 seconds:
1. **What is this?** (headline)
2. **Why should I care?** (value proposition / USP)
3. **What do I do next?** (CTA)

### CTA Strategy
- **Primary CTA**: high contrast, prominent, action verb ("Call", "Start", "Order")
- **Secondary CTA**: lower contrast, alternative action ("Learn more", "View prices")
- Place CTAs at: hero, after benefits/proof, end of page (minimum 3 CTA touchpoints)
- CTA button must be the most visually prominent element in its section

### Social Proof Placement
Social proof (testimonials, stats, logos) should appear:
- **After** presenting the offer (services, pricing) — validates the claim
- **Before** the main CTA — reduces friction
- Stats with large numbers create authority: "15 000+" is better than "Many clients"

### Trust Signals for Service Businesses
Must include (especially for local services):
- Real address and phone number (visible in header)
- Working hours
- Warranty/guarantee information
- Transparent pricing (even "from X")
- Review/testimonial section
- Brand logos (builds association with trusted names)

### Urgency & Scarcity (use sparingly, honestly)
- Time-limited offers (real, not fake)
- Speed promises ("Repair in 30 minutes")
- Phone number in header — implies "call now"
- Never use fake countdown timers or manufactured scarcity

---

## 6. Industry-Specific Design Psychology

### Service / Repair Centers
- **Trust is #1 priority** — clean, professional, transparent
- Show real work (before/after), real numbers, guarantees
- Phone number MUST be prominent (header, hero, CTA)
- Speed and price should be immediately visible
- Use device/tool imagery, circuit patterns, tech textures

### SaaS / Digital Products
- **Innovation is #1** — modern, forward-thinking, bold
- Product screenshots/mockups are hero visual
- Feature comparison, pricing tiers, integration logos
- Generous whitespace, large typography

### Portfolio / Creative Agency
- **Creativity is #1** — break rules, be unexpected
- Full-bleed images, unusual layouts, bold type
- Minimal text, maximum visual impact
- Case study cards as primary content

### E-commerce / Retail
- **Product is #1** — large photos, clear prices
- Horizontal chip filters for compact catalogs, sidebar for large catalogs
- Product cards with hover actions (wishlist, compare) for interactive shopping
- Hero should be product/lifestyle focused — not generic "Welcome to our store"
- Trust badges, free shipping threshold, discount coupons
- Grid-heavy but with featured products breaking the grid

### Healthcare / Professional Services
- **Calm trust is #1** — clean, calming, authoritative
- Muted colors, lots of whitespace
- Team photos, credentials, certifications
- Conservative layouts, no gimmicks

### Restaurant / Food / Hospitality
- **Atmosphere is #1** — photos drive the experience
- Full-bleed food/interior photos, warm color palette
- Minimal whitespace — visual feast
- Reservation/booking as primary CTA

### Real Estate
- **Property is #1** — large photography as primary content
- Map integrations, property cards, search-heavy UI
- Virtual tours and gallery-focused layouts

---

## 7. Photos & Visual Richness

### Photos Are Not Optional
Every design project must include images. A design without photos feels empty and unfinished.

### Visual Density by Industry

| Industry | Visual density | Photo approach |
|----------|---------------|----------------|
| Tech / SaaS | Medium-Low | Spacious, screenshots/mockups, minimal photos |
| Wellness / Yoga | Medium-High | Warm atmospheric photos, moderate whitespace |
| Food / Restaurant | High | Full-bleed food photos, minimal whitespace |
| Fashion / Beauty | High | Large editorial photography, photos dominate |
| Portfolio / Creative | High | Case study images, large visual blocks |
| Finance / Legal | Low-Medium | Conservative, text-focused, selective photos |
| Real Estate | High | Property photos as primary content |
| E-commerce | High | Product photos ARE the design |

**Rule:** If the business is visual/emotional (food, travel, beauty, fashion) — photos should take up 30-40% of visible page area. If functional/technical (SaaS, repair, finance) — photos can be 10-20%.

---

## 8. Thematic Visual Metaphors

Don't use generic decorative patterns (dots, grids) for every project. Use patterns that **reinforce the business theme**:

| Business | Thematic patterns & elements |
|----------|-------------------------------|
| Repair / Tech | Circuit board traces, PCB patterns, tool silhouettes, microchip grids |
| Restaurant / Food | Ingredient illustrations, subtle food textures, warm organic shapes |
| SaaS / Software | Data flow lines, node graphs, dashboard mock elements, code snippets |
| Architecture | Blueprint lines, structural grid, geometric shapes |
| Music / Audio | Waveform patterns, equalizer bars, vinyl grooves |
| Finance | Chart lines, upward trends, coin/currency subtle patterns |
| Travel | Map contour lines, compass elements, horizon gradients |
| Water / Marine | Wave SVG lines, horizontal light reflections, ripple animations |
| Nature / Eco | Morphing blobs, aurora gradient meshes, flowing curves |
| Luxury | Gold particle effects, marble textures, elegant line drawings |

These metaphors should be used subtly as background decorations, section dividers, or hover effects — never as dominant visual elements that compete with content.

---

## 9. Visual Complexity by Industry

Not every business needs the same level of visual complexity. Match design intensity to audience expectations:

| Industry | Complexity | Approach |
|----------|-----------|----------|
| Repair / Service | Medium-High | Thematic patterns, angled dividers, bold stats |
| SaaS / Tech | High | Bento layouts, glassmorphism, animated gradients |
| Portfolio / Creative | Very High | Experimental layouts, clip-path, mega typography, scroll animations |
| Restaurant / Food | Medium | Full-bleed photos, warm color blocks, subtle parallax |
| Healthcare / Law | Low-Medium | Clean shapes, subtle animations, trust-focused, minimal effects |
| E-commerce | Medium | Product-focused, filters, quick-view modals, carousels |
| Real Estate | Medium-High | Map integrations, property cards, search-heavy, virtual tours |

Conservative industries (healthcare, law, finance) should use fewer animations and simpler layouts. Creative industries can push boundaries.
