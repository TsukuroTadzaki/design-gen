# Creative Effects Catalog

Parametric visual effect system for Design Generator v2. Each effect is a base type with configurable parameters. Phase 2 assigns effects with parameters in plan.json. Phase 3 implements using code examples below.

**Rule:** Every section MUST have at least ONE effect. Hero and CTA sections should have 2-3.

**Structure:** 12 base effects with parameters. New variations are parameter combinations, NOT separate effects.

---

## plan.json Format

```json
{
  "id": "home-hero",
  "pattern_id": "H-01",
  "effects": [
    { "type": "BACKGROUND-PATTERN", "variant": "grid", "opacity": 0.04, "animate": true },
    { "type": "3D-TRANSFORM", "target": "image", "trigger": "static", "axis": "Y", "angle": 5 },
    { "type": "REVEAL-ANIMATION", "variant": "stagger-fade-up", "stagger": 0.1 }
  ]
}
```

---

## 1. BACKGROUND-PATTERN

Subtle repeating patterns behind content. Adds texture to flat backgrounds.

**Parameters:** variant (grid|dots|cross-grid|lines|noise|hexagon), opacity (0.02-0.1), scale (px), animate (bool), color (foreground|primary|accent)

```tsx
// Dot grid
<div className="absolute inset-0 pointer-events-none" style={{
  backgroundImage: 'radial-gradient(circle, var(--foreground) 1px, transparent 1px)',
  backgroundSize: '24px 24px', opacity: 0.04,
}} />

// Cross grid, animated
<div className="absolute inset-0 pointer-events-none animate-grid-drift" style={{
  backgroundImage: 'linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)',
  backgroundSize: '32px 32px', opacity: 0.03,
}} />
// @keyframes grid-drift { 0% { background-position: 0 0; } 100% { background-position: 32px 32px; } }

// Noise texture
<div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
}} />
```

**Styles:** grid/dots → Modern, Corporate, Hi-Tech. noise → Retro, Warm Organic, Loft.

---

## 2. GRADIENT-LAYER

Colored gradient layers with blend modes creating depth.

**Parameters:** variant (mesh|radial-orbs|linear-sweep|spotlight), colors (primary/accent/secondary), blend (multiply|screen|normal), animate (none|float|pulse), opacity (0.1-0.5)

```tsx
// Mesh gradient (3 layers)
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/15" />
  <div className="absolute inset-0 bg-gradient-to-tl from-secondary/15 via-transparent to-primary/10 mix-blend-multiply" />
</div>

// Floating radial orbs
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  <div className="absolute -top-1/2 -left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl animate-float-slow" />
  <div className="absolute -bottom-1/3 -right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-accent/15 to-transparent blur-3xl animate-float-reverse" />
</div>
// @keyframes float-slow { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-30px) scale(1.05); } }
```

**Styles:** Modern, Glassmorphism, Warm Organic. NOT: Brutalist, Minimalist.

---

## 3. FLOATING-ELEMENTS

Animated elements — badges, notifications, shapes, contextual items.

**Parameters:** variant (orbs|badges|icons|notifications|shapes|perspective-grid), count (2-6), position (around-content|inside-image|background|corners), animation (float|pulse|stagger-appear|slide-in-out), content (text/icon array)

```tsx
// Trust badges floating around image
<div className="absolute -top-3 -right-3 animate-float z-20">
  <div className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">15+ years</div>
</div>

// Notification cards cycling inside a mockup
const notifications = [
  { icon: CheckCircle, text: "Project launched", color: "text-green-500" },
  { icon: TrendingUp, text: "+250% conversion", color: "text-blue-500" },
]
const [idx, setIdx] = useState(0)
useEffect(() => { const t = setInterval(() => setIdx(p => (p+1) % notifications.length), 3000); return () => clearInterval(t) }, [])

<div className="absolute top-4 right-4 w-48">
  <AnimatePresence mode="popLayout">
    <motion.div key={notifications[idx].text}
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      className="bg-card/95 backdrop-blur border border-border rounded-lg px-3 py-2 flex items-center gap-2 shadow-lg text-xs">
      <notifications[idx].icon className={`w-4 h-4 ${notifications[idx].color}`} />
      <span>{notifications[idx].text}</span>
    </motion.div>
  </AnimatePresence>
</div>

// Perspective shape grid (tech companies)
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {[...Array(12)].map((_, i) => {
    const row = Math.floor(i / 4), col = i % 4
    const scale = 1 - row * 0.25
    return <div key={i} className="absolute rounded-lg bg-primary" style={{
      width: `${80*scale}px`, height: `${60*scale}px`,
      left: `${10+col*14}%`, top: `${20+row*22}%`,
      opacity: 0.15 - row*0.04,
      transform: `perspective(800px) rotateY(${-15+col*8}deg)`,
    }} />
  })}
</div>
```

