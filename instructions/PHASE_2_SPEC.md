# Design Generator v2 — Phase 2: Plan

## Context

Phase 1 (Brief) is complete and tested on 3 projects (DiVotek, Barkas, KavaBAR). All reference documents are migrated and ready:

```
docs/
├── STYLE_PRESETS.md        ✅ 19 presets with tokens (SP-01 through SP-19)
├── SECTION_PATTERNS.md     ✅ 124 patterns across 25 groups
├── TECH_GUIDE.md           ✅ Technical rules for code generation
├── DESIGN_PRINCIPLES.md    ✅ Creative/marketing principles
├── LEARNED_RULES.md        ✅ Lessons from past projects
```

Phase 2 takes the output of Phase 1 (`design.json`) and produces a concrete implementation plan. After Phase 2, the AI in Phase 3 makes ZERO design decisions — it only executes the plan.

## Principle

Phase 2 makes two types of decisions, sequentially:
1. **Structure** — which sections on which pages, funnel logic, background rhythm
2. **Design plan** — which style preset + which layout pattern for each section

These are separate CLI commands to allow human review between steps.

---

## File outputs

```
projects/{project-id}/
├── brief.json              # Phase 1 (exists)
├── design.json             # Phase 1 (exists)
├── design.md               # Phase 1 (exists)
├── structure.json          # Phase 2 step 1 — NEW
├── plan.json               # Phase 2 step 2 — NEW
```

---

## Step 2.1: Structure

### Command: `/create-structure {project-id}`

### What it reads
- `projects/{project-id}/design.json` — complete design specification from Phase 1

### What it produces
- `projects/{project-id}/structure.json`

### What AI does
1. Reads `design.json` — pages, sections, content, CTA strategy
2. Determines final page list (may merge or split pages from brief — must explain why)
3. For each page, defines sections in conversion funnel order
4. Assigns background type (dark/light/muted/accent) to each section for visual rhythm
5. Defines global elements: header, footer, floating elements

### Format: structure.json

```json
{
  "id": "test-project",
  "created_at": "2026-03-17T13:00:00Z",
  "status": "structured",

  "global": {
    "header": {
      "elements": ["logo", "navigation", "phone", "cta_button"],
      "cta_text": "Discuss project",
      "phone": "+380 XX XXX XX XX",
      "behavior": "sticky, hide top-bar on scroll"
    },
    "footer": {
      "columns": ["about + contacts", "navigation", "services", "social"],
      "cta": true
    },
    "floating_elements": ["scroll-to-top", "callback-button"]
  },

  "pages": [
    {
      "slug": "home",
      "name": "Home",
      "role_in_funnel": "Main entry point. Converts cold traffic into leads.",
      "sections": [
        {
          "id": "home-hero",
          "type": "hero",
          "purpose": "Grab attention and communicate core value in 3 seconds",
          "content_source": "design.json → pages[0].sections[0].content",
          "funnel_stage": "awareness",
          "background": "dark"
        },
        {
          "id": "home-advantages",
          "type": "advantages",
          "purpose": "Build trust through concrete facts",
          "content_source": "design.json → pages[0].sections[1].content",
          "funnel_stage": "interest",
          "background": "light"
        },
        {
          "id": "home-services",
          "type": "services",
          "purpose": "Show service range and guide to details",
          "content_source": "design.json → pages[0].sections[2].content",
          "funnel_stage": "interest",
          "background": "muted"
        },
        {
          "id": "home-how-it-works",
          "type": "how_it_works",
          "purpose": "Remove fear of unknown process",
          "content_source": "design.json → pages[0].sections[3].content",
          "funnel_stage": "desire",
          "background": "light"
        },
        {
          "id": "home-testimonials",
          "type": "testimonials",
          "purpose": "Social proof",
          "content_source": "design.json → pages[0].sections[4].content",
          "funnel_stage": "desire",
          "background": "dark"
        },
        {
          "id": "home-faq",
          "type": "faq",
          "purpose": "Address final objections",
          "content_source": "design.json → pages[0].sections[5].content",
          "funnel_stage": "desire",
          "background": "light"
        },
        {
          "id": "home-cta",
          "type": "cta",
          "purpose": "Final call to action",
          "content_source": "design.json → pages[0].sections[6].content",
          "funnel_stage": "action",
          "background": "accent"
        }
      ]
    }
  ],

  "background_rhythm": {
    "strategy": "dark → light → muted → light → dark → light → accent"
  }
}
```

### Rules for AI (include in prompt)

```
## Structure Rules

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
```

---

## Step 2.2: Design Plan

### Command: `/create-plan {project-id}`

### What it reads
1. `projects/{project-id}/design.json` — visual direction, palette, mood
2. `projects/{project-id}/structure.json` — sections and backgrounds
3. `docs/STYLE_PRESETS.md` — 19 style presets with tokens
4. `docs/SECTION_PATTERNS.md` — 124 layout patterns
5. `docs/DESIGN_PRINCIPLES.md` — industry psychology, visual complexity guidance
6. Other `projects/*/plan.json` files — to check which presets/patterns were used before

### What it produces
- `projects/{project-id}/plan.json`

