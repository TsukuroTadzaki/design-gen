# Design Generator v2

Система генерації multi-page дизайнів сайтів (React + Tailwind + shadcn/ui).

## Архітектура

3 фази: Бриф → План → Генерація. Всі 3 фази реалізовані.

## Файлова структура

- `instructions/` — ТЗ і документація проекту
- `schemas/` — JSON Schema для валідації (brief, design, structure, plan)
- `schemas/examples/` — приклади заповнених файлів
- `prompts/phase1/` — промпти для Фази 1 (expand-brief, generate-md)
- `prompts/phase2/` — промпти для Фази 2 (create-structure, create-plan)
- `prompts/phase3/` — промпти для Фази 3 (generate-section)
- `projects/{id}/` — робочі проекти (brief.json, design.json, design.md, structure.json, plan.json)
- `projects/{id}/output/` — згенерований код (styles.css, sections/, pages/, project.config.ts)
- `docs/` — бібліотека знань (STYLE_PRESETS, SECTION_PATTERNS, TECH_GUIDE, DESIGN_PRINCIPLES, LEARNED_RULES)
- `.claude/commands/` — CLI команди

## Правила

- Всі дані в JSON з валідацією по схемах
- Кожен крок — окрема CLI команда
- Мова контенту — українська (за замовчуванням)
- ID проекту — lowercase, тільки `a-z0-9-`
