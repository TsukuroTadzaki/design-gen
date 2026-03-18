# Задача: Виправити правило accent color в промпті

## Проблема

Поточне правило в `prompts/phase1/expand-brief.md` занадто жорстке — завжди штовхає accent в помаранчевий/amber при синьому primary. Це ламає естетику проектів де палітра має бути цілісною (водна тема, nature, luxury). Результат — два різні проекти отримали однаковий accent `#F59E0B`.

## Що зробити

В файлі `prompts/phase1/expand-brief.md` знайди блок `### Color Palette Rules` і заміни його повністю на новий:

```markdown
### Color Palette Rules

- Accent color MUST be visually distinguishable from primary on first glance. It must POP when used as a CTA button on both light and dark backgrounds.

- Two strategies for accent (choose based on project mood and brand):

  **Strategy A — COMPLEMENTARY CONTRAST:**
  Use a color from the opposite side of the color wheel.
  Blue primary → warm accent (amber, coral, orange).
  Green primary → warm accent (rose, red-orange).
  Red/warm primary → cool accent (teal, blue, emerald).
  Best for: projects where energy and urgency matter (services, lead generation, projects without strict brand palette).

  **Strategy B — PALETTE-NATIVE CONTRAST:**
  Stay within the same color family but shift hue, brightness or saturation enough to create clear visual distinction.
  Blue primary → vivid aquamarine, bright emerald, electric cyan.
  Green primary → vivid lime, bright teal.
  Warm primary → vivid gold, bright coral.
  Best for: projects where aesthetic cohesion matters (themed brands with water/nature/luxury mood, mono-palette designs, projects where client explicitly defined brand colors).

- **WHICH STRATEGY TO USE:**
  - If the client specified exact brand colors AND the mood/theme suggests visual cohesion (water, nature, luxury, minimalism) → Strategy B
  - If the project needs high conversion energy and the client did not restrict the palette → Strategy A
  - If unclear → use Strategy B as default (cohesion is safer), but add a note in visual_direction explaining the choice and mentioning that Strategy A is an alternative

- **HARD RULE:** NEVER use a darker or lighter shade of primary as accent. The accent must differ in HUE or SATURATION, not just LIGHTNESS.
  - WRONG: primary #3573E9 + accent #2B5EC5 (just darker blue)
  - WRONG: primary #0590DD + accent #0570AA (just darker)
  - CORRECT: primary #0590DD + accent #00E5CC (shifted hue to aquamarine, much brighter)
  - CORRECT: primary #3573E9 + accent #F59E0B (complementary warm)

- **VARIETY:** Do not default to the same accent color (#F59E0B) for every project. Choose accent based on the specific project's brand, mood, and palette context.
```

## Також оновити приклад

В файлі `schemas/examples/design.example.json` — якщо приклад використовує Barkas або водну тематику, оновити accent на palette-native варіант. Наприклад:

Замість:
```json
"accent": {
  "hex": "#F59E0B",
  "role": "Акцентний колір — бурштиновий/amber",
  "usage": "CTA кнопки, ціни, бейджі акцій..."
}
```

Поставити:
```json
"accent": {
  "hex": "#00E5CC",
  "role": "Акцентний колір — яскравий аквамарин",
  "usage": "CTA кнопки, ціни, бейджі акцій. Яскравий аквамарин зберігає водну тему палітри, але достатньо відрізняється від primary (#0590DD) і secondary (#01BFC4) по яскравості щоб привертати увагу до елементів дії."
}
```

Якщо приклад — DiVotek (корпоративний, без жорсткої палітри), amber залишається коректним.

## Перевірка

Після змін:
- [ ] В промпті є дві стратегії (Complementary і Palette-Native)
- [ ] Є правило вибору між стратегіями
- [ ] Hard rule забороняє lighter/darker shade
- [ ] Приклад відповідає правилам
- [ ] Перегенерувати `/expand-brief barkas` і перевірити що accent — НЕ amber, а щось з водної палітри
