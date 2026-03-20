# Task: Create Generation Orchestrator

## Problem

Manual generation via slash commands requires ~19 manual steps for KavaBAR (4 pages), ~40 for DiVotek, ~70 for Barkas. Each step: `/clear` → `/generate-section` → wait → repeat. This is unacceptably slow.

## Solution

A bash script that reads `plan.json` and generates all sections sequentially using `claude -p "..."`. Each call is an isolated session with clean context — equivalent to `/clear` + `/generate-section` but fully automated.

## Command

```bash
./scripts/generate.sh {project-id}
```

Or via slash command:
```
/generate-all {project-id}
```

The slash command runs the bash script.

## Script: scripts/generate.sh

### What it does

1. Reads `plan.json` to get the ordered list of sections
2. Checks what's already generated (skip existing files)
3. For each section: builds a prompt → calls `claude -p "..."` → saves output
4. After all sections: composes pages and generates project.config.ts
5. Shows summary

### Prompt Construction

For each section, the script builds a prompt by concatenating:

```
[Style tokens from plan.json]
+
[This section's info from plan.json]
+
[Pattern description from SECTION_PATTERNS.md]
+
[Content from design.json]
+
[TECH_GUIDE.md]
+
[LEARNED_RULES.md]
+
[Generation instructions]
```

The script extracts these pieces from files and assembles them into one prompt string.

### Implementation

```bash
#!/bin/bash
set -e

PROJECT_ID=$1
PROJECT_DIR="src/projects/$PROJECT_ID"
OUTPUT_DIR="$PROJECT_DIR/output"
PLAN_FILE="$PROJECT_DIR/plan.json"
DESIGN_FILE="$PROJECT_DIR/design.json"
STRUCTURE_FILE="$PROJECT_DIR/structure.json"

# Docs
TECH_GUIDE="docs/TECH_GUIDE.md"
LEARNED_RULES="docs/LEARNED_RULES.md"
PATTERNS="docs/SECTION_PATTERNS.md"

# Validate inputs exist
if [ ! -f "$PLAN_FILE" ]; then
  echo "❌ Error: $PLAN_FILE not found. Run Phase 2 first."
  exit 1
fi

if [ ! -f "$DESIGN_FILE" ]; then
  echo "❌ Error: $DESIGN_FILE not found. Run Phase 1 first."
  exit 1
fi

# Create output directories
mkdir -p "$OUTPUT_DIR/sections"
mkdir -p "$OUTPUT_DIR/pages"
mkdir -p "$OUTPUT_DIR/components"

# Read plan.json
PLAN=$(cat "$PLAN_FILE")
DESIGN=$(cat "$DESIGN_FILE")
STRUCTURE=$(cat "$STRUCTURE_FILE")
TECH=$(cat "$TECH_GUIDE")
RULES=$(cat "$LEARNED_RULES")
PATTERNS_DOC=$(cat "$PATTERNS")

# Extract style tokens from plan
STYLE_TOKENS=$(echo "$PLAN" | jq -r '.style.tokens | to_entries | map("\(.key): \(.value)") | join("\n")')
STYLE_PRESET_ID=$(echo "$PLAN" | jq -r '.style.preset_id')
STYLE_PRESET_NAME=$(echo "$PLAN" | jq -r '.style.preset_name')

echo "=== Design Generator v2 — Orchestrator ==="
echo "Project: $PROJECT_ID"
echo "Style: $STYLE_PRESET_ID $STYLE_PRESET_NAME"
echo ""

# Track progress
TOTAL=0
DONE=0
ERRORS=0

# ──────────────────────────────────────────
# STEP 1: Generate styles.css
# ──────────────────────────────────────────

STYLES_FILE="$OUTPUT_DIR/styles.css"
if [ -f "$STYLES_FILE" ]; then
  echo "✅ styles.css (already exists, skipping)"
else
  echo "⏳ Generating styles.css..."
  
  COLOR_PALETTE=$(echo "$DESIGN" | jq -r '.visual_direction.color_palette')
  
  PROMPT="You are generating a styles.css file for project '$PROJECT_ID'.

## Color Palette (from design.json)
$COLOR_PALETTE

## Style Tokens (from plan.json)
$STYLE_TOKENS

## Requirements (from TECH_GUIDE)
- CSS variables scoped with html[data-project=\"$PROJECT_ID\"] selector
- @theme inline block mapping variables to Tailwind classes
- Custom @keyframes for animations (float, fade-in-up, shimmer, stagger)
- Utility animation classes (.animate-float, .animate-fade-in-up, .stagger-1 through .stagger-6)
- No hardcoded colors in animation classes — use var() references
- Custom scrollbar matching project theme
- Smooth scroll (html { scroll-behavior: smooth })

## Output
Return ONLY the CSS code. No markdown fences, no explanation. Just the CSS."

  RESULT=$(claude -p "$PROMPT" 2>&1)
  
  # Remove potential markdown fences
  CLEAN=$(echo "$RESULT" | sed '/^```/d')
  
  echo "$CLEAN" > "$STYLES_FILE"
  echo "✅ styles.css generated"
