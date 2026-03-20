# Task: Integrate Creative Effects + Add /generate-home Command

## Overview

Three changes:
1. Add `docs/CREATIVE_EFFECTS.md` to the project (file provided separately)
2. Update Phase 2 (`/create-plan`) to assign effects to each section
3. Update Phase 3 (`/generate-section` and orchestrator) to implement effects
4. Create `/generate-home` command for faster testing

---

## 1. Add CREATIVE_EFFECTS.md

Copy the provided `CREATIVE_EFFECTS.md` into `docs/CREATIVE_EFFECTS.md`.

This file defines 12 parametric base effects:
1. BACKGROUND-PATTERN (grid, dots, noise...)
2. GRADIENT-LAYER (mesh, orbs, spotlight...)
3. FLOATING-ELEMENTS (badges, notifications, shapes...)
4. 3D-TRANSFORM (static, hover, scroll...)
5. PARALLAX (background, element, multi-layer)
6. REVEAL-ANIMATION (fade-up, clip-path, scale...)
7. TEXT-EFFECT (gradient, outlined, split-reveal...)
8. HOVER-EFFECT (lift, glow, border-reveal, magnetic, arrow-shift...)
9. SCROLL-DRIVEN (counter, progress-bar, sticky...)
10. DECORATIVE-ELEMENT (corner-accents, quotes, watermark...)
11. CURSOR-EFFECT (glow, spotlight...)
12. SECTION-TRANSITION (wave, angle, overlap, clean-cut)

---

## 2. Update Phase 2: /create-plan

### Update the create-plan prompt/command

Add to the instructions for AI when creating plan.json:

```
## Effect Assignment (NEW — CRITICAL)

After selecting pattern for each section, you MUST assign creative effects.

Read docs/CREATIVE_EFFECTS.md for the full catalog of 12 parametric effects.

For EACH section in plan.json, add an "effects" array:

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
```

### Update plan.json schema

In `schemas/plan.schema.json`, add `effects` to section schema:

```json
"effects": {
  "type": "array",
  "items": {
    "type": "object",
    "required": ["type"],
    "properties": {
      "type": { "type": "string", "enum": [
        "BACKGROUND-PATTERN", "GRADIENT-LAYER", "FLOATING-ELEMENTS",
        "3D-TRANSFORM", "PARALLAX", "REVEAL-ANIMATION", "TEXT-EFFECT",
        "HOVER-EFFECT", "SCROLL-DRIVEN", "DECORATIVE-ELEMENT",
        "CURSOR-EFFECT", "SECTION-TRANSITION"
      ]},
      "variant": { "type": "string" },
      "trigger": { "type": "string" },
      "target": { "type": "string" },
      "opacity": { "type": "number" },
      "animate": {},
      "axis": { "type": "string" },
      "angle": { "type": "number" }
    }
  },
  "minItems": 1
}
```

---

## 3. Update Phase 3: /generate-section

### Update the generate-section prompt

In the orchestrator (`scripts/generate.sh`) and in the slash command (`.claude/commands/generate-section.md`), update the prompt to include effects:

Add this section to the prompt for each section:

```
## Creative Effects to Implement

This section must include these effects (from plan.json):
{list effects array for this section}

Read docs/CREATIVE_EFFECTS.md for implementation code of each effect type.
Use the code examples as starting point, adapt parameters as specified.

CRITICAL: Every section MUST have visual effects beyond plain content. 
A section without effects looks generic and AI-generated.
Effects are layered:
  Layer 1: Section background
  Layer 2: Background effects (BACKGROUND-PATTERN, GRADIENT-LAYER)  
  Layer 3: Content (from pattern)
  Layer 4: Interactive effects (HOVER-EFFECT, CURSOR-EFFECT)
  Layer 5: Entry animations (REVEAL-ANIMATION)
```

### Update orchestrator script

In `scripts/generate.sh`, when building the prompt for each section, extract effects from plan.json and add them:

