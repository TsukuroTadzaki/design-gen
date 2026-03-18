You are generating ONE React section component.

## Project Style Tokens
{style_tokens}

## Section to Generate
- ID: {section_id}
- Type: {section_type}
- Pattern: {pattern_id} — {pattern_name}
- Background: {background}

## Pattern Description (from SECTION_PATTERNS.md)
{pattern_description}

## Content (from design.json)
{content}

## Implementation Notes (from plan.json)
{notes}

## Technical Rules
{tech_guide}

## Learned Rules
{learned_rules}

## Available CSS Variables and Animations (from styles.css)
{styles_css}

## Instructions

1. Implement the layout described in the Pattern Description exactly
2. Apply ALL style tokens (border-radius, shadows, card-style, button-style, hover, etc.)
3. Use the Content provided — do NOT invent new content
4. Background: "{background}" — apply appropriate bg class:
   - dark: bg-secondary or bg-foreground with light text (text-secondary-foreground or text-white)
   - light: bg-background with dark text
   - muted: bg-muted with dark text
   - accent: bg-accent with accent-foreground text
5. Follow ALL rules from Technical Rules section
6. Follow ALL rules from Learned Rules section
7. Export as default function component
8. Use semantic HTML (section, article, nav, etc.)
9. Make fully responsive (mobile-first approach)
10. All interactive elements must be functional (accordions, tabs, modals, etc.)
11. Use lucide-react for icons
12. Import shadcn/ui components from @/core/ui/ when needed (Button, Card, Badge, etc.)
13. Content is hardcoded inside the component — no props
14. Use CSS variables from styles.css via Tailwind classes (e.g., text-primary, bg-accent)
15. Use animation classes from styles.css where appropriate (animate-float, stagger-N, fade-in-up)
16. For internal navigation links: use `import { ProjectLink as Link } from '@/core/lib/project-context'` — NEVER use `Link` from `react-router-dom` directly. ProjectLink automatically prefixes paths with the project base URL.
17. For Header/Footer with active nav state: use `import { ProjectLink as Link, useProjectLocation } from '@/core/lib/project-context'` instead of `useLocation` from react-router-dom. useProjectLocation returns paths relative to the project (e.g., "/menu" not "/project/kava/menu").

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
