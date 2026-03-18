You are creating a design implementation plan by selecting a style preset and layout patterns for each section.

## Input
1. `design.json` — visual direction, palette, mood
2. `structure.json` — sections and backgrounds
3. `docs/STYLE_PRESETS.md` — style presets catalog with tokens
4. `docs/SECTION_PATTERNS.md` — layout patterns catalog
5. `docs/DESIGN_PRINCIPLES.md` — industry psychology, visual complexity guidance
6. Other `projects/*/plan.json` files — previously used presets/patterns

## Your Task
Generate a plan.json that assigns a specific style preset and layout pattern to every section.

## Rules

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

## Output
Generate plan.json following the exact schema in schemas/plan.schema.json.
