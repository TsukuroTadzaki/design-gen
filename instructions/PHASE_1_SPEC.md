# Design Generator v2 — ТЗ Фази 1: Бриф

## Контекст

Це перша фаза нової системи генерації дизайну сайтів. Повна система складається з трьох фаз: Бриф → План → Генерація. Кожна фаза розробляється і тестується окремо.

Фаза 1 відповідає за збір інформації від клієнта і перетворення простих відповідей у повноцінне технічне завдання на дизайн.

## Принципи Фази 1

1. **Користувач — розробник (Діма), не клієнт.** Анкету заповнює одна людина після розмови з клієнтом. UI не потрібен, все через CLI.
2. **Прості питання → розгорнуте ТЗ.** Клієнт дає прості відповіді на розмові, розробник вносить їх в анкету, AI розгортає в деталізований бриф.
3. **JSON як єдине джерело даних.** Всі дані зберігаються в JSON файлах з чіткою схемою. MD-версія генерується автоматично для людського читання.
4. **Кожен крок — окрема команда CLI.** Не один монолітний процес, а послідовність команд з перевіркою між ними.

---

## Файлова структура

```
design-generator-v2/
├── CLAUDE.md                          # Головні правила для Claude CLI
├── docs/
│   ├── STYLE_PRESETS.md               # Каталог стилів з конкретними токенами (Фаза 2, поки пустий)
│   ├── SECTION_PATTERNS.md            # Каталог патернів секцій (Фаза 2, поки пустий)
│   ├── LEARNED_RULES.md               # Скопіювати з існуючого генератора
│   └── case-studies/                  # Скопіювати з існуючого генератора
├── schemas/
│   ├── brief.schema.json              # JSON Schema для brief.json
│   ├── design.schema.json             # JSON Schema для design.json
│   └── examples/
│       ├── brief.example.json         # Приклад заповненого бриду
│       └── design.example.json        # Приклад розгорнутого ТЗ
├── prompts/
│   ├── expand-brief.md                # Промпт для розгортки brief → design
│   └── generate-md.md                 # Промпт для генерації MD з JSON
├── projects/                          # Робочі проєкти
│   └── {project-id}/
│       ├── brief.json                 # Сирі відповіді анкети
│       ├── design.json                # Розгорнуте ТЗ (після AI)
│       └── design.md                  # Людиночитана версія
├── .claude/
│   └── commands/
│       ├── new-project.md             # Крок 1: Створити проєкт і заповнити анкету
│       ├── expand-brief.md            # Крок 2: AI розгортає brief.json → design.json
│       ├── review-brief.md            # Крок 3: Показати design.md для перевірки
│       └── edit-brief.md              # Крок 4: Внести правки в design.json
└── scripts/
    ├── validate-brief.ts              # Валідація brief.json по схемі
    └── generate-md.ts                 # Генерація design.md з design.json
```

---

## Крок 1: Анкета (brief.json)

### Команда: `/new-project`

Створює папку проєкту і проводить інтерактивне інтерв'ю в CLI. Питання задаються блоками. Відповіді зберігаються в `brief.json`.

### Блоки питань

#### Блок 1: Бізнес (3 питання)

```
1. Назва компанії і чим займається?
   Приклад відповіді: "RemkaPro, ремонт побутової техніки в Дніпрі"

2. Що продаєте/пропонуєте? (перелічити основні послуги або товари)
   Приклад: "Ремонт пральних машин, холодильників, бойлерів. Виїзд по Дніпру."

3. Чим відрізняєтесь від конкурентів? (чому клієнт обере вас)
   Приклад: "Гарантія 2 роки, виїзд за 2 години, безкоштовна діагностика"
```

#### Блок 2: Клієнти (3 питання)

```
4. Хто ваш типовий клієнт? (стать, вік, дохід, ситуація)
   Приклад: "Жінки 30-55, середній дохід, зламалась пральна машина — треба швидко"

5. Чому вони до вас приходять? (яку проблему вирішують)
   Приклад: "Техніка зламалась, потрібен швидкий ремонт без переплат"

6. Що їх зупиняє від замовлення? (страхи, сумніви)
   Приклад: "Бояться що обманут з ціною, що майстер не прийде вчасно"
```

#### Блок 3: Сайт (3 питання)

