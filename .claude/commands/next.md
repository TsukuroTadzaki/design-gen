Show the next command to run for project generation.

Project ID: $ARGUMENTS

## Steps

1. Read `projects/$ARGUMENTS/plan.json` and `projects/$ARGUMENTS/structure.json`
2. If plan.json doesn't exist, report error: "Phase 2 not complete. Run /create-plan $ARGUMENTS first."

3. Check generation progress (same logic as /status) in `src/projects/$ARGUMENTS/output/`:
   - Check `src/projects/$ARGUMENTS/output/styles.css`
   - Check `src/projects/$ARGUMENTS/output/sections/Header.tsx`
   - Check `src/projects/$ARGUMENTS/output/sections/Footer.tsx`
   - Check each section file in `src/projects/$ARGUMENTS/output/sections/`
   - Check each page file in `src/projects/$ARGUMENTS/output/pages/`
   - Check `src/projects/$ARGUMENTS/output/project.config.ts`

4. Determine the next step based on this order:
   a. styles.css → `/generate-styles $ARGUMENTS`
   b. Header → `/generate-section $ARGUMENTS header`
   c. Footer → `/generate-section $ARGUMENTS footer`
   d. Home sections (in order) → `/generate-section $ARGUMENTS {section-id}`
   e. Inner page sections (page by page) → `/generate-section $ARGUMENTS {section-id}`
   f. Page compositions → `/generate-page $ARGUMENTS {page-slug}`
   g. project.config.ts → `/generate-config $ARGUMENTS`

5. Output format:

If styles.css not created:
```
Next step: Generate project styles

Run: /generate-styles $ARGUMENTS
```

If a section is next:
```
Next step: Generate {section-id} ({pattern-name}) for {page-name}

Run: /generate-section $ARGUMENTS {section-id}
```

If a page composition is next:
```
Next step: Compose {page-name} page

Run: /generate-page $ARGUMENTS {page-slug}
```

If project.config.ts is next:
```
Next step: Generate project config

Run: /generate-config $ARGUMENTS
```

If everything is done:
```
✅ All generation complete!

Run /status $ARGUMENTS for full overview.
```
