# Design Generator v2 — Preview Runtime Setup

## Context

Before testing Phase 3 (code generation), we need a dev server that can display generated projects in the browser. This is a minimal Vite + React application that serves as a shell for viewing generated designs.

**This is NOT the generator itself** — it's the viewer. The generator is CLI commands. This app just renders the output.

## What it needs to do

1. Run `npm run dev` → open browser → see a project selector
2. Pick a project → see the full multi-page website with routing
3. Each project loads its own `styles.css` (colors, animations)
4. Header and Footer are persistent across pages
5. Navigation works between pages
6. Hot reload when files change (Vite default)

---

## Tech Stack

- **Vite** — dev server and bundler
- **React 19** + TypeScript
- **Tailwind CSS 4** — utility classes
- **React Router** — page routing
- **shadcn/ui** — base component library (Button, Card, Dialog, Sheet, Badge, Input, etc.)
- **lucide-react** — icons
- **framer-motion** — complex animations (optional per section)

---

## File Structure

```
design-generator-v2/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.css                    # Tailwind base import
├── index.html
│
├── src/
│   ├── main.tsx                    # App entry
│   ├── App.tsx                     # Router + project loading
│   ├── globals.css                 # Default theme variables (:root)
│   │
│   ├── core/                       # Shared infrastructure
│   │   ├── ui/                     # shadcn/ui components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Dialog.tsx
│   │   │   ├── Sheet.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Accordion.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Select.tsx
│   │   │   └── ... (other shadcn components as needed)
│   │   │
│   │   ├── components/
│   │   │   ├── ProjectShell.tsx     # Wraps project: loads styles, header, footer, routes
│   │   │   ├── ProjectSelector.tsx  # Landing page: pick a project to view
│   │   │   └── ScrollReveal.tsx     # IntersectionObserver wrapper for scroll animations
│   │   │
│   │   └── lib/
│   │       ├── utils.ts            # cn() helper, etc.
│   │       └── projects.ts         # Auto-discover projects via import.meta.glob
│   │
│   └── projects/                   # Generated projects live here
│       └── {project-id}/
│           └── output/
│               ├── project.config.ts
│               ├── styles.css
│               ├── sections/
│               ├── pages/
│               ├── components/
│               └── data/
│
├── docs/                           # Reference docs (already exist)
│   ├── STYLE_PRESETS.md
│   ├── SECTION_PATTERNS.md
│   ├── TECH_GUIDE.md
│   ├── DESIGN_PRINCIPLES.md
│   └── LEARNED_RULES.md
│
├── schemas/                        # JSON schemas (already exist)
├── prompts/                        # AI prompts (already exist)
└── .claude/
    └── commands/                   # CLI commands (already exist)
```

---

## Key Components

### 1. globals.css — Default Theme

Defines `:root` CSS variables that serve as fallbacks. Each project overrides these in its `styles.css`.

```css
:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --primary: #3b82f6;
  --primary-foreground: #ffffff;
  --secondary: #f1f5f9;
  --secondary-foreground: #0a0a0a;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
  --accent: #f59e0b;
  --accent-foreground: #ffffff;
  --card: #ffffff;
  --card-foreground: #0a0a0a;
  --border: #e2e8f0;
  --ring: #3b82f6;
  --radius: 0.75rem;
}
```

### 2. projects.ts — Auto-Discovery

Uses `import.meta.glob` to find all projects:

```typescript
// Discovers all project configs automatically
const projectConfigs = import.meta.glob(
  '../projects/*/output/project.config.ts',
  { eager: true }
)

export function getProjects() {
  return Object.entries(projectConfigs).map(([path, module]) => {
    const id = path.match(/projects\/(.+?)\/output/)?.[1]
    return { id, ...module.default }
  })
}
```

### 3. ProjectShell.tsx — Project Wrapper

Loads project-specific styles, renders Header + routes + Footer:

```typescript
interface ProjectShellProps {
  projectId: string
  config: ProjectConfig
}

export function ProjectShell({ projectId, config }: ProjectShellProps) {
  // Set data-project attribute on html for CSS variable scoping
  useEffect(() => {
    document.documentElement.setAttribute('data-project', projectId)
    return () => document.documentElement.removeAttribute('data-project')
  }, [projectId])

  // Import project styles.css
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `/src/projects/${projectId}/output/styles.css`
    document.head.appendChild(link)
    return () => { document.head.removeChild(link) }
  }, [projectId])

  return (
    <>
      <config.Header />
      <main>
        <Routes>
          {config.routes.map(route => (
            <Route key={route.path} path={route.path} element={<route.component />} />
          ))}
        </Routes>
      </main>
      <config.Footer />
    </>
  )
}
```

### 4. ProjectSelector.tsx — Landing Page

Simple grid of available projects. Shows project name, number of pages, style preset:

```
┌─────────────────────────────────────────┐
│         Design Generator v2              │
│         Select a project to preview      │
│                                          │
│  ┌───────────┐  ┌───────────┐           │
│  │  DiVotek  │  │  KavaBAR  │           │
│  │  11 pages │  │  4 pages  │           │
│  │  SP-01    │  │  SP-08    │           │
│  └───────────┘  └───────────┘           │
│  ┌───────────┐                          │
│  │  Barkas   │                          │
│  │  16 pages │                          │
│  │  SP-17    │                          │
│  └───────────┘                          │
└─────────────────────────────────────────┘
```

