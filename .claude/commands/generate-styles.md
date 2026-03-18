Generate styles.css for the project.

Project ID: $ARGUMENTS

## Steps

1. Read the following files:
   - `projects/$ARGUMENTS/plan.json` → `style.tokens` (all design tokens)
   - `projects/$ARGUMENTS/design.json` → `visual_direction.color_palette` (exact hex colors)
   - `docs/TECH_GUIDE.md` → section about project styles.css requirements

2. If plan.json or design.json don't exist, report error and stop.

3. Create directory `src/projects/$ARGUMENTS/output/` if it doesn't exist.

4. Generate `src/projects/$ARGUMENTS/output/styles.css` containing:

   a. CSS variables scoped with `html[data-project="$ARGUMENTS"]` selector:
      - Map ALL colors from design.json color_palette to CSS variables
      - Include primary, secondary, accent, background, muted, card, border
      - Include foreground, primary-foreground, accent-foreground, etc.
      - Include ring, input, destructive colors

   b. `@theme inline` block mapping CSS variables to Tailwind utility classes

   c. Custom `@keyframes` for project animations:
      - float (gentle up-down movement)
      - fade-in-up (appear from below)
      - shimmer (loading/shine effect)
      - stagger (sequential reveal)
      - Any animations appropriate for the selected style preset

   d. Utility animation classes:
      - `.animate-float`
      - `.stagger-1` through `.stagger-6` with incremental delays

   e. Custom scrollbar matching project theme colors

   f. Smooth scroll: `html { scroll-behavior: smooth; }`

5. Verify:
   - Selector is `html[data-project="$ARGUMENTS"]` (not generic)
   - ALL colors from design.json are mapped
   - Animation keyframes use `var()` references, NOT hardcoded hex/rgba
   - Stagger classes .stagger-1 through .stagger-6 defined
   - Custom scrollbar defined
   - Smooth scroll included

6. Report what was generated and suggest running `/next $ARGUMENTS` for the next step.
