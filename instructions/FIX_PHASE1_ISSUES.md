# Задача: Виправити 3 проблеми в Фазі 1

Після першого тестового прогону виявлені три системні проблеми, які повторюватимуться в кожній наступній генерації. Потрібно виправити першоджерела — промпт, схему і приклад.

---

## Виправлення 1: Промпт `prompts/phase1/expand-brief.md`

Додай три блоки правил. Розмісти їх у секції з правилами (або створи секцію якщо її нема). Ці правила мають бути помітними — не загублені серед тексту.

### Додати правило по кольорах:

```
### Color Palette Rules

- Accent color MUST visually contrast with primary color. This is non-negotiable.
  - If primary is blue → accent should be warm: orange (#F59E0B), amber (#D97706), coral (#F43F5E), or similar
  - If primary is green → accent should be warm or purple
  - If primary is red/warm → accent should be cool: teal, blue, emerald
  - NEVER use a darker or lighter shade of primary as accent. Example: primary #3573E9 + accent #2B5EC5 is WRONG — they are visually the same.
  - Test mentally: if you put an accent CTA button on a primary-colored background, would it be visible? If no — wrong accent.
- Accent color is primarily for CTA buttons — it must grab attention on both light and dark section backgrounds.
```

### Додати правило по структурі сторінок:

```
### Page Structure Rules

- The "sections" field of EVERY page MUST be an array of objects. NEVER a string.
- This applies to ALL pages including template pages, inner pages, blog articles, service detail pages, portfolio items.
- Every section object MUST have: "type" (string), "purpose" (string), "content" (object with real data).
- If a page is a "template" (e.g., blog article, service detail) — still define its full section structure with realistic content for one example instance.
- Example of WRONG: "sections": "Шаблонна сторінка. Структура: hero → content → CTA"
- Example of CORRECT: "sections": [{"type": "hero", "purpose": "...", "content": {"headline": "...", ...}}, ...]
```

### Додати правило по контенту:

```
### Content Completeness Rules

- NEVER use string references in section content. No "advantages_ref", "services_ref", "objections_ref", or similar.
- ALL content must be inlined directly in the section where it's used.
- If the same data appears in multiple sections (e.g., advantages on Home and on Services page) — duplicate it. Completeness > DRY.
- Every section's "content" object must contain all the actual text, titles, descriptions that will appear on screen. No placeholders, no references, no "AI will generate later".
```

---

## Виправлення 2: Схема `schemas/design.schema.json`

Знайди визначення поля `sections` всередині об'єктів сторінок і зроби його строго масивом. Якщо зараз воно допускає string — видали цю можливість.

Конкретно потрібно:

1. Визначити `section` як об'єкт з обов'язковими полями:

```json
{
  "sectionItem": {
    "type": "object",
    "required": ["type", "purpose", "content"],
    "properties": {
      "type": { "type": "string" },
      "purpose": { "type": "string" },
      "content": { "type": "object" }
    }
  }
}
```

2. У визначенні сторінки (page) зробити `sections` строго масивом цих об'єктів:

```json
{
  "sections": {
    "type": "array",
    "items": { "$ref": "#/definitions/sectionItem" },
    "minItems": 1
  }
}
```

3. Переконатись що `"type": "string"` НЕ допускається для поля `sections`. Тільки масив.

---

## Виправлення 3: Приклад `schemas/examples/design.example.json`

Оновити приклад щоб він демонстрував правильні патерни. Конкретно:

### 3.1 Виправити accent color

Замість:
```json
"accent": {
  "hex": "#2B5EC5",
  "role": "Альтернативний акцент для hover-станів і градієнтів",
  "usage": "Hover-стани кнопок, градієнти, виділення..."
}
```

Поставити контрастний колір, наприклад:
```json
"accent": {
  "hex": "#F59E0B",
  "role": "Контрастний акцент для CTA і ключових елементів",
  "usage": "CTA-кнопки, важливі бейджі, hover-акценти. Теплий amber на тлі холодного синього primary створює контраст, який привертає увагу до елементів дії."
}
```

### 3.2 Розгорнути всі шаблонні сторінки