### 5. project.config.ts — Per-Project Config

Each generated project exports:

```typescript
import styles from './styles.css?inline'
import Header from './sections/Header'
import Footer from './sections/Footer'
import Home from './pages/Home'
import About from './pages/About'

export default {
  id: 'kava',
  name: 'KavaBAR',
  styles,
  Header,
  Footer,
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
    { path: '/menu', name: 'Menu', component: Menu },
    { path: '/contacts', name: 'Contacts', component: Contacts },
  ]
}
```

### 6. ScrollReveal.tsx — Animation Helper

IntersectionObserver wrapper for scroll-triggered CSS animations:

```typescript
export function ScrollReveal({ children, className, delay = 0 }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
```

---

## shadcn/ui Components to Include

Minimum set needed for generated sections:

| Component | Used for |
|---|---|
| Button | CTAs, form submits, navigation |
| Card (Card, CardHeader, CardContent, CardFooter) | Feature cards, service cards, testimonials |
| Dialog (Dialog, DialogTrigger, DialogContent) | Modals (callback, booking, contact forms) |
| Sheet (Sheet, SheetTrigger, SheetContent) | Mobile menu drawer, product detail drawers |
| Accordion (Accordion, AccordionItem, AccordionTrigger, AccordionContent) | FAQ sections |
| Tabs (Tabs, TabsList, TabsTrigger, TabsContent) | Menu filtering, feature categories |
| Badge | Labels, tags, status indicators |
| Input | Form fields |
| Textarea | Form message fields |
| Select | Dropdowns in forms |
| Separator | Visual dividers |

Install shadcn/ui components using the CLI or copy from shadcn/ui source. Configure with `@/core/ui/` import path.

---

## Routing Structure

```
/                           → ProjectSelector (pick project)
/project/{project-id}       → ProjectShell (loads project)
/project/{project-id}/      → Home page
/project/{project-id}/about → About page
/project/{project-id}/menu  → Menu page (KavaBAR)
/project/{project-id}/...   → Other pages from config
```

---

## Implementation Steps

```
1. Initialize Vite + React + TypeScript project
   - npm create vite@latest . -- --template react-ts
   - Install dependencies:
     npm install react-router-dom framer-motion lucide-react
     npm install -D tailwindcss @tailwindcss/vite

2. Configure Tailwind CSS 4
   - Add @tailwindcss/vite plugin to vite.config.ts
   - Create tailwind.css with @import "tailwindcss"
   - Import in main.tsx

3. Set up path aliases
   - tsconfig.json: "@/*" → "./src/*"
   - vite.config.ts: resolve.alias

4. Create globals.css with :root variables

5. Install and configure shadcn/ui components
   - Create src/core/ui/ folder
   - Add all components from the table above
   - Configure cn() utility in src/core/lib/utils.ts

6. Create core infrastructure:
   - src/core/lib/projects.ts (auto-discovery)
   - src/core/components/ProjectShell.tsx
   - src/core/components/ProjectSelector.tsx
   - src/core/components/ScrollReveal.tsx

7. Create App.tsx with routing:
   - / → ProjectSelector
   - /project/:id/* → ProjectShell

8. Create src/main.tsx entry point

9. Verify: npm run dev → opens ProjectSelector → no projects yet (empty state)

10. Create a test project manually to verify the shell works:
    - src/projects/test/output/project.config.ts
    - src/projects/test/output/styles.css
    - src/projects/test/output/sections/Header.tsx (minimal)
    - src/projects/test/output/sections/Footer.tsx (minimal)
    - src/projects/test/output/sections/HeroSection.tsx (minimal)
    - src/projects/test/output/pages/Home.tsx
    - Verify: navigate to /project/test → see the test project
```

---

## Verification Checklist

After setup, verify:
- [ ] `npm run dev` starts without errors
- [ ] ProjectSelector shows at `/`
- [ ] Test project appears in selector
- [ ] Clicking test project navigates to `/project/test`
- [ ] Project styles.css loads (CSS variables override :root)
- [ ] `html[data-project="test"]` attribute is set
- [ ] Header renders at top, Footer at bottom
- [ ] Page routing works (navigate between pages)
- [ ] shadcn/ui components render correctly (Button, Card, Dialog, Sheet, Accordion, Tabs)
- [ ] ScrollReveal triggers animations on scroll
- [ ] Hot reload works (edit a section → see change in browser)
- [ ] Mobile responsive (check hamburger menu area)

---

## After Setup

Once the preview runtime works:
1. Delete the manual test project
2. Start Phase 3 generation with `/generate-styles kava`
3. Generated files go into `src/projects/kava/output/`
4. Open browser → ProjectSelector → KavaBAR → see the result

---

## Future: CMS Integration

The current structure is designed to be CMS-compatible later:
- `project.config.ts` → becomes CMS template config
- `sections/` → become CMS template components
- `styles.css` → becomes CMS theme
- `design.json` → becomes CMS content source
- `plan.json` → becomes CMS template blueprint

When ready to integrate with CMS:
1. Generated templates work as-is in CMS (same React + Tailwind + shadcn stack)
2. Content moves from hardcoded to CMS-managed
3. styles.css becomes the CMS theme layer
4. Routing handled by CMS instead of React Router

This transition is purely mechanical — no redesign of generated code needed.
