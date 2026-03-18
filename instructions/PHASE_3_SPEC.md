# Design Generator v2 — Phase 3: Generation

## Context

Phase 1 (Brief) and Phase 2 (Plan) are complete and tested. Phase 3 takes `plan.json` and generates actual code — React/TSX components, CSS, and page compositions.

**Key principle:** The AI makes ZERO design decisions in Phase 3. Every decision was made in Phase 2 and recorded in `plan.json`. Phase 3 only executes: reads the plan, reads the content from `design.json`, writes code following `TECH_GUIDE.md` rules.

## Prerequisites

These files must exist before Phase 3:
```
projects/{project-id}/
├── brief.json          # Phase 1
├── design.json         # Phase 1 — content source
├── design.md           # Phase 1
├── structure.json      # Phase 2
├── plan.json           # Phase 2 — style tokens + patterns
```

These docs must exist:
```
docs/
├── TECH_GUIDE.md       # Code rules
├── LEARNED_RULES.md    # Past mistakes
├── STYLE_PRESETS.md    # Reference (plan.json already has tokens)
├── SECTION_PATTERNS.md # Reference (plan.json already has pattern IDs)
```

---

## Output Structure

```
projects/{project-id}/output/
├── project.config.ts
├── styles.css
├── sections/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── AdvantagesSection.tsx
│   └── ...
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   └── ...
├── components/          # Project-specific extended components (if needed)
└── data/                # Mock data files (if needed)
```

---

## CLI Commands

### Navigation

```
/status {project-id}     # Show full generation progress
/next {project-id}       # Show next command to run
```

### Generation

```
/generate-styles {project-id}                    # Step 1: styles.css
/generate-section {project-id} {section-id}      # Steps 2+: one section at a time
/generate-page {project-id} {page-slug}          # Compose page from generated sections
/generate-config {project-id}                    # Final: project.config.ts
```

---

## Command: /status {project-id}

### What it does
Reads `plan.json`, scans `output/` folder, and displays progress.

### Implementation
1. Read `plan.json` → get full list of sections (header, footer, all page sections)
2. Scan `output/sections/` → check which .tsx files exist
3. Check `output/styles.css` exists
4. Check `output/pages/` → which page files exist
5. Check `output/project.config.ts` exists
6. Display status table

### Output format

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
  Home.tsx            ✅ composed | ⬜ pending (all sections ready)
  About.tsx           ⬜ pending (2/4 sections ready)

Progress: {done}/{total} sections ({percent}%)
Next: /generate-section {project-id} {next-section-id}
```

### Order of generation
The status command determines order based on this sequence:
1. `styles.css` (must be first)
2. `Header` (global, needed before pages)
3. `Footer` (global, needed before pages)
4. Home page sections (in order from plan.json)
5. Inner page sections (page by page, in order from plan.json)
6. Page compositions (only when all sections for that page are done)
7. `project.config.ts` (last)

---

## Command: /next {project-id}

### What it does
Runs the same logic as `/status` but outputs ONLY the next command to run.

### Output format
```
Next step: Generate {section-id} ({pattern-name}) for {page-name}

Run: /generate-section {project-id} {section-id}
```

Or if styles.css is not yet created:
```
Next step: Generate project styles

Run: /generate-styles {project-id}
```

Or if all sections are done but pages not composed:
```
Next step: Compose {page-name} page

Run: /generate-page {project-id} {page-slug}
```

Or if everything is done:
```
✅ All generation complete! 

Run /status {project-id} for full overview.
```

---

## Command: /generate-styles {project-id}

### What it reads
1. `plan.json` → `style.tokens` (all design tokens)
2. `design.json` → `visual_direction.color_palette` (exact hex colors)
3. `docs/TECH_GUIDE.md` → section 3 (Project styles.css requirements)

### What it generates
`output/styles.css` containing:
1. CSS variables scoped with `html[data-project="{project-id}"]`
2. `@theme inline` block mapping variables to Tailwind classes
3. Custom `@keyframes` for project animations (float, fade-in-up, shimmer, stagger)
4. Utility animation classes (`.animate-float`, `.stagger-1` through `.stagger-6`)
5. Custom scrollbar matching project theme
6. Smooth scroll

### Verification after generation
Output this checklist:
- [ ] Selector is `html[data-project="{project-id}"]` (not just `[data-project]`)
- [ ] All colors from design.json color_palette are mapped to CSS variables
- [ ] Animation keyframes use `var()` references, NOT hardcoded hex/rgba
- [ ] Stagger classes .stagger-1 through .stagger-6 defined
- [ ] Custom scrollbar defined
- [ ] Smooth scroll included

---

## Command: /generate-section {project-id} {section-id}

This is the core command. Generates one section at a time.

### What it reads

For EVERY section:
1. `plan.json` → find section by `{section-id}`:
   - `pattern_id` + `pattern_name` — which layout to implement
   - `why` — context for AI understanding
   - `background` — dark/light/muted/accent
   - `content_source` — where to find content in design.json
   - `notes` — additional implementation hints
2. `plan.json` → `style.tokens` — all design tokens for this project
3. `design.json` → content at the path specified by `content_source`
4. `docs/SECTION_PATTERNS.md` → find the pattern by `pattern_id`, read its full description
5. `docs/TECH_GUIDE.md` — technical code rules
6. `docs/LEARNED_RULES.md` — past mistakes to avoid
7. `output/styles.css` — to reference CSS variables and animation classes

### Special cases

**For Header ({section-id} = "header"):**
- Read `plan.json` → `header.pattern_id`
- Read `structure.json` → `global.header` (elements, CTA text, phone, behavior)
- Read `plan.json` → all page slugs and names (for navigation links)
- Apply TECH_GUIDE section 8 (Header Rules) — active nav state, mobile drawer

**For Footer ({section-id} = "footer"):**
- Read `plan.json` → `footer.pattern_id`
- Read `structure.json` → `global.footer` (columns, CTA)
- Apply TECH_GUIDE section 9 (Footer Rules) — dynamic year

### What it generates
One file: `output/sections/{SectionName}.tsx`

File naming convention:
- `{section-id}` = "home-hero" → `HeroSection.tsx`
- `{section-id}` = "home-advantages" → `AdvantagesSection.tsx`
- `{section-id}` = "about-story" → `AboutStorySection.tsx`
- `{section-id}` = "header" → `Header.tsx`
- `{section-id}` = "footer" → `Footer.tsx`

If multiple pages have same section type (e.g., home-hero and about-hero), prefix with page:
- `home-hero` → `HeroSection.tsx`
- `about-hero` → `AboutHeroSection.tsx`

### Prompt structure for section generation

```
You are generating ONE React section component.

