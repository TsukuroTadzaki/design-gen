# Task: Create /learn Command

## Problem

After each design correction, the designer needs to manually:
1. Describe the fix
2. Send it for analysis
3. Wait for sorting into categories
4. Apply changes to 3-5 different files

This is slow and doesn't scale. Need a single CLI command that handles everything.

## Solution

Create `/learn` command that:
1. Accepts a description of what was fixed and why
2. Automatically determines which documents need updating
3. Makes all updates in one pass
4. Shows a summary of what was changed

## Command: /learn {project-id}

### Usage

```
/learn kava
```

The command starts an interactive session where the designer describes corrections. It can handle one or multiple corrections at once.

### Flow

```
Step 1: Ask designer to describe the correction(s)
        "Describe what you fixed and why. You can list multiple fixes."

Step 2: For each correction, classify it into one or more categories:
        
        A) LEARNED_RULES — a mistake that will repeat in future projects
           → Add rule to docs/LEARNED_RULES.md
           
        B) TECH_GUIDE — a technical code rule that applies universally
           → Add to docs/TECH_GUIDE.md (anti-patterns or checklist)
           
        C) SECTION_PATTERNS — a new layout variant or correction to existing pattern
           → Update docs/SECTION_PATTERNS.md
           
        D) STYLE_PRESETS — a style token correction or new style variant
           → Update docs/STYLE_PRESETS.md
           
        E) DESIGN_PRINCIPLES — a new design principle or marketing insight
           → Update docs/DESIGN_PRINCIPLES.md
           
        F) PROMPT — the generation prompt needs updating to prevent this
           → Update prompts/phase3/generate-section.md or relevant command
           
        G) PROJECT_ONLY — fix is specific to this project, no systemic lesson
           → No doc updates needed, just acknowledge

Step 3: Draft the changes for each affected document.
        Show the designer what will be added/changed.

Step 4: Ask for confirmation.
        "These changes will be applied to: LEARNED_RULES, TECH_GUIDE, generate-section prompt. Proceed?"

Step 5: Apply all changes.
        Show summary of what was updated.
```

### Classification Logic

The AI determines category based on these rules:

| If the correction is about... | Category |
|---|---|
| A specific visual bug that will repeat (button invisible, layout jump) | A (LEARNED_RULES) |
| A code pattern that's always wrong (wrong import, missing cleanup) | B (TECH_GUIDE) |
| A new way to layout a section type (new hero variant) | C (SECTION_PATTERNS) |
| A style token that doesn't work as defined (hover too fast, radius wrong) | D (STYLE_PRESETS) |
| A marketing/psychology insight (CTA placement, trust signals) | E (DESIGN_PRINCIPLES) |
| AI consistently generates wrong output despite correct rules | F (PROMPT) |
| One-off content fix, typo, specific image choice | G (PROJECT_ONLY) |

Most corrections will be A + B + F (learned rule + tech guide + prompt update). Some will additionally be C or D.

### Example Session

```
> /learn kava

What did you fix? Describe the correction(s):

> Hero section had no top padding, content was hidden behind fixed header.
> Also the transparent header had white text on light sky photo - nav was invisible.

Analyzing 2 corrections...

Correction 1: Hero padding under fixed header
├── LEARNED_RULES: "Hero MUST have pt-[header-height] when header is fixed/sticky"
├── TECH_GUIDE: Add to Header Rules + Anti-Patterns + Checklist
└── PROMPT: Add to "Section-Specific Checks → If this is a Hero section"

Correction 2: Transparent header readability on hero
├── LEARNED_RULES: "Transparent header requires readability check. Solutions: ..."
├── TECH_GUIDE: Add to Header Rules
└── PROMPT: Add hero readability check

Apply these changes? (y/n)

> y

✅ Updated docs/LEARNED_RULES.md (2 rules added to "Phase 3 Generation")
✅ Updated docs/TECH_GUIDE.md (2 header rules, 2 anti-patterns, 2 checklist items)
✅ Updated .claude/commands/generate-section.md (2 hero checks added)

Done. These corrections will be applied to all future generations.
```

### Another Example — Pattern Correction

```
> /learn kava

What did you fix?

> Testimonials section was just flat brown background, looked empty.
> I added a subtle grain texture overlay and large decorative quote marks.
> This should be a variant of the testimonials pattern — "atmospheric" style
> for restaurants and premium brands.

Analyzing 1 correction...

Correction 1: Dark testimonial section needs visual interest
├── LEARNED_RULES: "Dark sections need texture/decoration, not flat color"
├── TECH_GUIDE: Add anti-pattern "solid color sections without texture"
├── SECTION_PATTERNS: Add note to T-02 pattern: "On dark bg, add texture overlay 
│   and decorative quote SVG for visual richness"
├── STYLE_PRESETS: Add note to SP-08 Warm Organic: "Dark sections use subtle 
│   grain texture + organic decorative elements"
└── PROMPT: Add dark section check

Apply these changes? (y/n)
```

### Another Example — Project-Only Fix

```
> /learn kava

What did you fix?

> Changed the hero photo to a different Unsplash image, the previous one
> had too much sky and not enough interior.

Analyzing 1 correction...

Correction 1: Hero photo choice
└── PROJECT_ONLY: This is content-specific, no systemic rule needed.

No document updates required. The fix is noted for this project.
```

## Implementation

### Command file: .claude/commands/learn.md

```markdown
You are processing design corrections for project: $ARGUMENTS

## Step 1: Gather Input

Ask the designer: "Describe what you fixed and why. You can list multiple corrections."

Wait for response.

## Step 2: Classify Each Correction

For each correction described, determine which documents need updating:

A) docs/LEARNED_RULES.md — if the mistake will repeat in future projects
B) docs/TECH_GUIDE.md — if it's a universal technical code rule
C) docs/SECTION_PATTERNS.md — if it's a new layout variant or pattern correction
D) docs/STYLE_PRESETS.md — if it's a style token issue
E) docs/DESIGN_PRINCIPLES.md — if it's a design/marketing principle
F) prompts or commands — if the generation prompt needs updating
G) Project-only — if no systemic lesson

Most corrections are A + B + F minimum.

## Step 3: Draft Changes

For each affected document, draft the exact text to add. Show the designer:
- Which file
- Where in the file (which section)
- Exact text to add

Include the project name and version in LEARNED_RULES entries (e.g., "KavaBAR v1").

## Step 4: Confirm

Show summary and ask: "Apply these changes? (y/n)"

## Step 5: Apply

Read each file, add the drafted content in the correct section, save.
Show summary of changes made.

## Rules

- NEVER add duplicate rules. Before adding, check if similar rule already exists.
- LEARNED_RULES entries MUST include project name where issue was discovered.
- TECH_GUIDE entries should be generic (no project references).
- If a correction affects SECTION_PATTERNS, add it as a note to existing pattern — don't create new patterns unless it's truly a new layout.
- If a correction affects STYLE_PRESETS, add it as a note to existing preset — don't modify tokens unless the token itself is wrong.
- Keep all document text in English.
- After applying, verify no duplicate rules were created.
```

## Verification

After creating the command:
- [ ] `.claude/commands/learn.md` exists
- [ ] Test with a simple correction: "I fixed a button color"
- [ ] Verify it classifies correctly and updates the right files
- [ ] Verify it doesn't create duplicates if run twice with same correction
- [ ] Verify it handles "project-only" corrections without updating docs
