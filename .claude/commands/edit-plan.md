Edit the design plan based on user feedback.

Project ID: $ARGUMENTS

## Steps

1. Read `projects/$ARGUMENTS/plan.json` and `projects/$ARGUMENTS/structure.json`
2. If either file doesn't exist, report an error and stop.

3. Ask the user what they want to change. Three modes:

### Mode 1: Change Style
User says: "Change style to SP-05 Glassmorphism" or "Зміни стиль на SP-03"

→ Read `docs/STYLE_PRESETS.md`
→ Find the requested preset
→ Update plan.json: preset_id, preset_name, why, and ALL tokens
→ Review pattern compatibility — warn if any patterns conflict with new style

### Mode 2: Change Pattern
User says: "Change home-hero to H-03" or "Зміни home-services на SV-02 Zigzag"

→ Read `docs/SECTION_PATTERNS.md`
→ Find the requested pattern
→ Update the specific section in plan.json: pattern_id, pattern_name, why
→ Check adjacent sections — warn if same pattern appears next to each other

### Mode 3: Add/Remove Section
User says: "Add stats section after services" or "Remove pricing section"

**Add:**
→ Update structure.json: insert new section with id, type, purpose, content_source, funnel_stage, background
→ Update plan.json: select pattern for new section, add to sections array
→ Check background rhythm — adjust if needed

**Remove:**
→ Remove section from structure.json
→ Remove section from plan.json
→ Check background rhythm — adjust if needed

4. After changes:
   - Increment `plan_version` by 1 in plan.json
   - Save both files if both were changed
   - Show what changed

5. Ask if more changes are needed.
