Show full generation progress for a project.

Project ID: $ARGUMENTS

## Steps

1. Read `projects/$ARGUMENTS/plan.json` — get full list of sections (header, footer, all page sections)
2. Read `projects/$ARGUMENTS/structure.json` — get page info and global elements
3. Read `projects/$ARGUMENTS/design.json` — get project name

4. If plan.json doesn't exist, report error: "Phase 2 not complete. Run /create-plan $ARGUMENTS first."

5. Check which output files exist:
   - `src/projects/$ARGUMENTS/output/styles.css`
   - `src/projects/$ARGUMENTS/output/project.config.ts`
   - `src/projects/$ARGUMENTS/output/sections/Header.tsx`
   - `src/projects/$ARGUMENTS/output/sections/Footer.tsx`
   - For each section in plan.json: check `src/projects/$ARGUMENTS/output/sections/{SectionName}.tsx`
   - For each page in structure.json: check `src/projects/$ARGUMENTS/output/pages/{PageName}.tsx`

6. Display status in this format:

```
=== {Project Name} — Generation Status ===

SETUP:
  styles.css          ✅ done | ⬜ pending
  project.config.ts   ✅ done | ⬜ pending

GLOBAL:
  Header.tsx          ✅ done | ▶️ next | ⬜ pending
  Footer.tsx          ✅ done | ▶️ next | ⬜ pending

{PAGE NAME} ({N} sections):
  ✅ {section-id}     {pattern-id} {pattern-name}
  ▶️ {section-id}     {pattern-id} {pattern-name}     ← NEXT
  ⬜ {section-id}     {pattern-id} {pattern-name}
  ...

PAGES:
  Home.tsx            ✅ composed | ⬜ pending (all sections ready) | ⬜ pending (X/Y sections ready)
  About.tsx           ⬜ pending (2/4 sections ready)

Progress: {done}/{total} sections ({percent}%)
Next: /generate-section {project-id} {next-section-id}
```

7. Determine the NEXT item based on this order:
   a. `styles.css` (must be first)
   b. `Header` (global)
   c. `Footer` (global)
   d. Home page sections (in plan.json order)
   e. Inner page sections (page by page, in plan.json order)
   f. Page compositions (only when all sections for that page are done)
   g. `project.config.ts` (last, when everything else is done)

8. Mark the next item with ▶️ in the display.

## Section ID to File Name Mapping

To check if a section file exists, convert section-id to file name:
- "header" → Header.tsx
- "footer" → Footer.tsx
- For page sections: check if section type is unique across the project
  - If unique: {Type}Section.tsx (e.g., "home-hero" → HeroSection.tsx)
  - If duplicate type across pages: {Page}{Type}Section.tsx (e.g., "about-hero" → AboutHeroSection.tsx)
