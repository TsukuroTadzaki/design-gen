Create a website structure from design.json.

Project ID: $ARGUMENTS

## Steps

1. Read `projects/$ARGUMENTS/design.json`
2. If the file doesn't exist, report an error and stop.

3. Read the prompt from `prompts/phase2/create-structure.md`
4. Read the schema from `schemas/structure.schema.json`

5. Generate `structure.json` following ALL rules from the prompt:

   **Global elements**: header (elements, CTA text, phone, behavior), footer (columns, CTA), floating elements appropriate for this business type

   **Pages**: for each page in design.json, create section list with:
   - Unique section ID (format: {slug}-{type})
   - Section type matching design.json
   - Clear purpose statement
   - content_source pointing to exact location in design.json
   - funnel_stage (awareness/interest/desire/action)
   - background (dark/light/muted/accent)

   **Home page**: must follow conversion funnel order (awareness → interest → desire → action)

   **Background rhythm**: no two adjacent sections with same background type

6. Save to `projects/$ARGUMENTS/structure.json`

7. Validate against `schemas/structure.schema.json`

8. Report what was generated and suggest running `/create-plan $ARGUMENTS` next.

## Important
- Every page from design.json must appear in structure.json
- Every page must end with a CTA section
- Maximum 10 sections per page
- Section IDs must be unique across the project
- content_source must be precise — "design.json → pages[0].sections[2].content" not just "design.json"