```bash
# Extract effects for this section
EFFECTS=$(echo "$PLAN" | jq -r --arg id "$SECTION_ID" '.sections[] | select(.id == $id) | .effects // []')

# Add to prompt
PROMPT="$PROMPT

## Creative Effects to Implement
$EFFECTS

Read docs/CREATIVE_EFFECTS.md for code examples of each effect type.
Implement ALL listed effects. A section without effects is a failure."
```

---

## 4. Create /generate-home Command

### Purpose
Generate ONLY the home page — styles, header, footer, home sections, Home.tsx, config.
For faster testing (10-12 sections instead of 40-70).

### Command: .claude/commands/generate-home.md

```markdown
Generate only the home page for project: $ARGUMENTS

Steps:
1. Run: ./scripts/generate-home.sh $ARGUMENTS
   (This generates styles.css, Header, Footer, all home-page sections, Home.tsx, and project.config.ts)

If the script doesn't exist yet, create it based on generate.sh but filtered to home page only.
```

### Script: scripts/generate-home.sh

This is a modified version of `scripts/generate.sh` that:
- Generates styles.css (same as full)
- Generates Header (same as full)
- Generates Footer (same as full)
- Generates ONLY sections where id starts with "home-" (from plan.json)
- Composes ONLY Home.tsx page
- Generates project.config.ts with only the home route

Key difference from generate.sh — the section loop filters by page:

```bash
# Instead of ALL sections:
# SECTION_IDS=$(cat "$PLAN_FILE" | python3 -c "...")

# Only home sections:
SECTION_IDS=$(cat "$PLAN_FILE" | python3 -c "
import json, sys
plan = json.load(sys.stdin)
for s in plan['sections']:
    if s['id'].startswith('home-'):
        print(s['id'])
")
```

And page composition only creates Home:
```bash
# Instead of all pages, only compose Home
PAGE_FILE="$OUTPUT_DIR/pages/Home.tsx"
# ... compose only from home-* sections
```

And config has only home route:
```bash
# Config with single route
# routes: [{ path: '/', name: 'Home', component: Home }]
```

### Usage

```bash
# Quick test — only home page
./scripts/generate-home.sh kava

# Full project — all pages  
./scripts/generate.sh kava
```

---

## 5. Update LEARNED_RULES.md

Add to Phase 3 Generation section:

```markdown
### AI Default Patterns (avoid)
- Do NOT add a badge/label above hero heading by default. Badges like "🚀 Web Development" are an AI cliché — every LLM generates them. Use only when design.json content explicitly includes a badge. KavaBAR v2 + DiVotek v2: both had unwanted badges.
- Do NOT generate hero sections without creative effects. A hero with just heading + text + buttons on solid bg is generic. ALWAYS implement effects from plan.json. KavaBAR v2.
- Hero CTA buttons should be visually substantial — minimum py-4 (ideally py-5). Default py-3 looks thin with text-5xl+ headings. Add arrow icon with shift-on-hover animation. DiVotek v2.
```

---

## Verification

After all changes:
- [ ] docs/CREATIVE_EFFECTS.md exists with 12 base effects
- [ ] /create-plan prompt includes effect assignment instructions
- [ ] plan.json schema includes effects array
- [ ] /generate-section prompt includes effect implementation instructions
- [ ] scripts/generate.sh passes effects to claude -p prompts
- [ ] scripts/generate-home.sh exists and generates only home page
- [ ] .claude/commands/generate-home.md exists
- [ ] LEARNED_RULES.md has anti-AI-defaults section

## Testing

1. Re-run /create-plan on kava — verify plan.json now has effects array on every section
2. Run ./scripts/generate-home.sh kava — verify home page generates with effects
3. Open browser — compare visually with previous (no effects) version
4. If effects are implemented → SUCCESS, proceed to DiVotek
5. If still generic → check that AI reads CREATIVE_EFFECTS.md and implements code examples
