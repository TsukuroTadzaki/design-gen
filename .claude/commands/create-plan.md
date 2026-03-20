Create a design implementation plan with style preset and layout patterns.

Project ID: $ARGUMENTS

## Steps

1. Read the following files:
   - `projects/$ARGUMENTS/design.json` — visual direction, palette, mood
   - `projects/$ARGUMENTS/structure.json` — sections and backgrounds
   - `docs/STYLE_PRESETS.md` — style presets catalog
   - `docs/SECTION_PATTERNS.md` — layout patterns catalog
   - `docs/DESIGN_PRINCIPLES.md` — design principles
   - `docs/CREATIVE_EFFECTS.md` — effects catalog (12 parametric effects)

2. If design.json or structure.json don't exist, report an error and stop.

3. Scan `projects/*/plan.json` for existing plans to ensure cross-project variety.

4. Read the prompt from `prompts/phase2/create-plan.md`
5. Read the schema from `schemas/plan.schema.json`

6. Generate `plan.json`:

   **Style selection**: choose ONE preset from STYLE_PRESETS.md that matches the project's mood and business type. Justify the choice, mention rejected alternatives. Copy ALL tokens from the preset.

   **Header pattern**: select from HD-* patterns in SECTION_PATTERNS.md with justification.

   **Footer pattern**: select from FT-* patterns in SECTION_PATTERNS.md with justification.

   **Section patterns**: for each section in structure.json, select a pattern from SECTION_PATTERNS.md:
   - Match the correct group code (H for hero, F for features, SV for services, etc.)
   - Justify each choice with specific reasons (item count, content type, business type)
   - No two adjacent sections should use the same pattern
   - Check item count compatibility
   - Check style compatibility with the selected preset

7. Save to `projects/$ARGUMENTS/plan.json`

8. Validate against `schemas/plan.schema.json`

9. Show a summary of choices and suggest running `/review-plan $ARGUMENTS` next.

## Important
- Every section from structure.json must have a pattern assigned
- All style tokens must be copied exactly from STYLE_PRESETS.md
- "why" fields must be specific to this project, not generic
- Check cross-project variety — avoid repeating same presets for similar businesses