### What AI does
1. Reads `design.json` → `visual_direction` (style recommendation, palette, mood)
2. Reads `STYLE_PRESETS.md` → identifies 2-3 presets that match
3. Reads `DESIGN_PRINCIPLES.md` → section 6 (industry psychology) and section 9 (visual complexity)
4. Checks existing `projects/*/plan.json` → which presets were used for similar businesses
5. **Selects ONE preset** with justification
6. For each section in `structure.json`, reads `SECTION_PATTERNS.md` and **selects a specific pattern** with justification
7. Verifies adjacent sections have DIFFERENT patterns (structural variety)

### Format: plan.json

```json
{
  "id": "test-project",
  "created_at": "2026-03-17T13:30:00Z",
  "status": "planned",
  "plan_version": 1,

  "style": {
    "preset_id": "SP-01",
    "preset_name": "Modern Clean",
    "why": "DiVotek is a 15-year IT company. Modern Clean communicates professionalism and reliability without unnecessary decoration. The client wants calm, deliberate mood — this preset delivers it. SP-18 Corporate Premium was considered but rejected as too conservative for a tech company that wants to show innovation.",
    "tokens": {
      "border_radius": "rounded-xl",
      "shadows": "shadow-lg",
      "heading_weight": "font-bold",
      "heading_style": "sans",
      "body_weight": "font-normal",
      "spacing": "py-16 md:py-24",
      "card_style": "bg-card rounded-xl shadow-lg p-6 md:p-8",
      "button_primary": "bg-accent text-white rounded-xl px-8 py-3 font-semibold",
      "button_secondary": "border-2 border-primary text-primary rounded-xl px-8 py-3",
      "hover_effect": "scale-[1.02] shadow-xl transition-all duration-300",
      "decorative": "subtle gradient mesh, geometric shapes with low opacity",
      "backgrounds": "white → muted → white alternation",
      "section_transitions": "clean-cut"
    }
  },

  "header": {
    "pattern_id": "HD-01",
    "pattern_name": "Classic Top Bar + Sticky Nav",
    "why": "Corporate IT company needs professional structured header with phone visibility and clear CTA"
  },

  "footer": {
    "pattern_id": "FT-02",
    "pattern_name": "Multi-Column with Newsletter",
    "why": "DiVotek has blog — newsletter signup in footer captures content readers"
  },

  "sections": [
    {
      "id": "home-hero",
      "type": "hero",
      "pattern_id": "H-01",
      "pattern_name": "Two-Column Split",
      "why": "IT company needs balanced text (explain what we do) + visual (show professionalism). Split layout provides both. Full-bleed (H-04) rejected — no wow photo for background. Bento (H-05) too complex for first impression.",
      "background": "dark",
      "content_source": "design.json → pages[0].sections[0].content",
      "notes": "Right side: abstract 3D composition or device mockup with real project. Trust badges below CTA buttons."
    },
    {
      "id": "home-advantages",
      "type": "advantages",
      "pattern_id": "F-06",
      "pattern_name": "Stat-Centric Number Grid",
      "why": "DiVotek has impressive numbers (15+ years, 200+ projects). Number grid lets stats be hero-sized visual elements. Icon Grid (F-01) would be too generic for these strong metrics.",
      "background": "light",
      "content_source": "design.json → pages[0].sections[1].content",
      "notes": "Animated counters on scroll-in. 4 key numbers in large font."
    },
    {
      "id": "home-services",
      "type": "services",
      "pattern_id": "SV-01",
      "pattern_name": "Uniform Card Grid",
      "why": "3 services of equal weight — uniform grid is ideal. Zigzag (SV-02) takes too much vertical space for just 3 items. Each card has separate CTA linking to service page.",
      "background": "muted",
      "content_source": "design.json → pages[0].sections[2].content",
      "notes": "Each card links to its own service detail page."
    }
  ]
}
```

### Rules for AI (include in prompt)

```
## Plan Rules

### Style Selection
- Select ONE style preset from STYLE_PRESETS.md for the entire project
- Justify why THIS preset, not others — mention at least one rejected alternative
- Copy ALL tokens from the selected preset into plan.json — Phase 3 reads ONLY these tokens
- If design.json visual_direction already recommends a style — find the closest matching preset
- Check DESIGN_PRINCIPLES.md section 9 (Visual Complexity by Industry) — make sure the selected preset matches the expected complexity level

### Pattern Selection
- For each section in structure.json, select a specific pattern from SECTION_PATTERNS.md
- Use the correct group code matching the section type:
  H = Hero, F = Features/Benefits, SV = Services, PR = Products/Catalog,
  W = How It Works, T = Testimonials, P = Pricing, Q = FAQ, C = CTA/Contact,
  A = Team/About, G = Portfolio/Gallery, N = Stats, B = Blog/News,
  EV = Events, PA = Partners, CA = Careers, LO = Location, V = Video,
  SO = Social, HD = Header, FT = Footer, EC = E-commerce Cart,
  CO = Checkout, SH = Shipping
- Justify each choice: why this pattern for this content — mention item count, business type, content type
- NEVER place the same pattern on two adjacent sections
- Check item count compatibility (3 items → don't pick a 2x2 grid pattern)
- Check style compatibility (Brutalist preset → don't pick patterns with rounded cards)

### Cross-Project Variety
- Before selecting preset, scan other projects/ folders for existing plan.json files
- If a similar business type already has SP-01 → select a different preset
- If a recent project's hero used H-01 → prefer a different hero pattern
- This ensures each generated project looks genuinely different

### General
- plan.json is the FINAL decision — Phase 3 does not override any choices
- Human reviews plan.json before Phase 3 and can change any preset or pattern
- Every "why" field must be specific to THIS project — not generic ("this pattern looks good")
```

