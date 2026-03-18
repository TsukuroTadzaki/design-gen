Create a new design project and conduct a brief interview.

## Steps

1. Ask for the project ID (lowercase, a-z0-9 and hyphens only). If provided as argument, use it: $ARGUMENTS

2. Create the project directory: `projects/{project-id}/`

3. Conduct an interactive interview, asking questions one block at a time. Wait for answers before proceeding to the next block.

### Block 1: Business (3 questions)
```
1. Назва компанії і чим займається?
2. Що продаєте/пропонуєте? (перелічити основні послуги або товари)
3. Чим відрізняєтесь від конкурентів? (чому клієнт обере вас)
```

### Block 2: Clients (3 questions)
```
4. Хто ваш типовий клієнт? (стать, вік, дохід, ситуація)
5. Чому вони до вас приходять? (яку проблему вирішують)
6. Що їх зупиняє від замовлення? (страхи, сумніви)
```

### Block 3: Website (3 questions)
```
7. Які сторінки потрібні? (або "не знаю, запропонуй")
8. Яка головна дія відвідувача? (що він має зробити на сайті)
9. Є щось специфічне для сайту? (каталог, калькулятор, портфоліо, блог)
```

### Block 4: Visual (3 questions)
```
10. Покажіть 2-3 сайти які вам подобаються (або опишіть відчуття)
11. Які кольори асоціюються з вашим бізнесом? (або "не знаю")
12. Який настрій має бути? (одне-два слова)
```

### Block 5: Content (2 questions)
```
13. Є готові матеріали? (фото, тексти, логотип, брендбук)
14. Додаткові побажання або обмеження?
```

4. After all answers are collected, create `projects/{project-id}/brief.json` with the following structure:

```json
{
  "id": "{project-id}",
  "created_at": "{ISO 8601 timestamp}",
  "status": "draft",
  "business": {
    "name": "...",
    "description": "...",
    "services": ["..."],
    "usp": "...",
    "location": "..."
  },
  "audience": {
    "description": "...",
    "problem": "...",
    "objections": "..."
  },
  "website": {
    "pages": ["..."],
    "primary_action": "...",
    "special_features": "..."
  },
  "visual": {
    "references": "...",
    "colors": "...",
    "mood": "..."
  },
  "content": {
    "existing_materials": "...",
    "additional_notes": "..."
  }
}
```

- Extract `location` from business description if mentioned
- `services` should be an array of individual items
- If the user says "не знаю" for pages, use: ["Головна", "Послуги", "Про нас", "Контакти"]

5. Validate brief.json against the schema in `schemas/brief.schema.json`.

6. Confirm creation and suggest running `/expand-brief {project-id}` next.
