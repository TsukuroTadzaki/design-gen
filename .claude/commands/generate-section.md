Generate one section component.

Project ID and Section ID from arguments: $ARGUMENTS
(Format: {project-id} {section-id}, e.g., "kava home-hero" or "kava header")

## Steps

1. Parse arguments: first word is project-id, second word is section-id.

2. Read the following files:
   - `projects/{project-id}/plan.json` → find the section by section-id
   - `projects/{project-id}/design.json` → content at path specified by content_source
   - `projects/{project-id}/structure.json` → for global elements (header/footer)
   - `src/projects/{project-id}/output/styles.css` → for reference of CSS variables and animation classes
   - `docs/SECTION_PATTERNS.md` → find pattern by pattern_id, read full description
   - `docs/TECH_GUIDE.md` → technical code rules
   - `docs/LEARNED_RULES.md` → past mistakes to avoid

3. If styles.css doesn't exist, report error: "Generate styles.css first. Run /generate-styles {project-id}"

4. Determine where to find section info:
   - If section-id is "header" → read from `plan.json → header` and `structure.json → global.header`
   - If section-id is "footer" → read from `plan.json → footer` and `structure.json → global.footer`
   - Otherwise → read from `plan.json → sections[]` matching the id

5. Read the prompt template from `prompts/phase3/generate-section.md`

6. Determine file name:
   - "header" → Header.tsx
   - "footer" → Footer.tsx
   - For page sections: check if section type is unique across all sections in plan.json
     - If unique: {Type}Section.tsx (e.g., "home-hero" type "hero" → HeroSection.tsx)
     - If type appears on multiple pages: {Page}{Type}Section.tsx (e.g., "about-hero" → AboutHeroSection.tsx)
   - Convert to PascalCase

7. Create `src/projects/{project-id}/output/sections/` directory if needed.

8. Generate the section component following ALL rules from:
   - The pattern description (layout structure)
   - Style tokens from plan.json (border-radius, shadows, cards, buttons, hover)
   - Content from design.json (exact text, not invented)
   - TECH_GUIDE.md (code standards)
   - LEARNED_RULES.md (past mistakes)

9. Apply background based on plan.json:
   - dark: bg-secondary or bg-foreground with light text (text-secondary-foreground or text-white)
   - light: bg-background with dark text
   - muted: bg-muted with dark text
   - accent: bg-accent with accent-foreground text

10. Save to `src/projects/{project-id}/output/sections/{FileName}.tsx`

11. Output verification checklist:
    - [ ] Pattern matches {pattern_name} layout description
    - [ ] No hardcoded hex colors — only semantic Tailwind classes
    - [ ] Style tokens applied (border-radius, shadows, hover match plan.json)
    - [ ] Content matches design.json (no invented content)
    - [ ] Responsive (mobile → tablet → desktop)
    - [ ] Interactive elements work (if any)
    - [ ] Semantic HTML used

12. Suggest running `/next {project-id}` for the next step.
