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
