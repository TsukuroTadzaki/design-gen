Display a human-readable summary of the design plan for review.

Project ID: $ARGUMENTS

## Steps

1. Read `projects/$ARGUMENTS/structure.json` and `projects/$ARGUMENTS/plan.json`
2. If either file doesn't exist, report an error and stop.
3. Also read `projects/$ARGUMENTS/design.json` for project context.

4. Display a structured summary in the following format:

```
=== {Project Name} — Design Plan ===

STYLE: {preset_id} {preset_name}
Reason: {why - first 1-2 sentences}
Rejected: {extract rejected alternatives from "why"}

GLOBAL:
  Header: {pattern_id} {pattern_name}
  Footer: {pattern_id} {pattern_name}
  Floating: {list floating elements}

{PAGE NAME} ({section count} sections):
┌─────────────────────────────────────────────┐
│ {section_id}: {pattern_id} {pattern_name}   │
│ Background: {background} | Funnel: {stage}  │
│ Why: {short reason}                         │
├─────────────────────────────────────────────┤
│ ...                                         │
└─────────────────────────────────────────────┘

(repeat for each page)
```

5. After showing the summary, ask:

"Все вірно? Можливі дії:
- Змінити стиль: 'Зміни стиль на SP-05 Glassmorphism'
- Змінити патерн: 'Зміни home-hero на H-03 Fullscreen Image Carousel'
- Додати секцію: 'Додай stats секцію після services'
- Видалити секцію: 'Видали pricing секцію'
- Якщо все ок: 'Все добре, продовжуємо'

Або запустіть `/edit-plan $ARGUMENTS` для внесення змін."
