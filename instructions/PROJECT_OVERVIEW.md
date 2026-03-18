# Design Generator v2 — Project Overview

## Що це

Система для генерації повноцінних multi-page дизайнів сайтів (React + Tailwind + shadcn/ui). Від анкети клієнта до готового працюючого шаблону. Кожен згенерований сайт має бути візуально унікальним, стилістично цілісним і маркетингово ефективним.

## Ключова архітектурна проблема яку ми вирішуємо

LLM при вільній генерації дизайну завжди тяжіє до "безпечного середнього" — однакові компоновки, однакові стилі, однакові рішення. Причини:
1. **Контекстне витіснення** — коли модель тримає в контексті бриф + стилі + правила + вже згенерований код, документи з правилами витісняються кодом і модель переходить на автопілот
2. **Вільна інтерпретація** — текстовий опис стилю ("мінімалізм") кожен раз інтерпретується як найбільш ймовірний варіант
3. **Одночасність рішень** — коли модель одночасно вирішує структуру, стиль і контент, вона вибирає безпечний варіант по кожному

## Архітектурне рішення

### Три принципи

1. **Розділення рішень по фазах.** Спочатку визначаємо ЩО (бриф), потім ЯК (план зі стилем і патернами), потім ВИКОНУЄМО (генерація без свободи вибору). Чим пізніше фаза — тим менше свободи у моделі.

2. **Ізольований контекст.** Кожна секція генерується окремим викликом з чистим контекстом, де подаються тільки потрібні документи. Не один довгий сеанс, а оркестрація коротких.

3. **Вибір замість генерації.** Модель не "придумує" стиль і компоновку — вона вибирає з каталогу конкретних style presets (з токенами) і section patterns (з описом layout). Це дає реальне різноманіття між проектами.

### Три фази

```
ФАЗА 1: БРИФ                    ФАЗА 2: ПЛАН                      ФАЗА 3: ГЕНЕРАЦІЯ
                                                                    
Прості відповіді → Повне ТЗ      ТЗ → Структура + Дизайн-план      План → Готовий код
                                                                    
Етапи:                           Етапи:                             Етапи:
1.1 Анкета (14 питань)           2.1 Структура сторінок             3.1 styles.css
1.2 AI розгортає в design.json       (які секції, яка воронка)      3.2 Header + Footer
1.3 Людина перевіряє             2.2 Вибір стилю                    3.3 Home (секція за секцією)
1.4 Правки якщо потрібно             (style preset з токенами)      3.4 Погодження → design-ref
                                 2.3 Вибір патернів                 3.5 Внутрішні сторінки
Вхід: людина                         (layout кожної секції)             (секція за секцією)
Вихід: brief.json + design.json  2.4 Людина перевіряє               
                                                                    Вхід: plan.json + design.json
                                 Вхід: design.json                       + style preset
                                 Вихід: structure.json                   + section patterns
                                        + plan.json                      + design-reference.md
                                                                    Вихід: готовий проект
```

---

## Файлова структура проекту

