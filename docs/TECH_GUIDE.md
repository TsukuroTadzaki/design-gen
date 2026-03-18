# Technical Guide

Technical constraints, code rules, and implementation standards for Design Generator v2 output. This document covers HOW to write code — not WHAT to design.

Design decisions (style, layout patterns, colors, typography) come from `plan.json`. This guide ensures the generated code is technically correct, accessible, and performant.

---

## 1. Tech Stack

- **React 19** + TypeScript
- **Tailwind CSS 4**: Utility classes only. No `tailwind.config.js` customization.
- **shadcn/ui**: Use base components from `@/core/ui/` as much as possible (`Button`, `Card`, `Dialog`, `Sheet`, `Badge`, `Input`, etc.). Extend in `projects/{name}/components/` if needed.
- **Icons**: Use `lucide-react` as primary. **One icon library per section.**
- **Animations**: CSS keyframes in project `styles.css` for repeating animations (float, glow, shimmer, stagger). `framer-motion` only for complex orchestrated animations. CSS transitions for hover/focus.

---

## 2. Color System (CRITICAL)

**NEVER hardcode hex colors in components** (e.g., `bg-[#152139]`). Use semantic Tailwind classes:

```tsx
// ✅ CORRECT — semantic classes
className="bg-primary text-primary-foreground"
className="bg-secondary text-secondary-foreground"
className="bg-muted text-muted-foreground"
className="border-border bg-card"

// ❌ WRONG — hardcoded hex values
className="bg-[#152139] text-[#dedacf]"
className="text-[#cc9966]"
```

Each project defines its colors in `styles.css` via CSS variables. Sections use semantic classes only — this makes the design system consistent and colors changeable in one place.

### Available semantic color classes (use these in components):
- `bg-background` / `text-foreground` — page background / main text
- `bg-primary` / `text-primary-foreground` — primary brand color
- `bg-secondary` / `text-secondary-foreground` — secondary brand color
- `bg-muted` / `text-muted-foreground` — subtle backgrounds / secondary text
- `bg-card` / `text-card-foreground` — card surfaces
- `bg-accent` / `text-accent-foreground` — accent/CTA color
- `border-border` — borders
- `ring-ring` — focus rings

---

## 3. Project styles.css (REQUIRED)

Every project must have a `styles.css` file that defines:

1. **CSS variables** scoped with `html[data-project="xxx"]` selector (NOT just `[data-project="xxx"]` — the `html` prefix ensures higher specificity than `:root` fallbacks in globals.css)
2. **@theme inline** block mapping variables to Tailwind color classes
3. **Custom @keyframes** for project-specific animations (float, fade-in-up, shimmer, etc.)
4. **Utility animation classes** (`.animate-float`, `.animate-fade-in-up`, `.stagger-1` through `.stagger-6`). **No hardcoded colors in animation classes** — use `var()` references
5. **Custom scrollbar** matching the project theme
6. **Smooth scroll** (`html { scroll-behavior: smooth; }`)

The styles.css is imported by ProjectShell when the project is active.

**CSS Variable Selector (CRITICAL):**
```css
/* ✅ CORRECT — html prefix gives specificity (0,1,1), beats :root (0,1,0) */
html[data-project="my-project"] {
  --primary: #c2703e;
  --secondary: #7c3aed;
}

/* ❌ WRONG — same specificity as :root, order-dependent, colors may not apply */
[data-project="my-project"] {
  --primary: #c2703e;
}
```

---

## 4. File Structure

```
src/projects/{project-name}/
├── project.config.ts          # Metadata, routes, header/footer references
├── styles.css                 # Project theme: colors, fonts, animations
├── components/                # Extended core components (optional)
├── sections/
│   ├── Header.tsx             # Persistent across all pages
│   ├── Footer.tsx             # Persistent across all pages
│   ├── HeroSection.tsx
│   ├── FeaturesSection.tsx
│   └── ...
└── pages/
    ├── Home.tsx               # Composes sections
    ├── About.tsx
    └── ...
```

