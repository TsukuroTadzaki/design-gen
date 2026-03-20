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

### Classification Rules

| If the correction is about... | Category |
|---|---|
| A specific visual bug that will repeat (button invisible, layout jump) | A (LEARNED_RULES) |
| A code pattern that's always wrong (wrong import, missing cleanup) | B (TECH_GUIDE) |
| A new way to layout a section type (new hero variant) | C (SECTION_PATTERNS) |
| A style token that doesn't work as defined (hover too fast, radius wrong) | D (STYLE_PRESETS) |
| A marketing/psychology insight (CTA placement, trust signals) | E (DESIGN_PRINCIPLES) |
| AI consistently generates wrong output despite correct rules | F (PROMPT) |
| One-off content fix, typo, specific image choice | G (PROJECT_ONLY) |

Most corrections are A + B + F minimum.

## Step 3: Draft Changes

For each affected document:
1. Read the current file content
2. Check if a similar rule already exists (NEVER add duplicates)
3. Draft the exact text to add
4. Show the designer:
   - Which file
   - Where in the file (which section)
   - Exact text to add

Include the project name and version in LEARNED_RULES entries (e.g., "KavaBAR v1").

## Step 4: Confirm

Show a summary in this format:

```
Correction 1: {short description}
├── LEARNED_RULES: "{rule text}"
├── TECH_GUIDE: {what will be added and where}
└── PROMPT: {what will be updated}

Correction 2: ...
```

Then ask: "Apply these changes? (y/n)"

Wait for confirmation before proceeding.

## Step 5: Apply

Read each file, add the drafted content in the correct section, save.

Show summary of changes made:
```
✅ Updated docs/LEARNED_RULES.md (N rules added to "section")
✅ Updated docs/TECH_GUIDE.md (description of changes)
✅ Updated prompts/phase3/generate-section.md (description of changes)
```

End with: "Done. These corrections will be applied to all future generations."

## Rules

- NEVER add duplicate rules. Before adding, check if similar rule already exists.
- LEARNED_RULES entries MUST include project name where issue was discovered.
- TECH_GUIDE entries should be generic (no project references).
- If a correction affects SECTION_PATTERNS, add it as a note to existing pattern — don't create new patterns unless it's truly a new layout.
- If a correction affects STYLE_PRESETS, add it as a note to existing preset — don't modify tokens unless the token itself is wrong.
- Keep all document text in English.
- After applying, verify no duplicate rules were created.
- For PROJECT_ONLY corrections, acknowledge the fix without updating any docs.