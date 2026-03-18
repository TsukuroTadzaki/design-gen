# Style Presets Catalog

Design style presets with concrete tokens for Design Generator v2. Each preset defines exact visual parameters that Phase 3 applies without interpretation.

**Usage:** Phase 2 selects ONE preset per project. All tokens from the selected preset are copied into `plan.json` and used as direct instructions for code generation.

**Rule:** Tokens are Tailwind-compatible values. No ambiguous descriptions — every token maps to a CSS class or value.

---

## SP-01: Modern Clean

**In one sentence:** Clean, contemporary style with soft shadows, rounded elements, and generous whitespace — professional without being sterile.

**Best for:** SaaS, IT companies, agencies, startups, medical services, fintech, consulting

**Tokens:**
- border-radius: `rounded-xl` (12px)
- shadows: `shadow-lg` base, `shadow-xl` on hover
- heading-weight: `font-bold`
- heading-style: sans-serif (system or geometric sans like Inter, Plus Jakarta)
- body-weight: `font-normal`
- spacing: `py-16 md:py-24` (standard)
- card-style: `bg-card rounded-xl shadow-lg p-6 md:p-8`
- button-primary: `bg-accent text-white rounded-xl px-8 py-3 font-semibold`
- button-secondary: `border-2 border-primary text-primary rounded-xl px-8 py-3`
- hover-effect: `scale-[1.02]` + shadow increase
- hover-speed: `duration-300`
- decorative: subtle gradient mesh backgrounds, low-opacity geometric shapes
- backgrounds: `white → muted → white` alternation
- section-transitions: clean-cut (background color change, no dividers)
- color-approach: neutral base + one vibrant primary + contrasting accent for CTA

**NEVER use with this style:** textured backgrounds, heavy borders, mono fonts, sharp corners, aggressive animations, ornamental elements

**Visual marker:** Rounded cards with soft shadows floating on clean white/gray background

---

## SP-02: Minimalist

**In one sentence:** Extreme minimalism — typography as the main visual element, near-zero decoration, maximum empty space.

**Best for:** design studios, architecture firms, premium brands, personal sites, galleries, luxury portfolios

**Tokens:**
- border-radius: `rounded-none` or `rounded-sm` (0-4px)
- shadows: `none` (only thin borders when separation needed)
- heading-weight: `font-light` or `font-bold` (contrasting extremes, never medium)
- heading-style: sans-serif with wide tracking (`tracking-wider` or `tracking-widest`)
- body-weight: `font-light`
- spacing: `py-24 md:py-32` (generous — 60%+ of viewport can be empty)
- card-style: `border border-border p-8` or no borders at all — content defines blocks
- button-primary: `bg-foreground text-background px-8 py-3` (color inversion)
- button-secondary: `border border-foreground text-foreground px-8 py-3`
- hover-effect: `opacity` change or animated underline
- hover-speed: `duration-200`
- decorative: none — typography IS the decoration
- backgrounds: `white → white` with thin border separators between sections
- section-transitions: thin `border-b border-border` line between sections
- color-approach: monochrome (black + white) with ONE single accent color used sparingly

**NEVER use with this style:** gradients, shadows, multiple colors, textures, decorative shapes, rounded-full buttons, busy layouts

**Visual marker:** Vast empty space, one accent color, typography does all the heavy lifting

---

## SP-03: Hi-Tech Dark

**In one sentence:** Dark interface with neon glows, monospace type, and dashboard/HUD aesthetics — feels like a control panel.

**Best for:** tech products, gaming, crypto, cybersecurity, developer tools, data platforms, AI products

**Tokens:**
- border-radius: `rounded-lg` (8px) or `rounded-none` for hardcore variant
- shadows: `none` for base, neon `shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]` on hover
- heading-weight: `font-bold` or `font-black`
- heading-style: monospace (`font-mono`) or geometric sans
- body-weight: `font-normal`
- spacing: `py-16 md:py-24` (standard)
- card-style: `bg-card/50 backdrop-blur border border-primary/20 rounded-lg p-6`
- button-primary: `bg-accent text-background rounded-lg px-8 py-3 font-mono uppercase tracking-wider`
- button-secondary: `border border-accent text-accent rounded-lg px-8 py-3 font-mono`
- hover-effect: neon glow intensify + `scale-[1.01]`
- hover-speed: `duration-200`
- decorative: scan lines, dot grids, circuit patterns, glowing borders, data-viz inspired elements
- backgrounds: `dark → darker → dark` with neon accent sections
- section-transitions: glowing line divider or hard cut
- color-approach: near-black base + 1-2 neon accents (cyan, green, purple)