## Project Style Tokens
{paste style.tokens from plan.json}

## Section to Generate
- ID: {section-id}
- Type: {type}
- Pattern: {pattern_id} — {pattern_name}
- Background: {background}

## Pattern Description (from SECTION_PATTERNS.md)
{paste full pattern description}

## Content (from design.json)
{paste content object from the path specified in content_source}

## Implementation Notes (from plan.json)
{paste notes field}

## Technical Rules
{paste relevant sections from TECH_GUIDE.md}

## Learned Rules
{paste LEARNED_RULES.md}

## Instructions
1. Implement the layout described in the Pattern Description
2. Apply ALL style tokens (border-radius, shadows, card-style, button-style, hover, etc.)
3. Use the Content provided — do NOT invent new content
4. Background: "{background}" — apply appropriate bg class:
   - dark: bg-secondary or bg-foreground with light text
   - light: bg-background with dark text
   - muted: bg-muted with dark text
   - accent: bg-accent with accent-foreground text
5. Follow ALL rules from TECH_GUIDE.md
6. Follow ALL rules from LEARNED_RULES.md
7. Export as default function component
8. Use semantic HTML
9. Make fully responsive (mobile-first)
10. All interactive elements must work
```

### Verification after generation
Output brief checklist:
- [ ] Pattern matches {pattern_name} layout description
- [ ] No hardcoded hex colors — only semantic classes
- [ ] Style tokens applied (border-radius, shadows, hover match plan.json)
- [ ] Content matches design.json (no invented content)
- [ ] Responsive (mobile → tablet → desktop)
- [ ] Interactive elements work
- [ ] Semantic HTML used

---

## Command: /generate-page {project-id} {page-slug}

### When to run
Only after ALL sections for this page are generated.

### What it reads
1. `plan.json` → find all sections for this page (in order)
2. `output/sections/` → verify all section files exist

### What it generates
`output/pages/{PageName}.tsx` — simple composition:

```tsx
import HeroSection from '../sections/HeroSection'
import AdvantagesSection from '../sections/AdvantagesSection'
import ServicesSection from '../sections/ServicesSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <AdvantagesSection />
      <ServicesSection />
    </>
  )
}
```

No logic, no wrappers — only imports and ordering per TECH_GUIDE section 7.

---

## Command: /generate-config {project-id}

### When to run
After all pages are composed.

### What it reads
1. `plan.json` → project ID, style info
2. `structure.json` → all pages (slugs, names)
3. `output/` → verify all files exist

### What it generates
`output/project.config.ts` with:
- Project metadata (id, name)
- Route definitions for all pages
- Header and Footer component references
- styles.css import

---

## Generation Flow (complete)

```
Session 1:  /generate-styles {id}
Session 2:  /next {id} → /generate-section {id} header
Session 3:  /next {id} → /generate-section {id} footer
Session 4:  /next {id} → /generate-section {id} home-hero
Session 5:  /next {id} → /generate-section {id} home-advantages
...continue until all Home sections done...

CHECK HOME: Open in browser, review visually.
  If issues found:
  - Fix section directly (edit code)
  - If systemic issue → add rule to LEARNED_RULES.md
  - Re-generate affected sections

Session N:  /generate-page {id} home
Session N+1: /next {id} → first inner page section
...continue inner pages...