---

## 5. Component Rules

- **Sections are self-contained.** No props. All content is hardcoded inside the component.
- **Pages are compositions.** They only import and arrange sections. No logic in pages.
- **Header and Footer are persistent** — rendered by ProjectShell, not by pages.
- **All interactive elements MUST work**: mobile menus, modals, tabs, accordions, forms (with `e.preventDefault()`).
- **No placeholder content.** Use realistic, professional copy relevant to the project context.

---

## 6. Section Code Rules

### Every section MUST:
1. Be a standalone `.tsx` file in `sections/`
2. Export a default function component
3. Be fully responsive (mobile → tablet → desktop)
4. Use semantic HTML (`<section>`, `<nav>`, `<article>`, not `<div>` soup)
5. Have working interactivity (no dead buttons)
6. Use Tailwind classes exclusively (no inline styles except dynamic values)

### Sections should use core components:
```tsx
import { Button } from '@/core/ui/Button'
import { Card } from '@/core/ui/Card'
import { Input } from '@/core/ui/Input'
```

### Section structure pattern:
```tsx
export default function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <section className="px-4 py-24 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section content */}
      </div>
    </section>
  )
}
```

---

## 7. Page Code Rules

Pages are **simple compositions** of sections:

```tsx
// pages/Home.tsx
import HeroSection from '../sections/HeroSection'
import FeaturesSection from '../sections/FeaturesSection'
import TestimonialsSection from '../sections/TestimonialsSection'
import CtaSection from '../sections/CtaSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}
```

**Rules:**
- No logic in pages — only section imports and ordering
- No wrapper elements needed (ProjectShell handles Header/Footer)

---

## 8. Header Rules

- Always includes logo/brand name and navigation links
- Must have working mobile menu (hamburger → slide-over drawer from right, NOT dropdown)
- Navigation links must use `<Link to="...">` from react-router-dom
- Links should match pages defined in `project.config.ts`
- **Active nav state is REQUIRED** — current page link must be visually highlighted (accent color, underline, or bold)
- Sticky/fixed positioning is welcome but optional

---

## 9. Footer Rules

- Company info, navigation links, social links
- Copyright with dynamic year: `{new Date().getFullYear()}`
- Can be simple or multi-column depending on project style

---

## 10. Anti-Patterns (NEVER do these)

- ❌ Use `<img>` without `alt`
- ❌ Use `px` values for spacing — use Tailwind spacing (`p-4`, `m-8`)
- ❌ Use `100vh` — use `min-h-screen`
- ❌ Store JSX in objects: `{ icon: <FaStar /> }` → use `{ icon: FaStar }` and render as `<item.icon />`
- ❌ Use `class` — use `className`
- ❌ Use Lorem Ipsum — use realistic professional copy
- ❌ Create static "dummy" buttons that do nothing
- ❌ Use `key={index}` in lists — use unique identifiers
- ❌ Make sections depend on props — all content is hardcoded
- ❌ Use emoji as icons or decorative elements — they look cheap and unprofessional
- ❌ Use inline SVG icons — use `lucide-react` library instead
- ❌ Mix icon libraries in one section — stick to `lucide-react` as primary
- ❌ Mix design styles within one project — keep it cohesive
- ❌ Use gradient fade at bottom of sections (`bg-gradient-to-t from-white to-transparent`) — eats bottom content, makes it unreadable
- ❌ Use hardcoded RGBA/hex colors in CSS animation classes — use `var()` so colors follow the theme
- ❌ Forget `useEffect` cleanup — always return cleanup functions for event listeners, timers, `requestAnimationFrame`, IntersectionObserver
- ❌ Leave empty gaps in bento/grid layouts — plan the grid so every cell is filled
- ❌ Use wave/divider decorations with mismatched colors — the wave fill color must exactly match the adjacent section's background
- ❌ Make scroll-to-top button with dark bg (`bg-foreground`) — invisible on dark sections. Use `bg-card text-foreground border` for universal visibility
- ❌ Open modals/drawers/slideovers/sheets without locking body scroll — ALWAYS disable body scroll when overlay is open (`document.body.style.overflow = 'hidden'` on open, restore on close). Without this, users can scroll the page behind the overlay.
- ❌ Forget active nav state — current page link in Header MUST be visually highlighted at all times