**NEVER use with this style:** warm colors, serif fonts, organic shapes, paper textures, pastel palette, rounded-full anything, gentle animations

**Visual marker:** Dark background with glowing neon borders and monospace text

---

## SP-04: Glassmorphism

**In one sentence:** Frosted glass panels floating over colorful backgrounds — translucent, layered, and modern.

**Best for:** SaaS dashboards, fintech, modern apps, landing pages, creative tech, portfolio

**Tokens:**
- border-radius: `rounded-2xl` (16px)
- shadows: `shadow-xl`
- heading-weight: `font-semibold`
- heading-style: sans-serif (clean, geometric)
- body-weight: `font-normal`
- spacing: `py-16 md:py-24` (standard)
- card-style: `bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8 shadow-xl`
- button-primary: `bg-accent text-white rounded-xl px-8 py-3 font-semibold shadow-lg`
- button-secondary: `bg-white/10 backdrop-blur border border-white/20 text-white rounded-xl px-8 py-3`
- hover-effect: background opacity increase + shadow intensify
- hover-speed: `duration-300`
- decorative: vibrant gradient blobs behind glass panels, mesh gradients, floating orbs
- backgrounds: vibrant gradient base with glass panels on top
- section-transitions: glass panels float independently, no rigid section breaks
- color-approach: vibrant gradient backgrounds (purple→blue→pink) with white/frosted foreground

**NEVER use with this style:** solid opaque cards, heavy borders, dark text on dark bg without glass, textured backgrounds, serif fonts

**Visual marker:** Semi-transparent cards with blur effect over colorful gradient backgrounds

---

## SP-05: Soft 3D

**In one sentence:** Soft extruded elements that look pressed into or raised from the surface — pillow-like depth without hard shadows.

**Best for:** wellness apps, productivity tools, personal dashboards, health tech, education platforms

**Tokens:**
- border-radius: `rounded-2xl` to `rounded-3xl` (16-24px)
- shadows: dual shadow `shadow-[8px_8px_16px_var(--shadow-dark),-8px_-8px_16px_var(--shadow-light)]`
- heading-weight: `font-semibold`
- heading-style: rounded sans-serif (Nunito, Poppins)
- body-weight: `font-normal`
- spacing: `py-16 md:py-24` (standard)
- card-style: `bg-muted rounded-2xl p-6 md:p-8 shadow-[8px_8px_16px_var(--shadow-dark),-8px_-8px_16px_var(--shadow-light)]`
- button-primary: `bg-accent text-white rounded-xl px-8 py-3 font-semibold shadow-[4px_4px_8px_var(--shadow-dark),-4px_-4px_8px_var(--shadow-light)]`
- button-secondary: inset shadow variant (pressed-in effect)
- hover-effect: shadow depth change (raised → pressed or vice versa)
- hover-speed: `duration-300`
- decorative: minimal — the 3D effect IS the decoration
- backgrounds: single muted color throughout (cards same color as bg, differentiated by shadow)
- section-transitions: subtle shadow depth change between sections
- color-approach: monochrome base (gray or pastel) with one accent; bg and cards share same hue

**NEVER use with this style:** flat design elements, hard drop shadows, sharp corners, dark backgrounds, high contrast borders, multiple background colors

**Visual marker:** Everything looks softly extruded from a uniform surface — same color bg and cards, depth from dual shadows only

---

## SP-06: Brutalist

**In one sentence:** Raw, unapologetic design with thick borders, sharp corners, and deliberate anti-beauty — function and honesty over polish.

**Best for:** creative agencies, art galleries, fashion, experimental brands, zines, indie projects