**Match variant to business:** SaaS→notifications, e-commerce→badges, restaurant→icons, tech→perspective-grid.

---

## 4. 3D-TRANSFORM

Perspective transformations creating depth.

**Parameters:** target (image|card|element), trigger (static|hover|scroll|cursor-follow), axis (X|Y|XY), angle (3-30deg), perspective (500-2000px), direction (left|right|center|cursor)

```tsx
// Static hero image rotation
<div style={{ perspective: '1000px' }}>
  <img src="..." className="rounded-2xl shadow-2xl"
    style={{ transform: 'rotateY(-5deg) scale(1.02)', transformOrigin: 'right center' }} />
</div>

// Hover tilt card (cursor-follow)
const TiltCard = ({ children, className, maxAngle = 10 }) => {
  const ref = useRef(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const rotateX = useTransform(useSpring(y), [-0.5, 0.5], [`${maxAngle}deg`, `-${maxAngle}deg`])
  const rotateY = useTransform(useSpring(x), [-0.5, 0.5], [`-${maxAngle}deg`, `${maxAngle}deg`])
  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX-r.left)/r.width-0.5); y.set((e.clientY-r.top)/r.height-0.5)
  }
  return <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={() => {x.set(0);y.set(0)}}
    style={{ rotateX, rotateY, transformStyle:"preserve-3d", perspective:1000 }} className={className}>
    <div style={{ transform:"translateZ(30px)" }}>{children}</div>
  </motion.div>
}
```

**Styles:** Modern, Glassmorphism, Hi-Tech, Bento. NOT: Minimalist, Brutalist.

---

## 5. PARALLAX

Elements at different scroll speeds.

**Parameters:** target (background|element|multi-layer), speed (0.1-0.5), direction (vertical|horizontal)

```tsx
const ref = useRef(null)
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])

<section ref={ref} className="relative overflow-hidden">
  <motion.div style={{ y }} className="absolute inset-0">
    <img src="..." className="w-full h-[130%] object-cover" />
    <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
  </motion.div>
  <div className="relative z-10">{/* Content */}</div>
</section>
```

**Max 1-2 parallax sections per page.** Styles: Photographic, Warm Organic, Modern.

---

## 6. REVEAL-ANIMATION

How content appears on viewport entry.

**Parameters:** variant (fade-up|fade-down|slide-left|slide-right|scale|clip-path|blur), stagger (0-0.3s), duration (0.3-1.0s), distance (20-50px)

```tsx
// Staggered fade-up (most common)
<motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
  variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
  {items.map(item => (
    <motion.div key={item.id} variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }}>{/* Card */}</motion.div>
  ))}
</motion.div>

// Clip-path wipe for images
<motion.div initial={{ clipPath: "inset(0 100% 0 0)" }}
  whileInView={{ clipPath: "inset(0 0 0 0)" }} viewport={{ once: true }}
  transition={{ duration: 0.8, ease: "easeInOut" }}>
  <img src="..." className="w-full rounded-xl" />
</motion.div>

// Scale + blur reveal
<motion.div initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
  viewport={{ once: true }} transition={{ duration: 0.6 }} />
```

**Styles:** All. Use stagger for grids, clip-path for images, scale for hero.

---

## 7. TEXT-EFFECT

Typography treatments for headings.

**Parameters:** variant (gradient-animated|outlined|split-reveal|typewriter|highlight), animate (bool), colors (gradient stops), speed (seconds)