fi

# ──────────────────────────────────────────
# STEP 2: Generate sections
# ──────────────────────────────────────────

# Build ordered list: header, footer, then all page sections
SECTIONS_ORDER=()

# Header first
SECTIONS_ORDER+=("header")
# Footer second  
SECTIONS_ORDER+=("footer")

# Then all sections from plan.json in order
SECTION_IDS=$(echo "$PLAN" | jq -r '.sections[].id')
for SID in $SECTION_IDS; do
  SECTIONS_ORDER+=("$SID")
done

TOTAL=${#SECTIONS_ORDER[@]}

echo ""
echo "Sections to generate: $TOTAL"
echo "─────────────────────────────────"

for SECTION_ID in "${SECTIONS_ORDER[@]}"; do
  
  # Determine file name
  if [ "$SECTION_ID" = "header" ]; then
    FILE_NAME="Header.tsx"
    SECTION_JSON=$(echo "$PLAN" | jq -r '.header')
    PATTERN_ID=$(echo "$SECTION_JSON" | jq -r '.pattern_id')
    CONTENT_SOURCE="structure.json → global.header"
    CONTENT=$(echo "$STRUCTURE" | jq -r '.global.header')
    SECTION_TYPE="header"
    SECTION_WHY=$(echo "$SECTION_JSON" | jq -r '.why')
    SECTION_NOTES=""
    SECTION_BG="dark"
    
    # Get all page names for navigation
    NAV_PAGES=$(echo "$PLAN" | jq -r '.sections | map(select(.id | startswith("home-") | not)) | map(select(.type == "hero")) | map(.id | split("-")[0]) | unique | join(", ")')
    EXTRA_CONTEXT="Navigation pages from plan.json: Home, $(echo "$STRUCTURE" | jq -r '.pages | map(.name) | join(", ")')"
    
  elif [ "$SECTION_ID" = "footer" ]; then
    FILE_NAME="Footer.tsx"
    SECTION_JSON=$(echo "$PLAN" | jq -r '.footer')
    PATTERN_ID=$(echo "$SECTION_JSON" | jq -r '.pattern_id')
    CONTENT_SOURCE="structure.json → global.footer"
    CONTENT=$(echo "$STRUCTURE" | jq -r '.global.footer')
    SECTION_TYPE="footer"
    SECTION_WHY=$(echo "$SECTION_JSON" | jq -r '.why')
    SECTION_NOTES=""
    SECTION_BG="dark"
    EXTRA_CONTEXT=""
    
  else
    # Regular section
    SECTION_JSON=$(echo "$PLAN" | jq -r --arg id "$SECTION_ID" '.sections[] | select(.id == $id)')
    PATTERN_ID=$(echo "$SECTION_JSON" | jq -r '.pattern_id')
    SECTION_TYPE=$(echo "$SECTION_JSON" | jq -r '.type')
    SECTION_WHY=$(echo "$SECTION_JSON" | jq -r '.why')
    SECTION_NOTES=$(echo "$SECTION_JSON" | jq -r '.notes // ""')
    SECTION_BG=$(echo "$SECTION_JSON" | jq -r '.background')
    CONTENT_SOURCE=$(echo "$SECTION_JSON" | jq -r '.content_source')
    
    # Extract content from design.json based on content_source
    # Parse "design.json → pages[N].sections[M].content" format
    PAGE_IDX=$(echo "$CONTENT_SOURCE" | grep -oP 'pages\[\K[0-9]+')
    SECTION_IDX=$(echo "$CONTENT_SOURCE" | grep -oP 'sections\[\K[0-9]+')
    
    if [ -n "$PAGE_IDX" ] && [ -n "$SECTION_IDX" ]; then
      CONTENT=$(echo "$DESIGN" | jq -r ".pages[$PAGE_IDX].sections[$SECTION_IDX].content")
    else
      CONTENT="See design.json: $CONTENT_SOURCE"
    fi
    
    EXTRA_CONTEXT=""
    
    # Generate file name from section ID
    # home-hero → HeroSection.tsx, about-hero → AboutHeroSection.tsx
    # Check if section type is unique across project
    TYPE_COUNT=$(echo "$PLAN" | jq -r --arg type "$SECTION_TYPE" '[.sections[] | select(.type == $type)] | length')
    
    if [ "$TYPE_COUNT" -gt 1 ]; then
      # Multiple sections of same type — prefix with page
      PAGE_PREFIX=$(echo "$SECTION_ID" | cut -d'-' -f1)
      TYPE_PART=$(echo "$SECTION_ID" | cut -d'-' -f2-)
      # Convert to PascalCase
      FILE_NAME=$(echo "${PAGE_PREFIX}-${TYPE_PART}" | sed -r 's/(^|-)(\w)/\U\2/g')Section.tsx
    else
      TYPE_PART=$(echo "$SECTION_ID" | cut -d'-' -f2-)
      FILE_NAME=$(echo "$TYPE_PART" | sed -r 's/(^|-)(\w)/\U\2/g')Section.tsx
    fi
  fi
  
  FILE_PATH="$OUTPUT_DIR/sections/$FILE_NAME"
  
  # Skip if already exists
  if [ -f "$FILE_PATH" ]; then
    DONE=$((DONE + 1))
    echo "✅ $FILE_NAME (exists, skipping)"
    continue
  fi
  
  # Extract pattern description from SECTION_PATTERNS.md
  PATTERN_DESC=$(awk "/^### $PATTERN_ID:/{found=1} found{print} found && /^$/{exit}" "$PATTERNS" | head -20)
  
  echo "⏳ [$((DONE + 1))/$TOTAL] $FILE_NAME ($PATTERN_ID)..."
  
  # Build the prompt
  PROMPT="You are generating ONE React section component for project '$PROJECT_ID'.

## Project Style Tokens
Preset: $STYLE_PRESET_ID $STYLE_PRESET_NAME
$STYLE_TOKENS

## Section to Generate
- ID: $SECTION_ID
- Type: $SECTION_TYPE
- Pattern: $PATTERN_ID
- Background: $SECTION_BG
- Why this pattern: $SECTION_WHY
$([ -n "$SECTION_NOTES" ] && echo "- Notes: $SECTION_NOTES")
$([ -n "$EXTRA_CONTEXT" ] && echo "- Extra: $EXTRA_CONTEXT")

## Pattern Description (from SECTION_PATTERNS.md)
$PATTERN_DESC

## Content (from design.json)
$CONTENT

## styles.css Reference
$(cat "$STYLES_FILE" 2>/dev/null || echo "Not yet generated")

## Technical Rules
$TECH

## Learned Rules
$RULES

## Instructions
1. Implement the layout described in the Pattern Description above
2. Apply ALL style tokens (border-radius, shadows, card-style, button-style, hover, etc.)
3. Use the Content provided — do NOT invent new content
4. Background '$SECTION_BG':
   - dark: use dark bg classes (bg-secondary or dark surface) with light text
   - light: use bg-background with dark text
   - muted: use bg-muted with dark text  
   - accent: use bg-accent with accent-foreground text
5. Follow ALL rules from Technical Rules and Learned Rules
6. Export as default function component
7. Use semantic HTML (<section>, <nav>, <article>)
8. Make fully responsive (mobile-first)
9. All interactive elements must work (buttons, modals, accordions, tabs)
10. Use ProjectLink from @/core/lib/project-context.tsx for navigation — NOT Link from react-router-dom
11. Use double quotes for Ukrainian text with apostrophes
12. Import UI components from @/core/ui/ (Button, Card, Dialog, Sheet, etc.)
13. Icons from lucide-react only

## Section-Specific Checks
$(if echo "$SECTION_TYPE" | grep -qi "hero"; then
echo "- This is a Hero section: add pt-20 if header is fixed. If inner page hero (not home): compact height py-16 md:py-24, title + subtitle only."
fi)
$(if echo "$SECTION_BG" | grep -qi "dark\|accent"; then
echo "- This section has dark/accent background: add visual texture (gradient, pattern overlay, decorative elements). Do NOT leave flat solid color."
fi)
$(if echo "$SECTION_TYPE" | grep -qi "testimonial\|review"; then
echo "- If using carousel: set fixed min-height on container. Content below must not shift on slide change."
fi)

## Output
Return ONLY the complete TSX code. No markdown fences, no explanation, no \`\`\`tsx markers. Just the raw TypeScript/JSX code starting with import statements."

  # Call Claude
  RESULT=$(claude -p "$PROMPT" 2>&1)
  
  # Remove potential markdown fences
  CLEAN=$(echo "$RESULT" | sed '/^```tsx$/d' | sed '/^```$/d' | sed '/^```typescript$/d')
  
  # Save
  echo "$CLEAN" > "$FILE_PATH"
  
  if [ $? -eq 0 ]; then
    DONE=$((DONE + 1))
    echo "✅ $FILE_NAME"
  else
    ERRORS=$((ERRORS + 1))
    echo "❌ $FILE_NAME (error)"
  fi
  
  # Small delay to avoid rate limiting
  sleep 2
done

# ──────────────────────────────────────────
# STEP 3: Compose pages
# ──────────────────────────────────────────

echo ""
echo "─────────────────────────────────"
echo "Composing pages..."

PAGE_SLUGS=$(echo "$STRUCTURE" | jq -r '.pages[].slug')

for SLUG in $PAGE_SLUGS; do
  PAGE_NAME=$(echo "$STRUCTURE" | jq -r --arg s "$SLUG" '.pages[] | select(.slug == $s) | .name')
  PASCAL_NAME=$(echo "$SLUG" | sed -r 's/(^|-)(\w)/\U\2/g')
  PAGE_FILE="$OUTPUT_DIR/pages/${PASCAL_NAME}.tsx"
  
  if [ -f "$PAGE_FILE" ]; then
    echo "✅ ${PASCAL_NAME}.tsx (exists, skipping)"
    continue
  fi
  
  echo "⏳ Composing ${PASCAL_NAME}.tsx..."
  
  # Get sections for this page from structure.json
  PAGE_SECTIONS=$(echo "$STRUCTURE" | jq -r --arg s "$SLUG" '.pages[] | select(.slug == $s) | .sections[].id')
  
  PROMPT="You are composing a page file for project '$PROJECT_ID'.

Page: $PAGE_NAME (slug: $SLUG)

Sections in order (these files exist in ../sections/):
$PAGE_SECTIONS

Generate a page component that imports and renders these sections in order.
Rules:
- Export default function component named ${PASCAL_NAME}
- Import sections from '../sections/{SectionName}'
- NO logic in page files — only imports and JSX composition
- Wrap sections in <> </> fragment
- NO Header or Footer imports (ProjectShell handles those)

Match section IDs to file names using this convention:
- home-hero → HeroSection (or HomeHeroSection if multiple hero types exist)
- home-advantages → AdvantagesSection
- Check the sections/ folder for actual file names if unsure.

Existing section files:
$(ls "$OUTPUT_DIR/sections/" 2>/dev/null | grep -v Header | grep -v Footer)

Return ONLY the TSX code. No markdown fences."

  RESULT=$(claude -p "$PROMPT" 2>&1)
  CLEAN=$(echo "$RESULT" | sed '/^```/d')
  echo "$CLEAN" > "$PAGE_FILE"
  echo "✅ ${PASCAL_NAME}.tsx"
done

# ──────────────────────────────────────────
# STEP 4: Generate project.config.ts
# ──────────────────────────────────────────

CONFIG_FILE="$OUTPUT_DIR/project.config.ts"

if [ -f "$CONFIG_FILE" ]; then
  echo "✅ project.config.ts (exists, skipping)"
else
  echo "⏳ Generating project.config.ts..."
  
  PROMPT="You are generating project.config.ts for project '$PROJECT_ID'.

Project name: $(echo "$DESIGN" | jq -r '.brand.name')

Pages (from structure.json):
$(echo "$STRUCTURE" | jq -r '.pages[] | "- slug: \(.slug), name: \(.name)"')

Existing files in output/:
sections/: $(ls "$OUTPUT_DIR/sections/" 2>/dev/null | tr '\n' ', ')
pages/: $(ls "$OUTPUT_DIR/pages/" 2>/dev/null | tr '\n' ', ')

Rules:
- Use export default { ... }
- Import styles via: import styles from './styles.css?inline'
- Import Header from './sections/Header'
- Import Footer from './sections/Footer'
- Import each page component from './pages/{Name}'
- Routes array: { path: '/', name: 'Home', component: Home }, etc.
- First route (home) uses path '/'
- Other routes use path '/{slug}'

Return ONLY the TypeScript code. No markdown fences."

  RESULT=$(claude -p "$PROMPT" 2>&1)
  CLEAN=$(echo "$RESULT" | sed '/^```/d')
  echo "$CLEAN" > "$CONFIG_FILE"
  echo "✅ project.config.ts"
fi

# ──────────────────────────────────────────
# SUMMARY
# ──────────────────────────────────────────

echo ""
echo "═══════════════════════════════════"
echo "Generation complete!"
echo "─────────────────────────────────"
echo "Sections: $DONE/$TOTAL generated"
echo "Errors:   $ERRORS"
echo "Pages:    $(ls "$OUTPUT_DIR/pages/" 2>/dev/null | wc -l)"
echo "Config:   $([ -f "$CONFIG_FILE" ] && echo '✅' || echo '⬜')"
echo "Styles:   $([ -f "$STYLES_FILE" ] && echo '✅' || echo '⬜')"
echo "═══════════════════════════════════"
echo ""
echo "Preview: npm run dev → open /project/$PROJECT_ID"
```

## Slash command wrapper: .claude/commands/generate-all.md

```markdown
Run the generation orchestrator for project: $ARGUMENTS

Execute:
\`\`\`bash
chmod +x scripts/generate.sh
./scripts/generate.sh $ARGUMENTS
\`\`\`

This will generate all sections, compose pages, and create project.config.ts.
Each section is generated in an isolated claude -p call with clean context.
Already existing files are skipped.

After completion, open the browser to preview: /project/$ARGUMENTS
```

## Setup

1. Create `scripts/generate.sh` with the script above
2. Make executable: `chmod +x scripts/generate.sh`
3. Create `.claude/commands/generate-all.md` wrapper
4. Ensure `jq` is installed (`brew install jq` or `apt install jq`)

## Testing

```bash
# Test on KavaBAR first (delete output to regenerate)
rm -rf src/projects/kava/output/sections/*
rm -rf src/projects/kava/output/pages/*
rm -f src/projects/kava/output/project.config.ts
# Keep styles.css if it's good

./scripts/generate.sh kava
```

Expected:
- ~19 section files generated in sections/
- 4 page files composed in pages/
- 1 project.config.ts
- 1 styles.css (kept from before or regenerated)
- Total time: ~5-10 minutes (vs 1-2 hours manual)

## Notes

- `sleep 2` between calls prevents rate limiting. Adjust if needed.
- Script skips existing files — safe to re-run after fixing one section.
- To regenerate a specific section: delete the file, re-run script.
- To regenerate everything: `rm -rf output/sections/* output/pages/*`
- The script strips markdown fences from Claude output (```tsx markers).
- If a section fails, the script continues to the next one and counts errors.