**Tokens:**
- border-radius: `rounded-none` (everything square)
- shadows: `shadow-[6px_6px_0px_0px_var(--foreground)]` (hard offset, no blur)
- heading-weight: `font-black`
- heading-style: monospace or grotesque sans, `uppercase tracking-wider`
- body-weight: `font-normal`
- spacing: irregular — intentional asymmetry, different padding between sections
- card-style: `border-2 border-foreground p-6` (no shadow, no radius)
- button-primary: `bg-foreground text-background px-8 py-4 uppercase tracking-wider font-bold`
- button-secondary: `border-2 border-foreground text-foreground px-8 py-4 uppercase tracking-wider`
- hover-effect: color invert (bg and text swap instantly)
- hover-speed: `duration-0` or `duration-100` (instant or near-instant)
- decorative: none — thick borders and huge type ARE the decoration
- backgrounds: solid color blocks with hard cuts between sections
- section-transitions: hard cut, no gradients or dividers
- color-approach: high contrast (black + white + one bold color). Or deliberately clashing colors.

**NEVER use with this style:** rounded corners, soft shadows, gradients, organic shapes, pastel colors, serif fonts, gentle hover effects, blur

**Visual marker:** Everything is square, thick black borders, hard offset shadows, huge uppercase type

---

## SP-07: Scandinavian

**In one sentence:** Light, airy, and warm — natural materials, muted colors, functional softness inspired by Nordic design tradition.

**Best for:** furniture, home goods, wellness, beauty, organic brands, cafes, yoga studios, family brands

**Tokens:**
- border-radius: `rounded-lg` (8px) — functional softness, not exaggerated
- shadows: `shadow-sm` (barely visible, warmth from color not depth)
- heading-weight: `font-semibold`
- heading-style: humanist sans-serif (clean but warm)
- body-weight: `font-normal`
- spacing: `py-20 md:py-28` (generous but not extreme)
- card-style: `bg-card rounded-lg border border-border p-6 md:p-8`
- button-primary: `bg-primary text-white rounded-lg px-8 py-3 font-medium`
- button-secondary: `bg-transparent border border-primary text-primary rounded-lg px-8 py-3`
- hover-effect: subtle background tint change
- hover-speed: `duration-300`
- decorative: minimal — natural material references (wood texture subtle bg, linen pattern)
- backgrounds: warm whites (`stone-50`, `orange-50`) alternating with pure white
- section-transitions: clean-cut with warm background alternation
- color-approach: warm neutral base (beige, cream, warm gray) + muted accent (sage, dusty blue, blush)

**NEVER use with this style:** dark backgrounds, neon colors, heavy shadows, thick borders, monospace fonts, complex animations, sharp corners, high saturation

**Visual marker:** Warm white/cream backgrounds, muted earth-tone accents, everything feels cozy and effortless

---

## SP-08: Warm Organic

**In one sentence:** Earthy, natural style with rounded shapes, serif headings, and warm tones — handcrafted and alive.

**Best for:** restaurants, cafes, bakeries, eco brands, wellness, handmade products, spas, florists, farms

**Tokens:**
- border-radius: `rounded-2xl` to `rounded-full` (16px to full pill shapes)
- shadows: `shadow-md` with warm tone
- heading-weight: `font-semibold`
- heading-style: serif (elegant but readable)
- body-weight: `font-normal` to `font-light`
- spacing: `py-20 md:py-32` (generous, breathing)
- card-style: `bg-card rounded-2xl shadow-md p-8 border border-border`
- button-primary: `bg-accent text-white rounded-full px-10 py-4 font-medium`
- button-secondary: `bg-transparent border border-primary text-primary rounded-full px-10 py-4`
- hover-effect: `scale-[1.03]` + warm shadow increase
- hover-speed: `duration-500` (slow, organic)
- decorative: organic blob shapes, subtle paper/grain textures at low opacity, hand-drawn line accents
- backgrounds: warm whites → cream → warm dark alternation
- section-transitions: organic wave SVG dividers or smooth gradient fades
- color-approach: warm earthy base (cream, beige, terracotta) + deep warm accent (forest green, burgundy, chocolate)

**NEVER use with this style:** sharp corners, mono fonts, neon colors, geometric grids, fast animations, dark tech aesthetics, flat design

**Visual marker:** Rounded everything, serif headings, warm earthy colors, organic wave dividers

---

## SP-09: Art Deco