```
7. Які сторінки потрібні? (або "не знаю, запропонуй")
   Приклад: "Головна, послуги, про нас, контакти"

8. Яка головна дія відвідувача? (що він має зробити на сайті)
   Приклад: "Зателефонувати або залишити заявку на зворотній дзвінок"

9. Є щось специфічне для сайту? (каталог, калькулятор, портфоліо, блог)
   Приклад: "Прайс-лист по видах техніки, відгуки клієнтів"
```

#### Блок 4: Візуал (3 питання)

```
10. Покажіть 2-3 сайти які вам подобаються (або опишіть відчуття)
    Приклад: "apple.com — чисто, сучасно. Не хочу як у всіх ремонтників."

11. Які кольори асоціюються з вашим бізнесом? (або "не знаю")
    Приклад: "Синій, білий. Точно не рожевий."

12. Який настрій має бути? (одне-два слова)
    Приклад: "Надійний, професійний"
```

#### Блок 5: Контент (2 питання)

```
13. Є готові матеріали? (фото, тексти, логотип, брендбук)
    Приклад: "Логотип є, фото немає, тексти писатимемо самі"

14. Додаткові побажання або обмеження?
    Приклад: "Сайт українською, потрібна мобільна версія обов'язково"
```

**Разом: 14 питань замість 29.** Час заповнення: 10-15 хвилин.

### Формат brief.json

```json
{
  "id": "remka-pro",
  "created_at": "2026-03-17T12:00:00Z",
  "status": "draft",

  "business": {
    "name": "RemkaPro",
    "description": "Ремонт побутової техніки в Дніпрі",
    "services": [
      "Ремонт пральних машин",
      "Ремонт холодильників",
      "Ремонт бойлерів",
      "Виїзд по Дніпру"
    ],
    "usp": "Гарантія 2 роки, виїзд за 2 години, безкоштовна діагностика",
    "location": "Дніпро"
  },

  "audience": {
    "description": "Жінки 30-55, середній дохід, зламалась пральна машина — треба швидко",
    "problem": "Техніка зламалась, потрібен швидкий ремонт без переплат",
    "objections": "Бояться що обманут з ціною, що майстер не прийде вчасно"
  },

  "website": {
    "pages": ["Головна", "Послуги", "Про нас", "Контакти"],
    "primary_action": "Зателефонувати або залишити заявку на зворотній дзвінок",
    "special_features": "Прайс-лист по видах техніки, відгуки клієнтів"
  },

  "visual": {
    "references": "apple.com — чисто, сучасно. Не хочу як у всіх ремонтників.",
    "colors": "Синій, білий. Точно не рожевий.",
    "mood": "Надійний, професійний"
  },

  "content": {
    "existing_materials": "Логотип є, фото немає, тексти писатимемо самі",
    "additional_notes": "Сайт українською, потрібна мобільна версія обов'язково"
  }
}
```

---

## Крок 2: Розгортка (design.json)

### Команда: `/expand-brief {project-id}`

AI читає `brief.json` і розгортає кожну секцію в повноцінне ТЗ. Це найважливіший крок — тут прості відповіді клієнта перетворюються в конкретні дизайн-інструкції.

### Що саме AI розгортає