---

## Step 2.3: Review

### Command: `/review-plan {project-id}`

Reads `structure.json` and `plan.json`, outputs a human-readable summary in CLI:

```
=== DiVotek — Design Plan ===

STYLE: SP-01 Modern Clean
Reason: 15-year IT company, professional without being corporate...
Rejected: SP-18 (too conservative), SP-13 (too trendy)

GLOBAL:
  Header: HD-01 Classic Top Bar + Sticky Nav
  Footer: FT-02 Multi-Column with Newsletter
  Floating: scroll-to-top, callback-button

HOME PAGE (7 sections):
┌─────────────────────────────────────────────┐
│ home-hero: H-01 Two-Column Split            │
│ Background: dark | Funnel: awareness        │
│ Why: balanced text + visual for IT company   │
├─────────────────────────────────────────────┤
│ home-advantages: F-06 Stat-Centric Numbers  │
│ Background: light | Funnel: interest        │
│ Why: impressive metrics deserve hero display │
├─────────────────────────────────────────────┤
│ home-services: SV-01 Uniform Card Grid      │
│ Background: muted | Funnel: interest        │
│ Why: 3 equal-weight services                │
├─────────────────────────────────────────────┤
│ ...                                         │
└─────────────────────────────────────────────┘

ABOUT PAGE (4 sections):
┌─────────────────────────────────────────────┐
│ ...                                         │
└─────────────────────────────────────────────┘
```

Human can say:
- "Change hero to H-05 Geometric Composite Grid"
- "Change style to SP-03 Hi-Tech Dark"
- "Add a stats section between services and how-it-works"
- "Looks good, proceed"

---

## Step 2.4: Edit

### Command: `/edit-plan {project-id}`

Two modes:
1. **Change style:** "Change style to SP-05 Glassmorphism" → AI updates all tokens in plan.json
2. **Change pattern:** "Change home-hero to H-03 Fullscreen Image Carousel" → AI updates that section
3. **Add/remove section:** "Add stats section after services" → AI updates structure.json AND plan.json

After each edit: `plan_version` increments by 1.

---

## CLI Commands Summary

```
/create-structure {project-id}    # design.json → structure.json
/create-plan {project-id}         # structure.json + catalogs → plan.json
/review-plan {project-id}         # Show readable plan for review
/edit-plan {project-id}           # Apply changes to structure/plan
```

---

## Implementation Order

```
1. Create schemas: structure.schema.json, plan.schema.json
2. Create example files: structure.example.json, plan.example.json
   (use DiVotek test-project as source)
3. Create prompt: prompts/phase2/create-structure.md
4. Create CLI command: .claude/commands/create-structure.md
5. TEST: run /create-structure on all 3 projects, verify output
6. Create prompt: prompts/phase2/create-plan.md
7. Create CLI command: .claude/commands/create-plan.md
8. TEST: run /create-plan on all 3 projects, verify output
9. Create CLI commands: review-plan.md, edit-plan.md
10. FULL TEST: complete Phase 2 flow on all 3 projects
```

---

## Testing Phase 2

### Test cases
Use the same 3 projects from Phase 1:
1. **DiVotek** (corporate IT) — expect: Modern Clean or Corporate Premium, structured layouts
2. **Barkas** (e-commerce) — expect: E-commerce Clean, product-focused patterns
3. **KavaBAR** (restaurant) — expect: Warm Organic, photo-driven patterns

### Success criteria

| Criteria | How to verify |
|---|---|
| 3 projects got different style presets | Compare preset_id — must be different |
| Styles match business type | DiVotek ≠ Warm Organic, KavaBAR ≠ Hi-Tech |
| No adjacent sections share same pattern | Check each page — no two consecutive pattern_id matches |
| Justifications are specific | "why" references actual content/item counts, not generic praise |
| plan.json is complete | Every section has pattern_id, background, content_source |
| structure.json follows funnel | Home page sections in awareness → interest → desire → action order |
| Background rhythm has no duplicates | No two adjacent sections share same background type |
| Review is understandable | Human can read review output and make decisions in under 2 minutes |
| Patterns match item counts | Section with 3 items doesn't get 2x2 grid pattern |
| Style tokens copied correctly | plan.json tokens match selected preset from STYLE_PRESETS.md exactly |

---

## What is NOT in Phase 2

- Code generation — Phase 3
- Web UI — everything through CLI
- Database — JSON files
- Isolated context orchestration — Phase 3
- Style token customization — tokens are copied as-is from STYLE_PRESETS.md (customization may come later)
