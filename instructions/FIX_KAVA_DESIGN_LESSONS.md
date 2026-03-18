# Task: Apply KavaBAR v1 Design Lessons

After the first full generation of KavaBAR, 7 design issues were identified. These are systemic problems that will repeat in every future project. Add rules to prevent them.

## Changes to make

### 1. Update docs/LEARNED_RULES.md

Add a new section `## Phase 3 Generation` at the end (before "How to Update This File"). Add ALL of the following rules:

```markdown
## Phase 3 Generation

### Header & Hero Interaction
- Hero section MUST have top padding equal to header height (pt-20 or similar) when header is fixed/sticky/absolute. Otherwise first content (badges, headings) hides behind the header. KavaBAR v1.
- Transparent header on hero requires readability check. If hero has a background image, navigation text may become invisible on light areas. Solutions (choose per project): (a) semi-transparent header bg `bg-background/60 backdrop-blur`, (b) dark gradient overlay at top of hero `bg-gradient-to-b from-black/50 via-black/25 to-transparent h-32`, (c) text-shadow on nav items `[text-shadow:0_1px_3px_rgba(0,0,0,0.8)]`, (d) ensure hero image is dark at top. Always test: is navigation readable over the hero? KavaBAR v1: white nav on light sky photo.

### Modals & Forms
- If design.json or plan.json specifies booking/callback/contact forms — actual Dialog or Sheet components MUST be generated with working form fields, submit handler (e.preventDefault + success state), and close button. CTA buttons that reference these forms MUST open the modal on click. NEVER generate a "Book" button that does nothing or just scrolls. KavaBAR v1: zero modals despite booking form in spec.

### Inner Page Heroes
- Home page hero is full presentation: large height (min-h-[70vh] or similar), full content (headline, subheadline, CTAs, trust badges, visual). Inner page heroes are compact headers: shorter height (py-16 md:py-24), only page title + subtitle or breadcrumb. Inner page hero should NEVER match home hero height. KavaBAR v1: all pages had full-height heroes.

### Button Visibility
- Secondary/ghost buttons MUST be visible on their section background. On accent background: use `bg-white text-accent` or `bg-background text-foreground`, NOT `bg-transparent text-white border-white` if text blends with bg. Always mentally test: is this button readable ON this specific section background? KavaBAR v1: white ghost button invisible on light accent CTA section.

### Carousel Layout Stability
- Carousel/slider containers MUST have fixed height based on the tallest possible item. Content below the carousel must NOT shift when slides change. Solutions: (a) set min-h on carousel wrapper, (b) use line-clamp to equalize text length, (c) use fixed-height cards. KavaBAR v1: testimonial carousel caused layout jump on every slide.

### Dark Section Visual Interest
- Large dark/colored sections need visual interest beyond solid background color. Add at least one: subtle texture/pattern overlay at low opacity, decorative SVG elements (large quote marks for testimonials, icons for features), gradient instead of flat color, or floating shapes. A large solid-color section looks empty and unfinished. KavaBAR v1: plain brown testimonials section looked cheap.

### Technical
- project.config.ts MUST use `export default { ... }` with real component imports, NOT string references like `component: 'Home'`. Styles import via `?inline`. KavaBAR v1.
- NEVER use single quotes for strings containing Ukrainian apostrophes (п'ється, об'єкт, м'який, etc.) — use double quotes or template literals. KavaBAR v1: MenuGridSection broke on apostrophe in п'ється.
- All navigation links MUST use ProjectLink from @/core/lib/project-context.tsx — NOT react-router-dom Link directly. Direct Link creates wrong paths (/menu instead of /project/{id}/menu). Same for useLocation → useProjectLocation. KavaBAR v1: 7 files had wrong imports.
```

### 2. Update docs/TECH_GUIDE.md

#### In section "8. Header Rules", add:

