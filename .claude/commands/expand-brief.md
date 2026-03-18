Expand a brief.json into a complete design.json specification.

Project ID: $ARGUMENTS

## Steps

1. Read `projects/$ARGUMENTS/brief.json`
2. If the file doesn't exist, report an error and stop.

3. Read the expansion prompt from `prompts/phase1/expand-brief.md`
4. Read the design schema from `schemas/design.schema.json`

5. Generate a complete `design.json` following ALL rules from the expansion prompt:

   **Brand**: headline (under 10 words, answers "what + why"), subheadline, slogan (2-4 words), positioning, key_message (2-3 sentences addressing main pain point)

   **Services**: expand each service from brief with icon (lucide-react name), short_description, long_description, specific CTA

   **Advantages**: 3-5 advantages from USP, each with title, description, icon

   **Audience avatars**: 2-3 detailed avatars with name, age, specific situation, looking_for, specific fears, purchase_trigger that connects feature to fear

   **Objections**: 3-5 objections with detailed answers

   **Pages**: full structure for each page with sections. Home page follows conversion funnel:
   hero → advantages → services → how_it_works → testimonials → pricing (if applicable) → faq → cta

   Each section has: type, purpose, content (with actual text content, not placeholders)

   **Visual direction**: style recommendation with WHY, full color palette with psychological justification, visual language (photo_style, shapes, textures, animations, decorative)

   **CTA strategy**: primary/secondary CTA texts, phone placeholder, touchpoints list

   **Content plan**: available materials, needed materials, placeholder strategy

6. Save to `projects/$ARGUMENTS/design.json`

7. Validate against `schemas/design.schema.json`

8. Report what was generated and suggest running `/review-brief $ARGUMENTS` next.

## Important
- Generate ALL content in the language matching the brief (usually Ukrainian)
- Do NOT use generic marketing clichés
- Every section must have CONCRETE content, not "AI will generate"
- Avatars must be SPECIFIC people with SPECIFIC situations
- Colors must have psychological justification