```
design-generator-v2/
│
├── CLAUDE.md                              # ← ТИ ТУТ. Головні правила для Claude CLI.
├── PROJECT_OVERVIEW.md                    # Цей документ. Загальний контекст системи.
│
├── docs/                                  # Бібліотека знань (read-only під час генерації)
│   ├── STYLE_PRESETS.md                   # Каталог стилів з КОНКРЕТНИМИ токенами
│   │                                      #   (border-radius, shadow, typography, hover...)
│   │                                      #   Фаза 2 вибирає з цього каталогу
│   ├── SECTION_PATTERNS.md                # Каталог layout-патернів для кожного типу секцій
│   │                                      #   (Hero: 5-8 варіантів, Features: 5-8, etc.)
│   │                                      #   Фаза 2 вибирає з цього каталогу
│   ├── DESIGN_PRINCIPLES.md               # Креативні/маркетингові принципи
│   ├── LEARNED_RULES.md                   # Конденсовані правила з минулих ітерацій
│   ├── TECH_GUIDE.md                      # Технічні обмеження (React, Tailwind, shadcn)
│   │                                      #   Еволюція AI_AGENT_GUIDE.md — тільки tech rules
│   └── case-studies/                      # Історія проектів для навчання
│       └── {project-id}/
│           ├── DESIGN.md                  # Архівний бриф
│           └── CHANGELOG.md               # Що виправлялось і чому
│
├── schemas/                               # JSON Schema для валідації
│   ├── brief.schema.json                  # Схема brief.json (вхід Фази 1)
│   ├── design.schema.json                 # Схема design.json (вихід Фази 1)
│   ├── structure.schema.json              # Схема structure.json (вихід Фази 2.1)
│   ├── plan.schema.json                   # Схема plan.json (вихід Фази 2.2)
│   └── examples/                          # Приклади заповнених файлів
│       ├── brief.example.json
│       ├── design.example.json
│       ├── structure.example.json
│       └── plan.example.json
│
├── prompts/                               # Промпти для кожного етапу
│   ├── phase1/
│   │   ├── expand-brief.md                # brief.json → design.json
│   │   └── generate-md.md                 # design.json → design.md (для людського читання)
│   ├── phase2/
│   │   ├── create-structure.md            # design.json → structure.json
│   │   ├── select-style.md                # design.json → вибір style preset
│   │   ├── select-patterns.md             # structure.json + style → вибір патернів
│   │   └── create-plan.md                 # Фінальний plan.json
│   └── phase3/
│       ├── generate-styles-css.md         # plan.json → styles.css
│       ├── generate-header.md             # plan.json + styles.css → Header.tsx
│       ├── generate-footer.md             # plan.json + styles.css → Footer.tsx
│       ├── generate-section.md            # plan.json + style preset + pattern → Section.tsx
│       ├── extract-design-reference.md    # Готова Home → design-reference.md
│       └── compose-page.md                # Секції → Page.tsx
│
├── projects/                              # Робочі проекти (кожен — окрема папка)
│   └── {project-id}/
│       │
│       │  # Фаза 1: Бриф
│       ├── brief.json                     # Сирі відповіді анкети
│       ├── design.json                    # Розгорнуте ТЗ
│       ├── design.md                      # Людиночитана версія design.json
│       │
│       │  # Фаза 2: План
│       ├── structure.json                 # Сторінки → секції → воронка
│       ├── plan.json                      # Фінальний план: стиль + патерн кожної секції
│       │
│       │  # Фаза 3: Генерація
│       ├── design-reference.md            # Дизайн-токени витягнуті з готової Home
│       └── output/                        # Згенерований код
│           ├── project.config.ts
│           ├── styles.css
│           ├── components/
│           ├── sections/
│           │   ├── Header.tsx
│           │   ├── Footer.tsx
│           │   ├── HeroSection.tsx
│           │   └── ...
│           ├── pages/
│           │   ├── Home.tsx
│           │   ├── About.tsx
│           │   └── ...
│           └── data/
│
├── .claude/
│   └── commands/                          # CLI команди
│       │  # Фаза 1
│       ├── new-project.md                 # Створити проект + анкета
│       ├── expand-brief.md                # brief.json → design.json
│       ├── review-brief.md                # Показати design.md для перевірки
│       ├── edit-brief.md                  # Внести правки
│       │
│       │  # Фаза 2
│       ├── create-plan.md                 # design.json → structure.json + plan.json
│       ├── review-plan.md                 # Показати план для перевірки
│       ├── edit-plan.md                   # Внести правки в план
│       │
│       │  # Фаза 3
│       ├── generate-design.md             # Оркестратор: послідовно генерує все
│       ├── generate-section.md            # Генерація однієї секції (для ручного контролю)
│       └── extract-reference.md           # Витягнути design-reference з готової Home
│
└── scripts/                               # Утиліти
    ├── validate.ts                        # Валідація JSON по схемах
    ├── generate-md.ts                     # JSON → Markdown
    └── extract-rules.ts                   # Changelog → LEARNED_RULES.md
```

---

## Потік даних між фазами

```
ФАЗА 1                    ФАЗА 2                    ФАЗА 3

brief.json ──────► design.json ──────► structure.json
(14 відповідей)    (повне ТЗ)          (сторінки + секції)
                       │                     │
                       │                     ▼
                       │               plan.json ◄──── STYLE_PRESETS.md
                       │               (стиль +        SECTION_PATTERNS.md
                       │                патерни)
                       │                     │
                       ▼                     ▼
                  design.md            Для кожної секції:
                  (для людини)         ┌──────────────────────┐
                                       │ Контекст виклику:    │
                                       │ • plan.json (секція) │
                                       │ • style preset       │
                                       │ • section pattern    │
                                       │ • design.json (part) │
                                       │ • styles.css         │
                                       │ • LEARNED_RULES.md   │
                                       │ • TECH_GUIDE.md      │
                                       └──────────┬───────────┘
                                                  │
                                                  ▼
                                            Section.tsx
                                            (ізольована
                                             генерація)
```