**In one sentence:** Luxurious geometric elegance — black and gold, strong symmetry, bold condensed type, and decorative line work.

**Best for:** luxury brands, jewelry, premium restaurants, hotels, fashion, high-end real estate, event venues

**Tokens:**
- border-radius: `rounded-none` to `rounded-sm` (sharp or minimal)
- shadows: `shadow-2xl` (deep, dramatic)
- heading-weight: `font-bold`
- heading-style: condensed display font, `uppercase tracking-[0.2em]`
- body-weight: `font-light`
- spacing: `py-20 md:py-28` (generous, elegant)
- card-style: `bg-card border-2 border-accent/30 p-8 md:p-10`
- button-primary: `bg-accent text-background px-10 py-4 uppercase tracking-widest font-semibold`
- button-secondary: `border-2 border-accent text-accent px-10 py-4 uppercase tracking-widest`
- hover-effect: gold shimmer or brightness increase
- hover-speed: `duration-300`
- decorative: geometric line patterns (chevrons, sunbursts, zigzags), thin gold borders as frames, symmetrical ornaments
- backgrounds: deep dark base (black, navy, emerald) with gold/champagne accents
- section-transitions: decorative gold line dividers or geometric ornament separators
- color-approach: dark base (black/navy/emerald) + metallic accent (gold, champagne, silver)

**NEVER use with this style:** pastel colors, rounded-full shapes, casual fonts, emoji, playful elements, organic shapes, light backgrounds as dominant

**Visual marker:** Black background with gold geometric ornaments, condensed uppercase headings, strong symmetry

---

## SP-10: Classic Ornate

**In one sentence:** Rich, traditional elegance with ornamental details, serif typography, and a sense of historical grandeur.

**Best for:** law firms, museums, heritage brands, wine estates, classical music, traditional luxury, wedding venues

**Tokens:**
- border-radius: `rounded-lg` (subtle, not harsh)
- shadows: `shadow-xl` (deep, traditional)
- heading-weight: `font-semibold`
- heading-style: serif (traditional, high contrast strokes)
- body-weight: `font-normal`
- spacing: `py-20 md:py-28` (generous, dignified)
- card-style: `bg-card rounded-lg shadow-xl p-8 md:p-10 border border-accent/20`
- button-primary: `bg-accent text-white rounded-lg px-10 py-4 font-serif font-medium`
- button-secondary: `border-2 border-accent text-accent rounded-lg px-10 py-4 font-serif`
- hover-effect: subtle `brightness-110` + shadow deepen
- hover-speed: `duration-500` (slow, dignified)
- decorative: ornamental dividers, filigree line work, subtle damask or scroll patterns, decorative frames
- backgrounds: warm deep tones (burgundy, walnut, forest green) or cream/ivory light variant
- section-transitions: ornamental divider elements between sections
- color-approach: deep saturated base (burgundy, navy, forest) + gold/cream accent. Or ivory base + dark text + gold accents.

**NEVER use with this style:** mono fonts, neon colors, flat design, sharp brutalist borders, fast animations, tech aesthetics, asymmetric layouts

**Visual marker:** Serif headings, ornamental dividers, deep rich colors with gold accents, sense of tradition

---

## SP-11: Loft / Industrial

**In one sentence:** Raw industrial aesthetics — exposed structure, warm neutrals, mixed materials, and urban authenticity.

**Best for:** bars, breweries, coworking spaces, urban restaurants, barbershops, craft workshops, industrial products

**Tokens:**
- border-radius: `rounded-sm` to `rounded` (2-6px, minimal)
- shadows: `shadow-md` (moderate, grounded)
- heading-weight: `font-bold`
- heading-style: condensed sans-serif or slab-serif, sometimes mixed
- body-weight: `font-normal`
- spacing: `py-16 md:py-24` (standard, workman-like)
- card-style: `bg-card rounded-sm border-2 border-border p-6`
- button-primary: `bg-accent text-white rounded-sm px-8 py-3 font-bold uppercase tracking-wide`
- button-secondary: `border-2 border-foreground text-foreground rounded-sm px-8 py-3 uppercase`
- hover-effect: background darken + border color accent
- hover-speed: `duration-200`
- decorative: subtle brick or concrete texture overlays at very low opacity, exposed grid lines, stencil-style labels
- backgrounds: warm neutrals (beige, cream, warm gray) with occasional dark industrial sections
- section-transitions: thick border lines or raw-textured dividers
- color-approach: warm neutrals (brick, concrete, wood tones) + rust/copper/matte black accents

