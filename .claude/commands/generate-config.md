Generate project.config.ts — the final step.

Project ID: $ARGUMENTS

## Steps

1. Read the following files:
   - `projects/$ARGUMENTS/plan.json` → project ID, style info
   - `projects/$ARGUMENTS/structure.json` → all pages (slugs, names)
   - `projects/$ARGUMENTS/design.json` → project name

2. Verify all output files exist in `src/projects/$ARGUMENTS/output/`:
   - `src/projects/$ARGUMENTS/output/styles.css`
   - `src/projects/$ARGUMENTS/output/sections/Header.tsx`
   - `src/projects/$ARGUMENTS/output/sections/Footer.tsx`
   - All section files for all pages
   - All page files

3. If any files are missing, report which ones and suggest running `/next $ARGUMENTS`.

4. Generate `src/projects/$ARGUMENTS/output/project.config.ts`:

```typescript
import './styles.css'

export const projectConfig = {
  id: '{project-id}',
  name: '{project-name}',
  routes: [
    { path: '/', name: '{home-page-name}', component: 'Home' },
    { path: '/about', name: '{about-page-name}', component: 'About' },
    // ... all pages from structure.json
  ],
  header: 'Header',
  footer: 'Footer',
}
```

5. Report completion:

```
✅ Project {project-name} generation complete!

Files generated:
  output/styles.css
  output/sections/ ({N} files)
  output/pages/ ({M} files)
  output/project.config.ts

Total: {total} files
```