---

## Ключові JSON файли і їх зв'язок

### brief.json (Фаза 1 input)
Сирі відповіді. 14 полів в 5 блоках. Заповнюється людиною.

### design.json (Фаза 1 output → Фаза 2 input)
Повне ТЗ. AI розгортає brief у:
- Бренд (headline, slogan, positioning, key message)
- Послуги (деталізовані, з текстами і CTA)
- Переваги (з іконками і описами)
- Аватари аудиторії (конкретні персони з болями і тригерами)
- Заперечення з відповідями
- Сторінки зі структурою секцій і КОНТЕНТОМ кожної секції
- Візуальний напрямок (стиль, палітра з психологією, візуальна мова)
- CTA стратегія
- Контент план

### structure.json (Фаза 2 output)
Архітектура сайту:
```json
{
  "pages": [
    {
      "slug": "home",
      "sections": [
        { "id": "home-hero", "type": "hero", "purpose": "..." },
        { "id": "home-advantages", "type": "advantages", "purpose": "..." }
      ]
    }
  ],
  "funnel": {
    "awareness": ["home-hero"],
    "interest": ["home-advantages", "home-services"],
    "desire": ["home-testimonials", "home-pricing"],
    "action": ["home-cta", "floating-contact"]
  }
}
```

### plan.json (Фаза 2 output → Фаза 3 input)
Фінальний план з КОНКРЕТНИМИ рішеннями:
```json
{
  "style": {
    "preset_id": "modern-clean",
    "tokens": {
      "border_radius": "rounded-xl",
      "shadow": "shadow-lg",
      "hover_effect": "scale(1.02) + shadow-xl",
      "heading_weight": "font-bold",
      "body_weight": "font-normal",
      "decorative": "subtle gradient mesh",
      "card_style": "bg-card rounded-xl shadow-lg p-6",
      "button_primary": "bg-accent text-white rounded-xl px-8 py-3",
      "button_secondary": "border-2 border-primary rounded-xl px-8 py-3"
    }
  },
  "sections": [
    {
      "id": "home-hero",
      "pattern_id": "H-02",
      "pattern_name": "Full-Bleed Editorial",
      "why": "Сервісний бізнес — потрібно одразу показати довіру і професіоналізм",
      "content_ref": "design.json → pages[0].sections[0].content",
      "style_notes": "Overlay на фото, CTA accent color, trust line під кнопкою"
    },
    {
      "id": "home-advantages",
      "pattern_id": "F-03",
      "pattern_name": "Icon Grid with Accent Numbers",
      "why": "4 переваги — ідеально для 2x2 grid з великими іконками",
      "content_ref": "design.json → advantages",
      "style_notes": "Muted background, великі іконки, короткі тексти"
    }
  ]
}
```

### design-reference.md (Фаза 3, після Home)
Токени дизайну витягнуті з РЕАЛЬНОГО коду готової Home:
```markdown
## Card Style
- border-radius: rounded-2xl
- shadow: shadow-lg
- hover: scale(1.02) + shadow-xl

## Button Style
- primary: bg-accent rounded-xl px-8 py-3
- secondary: border-2 border-primary rounded-xl

## Typography Applied
- hero: text-5xl md:text-7xl font-bold
- section heading: text-3xl md:text-4xl font-semibold
- body: text-lg text-muted-foreground
```
Використовується для генерації внутрішніх сторінок щоб вони були візуально ідентичні Home.

---

## Каталоги (docs/)

### STYLE_PRESETS.md — каталог стилів

НЕ текстові описи, а КОНКРЕТНІ токени для кожного стилю:

```markdown
## SP-01: Modern Clean
border-radius: rounded-xl
shadows: shadow-lg, shadow-xl on hover
typography: sans-serif, font-bold headers, font-normal body
spacing: generous (py-20 md:py-28)
decorative: subtle gradients, clean lines
cards: bg-card rounded-xl shadow-lg
buttons: rounded-xl, solid fill primary, outline secondary
hover: scale(1.02) + shadow increase
backgrounds: white → muted → white alternation
best_for: services, SaaS, corporate, medical

## SP-02: Brutalist Editorial
border-radius: rounded-none (все квадратне)
shadows: none (тільки borders)
typography: mono headers або bold sans, контраст розмірів 4:1+
spacing: нерівномірний, навмисна асиметрія
decorative: товсті borders, uppercase labels, raw textures
cards: border-2 border-foreground, no shadow, no radius
buttons: square, uppercase, border-2, no radius
hover: color invert, різкий (не плавний)
backgrounds: solid color blocks, різкі переходи
best_for: creative agencies, fashion, art, portfolios

...15-20 пресетів
```

### SECTION_PATTERNS.md — каталог layout-патернів

По 5-8 патернів для кожного типу секції. Структурний опис (не код):

```markdown
## Hero Patterns

### H-01: Split Asymmetric (60/40)
Layout: текст ліворуч 60%, медіа праворуч 40%
Медіа виходить за контейнер (overflow-hidden)
CTA з мікро-анімацією під заголовком
Best for: corporate, SaaS, agencies

### H-02: Full-Bleed Editorial
Layout: повноекранне фото фоном, overlay
Текст по центру, мінімум елементів
Scroll indicator внизу
Best for: luxury, HoReCa, fashion, real estate

...
```

---

## Технічний стек генерованого коду

Код який генерується у Фазі 3 використовує:
- **React 19** + TypeScript
- **Tailwind CSS 4** (utility classes only, no config)
- **shadcn/ui** (Button, Card, Dialog, Sheet, Badge, Input з @/core/ui/)
- **lucide-react** (іконки, одна бібліотека на секцію)
- **framer-motion** (тільки для складних анімацій, CSS transitions для простих)
- Секції самостійні (no props, hardcoded content)
- Сторінки = композиція секцій (no logic)
- CSS variables через `html[data-project="xxx"]` selector

Повні технічні правила — в `docs/TECH_GUIDE.md`.

---

## Поточний стан розробки

| Компонент | Статус | Примітки |
|---|---|---|
| Фаза 1: Бриф | 🔵 В розробці | ТЗ готове, реалізація в процесі |
| Фаза 2: План | ⚪ Очікує | Залежить від STYLE_PRESETS.md і SECTION_PATTERNS.md |
| Фаза 3: Генерація | ⚪ Очікує | Залежить від тестування Фаз 1 і 2 |
| STYLE_PRESETS.md | ⚪ Очікує | Буде створений з існуючого STYLES.md |
| SECTION_PATTERNS.md | ⚪ Очікує | Буде витягнутий з 6000 існуючих секцій |
| LEARNED_RULES.md | ✅ Готовий | Скопіювати з існуючого генератора |
| TECH_GUIDE.md | ⚪ Очікує | Еволюція AI_AGENT_GUIDE.md (тільки tech) |
| Case studies | ✅ Готові | Скопіювати з існуючого генератора |

## Порядок розробки

1. **Зараз** — реалізувати Фазу 1, протестувати на 3 проектах
2. **Після тестування Фази 1** — створити STYLE_PRESETS.md і SECTION_PATTERNS.md, реалізувати Фазу 2
3. **Після тестування Фази 2** — реалізувати Фазу 3 з ізольованими викликами
4. **Після повного циклу** — оптимізація, потім міграція на API + веб-інтерфейс

---

## Міграція на веб-інтерфейс (майбутнє)

Архітектура спроектована з розрахунком на міграцію:

| CLI (зараз) | Web + API (потім) |
|---|---|
| JSON файли | PostgreSQL / SQLite |
| brief.json | таблиця `briefs` |
| design.json | таблиця `designs` |
| plan.json | таблиця `plans` |
| Claude CLI виклики | Anthropic API виклики |
| Один виклик на секцію (CLI) | Один API call на секцію (повний контроль контексту) |
| Ручний оркестратор (bash) | Node.js/Python оркестратор |
| Файлова система для коду | Файлова система або S3 для коду |

JSON Schema які ми визначаємо зараз стануть валідацією на API рівні. Промпти з `/prompts` стануть system prompts в API викликах. Структура залишиться тою ж — зміниться тільки транспорт.