**NEVER use with this style:** glass effects, pastels, ornamental elements, serif fonts, rounded-full shapes, neon colors, delicate animations

**Visual marker:** Warm neutral base, thick borders, condensed uppercase type, industrial texture hints

---

## SP-12: Editorial

**In one sentence:** Typography-driven design where words are the hero — magazine-inspired layouts with bold type hierarchy and minimal visual noise.

**Best for:** media companies, blogs, content platforms, publishing, copywriters, journalists, personal brands, literary projects

**Tokens:**
- border-radius: `rounded-none` (editorial = sharp)
- shadows: `none`
- heading-weight: `font-black` (massive display headings, `text-6xl md:text-8xl`)
- heading-style: serif or high-contrast sans-serif
- body-weight: `font-normal`
- spacing: irregular — generous around headings, tighter in content areas
- card-style: `border-b border-border pb-6` (border bottom only, no box)
- button-primary: text link with animated underline, or minimal `border-b-2 border-foreground pb-1`
- button-secondary: text link with arrow `→`
- hover-effect: underline animation or color shift
- hover-speed: `duration-200`
- decorative: none — oversized typography, pull quotes, and whitespace create visual interest
- backgrounds: white or off-white, minimal variation. Occasional inverted (black bg) feature sections
- section-transitions: whitespace + thin rule lines (`border-b`)
- color-approach: primarily black text on white. One accent color for links and highlights only.

**NEVER use with this style:** cards with shadows, rounded corners, icons as primary elements, gradients, multiple accent colors, decorative shapes

**Visual marker:** Massive headline text (8xl+), sharp corners, no cards — content flows like a magazine page

---

## SP-13: Bento Grid

**In one sentence:** Dashboard-inspired grid layout with varied-size tiles — information-dense but organized, modern and dynamic.

**Best for:** tech startups, SaaS, platforms, portfolios, multi-product companies, data-driven businesses

**Tokens:**
- border-radius: `rounded-2xl` (16px)
- shadows: `shadow-sm` to `shadow-md`
- heading-weight: `font-bold`
- heading-style: sans-serif (clean, modern)
- body-weight: `font-normal`
- spacing: `py-12 md:py-16` (tighter than usual — grid handles rhythm)
- card-style: `bg-card rounded-2xl p-6 md:p-8 border border-border`
- button-primary: `bg-accent text-white rounded-xl px-6 py-3 font-semibold`
- button-secondary: `bg-muted text-foreground rounded-xl px-6 py-3`
- hover-effect: `scale-[1.02]` + border color change to accent
- hover-speed: `duration-200`
- decorative: the grid itself is decorative — varied tile sizes (1x1, 2x1, 1x2, 2x2) create visual interest
- backgrounds: neutral base, cards create the visual rhythm through size variation
- section-transitions: no traditional transitions — bento grid spans full sections
- color-approach: neutral base + accent on key tiles. Individual tiles can have colored backgrounds.

**NEVER use with this style:** uniform grids (all same size), full-width sections without grid, ornamental elements, serif fonts, traditional section stacking

**Visual marker:** Uneven grid tiles of different sizes, dashboard feel, each tile contains different content type

---

## SP-14: Photographic

**In one sentence:** Full-bleed photography as the primary design element — images tell the story, text is secondary and minimal.

**Best for:** real estate, travel, hotels, photography portfolios, automotive, fashion lookbooks, food/restaurant