```tsx
// Animated gradient text
<h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
  {heading}
</h1>
// @keyframes gradient-shift { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }

// Outlined watermark text
<span className="text-[10rem] md:text-[16rem] font-black pointer-events-none select-none"
  style={{ WebkitTextStroke: '1px var(--primary)', color: 'transparent', opacity: 0.05 }}>
  SERVICES
</span>

// Word-by-word reveal
const SplitText = ({ text, className }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
    variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    className={`flex flex-wrap gap-x-3 ${className}`}>
    {text.split(' ').map((word, i) => (
      <motion.span key={i} variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12 } }
      }}>{word}</motion.span>
    ))}
  </motion.div>
)
```

**Styles:** gradient → Modern, Hi-Tech. outlined → Brutalist, Editorial. split-reveal → Editorial, Modern.

---

## 8. HOVER-EFFECT

Interactive feedback on hover.

**Parameters:** variant (lift|glow|border-reveal|magnetic|ripple|arrow-shift), target (card|button|image), intensity (subtle|medium|strong)

```tsx
// Card with corner accents + bottom line + gradient overlay
<div className="group relative overflow-hidden rounded-xl bg-card p-6 border border-border transition-all hover:border-accent/50 hover:shadow-lg">
  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
  <div className="relative z-10">{children}</div>
  <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-500" />
</div>

// CTA button with arrow shift
<Button className="group px-8 py-5 text-lg font-semibold">
  Discuss project
  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
</Button>

// Magnetic button
const MagneticButton = ({ children, className }) => {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  return <motion.button ref={ref}
    onMouseMove={(e) => { const r=ref.current.getBoundingClientRect(); setPos({x:(e.clientX-(r.left+r.width/2))*0.2, y:(e.clientY-(r.top+r.height/2))*0.2}) }}
    onMouseLeave={() => setPos({x:0,y:0})} animate={pos}
    transition={{ type:"spring", stiffness:150, damping:15 }} className={className}>{children}</motion.button>
}
```

**Styles:** lift → All. glow → Hi-Tech, Glassmorphism. border-reveal → Modern, Corporate. magnetic → Modern. arrow-shift → All.

---

## 9. SCROLL-DRIVEN

Effects controlled by scroll position.

**Parameters:** variant (progress-bar|sticky-content|counter|color-shift), target (page|section|element)

```tsx
// Progress bar
const { scrollYProgress } = useScroll()
<motion.div style={{ scaleX: scrollYProgress }}
  className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent origin-left z-50" />

// Counter on viewport entry
const CountUp = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null), started = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true; let s=0; const step=target/(2*60)
        const t = setInterval(() => { s+=step; if(s>=target){setCount(target);clearInterval(t)} else setCount(Math.floor(s)) }, 1000/60)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// Sticky left + scrolling right
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
  <div className="lg:sticky lg:top-24 lg:self-start">{/* Fixed */}</div>
  <div className="space-y-12">{/* Scrolling content */}</div>
</div>
```

---

## 10. DECORATIVE-ELEMENT

Static or animated decorative additions.

**Parameters:** variant (corner-accents|divider-line|watermark-text|quote-marks|accent-line|badge-ribbon), position (custom), animate (bool)

```tsx
// Quote marks for testimonials
<svg className="absolute -top-2 -left-2 w-12 h-12 text-accent/20" viewBox="0 0 24 24" fill="currentColor">
  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
</svg>

// Section label with accent line
<div className="flex items-center gap-3 mb-6">
  <div className="h-px w-8 bg-accent" />
  <span className="text-xs font-semibold uppercase tracking-wider text-accent">Our Services</span>
</div>

// Large background watermark
<div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
  <span className="text-[10rem] md:text-[16rem] font-black text-foreground/[0.02] leading-none">SERVICES</span>
</div>
```

---

## 11. CURSOR-EFFECT

Effects responding to cursor position.

**Parameters:** variant (glow|spotlight|trail), radius (100-400px), color (primary|accent), opacity (0.05-0.2)