Знайти всі сторінки де `sections` є рядком (а не масивом) і замінити на повноцінний масив секцій з type, purpose і content.

Наприклад, сторінка `service-detail` зараз має:
```json
"sections": "Шаблонна сторінка. Структура: hero з назвою послуги → ..."
```

Замінити на:
```json
"sections": [
  {
    "type": "hero",
    "purpose": "Показати назву послуги і головну цінність",
    "content": {
      "headline": "Корпоративний сайт для вашого бізнесу",
      "subheadline": "Сайт, який працює на довіру клієнтів і генерує заявки",
      "primary_cta": "Обговорити проект"
    }
  },
  {
    "type": "service_description",
    "purpose": "Детально пояснити для кого і навіщо ця послуга",
    "content": {
      "title": "Для кого підходить",
      "text": "Корпоративний сайт — для компаній, які хочуть справляти враження серйозного гравця на ринку..."
    }
  },
  {
    "type": "how_it_works",
    "purpose": "Показати процес роботи саме для цієї послуги",
    "content": {
      "title": "Етапи розробки",
      "steps": [
        {"number": 1, "title": "Аналіз", "description": "Вивчаємо вашу нішу, конкурентів, аудиторію"},
        {"number": 2, "title": "Прототип", "description": "Створюємо структуру і wireframe"},
        {"number": 3, "title": "Дизайн", "description": "Індивідуальний макет з урахуванням бренду"},
        {"number": 4, "title": "Розробка", "description": "Чистий код, адаптивна верстка, SEO-оптимізація"},
        {"number": 5, "title": "Запуск", "description": "Тестування, публікація, навчання команди"}
      ]
    }
  },
  {
    "type": "portfolio_preview",
    "purpose": "Показати приклади саме цього типу проектів",
    "content": {
      "title": "Приклади корпоративних сайтів",
      "items_count": 3,
      "cta": "Дивитись всі роботи"
    }
  },
  {
    "type": "faq",
    "purpose": "Відповісти на питання специфічні для цієї послуги",
    "content": {
      "title": "Питання про розробку корпоративних сайтів",
      "items": [
        {
          "question": "Скільки коштує корпоративний сайт?",
          "answer": "Вартість залежить від кількості сторінок і складності функціоналу. Після безкоштовної консультації ми надамо детальний кошторис."
        },
        {
          "question": "Скільки часу займає розробка?",
          "answer": "В середньому 6-10 тижнів. Точні строки визначаємо після обговорення вашого проекту."
        }
      ]
    }
  },
  {
    "type": "cta",
    "purpose": "Фінальна конверсія",
    "content": {
      "title": "Потрібен корпоративний сайт?",
      "subtitle": "Розкажіть про задачу — підготуємо план і кошторис безкоштовно.",
      "primary_cta": "Обговорити проект"
    }
  }
]
```

Зроби те саме для ВСІХ сторінок, де sections є рядком: `service-detail`, `seo-service-detail`, `blog-article`, `portfolio-project`.

### 3.3 Замінити всі string references на inline контент

Знайти всі місця де в content стоїть рядок-посилання і замінити на реальні дані. Наприклад:

Замість:
```json
"content": {
  "items": "advantages_ref"
}
```

Має бути:
```json
"content": {
  "items": [
    {
      "title": "15+ років у розробці",
      "description": "Понад 15 років створюємо вебпроекти різної складності...",
      "icon": "Award"
    },
    ...
  ]
}
```

---

## Порядок виконання

1. Спочатку внеси зміни в промпт (`prompts/phase1/expand-brief.md`)
2. Потім оновити схему (`schemas/design.schema.json`)
3. Потім оновити приклад (`schemas/examples/design.example.json`)
4. Запусти валідацію поточного `design.json` по оновленій схемі — він має показати помилки (sections як string, etc.) — це підтвердить що схема працює

## Перевірка

Після всіх змін:
- [ ] В промпті є три нових блоки правил (colors, structure, content)
- [ ] Схема забороняє string для sections
- [ ] Приклад має контрастний accent color (не відтінок primary)
- [ ] Приклад має ВСІ сторінки з sections як масивом (жодного string)
- [ ] Приклад не містить жодного "xxx_ref" в content
