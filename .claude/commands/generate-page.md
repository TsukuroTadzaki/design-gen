Compose a page from generated sections.

Project ID and Page Slug from arguments: $ARGUMENTS
(Format: {project-id} {page-slug}, e.g., "kava home")

## Steps

1. Parse arguments: first word is project-id, second word is page-slug.

2. Read `projects/{project-id}/plan.json` → find all sections for this page (in order)
3. Read `projects/{project-id}/structure.json` → get page info

4. Check that ALL section files exist in `src/projects/{project-id}/output/sections/`:
   - For each section in the page, check the corresponding .tsx file exists
   - If any section is missing, report error: "Section {section-id} not yet generated. Run /generate-section {project-id} {section-id}"

5. Determine file name mapping for each section (same logic as generate-section):
   - Check if section type is unique across project
   - If unique: {Type}Section
   - If duplicate: {Page}{Type}Section

6. Create `src/projects/{project-id}/output/pages/` directory if needed.

7. Generate `src/projects/{project-id}/output/pages/{PageName}.tsx`:

```tsx
import SectionA from '../sections/SectionA'
import SectionB from '../sections/SectionB'
// ... all sections in order

export default function PageName() {
  return (
    <>
      <SectionA />
      <SectionB />
      {/* ... all sections in order */}
    </>
  )
}
```

Rules:
- No logic in page files — only imports and composition
- No wrapper divs — use Fragment (<>)
- Sections in the exact order from plan.json
- Header and Footer are NOT included in page files (they're global)
- Component name = PascalCase of page name (e.g., "home" → Home, "about" → About)

8. Report what was composed and suggest running `/next {project-id}` for the next step.