Session final: /generate-config {id}
```

---

## Handling Section Names

The `/generate-section` command needs to map section IDs to file names. Convention:

| section-id | File name | Component name |
|---|---|---|
| header | Header.tsx | Header |
| footer | Footer.tsx | Footer |
| home-hero | HeroSection.tsx | HeroSection |
| home-advantages | AdvantagesSection.tsx | AdvantagesSection |
| home-services | ServicesSection.tsx | ServicesSection |
| home-how-it-works | HowItWorksSection.tsx | HowItWorksSection |
| home-testimonials | TestimonialsSection.tsx | TestimonialsSection |
| home-faq | FaqSection.tsx | FaqSection |
| home-cta | CtaSection.tsx | CtaSection |
| about-hero | AboutHeroSection.tsx | AboutHeroSection |
| about-story | AboutStorySection.tsx | AboutStorySection |
| contacts-hero | ContactsHeroSection.tsx | ContactsHeroSection |
| contacts-form | ContactsFormSection.tsx | ContactsFormSection |

Rule: if section type appears on multiple pages, prefix with page name. If unique across project, no prefix needed. The generate command handles this automatically by checking for duplicates in plan.json.

---

## Context Per Section Call

What the AI sees when generating each section (and ONLY this):

```
┌─────────────────────────────────────────────┐
│ Style tokens from plan.json                  │  ~20 lines
│ Section info from plan.json (this section)   │  ~10 lines
│ Pattern description from SECTION_PATTERNS.md │  ~10 lines
│ Content from design.json (this section only) │  ~20-50 lines
│ TECH_GUIDE.md                                │  ~250 lines
│ LEARNED_RULES.md                             │  ~80 lines
│ styles.css (for reference)                   │  ~50-80 lines
├─────────────────────────────────────────────┤
│ TOTAL: ~450-500 lines of context             │
│ (vs 3000+ in v1 monolithic approach)         │
└─────────────────────────────────────────────┘
```

This is the core architectural advantage — each section gets clean, focused context with maximum attention on style tokens and content. No previous sections' code polluting the context.

---

## Error Handling

### Section generation fails or looks wrong
1. Review the output visually
2. Identify the issue:
   - **Wrong layout** → check if pattern description was read correctly. Re-run with explicit pattern instructions.
   - **Wrong colors** → check styles.css variables. May need to fix styles.css first.
   - **Wrong content** → check content_source path in plan.json points to correct design.json section.
   - **Generic/boring** → pattern not followed closely enough. Re-run with stronger emphasis on pattern description.
3. Fix the section (re-run or manual edit)
4. If the issue is systemic (will repeat in other sections) → add to LEARNED_RULES.md before continuing

### Section doesn't match adjacent sections visually
This should be rare since all sections use same style tokens. But if it happens:
1. Check that both sections use tokens from plan.json (not improvised)
2. Check background rhythm matches structure.json
3. If one section "drifted" from tokens → re-generate it

---

## Implementation Order

```
1. Create command: .claude/commands/status.md
2. Create command: .claude/commands/next.md
3. Create command: .claude/commands/generate-styles.md
4. Create command: .claude/commands/generate-section.md
5. Create prompt: prompts/phase3/generate-section.md (template)
6. Create command: .claude/commands/generate-page.md
7. Create command: .claude/commands/generate-config.md
8. TEST: Generate styles.css for KavaBAR (simplest — 4 pages)
9. TEST: Generate Header + Footer for KavaBAR
10. TEST: Generate all Home sections for KavaBAR
11. CHECK: Open KavaBAR Home in browser
12. If OK → generate remaining pages
13. If issues → fix, update LEARNED_RULES, re-test
14. TEST: Full generation for DiVotek (medium — 11 pages)
15. TEST: Full generation for Barkas (complex — 16 pages)
```

---

## Testing Phase 3

### Test order
Start with the simplest project:
1. **KavaBAR** (4 pages, ~19 sections) — test the flow
2. **DiVotek** (11 pages, ~40 sections) — test medium complexity
3. **Barkas** (16 pages, ~70 sections) — stress test

### Success criteria

| Criteria | How to verify |
|---|---|
| Style tokens applied consistently | All sections use same border-radius, shadows, hover from plan.json |
| No hardcoded colors | grep for hex values in .tsx files — should find zero |
| Patterns match plan | Visually compare each section to pattern description |
| Content matches design.json | Headings, CTAs, descriptions match — no invented content |
| Responsive | Check mobile, tablet, desktop for each page |
| Interactive elements work | Mobile menu, modals, accordions, tabs, forms all functional |
| Background rhythm correct | Section backgrounds alternate per structure.json |
| Sections are self-contained | No props passed to sections |
| Pages are compositions only | No logic in page files |
| Body scroll locks on overlays | Test modals, drawers, mobile menu |
| Active nav state works | Current page highlighted in header |

### Visual comparison test
After generating all 3 projects, compare side by side:
- Do they look like 3 different websites? (different styles, layouts)
- Does each one feel cohesive within itself? (same tokens throughout)
- Does each section match its pattern description?

---

## What is NOT in Phase 3

- Design decisions — all made in Phase 2
- Bash orchestrator — manual /next flow for now, automate later
- design-reference.md — plan.json tokens are sufficient
- Web UI — CLI only
- Database — JSON files