| Поле brief.json | Що AI генерує в design.json |
|---|---|
| `business.description` | Розгорнутий опис бізнесу, позиціонування, ключове повідомлення сайту (headline), слоган |
| `business.services` | Деталізований опис кожної послуги з іконкою, короткий і довгий текст, CTA для кожної |
| `business.usp` | 3-5 переваг з заголовком, описом і іконкою для секції Benefits |
| `audience.description` | 2-3 детальних аватари (ім'я, вік, ситуація, що шукає, що боїться, тригер покупки) |
| `audience.objections` | Список заперечень з відповідями (для FAQ або секції довіри) |
| `website.pages` | Повна структура кожної сторінки: секції в порядку, мета секції, контент кожної секції |
| `website.primary_action` | CTA стратегія: текст кнопок, де розміщувати, скільки точок конверсії |
| `visual.references` | Аналіз референсів: що саме подобається (стиль, компоновка, настрій), рекомендація стилю |
| `visual.colors` | Повна палітра: primary, secondary, accent, background, muted, card + психологія кожного кольору |
| `visual.mood` | Візуальна мова: тип фото, текстури, геометрія форм, тип анімацій |
| `content.existing_materials` | План по контенту: що є, що треба створити, де використати placeholder |

### Формат design.json

```json
{
  "id": "remka-pro",
  "created_at": "2026-03-17T12:00:00Z",
  "expanded_at": "2026-03-17T12:05:00Z",
  "status": "expanded",
  "brief_version": 1,

  "brand": {
    "name": "RemkaPro",
    "headline": "Ремонт побутової техніки за 2 години",
    "subheadline": "Виїзд, діагностика, гарантія 2 роки. Дніпро і область.",
    "slogan": "Працює як нова",
    "positioning": "Швидкий і надійний сервіс з прозорим ціноутворенням для людей, які цінують свій час",
    "key_message": "Ми приїдемо за 2 години, безкоштовно продіагностуємо і відремонтуємо з гарантією. Ніяких прихованих доплат.",
    "location": "Дніпро"
  },

  "services": [
    {
      "name": "Ремонт пральних машин",
      "icon": "WashingMachine",
      "short_description": "Усунемо будь-яку несправність за один візит",
      "long_description": "Ремонтуємо всі марки та моделі пральних машин. Діагностика безкоштовна, запчастини в наявності, гарантія 2 роки на роботу і деталі.",
      "cta": "Викликати майстра"
    },
    {
      "name": "Ремонт холодильників",
      "icon": "Refrigerator",
      "short_description": "Терміновий ремонт в день звернення",
      "long_description": "...",
      "cta": "Викликати майстра"
    },
    {
      "name": "Ремонт бойлерів",
      "icon": "Flame",
      "short_description": "Повернемо гарячу воду за кілька годин",
      "long_description": "...",
      "cta": "Викликати майстра"
    }
  ],

  "advantages": [
    {
      "title": "Виїзд за 2 години",
      "description": "Майстер приїде у зручний для вас час. Середній час очікування — 1.5 години по Дніпру.",
      "icon": "Clock"
    },
    {
      "title": "Безкоштовна діагностика",
      "description": "Визначимо причину поломки безкоштовно. Якщо відмовитесь від ремонту — платити нічого.",
      "icon": "Search"
    },
    {
      "title": "Гарантія 2 роки",
      "description": "На всі роботи та встановлені запчастини. Якщо поломка повториться — виправимо безкоштовно.",
      "icon": "Shield"
    },
    {
      "title": "Прозорі ціни",
      "description": "Називаємо точну вартість після діагностики, до початку ремонту. Ніяких доплат по факту.",
      "icon": "Receipt"
    }
  ],

  "audience": {
    "avatars": [
      {
        "name": "Олена",
        "age": 38,
        "situation": "Працююча мама двох дітей, зламалась пральна машина в суботу вранці. Гора білизни, потрібен ремонт сьогодні.",
        "looking_for": "Швидкий виїзд, нормальна ціна, щоб не треба було брати відгул",
        "fears": "Що скажуть одну ціну по телефону, а на місці назвуть іншу. Що затягнуть ремонт на тиждень.",
        "purchase_trigger": "Обіцянка виїзду сьогодні + безкоштовна діагностика знімає ризик"
      },
      {
        "name": "Андрій",
        "age": 52,
        "situation": "Зламався холодильник, продукти псуються. Дружина просить терміново вирішити.",
        "looking_for": "Надійний майстер з досвідом, не студент з YouTube",
        "fears": "Що поставлять неякісну запчастину і через місяць зламається знову",
        "purchase_trigger": "Гарантія 2 роки + відгуки реальних людей"
      }
    ],
    "objections": [
      {
        "objection": "А скільки коштує?",
        "answer": "Точну ціну називаємо після безкоштовної діагностики, до початку ремонту. Середній чек — 800-2500 грн залежно від поломки."
      },
      {
        "objection": "А може простіше купити нову?",
        "answer": "Ремонт в 3-5 разів дешевше за нову техніку. Майстер порадить чесно — якщо ремонт невигідний, ми скажемо."
      },
      {
        "objection": "А ви точно приїдете сьогодні?",
        "answer": "Так, середній час виїзду — 1.5 години. Якщо не зможемо сьогодні — скажемо одразу по телефону."
      }
    ]
  },

  "pages": [
    {
      "slug": "home",
      "name": "Головна",
      "purpose": "Конвертувати відвідувача в заявку. Показати що ми швидкі, надійні, з гарантією.",
      "sections": [
        {
          "type": "hero",
          "purpose": "За 3 секунди пояснити хто ми і чому обрати нас",
          "content": {
            "headline": "Ремонт побутової техніки за 2 години",
            "subheadline": "Виїзд, діагностика, гарантія 2 роки. Дніпро і область.",
            "cta_primary": "Викликати майстра",
            "cta_secondary": "Дізнатись вартість",
            "trust_line": "4.9★ на Google · 1200+ відремонтованих приладів"
          }
        },
        {
          "type": "advantages",
          "purpose": "Закрити головні сумніви відвідувача",
          "content": {
            "items": "ref:advantages"
          }
        },
        {
          "type": "services",
          "purpose": "Показати що ремонтуємо саме те, що зламалось у відвідувача",
          "content": {
            "items": "ref:services"
          }
        },
        {
          "type": "how_it_works",
          "purpose": "Зняти страх невідомості — показати простий процес",
          "content": {
            "steps": [
              {"step": 1, "title": "Залишаєте заявку", "description": "По телефону або на сайті. Описуєте проблему."},
              {"step": 2, "title": "Майстер приїжджає", "description": "Протягом 2 годин. Діагностика безкоштовна."},
              {"step": 3, "title": "Ремонт на місці", "description": "Називаємо ціну. Ремонтуємо одразу або привозимо запчастину."},
              {"step": 4, "title": "Гарантія 2 роки", "description": "Видаємо гарантійний талон. Будь-які питання — телефонуйте."}
            ]
          }
        },
        {
          "type": "testimonials",
          "purpose": "Соціальний доказ — реальні відгуки знімають сумніви",
          "content": {
            "items": "AI генерує 4-6 реалістичних відгуків на основі аватарів і послуг"
          }
        },
        {
          "type": "pricing",
          "purpose": "Прозорість цін — головне заперечення",
          "content": {
            "note": "Прайс-лист по видах техніки з діапазонами цін"
          }
        },
        {
          "type": "faq",
          "purpose": "Закрити залишкові заперечення",
          "content": {
            "items": "ref:audience.objections + додаткові технічні питання"
          }
        },
        {
          "type": "cta",
          "purpose": "Фінальний поштовх до дії",
          "content": {
            "headline": "Техніка зламалась? Вирішимо сьогодні.",
            "cta": "Викликати майстра",
            "trust": "Безкоштовна діагностика · Гарантія 2 роки"
          }
        }
      ]
    },
    {
      "slug": "services",
      "name": "Послуги",
      "purpose": "Деталізована інформація по кожній послузі для тих, хто хоче більше деталей перед заявкою",
      "sections": [
        {
          "type": "page_hero",
          "purpose": "Контекст сторінки",
          "content": {
            "headline": "Наші послуги",
            "description": "Ремонтуємо всі види побутової техніки з гарантією"
          }
        },
        {
          "type": "service_details",
          "purpose": "Розгорнутий опис кожної послуги",
          "content": {
            "items": "ref:services (розгорнуті версії)"
          }
        },
        {
          "type": "cta",
          "purpose": "Конверсія після вивчення послуг",
          "content": {
            "headline": "Знайшли свою поломку?",
            "cta": "Залишити заявку"
          }
        }
      ]
    },
    {
      "slug": "about",
      "name": "Про нас",
      "purpose": "Довіра через знайомство з командою і історією",
      "sections": "AI розгортає на основі бізнес-контексту"
    },
    {
      "slug": "contacts",
      "name": "Контакти",
      "purpose": "Всі способи зв'язку + карта",
      "sections": "AI розгортає стандартну структуру"
    }
  ],

  "visual_direction": {
    "style_recommendation": "Modern Clean — чисті лінії, багато повітря, акцент на довіру і професіоналізм. Не Hi-Tech (занадто холодний для ремонтного сервісу), не Minimalism (потрібні елементи довіри).",
    "color_palette": {
      "primary": {
        "hex": "#2563EB",
        "role": "Довіра, надійність, професіоналізм",
        "usage": "Кнопки, посилання, акценти"
      },
      "secondary": {
        "hex": "#0F172A",
        "role": "Серйозність, стабільність",
        "usage": "Заголовки, dark-секції"
      },
      "accent": {
        "hex": "#F59E0B",
        "role": "Увага, терміновість, енергія",
        "usage": "CTA-кнопки, важливі елементи, бейджі"
      },
      "background": "#FFFFFF",
      "muted": "#F8FAFC",
      "card": "#FFFFFF",
      "border": "#E2E8F0"
    },
    "visual_language": {
      "photo_style": "Реальні фото майстрів за роботою, чисті та світлі. Не стокові усміхнені люди.",
      "shapes": "Скруглені (rounded-xl), м'які тіні, без різких кутів — асоціація з надійністю",
      "textures": "Чистий, без текстур. Можливо легкий subtle grid на hero.",
      "animations": "Стримані — fade-in-up при скролі, плавні hover. Не flashy.",
      "decorative": "Мінімум декору. Іконки lucide-react, лінійні. Можливо subtle gradient на hero."
    }
  },

  "cta_strategy": {
    "primary_cta_text": "Викликати майстра",
    "secondary_cta_text": "Зателефонувати",
    "phone": "+380 XX XXX XX XX",
    "touchpoints": [
      "Hero — головний CTA",
      "Після переваг — повторний CTA",
      "Після відгуків — довіра → дія",
      "Фінальна CTA-секція",
      "Floating кнопка (фіксована)",
      "Header — телефон + кнопка"
    ]
  },

  "content_plan": {
    "available": ["Логотип"],
    "needed": ["Фото майстрів та роботи", "Тексти послуг", "Реальні відгуки"],
    "placeholder_strategy": "Для фото — використати якісні placeholder з описом що має бути. Тексти — AI генерує на основі бриду."
  },

  "language": "uk",
  "mobile_priority": true
}
```

---

## Крок 3: Перевірка (design.md)

### Команда: `/review-brief {project-id}`

Генерує `design.md` з `design.json` — людиночитану версію для перевірки. Показує в CLI з підсвіткою ключових рішень.

Формат `design.md` — структурований документ з усіма рішеннями, написаний зрозумілою мовою (не JSON). Має містити:
- Резюме проєкту (3-4 речення)
- Бренд: headline, slogan, key message
- Аудиторія: аватари в читабельному вигляді
- Структура сайту: сторінки → секції з описом
- Візуальний напрямок: стиль, кольори з поясненням, візуальна мова
- CTA стратегія
- Контент план

Мета — розробник читає і підтверджує АБО вказує що треба змінити.

---

## Крок 4: Редагування

### Команда: `/edit-brief {project-id}`

Два режими:
1. **Текстова правка** — розробник каже що змінити ("зміни primary колір на зелений", "додай сторінку Портфоліо"), AI оновлює `design.json` і перегенеровує `design.md`.
2. **Регенерація секції** — "перегенеруй секцію audience" — AI перегенеровує тільки вказану секцію `design.json`.

Після кожної правки `design.json` отримує новий `brief_version` і `expanded_at`.

---

## Промпт для розгортки (expand-brief.md)

```markdown
You are expanding a brief questionnaire into a complete design specification.

## Input
You will receive a brief.json file with simple client answers.

## Your Task
Generate a complete design.json following the exact schema in schemas/design.schema.json.

## Rules

### Brand
- Create a headline that communicates the core value in under 10 words
- Headline must answer: "What do you do and why should I care?"
- Slogan: 2-4 words, memorable, not generic
- Key message: 2-3 sentences that address the main audience pain point

### Audience Avatars
- Create 2-3 avatars based on the audience description
- Each avatar must have a SPECIFIC situation (not generic "wants good service")
- Fears must be SPECIFIC to this business (not generic "afraid of bad quality")
- Purchase trigger must connect a specific feature to a specific fear

### Page Structure
- For each page, define concrete sections with purpose and content
- Home page must follow the conversion funnel:
  Hook (hero) → Trust (advantages) → Offer (services) → Process (how it works) → Proof (testimonials) → Price (if applicable) → Objections (FAQ) → Action (CTA)
- Inner pages are simpler but each must have a clear purpose and CTA
- Every page ends with a CTA section

### Visual Direction
- Recommend a specific design style based on business type and mood
- Explain WHY this style fits (not just name it)
- Color palette must have psychological justification for each color
- Visual language must be specific: not "nice photos" but "real workplace photos, bright lighting, no stock"

### Content
- Generate realistic professional copy for ALL sections
- Texts must speak to the avatars' pain points and fears
- CTA texts must be action-oriented and specific (not "Learn more" but "Викликати майстра")
- Testimonials must sound like real people (reference specific services, situations)

### What NOT to Do
- Do NOT use generic marketing language ("лідер ринку", "найкращий сервіс")
- Do NOT leave any section as "AI will generate later" — generate everything NOW
- Do NOT suggest design styles that don't match the business (luxury for a plumber)
- Do NOT generate more than 8-10 sections per page — quality over quantity
```

---

## JSON Schema (brief.schema.json)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["id", "created_at", "status", "business", "audience", "website", "visual"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-z0-9-]+$",
      "description": "URL-friendly project identifier"
    },
    "created_at": {
      "type": "string",
      "format": "date-time"
    },
    "status": {
      "type": "string",
      "enum": ["draft", "expanded", "approved"]
    },
    "business": {
      "type": "object",
      "required": ["name", "description", "services", "usp"],
      "properties": {
        "name": { "type": "string" },
        "description": { "type": "string" },
        "services": { "type": "array", "items": { "type": "string" }, "minItems": 1 },
        "usp": { "type": "string" },
        "location": { "type": "string" }
      }
    },
    "audience": {
      "type": "object",
      "required": ["description", "problem", "objections"],
      "properties": {
        "description": { "type": "string" },
        "problem": { "type": "string" },
        "objections": { "type": "string" }
      }
    },
    "website": {
      "type": "object",
      "required": ["pages", "primary_action"],
      "properties": {
        "pages": { "type": "array", "items": { "type": "string" } },
        "primary_action": { "type": "string" },
        "special_features": { "type": "string" }
      }
    },
    "visual": {
      "type": "object",
      "required": ["mood"],
      "properties": {
        "references": { "type": "string" },
        "colors": { "type": "string" },
        "mood": { "type": "string" }
      }
    },
    "content": {
      "type": "object",
      "properties": {
        "existing_materials": { "type": "string" },
        "additional_notes": { "type": "string" }
      }
    }
  }
}
```

---

## Тестування Фази 1

### Тест-кейси (запустити мінімум 3):

1. **Сервісний бізнес**: Ремонт техніки (простий, зрозумілий)
2. **Креативний бізнес**: Фотостудія або дизайн-агенція (потрібен інший стиль)
3. **E-commerce**: Магазин косметики (каталог, фільтри, картки товарів)

### Критерії успіху:

| Критерій | Як перевірити |
|---|---|
| Час заповнення анкети ≤ 15 хв | Заміряти час |
| design.json повний (нема пустих полів) | Валідація по схемі |
| Аватари специфічні (не generic) | Прочитати — чи можна уявити цю людину? |
| Кольори обґрунтовані психологічно | Прочитати — чи зрозуміло ЧОМУ цей колір? |
| Стиль відповідає бізнесу | Порівняти стиль ремонтного сервісу vs фотостудії — різні? |
| Секції мають конкретний контент | Відкрити hero — є headline, subheadline, CTA, trust line? |
| Тексти говорять мовою аватара | Чи адресують конкретні страхи? |
| 3 проєкти дають різні результати | Порівняти design.json трьох проєктів |

### Команда для тесту:

```bash
# Проєкт 1
claude "/new-project remka-pro"
# Заповнити анкету
claude "/expand-brief remka-pro"
claude "/review-brief remka-pro"

# Проєкт 2
claude "/new-project foto-studio"
# Заповнити анкету
claude "/expand-brief foto-studio"
claude "/review-brief foto-studio"

# Порівняти design.json обох проєктів
```

---

## Що НЕ входить у Фазу 1

- UI / веб-інтерфейс — все через CLI
- База даних — JSON файли
- Генерація коду/дизайну — це Фаза 3
- Вибір стилю/патерну — це Фаза 2
- STYLE_PRESETS.md і SECTION_PATTERNS.md — створюються для Фази 2

---

## Наступний крок

Після успішного тестування Фази 1 на 3+ проєктах → повернутись для ТЗ Фази 2.
