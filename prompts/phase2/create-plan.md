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

## Effect Assignment (CRITICAL)

After selecting pattern for each section, you MUST assign creative effects.

Read docs/CREATIVE_EFFECTS.md for the full catalog of 12 parametric effects.

For EACH section in plan.json, add an "effects" array:

```json
{
  "id": "home-hero",
  "pattern_id": "H-01",
  "pattern_name": "Two-Column Split",
  "effects": [
    { "type": "GRADIENT-LAYER", "variant": "radial-orbs", "animate": "float", "opacity": 0.15 },
    { "type": "3D-TRANSFORM", "target": "image", "trigger": "static", "axis": "Y", "angle": 5 },
    { "type": "REVEAL-ANIMATION", "variant": "stagger-fade-up", "stagger": 0.1 },
    { "type": "HOVER-EFFECT", "variant": "arrow-shift", "target": "button" }
  ],
  "background": "dark",
  ...
}
```

### Rules:
- Every section MUST have at least 1 effect
- Hero sections: 2-3 effects
- CTA sections: 1-2 effects
- Card-based sections: REVEAL-ANIMATION + HOVER-EFFECT minimum
- Stats sections: SCROLL-DRIVEN:counter + REVEAL-ANIMATION
- Check Compatibility Matrix in CREATIVE_EFFECTS.md — don't assign incompatible effects for the style preset
- Check "Never combine" rules
- For hero: ensure effects differ from other projects' heroes (check existing plan.json files)
- Include specific parameters, not just type — "variant": "radial-orbs" not just "type": "GRADIENT-LAYER"

### Anti-AI-defaults:
- Do NOT add badge/label above hero heading unless plan.json content explicitly includes one
- Do NOT default to the same 3 effects for every hero (orbs + fade-up + gradient text)
- Vary effects between sections on the same page — if features has border-reveal hover, services should have different hover

## Output
Generate plan.json following the exact schema in schemas/plan.schema.json.
