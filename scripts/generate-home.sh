#!/bin/bash
set -e

PROJECT_ID=$1

if [ -z "$PROJECT_ID" ]; then
  echo "Usage: ./scripts/generate-home.sh {project-id}"
  exit 1
fi

PROJECT_DIR="src/projects/$PROJECT_ID"
OUTPUT_DIR="$PROJECT_DIR/output"
PLAN_FILE="$PROJECT_DIR/plan.json"

# Validate
if [ ! -f "$PLAN_FILE" ]; then
  echo "❌ $PLAN_FILE not found. Run Phase 2 first."
  exit 1
fi

# Create directories
mkdir -p "$OUTPUT_DIR/sections"
mkdir -p "$OUTPUT_DIR/pages"
mkdir -p "$OUTPUT_DIR/components"

echo "=== Design Generator v2 — Home Page Only ==="
echo "Project: $PROJECT_ID"
echo ""

ERRORS=0

# ──────────────────────────────────────────
# Helper: run claude -p and check result
# ──────────────────────────────────────────

generate() {
  local DESCRIPTION=$1
  local PROMPT=$2
  local OUTPUT_FILE=$3
  local FILE_TYPE=${4:-tsx}  # tsx or css

  if [ -f "$OUTPUT_FILE" ]; then
    echo "  ✅ $(basename $OUTPUT_FILE) (exists, skipping)"
    return 0
  fi

  echo "  ⏳ $DESCRIPTION..."

  claude -p "$PROMPT" 2>&1

  # Verify file was created
  if [ ! -f "$OUTPUT_FILE" ]; then
    echo "  ❌ $(basename $OUTPUT_FILE) — file not created"
    ERRORS=$((ERRORS + 1))
    return 1
  fi

  # Verify content is code, not description
  FIRST_LINE=$(head -1 "$OUTPUT_FILE" | tr -d '[:space:]')

  if [ "$FILE_TYPE" = "tsx" ]; then
    if ! echo "$FIRST_LINE" | grep -qE "^(import|export|const|//|'use|\"use|type|interface|/\*)"; then
      echo "  ⚠️  $(basename $OUTPUT_FILE) — output may not be valid code (first line: $FIRST_LINE)"
    fi
  fi

  echo "  ✅ $(basename $OUTPUT_FILE)"
  sleep 2  # Rate limit protection
  return 0
}

# ──────────────────────────────────────────
# STEP 1: styles.css
# ──────────────────────────────────────────

echo "── Step 1: Styles ──"

generate "styles.css" \
"Read $PLAN_FILE — extract style.tokens and the full style object.
Read $PROJECT_DIR/design.json — extract visual_direction.color_palette (all hex colors).
Read docs/TECH_GUIDE.md — section 3 (Project styles.css requirements).