---

## 11. Responsive Design Requirements

Every section MUST work on all breakpoints:

### Mobile (< 640px)
- Single column layout
- Hamburger menu for Header
- Full-width buttons
- `text-base` to `text-lg` body, `text-2xl` to `text-4xl` headings
- Touch targets minimum 44x44px

### Tablet (640px - 1024px)
- 2-column grids
- May show full menu or hamburger
- `text-lg` body, `text-4xl` to `text-5xl` headings

### Desktop (> 1024px)
- Full layout (3-4 columns)
- Full horizontal navigation
- `text-lg` to `text-xl` body, `text-5xl` to `text-7xl` headings

**Always mobile-first:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
```

---

## 12. Accessibility Requirements

- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- `aria-label` on icon-only buttons
- `aria-expanded` on toggle buttons
- Proper focus states: `focus:ring-2 focus:ring-primary`
- Keyboard navigable interactive elements
- WCAG AA color contrast (minimum 4.5:1)
- `alt` text on all images

---

## 13. Animation Performance

### Do:
- Use `transform` and `opacity` for animations (GPU accelerated)
- Use `will-change` for elements that will animate
- Use `requestAnimationFrame` for custom animations
- Debounce scroll and resize events
- Use CSS animations for simple effects
- Respect `prefers-reduced-motion`

### Don't:
- Avoid animating `width`, `height`, `top`, `left` (forces reflow)
- Don't animate too many elements simultaneously
- Don't use inline styles for animations when possible

```tsx
// ✅ Good — GPU accelerated
<motion.div animate={{ x: 100, opacity: 0.5, scale: 1.2 }} />

// ❌ Bad — forces reflow
<motion.div animate={{ width: 100, height: 100 }} />

// ✅ Use will-change
<div className="will-change-transform hover:scale-105" />
```

### Reduced motion support:
```tsx
import { useReducedMotion } from 'framer-motion'

const Component = () => {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      animate={{ x: shouldReduceMotion ? 0 : 100 }}
      transition={{ duration: shouldReduceMotion ? 0 : 1 }}
    />
  )
}
```

---

## 14. Technical Quality Checklist

Verify before outputting generated code:

- [ ] All sections are self-contained (no props)
- [ ] Pages only compose sections (no logic)
- [ ] Header has working mobile menu (slide-over drawer, not dropdown)
- [ ] All interactive elements functional (buttons, modals, tabs, accordions)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Semantic HTML used (`section`, `nav`, `article`, not div soup)
- [ ] Accessibility attributes present (`aria-label`, `aria-expanded`, `alt`)
- [ ] No console errors
- [ ] Proper imports (no unused)
- [ ] All `useEffect` hooks have proper cleanup (event listeners, timers, rAF, observers)
- [ ] `styles.css` uses `html[data-project="xxx"]` selector (not just `[data-project]`)
- [ ] No hardcoded hex/rgba colors anywhere in TSX files — only semantic classes
- [ ] No hardcoded colors in CSS animation utility classes — use `var()` references
- [ ] Core components used where applicable (`Button`, `Card`, `Input` from `@/core/ui/`)
- [ ] Only `lucide-react` icons, one library per section
- [ ] Dynamic year in footer: `{new Date().getFullYear()}`
- [ ] Mobile menu uses `<Link to="...">` matching `project.config.ts` pages
- [ ] Wave/divider SVG fill colors match adjacent section backgrounds exactly
- [ ] All grid cells filled (no empty gaps in bento/grid layouts)
- [ ] Active nav state — current page highlighted in Header navigation
- [ ] Body scroll locked when any modal/drawer/slideover/sheet is open

---

**OUTPUT FORMAT**: Return complete `.tsx` files with all imports. One file at a time or as requested.