```markdown
- When header is fixed/sticky/absolute, the FIRST section on every page MUST account for header height with top padding (`pt-20` or equivalent). Without this, content hides behind the header.
- If header is transparent on hero, ensure navigation text is readable over hero background. Add dark overlay at top of hero, semi-transparent header bg, or text-shadow on nav items.
```

#### In section "10. Anti-Patterns", add:

```markdown
- ❌ Use single quotes for Ukrainian text with apostrophes (`'п'ється'`) — breaks JSX. Use double quotes (`"п'ється"`) or template literals
- ❌ Use `<Link to="...">` from react-router-dom directly — use `ProjectLink` from `@/core/lib/project-context.tsx` for correct project-prefixed routing
- ❌ Generate CTA buttons that reference modals/forms but don't implement them — if the button says "Book" or "Request callback", the Dialog/Sheet with form MUST exist in the same component
- ❌ Make inner page heroes same height as home hero — inner pages use compact hero (py-16 md:py-24, title + subtitle only)
- ❌ Use ghost/transparent buttons on backgrounds where they become invisible — always verify button text color contrasts with section background
- ❌ Use carousel/slider without fixed container height — content below will jump on slide change
- ❌ Use large solid-color sections without any visual texture — they look flat and unfinished. Add subtle pattern, gradient, or decorative elements
```

#### In section "14. Technical Quality Checklist", add:

```markdown
- [ ] Hero sections have top padding for fixed/sticky header
- [ ] Navigation uses ProjectLink, not Link from react-router-dom
- [ ] All CTA buttons that reference forms have working Dialog/Sheet with form
- [ ] Inner page heroes are compact (not full-height like home hero)
- [ ] Buttons are readable on their section background color
- [ ] Carousels have fixed-height containers
- [ ] No single-quote strings with Ukrainian apostrophes
- [ ] Dark/colored sections have visual texture or decoration (not flat solid)
```

### 3. Update prompts for generate-section

In the prompt template used by `/generate-section` (whether it's in `prompts/phase3/generate-section.md` or `.claude/commands/generate-section.md`), add these rules to the instructions block:

```markdown
## Section-Specific Checks

Before outputting code for this section, verify:

### If this is a Hero section:
- Add pt-20 (or header height equivalent) if header is fixed/sticky
- If header is transparent: ensure hero has dark area at top OR add gradient overlay for nav readability
- If this is an INNER PAGE hero (not home): make it compact (py-16 md:py-24, title + subtitle only, NO full-height, NO min-h-screen)

### If this section has CTA buttons that reference forms:
- Check design.json — does this project have booking/callback/contact forms?
- If yes: implement Dialog or Sheet with actual form (fields, submit handler, success state)
- Wire the CTA button to open the Dialog: onClick or DialogTrigger

### If this section has dark or colored background:
- Do NOT leave it as flat solid color
- Add at least one: subtle texture overlay, decorative SVG element, gradient variation, or floating shapes at low opacity

### If this section uses a carousel/slider:
- Set fixed min-height on the carousel container based on tallest expected item
- Content below must not shift on slide change

### If this section has buttons:
- Verify EACH button is readable on this section's background
- Primary button: bg-accent text-white — check on dark AND light bg
- Secondary button: if section bg is accent — use bg-white text-accent, NOT ghost/transparent

### All sections:
- Use ProjectLink from @/core/lib/project-context.tsx for navigation, NOT Link from react-router-dom
- Use double quotes for any Ukrainian text containing apostrophes
```

## Verification

After all changes:
- [ ] LEARNED_RULES.md has new "Phase 3 Generation" section with 10 rules
- [ ] TECH_GUIDE.md section 8 has 2 new header rules
- [ ] TECH_GUIDE.md section 10 has 7 new anti-patterns
- [ ] TECH_GUIDE.md section 14 has 8 new checklist items
- [ ] generate-section prompt has "Section-Specific Checks" block
- [ ] No duplicate rules between files (LEARNED_RULES has context/project references, TECH_GUIDE has generic rules, prompt has generation-time checks)