**Tokens:**
- border-radius: `rounded-none` to `rounded-lg` (photos sharp, UI elements slightly rounded)
- shadows: `none` on photos, `shadow-lg` on overlaid UI cards
- heading-weight: `font-bold` to `font-black`
- heading-style: sans-serif, clean (text must not compete with photos)
- body-weight: `font-normal`
- spacing: photos full-bleed (`py-0`), text sections `py-16 md:py-24`
- card-style: overlay card on photo — `bg-background/90 backdrop-blur-sm rounded-lg p-6`
- button-primary: `bg-accent text-white rounded-lg px-8 py-3 font-semibold`
- button-secondary: `bg-white/20 backdrop-blur text-white border border-white/30 rounded-lg px-8 py-3`
- hover-effect: image zoom `scale-[1.05]` with `overflow-hidden`, overlay opacity shift
- hover-speed: `duration-500` (slow, cinematic)
- decorative: none — photography IS the decoration. Subtle overlays (gradient, dark) for text readability.
- backgrounds: alternating full-bleed photos and clean white/dark content sections
- section-transitions: photo → content → photo rhythm, no explicit dividers
- color-approach: derived from photo palette. Neutral UI colors (white, dark) that don't clash with any photo.

**NEVER use with this style:** heavy borders, icons as primary elements, text-heavy layouts without photos, busy backgrounds, decorative patterns over photos

**Visual marker:** Large full-bleed photographs dominating the layout, text minimal and overlaid or between photos

---

## SP-15: Retro / Vintage

**In one sentence:** Nostalgic aesthetics evoking mid-20th century design — aged paper, muted colors, ornamental type, and hand-crafted warmth.

**Best for:** barbershops, craft breweries, vintage shops, themed restaurants, bakeries, heritage brands, book stores

**Tokens:**
- border-radius: `rounded-sm` (minimal, period-appropriate)
- shadows: `shadow-sm` (subtle, warm-toned)
- heading-weight: `font-bold`
- heading-style: display serif or script, decorative — period-appropriate typeface
- body-weight: `font-normal`
- spacing: `py-16 md:py-24` (standard)
- card-style: `bg-card rounded-sm border-2 border-border p-6 md:p-8`
- button-primary: `bg-accent text-white rounded-sm px-8 py-3 font-bold uppercase tracking-wide`
- button-secondary: `border-2 border-accent text-accent rounded-sm px-8 py-3 uppercase`
- hover-effect: subtle color warm + background tint
- hover-speed: `duration-300`
- decorative: decorative frames, banner ribbons, vintage ornamental borders, subtle paper grain texture at low opacity
- backgrounds: parchment/cream base with occasional dark (sepia, brown) sections
- section-transitions: ornamental dividers, vintage rule lines, or decorative borders
- color-approach: sepia/cream base + muted desaturated accents (faded teal, dusty rose, aged gold)

**NEVER use with this style:** neon colors, glass effects, modern sans-serif, clean minimalism, tech aesthetics, sharp geometric patterns

**Visual marker:** Aged cream/parchment colors, decorative serif type, vintage ornamental borders, everything feels warmly nostalgic

---

## SP-16: Bold Playful

**In one sentence:** High-energy, colorful design with oversized shapes, bold color blocks, and playful irreverence — fun and memorable.

**Best for:** kids brands, creative agencies, entertainment, gaming, food delivery, event companies, youth brands, pop-up shops

**Tokens:**
- border-radius: `rounded-2xl` to `rounded-full` (big, playful curves)
- shadows: `shadow-[4px_4px_0px_0px_var(--foreground)]` (hard offset, pop-art style)
- heading-weight: `font-black`
- heading-style: bold sans-serif, `uppercase`, sometimes rotated or skewed
- body-weight: `font-medium`
- spacing: `py-12 md:py-20` (tighter — energy, not elegance)
- card-style: `bg-card rounded-2xl border-2 border-foreground p-6 shadow-[4px_4px_0px_0px_var(--foreground)]`
- button-primary: `bg-accent text-white rounded-full px-8 py-4 font-black uppercase shadow-[3px_3px_0px_0px_var(--foreground)]`
- button-secondary: `bg-secondary text-secondary-foreground rounded-full px-8 py-4 font-bold`
- hover-effect: `rotate-1` or `rotate-2` + `scale-[1.05]` (playful movement)
- hover-speed: `duration-200` (snappy, energetic)
- decorative: large geometric shapes (circles, triangles), halftone dot patterns, confetti, stickers, bold color block backgrounds
- backgrounds: bold colored sections, never boring white — each section a different vibrant color
- section-transitions: hard color cuts, diagonal slashes, or wavy cartoon dividers
- color-approach: multiple saturated colors — primary + 2-3 bright secondaries. No muted tones.