```tsx
const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
const sectionRef = useRef(null)
useEffect(() => {
  const h = (e) => { if(!sectionRef.current) return; const r=sectionRef.current.getBoundingClientRect(); setMousePos({x:e.clientX-r.left, y:e.clientY-r.top}) }
  sectionRef.current?.addEventListener('mousemove', h)
  return () => sectionRef.current?.removeEventListener('mousemove', h)
}, [])

<section ref={sectionRef} className="relative overflow-hidden">
  <div className="absolute rounded-full pointer-events-none transition-all duration-300" style={{
    left: mousePos.x-150, top: mousePos.y-150, width: 300, height: 300,
    background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', opacity: 0.08, filter: 'blur(40px)',
  }} />
  <div className="relative z-10">{/* Content */}</div>
</section>
```

**Styles:** Hi-Tech, Glassmorphism. NOT: Warm Organic, Retro, Classic.

---

## 12. SECTION-TRANSITION

How sections connect to each other.

**Parameters:** variant (wave|angle|overlap|gradient-fade|clean-cut), direction (top|bottom), height (40-120px), color (next section bg)

```tsx
// Wave divider
<div className="absolute bottom-0 left-0 right-0 pointer-events-none">
  <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-12 md:h-16">
    <path d="M0,50 C360,100 720,0 1080,50 C1260,80 1380,60 1440,50 L1440,100 L0,100 Z" fill="var(--background)" />
  </svg>
</div>

// Angled divider
<div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
  style={{ clipPath: 'polygon(0 100%, 100% 40%, 100% 100%)' }}>
  <div className="w-full h-full bg-background" />
</div>
```

**Styles:** wave → Warm Organic, Scandinavian. angle → Loft, Modern. clean-cut → Minimalist, Brutalist, Corporate, E-commerce.

---

## Compatibility Matrix

| Effect | Modern | Hi-Tech | Warm Organic | Brutalist | Minimalist | Glass | E-commerce | Corporate |
|---|---|---|---|---|---|---|---|---|
| BG-PATTERN | dots,grid | grid,lines | noise | lines | dots(subtle) | dots | dots | dots,grid |
| GRADIENT-LAYER | mesh,orbs | spotlight | mesh | - | - | mesh,orbs | - | spotlight |
| FLOATING-ELEM | badges | shapes | icons | - | - | orbs | badges | badges |
| 3D-TRANSFORM | hover,static | hover | - | - | - | hover | - | static(subtle) |
| PARALLAX | bg | element | bg | - | - | multi | - | - |
| REVEAL-ANIM | fade-up | clip-path | fade-up | clip-path | fade(subtle) | scale | fade-up | fade-up |
| TEXT-EFFECT | gradient | gradient | - | outlined | - | gradient | - | - |
| HOVER-EFFECT | lift,border | glow | lift | color-shift | subtle | glow,lift | lift | lift,border |
| SCROLL-DRIVEN | counter | counter | counter | - | sticky | counter | counter | counter |
| DECORATIVE | accent-line | - | quotes | watermark | - | - | ribbon | accent-line |
| CURSOR-EFFECT | - | glow | - | - | - | glow | - | - |
| SECTION-TRANS | clean-cut | clean-cut | wave | clean-cut | clean-cut | gradient | clean-cut | clean-cut |

---

## Assignment Rules for Phase 2

**Minimum per section type:**
- Hero: 2-3 effects (BG + REVEAL + one of: 3D/FLOATING/TEXT)
- Features/Services: 1-2 (REVEAL + HOVER)
- Testimonials: 1-2 (BG-PATTERN:noise or DECORATIVE:quotes + REVEAL)
- Stats: 1-2 (SCROLL-DRIVEN:counter + REVEAL)
- CTA: 1-2 (GRADIENT-LAYER + HOVER:magnetic or arrow-shift)
- FAQ: 1 (REVEAL:stagger)
- How It Works: 1-2 (REVEAL:stagger + optional DECORATIVE)
- Footer: 0-1 (optional subtle BG-PATTERN)

**Never combine:**
- Two CURSOR-EFFECTs on same section
- 3D-TRANSFORM:cursor + CURSOR-EFFECT (both track cursor)
- PARALLAX + 3D-TRANSFORM:scroll (both use scrollYProgress)
- More than 3 effects total per section

**Cross-project variety:**
- Phase 2 MUST ensure hero effects differ between projects
- Same effect type OK if variant/parameters differ significantly
