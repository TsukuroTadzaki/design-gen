Generate and display a human-readable design summary for review.

Project ID: $ARGUMENTS

## Steps

1. Read `projects/$ARGUMENTS/design.json`
2. If the file doesn't exist, report an error and stop.

3. Read the generation prompt from `prompts/phase1/generate-md.md`

4. Generate `design.md` following the prompt structure:
   - Project Summary (3-4 sentences)
   - Brand (headline, subheadline, slogan, positioning, key message)
   - Services (list with icons and descriptions)
   - Advantages (list with icons)
   - Target Audience (avatar profiles)
   - Objections & Answers
   - Site Structure (pages → sections)
   - Visual Direction (style, colors, visual language)
   - CTA Strategy
   - Content Plan

5. Save to `projects/$ARGUMENTS/design.md`

6. Display the full content of design.md to the user.

7. Ask: "Все вірно? Якщо потрібні правки — опишіть що змінити, або запустіть `/edit-brief $ARGUMENTS`"
