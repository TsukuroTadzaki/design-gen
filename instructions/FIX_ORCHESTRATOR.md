# Task: Fix Generation Orchestrator

## Problem 1: Claude returns descriptions instead of code

When called via `claude -p "..."`, the model sometimes returns a text description of the component instead of actual TSX code. The saved .tsx file contains English text like "The Header component implements..." instead of `import { useState } from 'react'`.

### Fix

In `scripts/generate.sh`, find the output instruction at the end of every prompt (there are multiple — for sections, pages, and config). Replace ALL instances of output instructions with this stronger version:

```
CRITICAL OUTPUT FORMAT:
- You MUST return ONLY valid TypeScript/React code
- First line of your response MUST be an import statement (e.g., import { useState } from 'react')
- Last line MUST be the closing of the export or component
- ZERO text, descriptions, or explanations before the first import
- ZERO text after the last line of code
- NO markdown fences (no \`\`\`tsx, no \`\`\`)
- NO comments like "Here's the component" or "This implements..."
- If your output is not valid TSX code, the file will break the build
- Think of your response as being piped directly into a .tsx file
```

This applies to ALL prompts in the script:
- Section generation prompt
- Page composition prompt  
- project.config.ts prompt
- styles.css prompt (change to: "Return ONLY valid CSS code. First line must be a CSS comment or selector. No markdown, no explanations.")

### Add output validation

After each `claude -p` call and file save, add a validation check. Insert this function at the top of the script:

```bash
validate_output() {
  local FILE=$1
  local TYPE=$2  # "tsx" or "css"
  
  if [ ! -f "$FILE" ]; then
    echo "⚠️  File not created"
    return 1
  fi
  
  FIRST_LINE=$(head -1 "$FILE" | tr -d '[:space:]')
  
  if [ "$TYPE" = "tsx" ]; then
    # Valid TSX starts with: import, export, const, //, 'use client', or type
    if echo "$FIRST_LINE" | grep -qE "^(import|export|const|//|'use|\"use|type|interface)"; then
      return 0
    else
      echo "⚠️  Output is not valid TSX (first line: $FIRST_LINE)"
      rm "$FILE"
      return 1
    fi
  elif [ "$TYPE" = "css" ]; then
    # Valid CSS starts with: /*, html, :root, @, or selector
    if echo "$FIRST_LINE" | grep -qE "^(/\*|html|:root|@|\.|\*)"; then
      return 0
    else
      echo "⚠️  Output is not valid CSS (first line: $FIRST_LINE)"
      rm "$FILE"
      return 1
    fi
  fi
}
```

Then after each file save, call:

```bash
# After saving section file
echo "$CLEAN" > "$FILE_PATH"
if ! validate_output "$FILE_PATH" "tsx"; then
  echo "❌ $FILE_NAME — invalid output, skipping (will retry on next run)"
  ERRORS=$((ERRORS + 1))
  continue
fi

# After saving styles.css
echo "$CLEAN" > "$STYLES_FILE"
if ! validate_output "$STYLES_FILE" "css"; then
  echo "❌ styles.css — invalid output"
  ERRORS=$((ERRORS + 1))
fi
```

### Also strip markdown fences more aggressively

The current sed may miss some patterns. Replace the cleanup line:

```bash
# Old
CLEAN=$(echo "$RESULT" | sed '/^```/d')

# New — handles all fence variants
CLEAN=$(echo "$RESULT" | sed '/^```[a-z]*$/d' | sed '/^```$/d')

# Also strip any leading blank lines before first import
CLEAN=$(echo "$CLEAN" | sed '/./,$!d')
```

## Problem 2: Write permission denied

The script may fail if the output directory doesn't exist or has wrong permissions.

### Fix

Make sure `mkdir -p` runs early and with correct paths. Add this near the top of the script, right after variable definitions:

```bash
# Create ALL output directories upfront
mkdir -p "$OUTPUT_DIR/sections"
mkdir -p "$OUTPUT_DIR/pages"  
mkdir -p "$OUTPUT_DIR/components"
mkdir -p "$OUTPUT_DIR/data"

# Verify write access
if ! touch "$OUTPUT_DIR/.write-test" 2>/dev/null; then
  echo "❌ Error: Cannot write to $OUTPUT_DIR"
  echo "   Check permissions or create the directory manually:"
  echo "   mkdir -p $OUTPUT_DIR"
  exit 1
fi
rm -f "$OUTPUT_DIR/.write-test"
```

Also check that the `PROJECT_DIR` path is correct for the actual project structure. The script assumes:
```
src/projects/{project-id}/output/
```

If the actual structure is different, update the `OUTPUT_DIR` variable.

## Problem 3: Rate limiting protection

Add better rate limiting protection between calls:

```bash
# After each claude -p call, check for rate limit errors
if echo "$RESULT" | grep -qi "rate limit\|too many requests\|429"; then
  echo "⚠️  Rate limited. Waiting 30 seconds..."
  sleep 30
  # Retry once
  RESULT=$(claude -p "$PROMPT" 2>&1)
fi
```

## Verification

After fixes:
- [ ] Delete one existing section file and re-run script — verify it generates valid TSX code (starts with import)
- [ ] Run on a project with empty output/ — verify mkdir creates directories
- [ ] Check generated files — none should contain "Here's the component" or markdown fences
- [ ] Check styles.css — should be valid CSS, not description
- [ ] Run `grep -r "^\`\`\`" src/projects/*/output/` — should find zero results