**NEVER use with this style:** minimal aesthetic, serif fonts, monochrome, elegant spacing, subtle anything, corporate feeling, dark moody tones

**Visual marker:** Bright colored blocks, hard offset shadows, oversized shapes, everything feels like it's having fun

---

## SP-17: E-commerce Clean

**In one sentence:** Product-focused clean design optimized for browsing and buying — structured grids, clear hierarchy, and conversion-oriented UI.

**Best for:** online stores, marketplaces, product catalogs, comparison platforms, retail brands

**Tokens:**
- border-radius: `rounded-lg` (8px — product cards need structure)
- shadows: `shadow-sm` base, `shadow-md` on hover (not dramatic — products are the focus)
- heading-weight: `font-semibold`
- heading-style: sans-serif (clean, doesn't compete with product images)
- body-weight: `font-normal`
- spacing: `py-12 md:py-16` (compact — maximize product density)
- card-style: `bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow`
- button-primary: `bg-accent text-white rounded-lg px-6 py-3 font-semibold` (not too large — inline with products)
- button-secondary: `border border-primary text-primary rounded-lg px-6 py-3`
- hover-effect: card lift (`shadow-md`) + product image subtle zoom
- hover-speed: `duration-200`
- decorative: minimal — product images are the visuals. Badge system for sales/new/popular.
- backgrounds: white/light base with minimal variation. Occasional accent-bg for promo banners.
- section-transitions: clean-cut, simple header + grid pattern per section
- color-approach: neutral base (white/light gray) + brand primary for navigation + contrasting accent for CTA/price badges

**NEVER use with this style:** heavy textures, large decorative elements that compete with products, dark backgrounds for product grids, ornamental fonts, slow animations that delay browsing

**Visual marker:** Clean product grid with structured cards, price badges, "Add to cart" buttons — Amazon/Shopify-like clarity

---

## SP-18: Corporate Premium

**In one sentence:** Authoritative, trustworthy design for businesses where credibility is paramount — structured, conservative, polished.

**Best for:** law firms, financial advisors, insurance, medical practices, B2B enterprise, government, consulting firms

**Tokens:**
- border-radius: `rounded-lg` (8px — professional, not playful)
- shadows: `shadow-md` (present but restrained)
- heading-weight: `font-semibold`
- heading-style: serif for headings (trust, authority), sans-serif for body
- body-weight: `font-normal`
- spacing: `py-20 md:py-28` (generous — conveys stability and unhurried confidence)
- card-style: `bg-card rounded-lg shadow-md p-8 md:p-10 border border-border`
- button-primary: `bg-primary text-white rounded-lg px-10 py-4 font-medium`
- button-secondary: `border border-primary text-primary rounded-lg px-10 py-4`
- hover-effect: subtle `brightness-105` + shadow increase
- hover-speed: `duration-300`
- decorative: subtle geometric patterns (thin lines, dots) at very low opacity. Occasional gold/accent line accents.
- backgrounds: white → muted → dark (navy/charcoal) for contrast sections
- section-transitions: clean-cut with background change, or thin rule line
- color-approach: navy/charcoal primary + white base + one muted accent (gold, teal, or burgundy)

**NEVER use with this style:** bright colors, playful elements, cartoon-style, rounded-full buttons, fast animations, casual fonts, pop-art references, emoji

**Visual marker:** Serif headings on navy/white, structured layout, everything whispers "we are established and trustworthy"

---

## SP-19: Steampunk

**In one sentence:** Victorian-era meets industrial machinery — brass gears, aged metal, clockwork aesthetics, and mechanical wonder.

**Best for:** themed restaurants/bars, escape rooms, game projects, creative/unusual brands, watchmakers, mechanical workshops, themed entertainment

**Tokens:**
- border-radius: `rounded-sm` to `rounded` (period-appropriate, not modern)
- shadows: `shadow-lg` with warm-toned (bronze/sepia cast)
- heading-weight: `font-bold`
- heading-style: ornamental serif or slab-serif, sometimes decorative display font
- body-weight: `font-normal`
- spacing: `py-16 md:py-24` (standard)
- card-style: `bg-card rounded border-2 border-accent/40 p-6 md:p-8 shadow-lg`
- button-primary: `bg-accent text-background rounded px-8 py-3 font-bold uppercase tracking-wide border border-accent`
- button-secondary: `border-2 border-accent text-accent rounded px-8 py-3 uppercase tracking-wide`
- hover-effect: warm glow + slight gear rotation CSS animation
- hover-speed: `duration-500` (mechanical, deliberate)
- decorative: gear/cog SVG elements, brass pipe borders, riveted metal texture overlays, clockwork ornaments, steam/fog subtle overlays
- backgrounds: dark warm base (aged leather, dark wood tones) with brass/copper accent sections
- section-transitions: riveted metal strip dividers, gear-adorned ornamental separators
- color-approach: dark warm base (deep brown, aged leather) + metallic accents (brass #B8860B, copper #B87333, aged gold)

**NEVER use with this style:** modern minimalism, neon colors, glass effects, flat design, clean sans-serif, bright white backgrounds, contemporary tech aesthetic

**Visual marker:** Gears, brass/copper metallic elements, dark leather/wood backgrounds, Victorian machinery aesthetic

---

## Decorative Patterns Reference

Reusable decorative patterns that can be combined with any style preset. Phase 3 uses these as implementation reference.

### Background Patterns
| ID | Name | CSS Approach | Compatible Styles |
|---|---|---|---|
| BG-01 | Dot Grid | `bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]` | Modern, Minimalist, Corporate |
| BG-02 | Cross Grid | `bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]` | Hi-Tech, Bento, Corporate |
| BG-03 | Scanlines | `bg-[linear-gradient(transparent_2px,#000_2px)] bg-[length:100%_4px]` | Hi-Tech only |
| BG-04 | Noise Overlay | `before:content-[''] before:absolute before:inset-0 before:bg-noise before:opacity-[0.03]` | Retro, Loft, Warm Organic |
| BG-05 | Mesh Gradient | `bg-[radial-gradient(at_top_left,color1,transparent_50%),radial-gradient(at_bottom_right,color2,transparent_50%)]` | Modern, Glassmorphism, Soft 3D |
| BG-06 | Diagonal Stripes | `bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#00000005_10px,#00000005_20px)]` | Brutalist, Bold Playful |

### Border Decorations
| ID | Name | CSS Approach | Compatible Styles |
|---|---|---|---|
| BD-01 | Gradient Border | wrapper `p-[1px] bg-gradient-to-r from-color1 to-color2 rounded-xl` | Modern, Glassmorphism |
| BD-02 | Corner Accents | absolute positioned `border-t-2 border-l-2` on corners only | Minimalist, Corporate |
| BD-03 | Hard Offset | `shadow-[6px_6px_0px_0px_color]` | Brutalist, Bold Playful |
| BD-04 | Glowing Border | `shadow-[0_0_15px_rgba(color,0.5)] border border-color` | Hi-Tech, Glassmorphism |
| BD-05 | Double Border | `border-4 border-double border-color` | Classic Ornate, Art Deco |

### Interactive Effects
| ID | Name | Description | Compatible Styles |
|---|---|---|---|
| IX-01 | Tilt Effect | 3D card tilt following cursor position | Modern, Glassmorphism, Hi-Tech |
| IX-02 | Magnetic Hover | Elements subtly pull toward cursor | Modern, Bento |
| IX-03 | Cursor Follower | Glowing orb following mouse inside section | Hi-Tech, Glassmorphism |
| IX-04 | Ripple Click | Material-design ripple on button click | Modern, E-commerce |
| IX-05 | Hover Reveal | Hidden patterns appear on hover | Minimalist, Editorial |

### Typography Effects
| ID | Name | CSS Approach | Compatible Styles |
|---|---|---|---|
| TX-01 | Gradient Text | `bg-clip-text text-transparent bg-gradient-to-r` | Modern, Hi-Tech, Glassmorphism |
| TX-02 | Outlined Text | `-webkit-text-stroke: 1px; color: transparent` | Brutalist, Editorial, Bold Playful |
| TX-03 | Animated Underline | `bg-[length:0%_2px] hover:bg-[length:100%_2px] transition-all` | Minimalist, Editorial |
