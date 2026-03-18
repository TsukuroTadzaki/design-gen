Edit the design.json specification based on user feedback.

Project ID: $ARGUMENTS

## Steps

1. Read `projects/$ARGUMENTS/design.json`
2. If the file doesn't exist, report an error and stop.

3. Ask the user what they want to change. Two modes:

### Mode 1: Targeted Edit
User describes specific changes like:
- "Зміни primary колір на зелений"
- "Додай сторінку Портфоліо"
- "Зміни headline на ..."
- "Додай ще одну перевагу"

→ Apply the specific changes to design.json, keeping everything else intact.

### Mode 2: Section Regeneration
User asks to regenerate a section:
- "Перегенеруй секцію audience"
- "Перегенеруй візуальний напрямок"

→ Re-read brief.json for context and regenerate ONLY the specified section.

4. After changes:
   - Increment `brief_version` by 1
   - Update `expanded_at` to current timestamp
   - Save updated `design.json`
   - Regenerate `design.md`

5. Show what changed and display the updated section.

6. Ask if more changes are needed.