Generate a complete styles.css file for project '$PROJECT_ID' with:
1. CSS variables scoped with html[data-project=\"$PROJECT_ID\"] selector
2. @theme inline block mapping variables to Tailwind color classes
3. Custom @keyframes (float, fade-in-up, shimmer, stagger)
4. Utility animation classes (.animate-float, .animate-fade-in-up, .stagger-1 through .stagger-6)
5. No hardcoded colors in animations — use var() references
6. Custom scrollbar matching project theme
7. Smooth scroll

Save the file to $OUTPUT_DIR/styles.css" \
"$OUTPUT_DIR/styles.css" \
"css"

# ──────────────────────────────────────────
# STEP 2: Header
# ──────────────────────────────────────────

echo ""
echo "── Step 2: Header ──"

generate "Header" \
"Read $PLAN_FILE — find the 'header' object (pattern_id, pattern_name, why).
Read $PROJECT_DIR/structure.json — find global.header (elements, cta_text, phone, behavior).
Read the header pattern description from docs/SECTION_PATTERNS.md (search for the pattern_id from plan.json).
Read $PLAN_FILE — extract style.tokens (border-radius, shadows, hover, buttons, etc.).
Read $PLAN_FILE — extract all page names and slugs from sections array for navigation links.
Read docs/TECH_GUIDE.md.
Read docs/LEARNED_RULES.md.
Read $OUTPUT_DIR/styles.css for CSS variable reference.

Generate Header.tsx implementing the pattern from plan.json.
Use ProjectLink from @/core/lib/project-context.tsx for all navigation — NOT Link from react-router-dom.
Use useProjectLocation for active nav state.
Apply all style tokens from plan.json.
Mobile menu must be slide-over Sheet from right.
Include any modals referenced in the header (callback form, etc).
Lock body scroll when mobile menu or modal is open.

Save to $OUTPUT_DIR/sections/Header.tsx" \
"$OUTPUT_DIR/sections/Header.tsx"

# ──────────────────────────────────────────
# STEP 3: Footer
# ──────────────────────────────────────────

echo ""
echo "── Step 3: Footer ──"

generate "Footer" \
"Read $PLAN_FILE — find the 'footer' object (pattern_id, pattern_name, why).
Read $PROJECT_DIR/structure.json — find global.footer (columns, cta).
Read the footer pattern description from docs/SECTION_PATTERNS.md.
Read $PLAN_FILE — extract style.tokens.
Read docs/TECH_GUIDE.md.
Read docs/LEARNED_RULES.md.

Generate Footer.tsx implementing the pattern.
Use ProjectLink for navigation links.
Dynamic year: {new Date().getFullYear()}.
Apply all style tokens.

Save to $OUTPUT_DIR/sections/Footer.tsx" \
"$OUTPUT_DIR/sections/Footer.tsx"

# ──────────────────────────────────────────
# STEP 4: Home sections only
# ──────────────────────────────────────────

echo ""
echo "── Step 4: Home Sections ──"

# Only home sections (id starts with "home-")
SECTION_IDS=$(cat "$PLAN_FILE" | python3 -c "
import json, sys
plan = json.load(sys.stdin)
for s in plan['sections']:
    if s['id'].startswith('home-'):
        print(s['id'])
")

TOTAL=$(echo "$SECTION_IDS" | wc -l | tr -d ' ')
CURRENT=0

for SECTION_ID in $SECTION_IDS; do
  CURRENT=$((CURRENT + 1))

  # Determine output filename
  FILE_NAME=$(python3 -c "
import json
plan = json.load(open('$PLAN_FILE'))
sections = plan['sections']
section = next(s for s in sections if s['id'] == '$SECTION_ID')
section_type = section['type']

# Check if this type appears multiple times
type_count = sum(1 for s in sections if s['type'] == section_type)

parts = '$SECTION_ID'.split('-')
if type_count > 1:
    name = ''.join(p.capitalize() for p in parts) + 'Section'
else:
    name = ''.join(p.capitalize() for p in parts[1:]) + 'Section'

print(name + '.tsx')
")

  # Extract effects for this section
  EFFECTS=$(python3 -c "
import json
plan = json.load(open('$PLAN_FILE'))
section = next(s for s in plan['sections'] if s['id'] == '$SECTION_ID')
effects = section.get('effects', [])
for e in effects:
    parts = [f\"type: {e['type']}\"]
    for k, v in e.items():
        if k != 'type':
            parts.append(f'{k}: {v}')
    print('- ' + ', '.join(parts))
")

  generate "[$CURRENT/$TOTAL] $SECTION_ID → $FILE_NAME" \
"Read $PLAN_FILE — find the section with id '$SECTION_ID'. Note its pattern_id, pattern_name, background, content_source, why, notes, and effects array.
Read the style.tokens from $PLAN_FILE.
Read the pattern description from docs/SECTION_PATTERNS.md — search for the pattern_id.
Read $PROJECT_DIR/design.json — find the content at the path specified in content_source.
Read docs/CREATIVE_EFFECTS.md — implementation code for each effect type.
Read docs/TECH_GUIDE.md.
Read docs/LEARNED_RULES.md.
Read $OUTPUT_DIR/styles.css for CSS variable reference.

## Creative Effects to Implement
$EFFECTS

Read docs/CREATIVE_EFFECTS.md for code examples of each effect type.
Implement ALL listed effects. A section without effects is a failure.
Effects are layered:
  Layer 1: Section background
  Layer 2: Background effects (BACKGROUND-PATTERN, GRADIENT-LAYER)
  Layer 3: Content (from pattern)
  Layer 4: Interactive effects (HOVER-EFFECT, CURSOR-EFFECT)
  Layer 5: Entry animations (REVEAL-ANIMATION)

Generate a complete React section component implementing the layout described in the pattern.
Apply ALL style tokens from plan.json (border-radius, shadows, card-style, buttons, hover, spacing).
Use the content from design.json — do NOT invent new content.
Background is specified in plan.json for this section — apply appropriate bg classes.
Use ProjectLink from @/core/lib/project-context.tsx for any navigation links.
Use double quotes for Ukrainian text with apostrophes.
Import UI components from @/core/ui/ (Button, Card, Dialog, Sheet, Accordion, Tabs, etc.).
Icons from lucide-react only.
If this is an inner page hero (not home-hero): make it compact (py-16 md:py-24, title + subtitle only).
If this section has dark/accent background: add visual texture, not flat solid color.
If CTA buttons reference forms: implement working Dialog/Sheet with form fields.
If using carousel: set fixed min-height on container.

Save to $OUTPUT_DIR/sections/$FILE_NAME" \
"$OUTPUT_DIR/sections/$FILE_NAME"

done

# ──────────────────────────────────────────
# STEP 5: Compose Home page only
# ──────────────────────────────────────────

echo ""
echo "── Step 5: Home Page ──"

PAGE_FILE="$OUTPUT_DIR/pages/Home.tsx"

generate "Home.tsx" \
"Read $PROJECT_DIR/structure.json — find the page with slug 'home', get its sections list (in order).
Look at the actual files in $OUTPUT_DIR/sections/ to match section IDs to file names.

Generate a page component named Home that:
- Imports each home section from '../sections/{FileName}'
- Renders them in order inside a <> </> fragment
- Has NO logic — only imports and JSX
- Does NOT import Header or Footer (ProjectShell handles those)
- Exports as default function

Save to $PAGE_FILE" \
"$PAGE_FILE"

# ──────────────────────────────────────────
# STEP 6: project.config.ts (home only)
# ──────────────────────────────────────────

echo ""
echo "── Step 6: Config ──"

generate "project.config.ts" \
"Read $PROJECT_DIR/design.json — get brand.name for project name.
Look at actual files in $OUTPUT_DIR/sections/ and $OUTPUT_DIR/pages/.

Generate project.config.ts that:
- Uses 'export default { ... }'
- Imports styles: import styles from './styles.css?inline'
- Imports Header from './sections/Header'
- Imports Footer from './sections/Footer'
- Imports Home from './pages/Home'
- Has routes array with single route: { path: '/', name: 'Home', component: Home }
- Exports: id, name, styles, Header, Footer, routes

Save to $OUTPUT_DIR/project.config.ts" \
"$OUTPUT_DIR/project.config.ts"

# ──────────────────────────────────────────
# SUMMARY
# ──────────────────────────────────────────

echo ""
echo "═══════════════════════════════════════"
echo "  Home page generation complete!"
echo "───────────────────────────────────────"
echo "  Sections: $(ls $OUTPUT_DIR/sections/*.tsx 2>/dev/null | wc -l | tr -d ' ') files"
echo "  Pages:    $(ls $OUTPUT_DIR/pages/*.tsx 2>/dev/null | wc -l | tr -d ' ') files"
echo "  Config:   $([ -f "$OUTPUT_DIR/project.config.ts" ] && echo '✅' || echo '⬜')"
echo "  Styles:   $([ -f "$OUTPUT_DIR/styles.css" ] && echo '✅' || echo '⬜')"
echo "  Errors:   $ERRORS"
echo "═══════════════════════════════════════"
echo ""
if [ $ERRORS -eq 0 ]; then
  echo "🎉 Preview: npm run dev → /project/$PROJECT_ID"
else
  echo "⚠️  $ERRORS errors. Re-run to retry failed sections (existing files are skipped)."
fi
