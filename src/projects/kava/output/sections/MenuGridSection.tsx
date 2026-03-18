'use client'

import { useState, useEffect } from 'react'
import { Coffee, Wine, GlassWater, Cake, X, UtensilsCrossed } from 'lucide-react'
import { Button } from '@/core/ui/Button'
import { Badge } from '@/core/ui/Badge'

type MenuItem = {
  id: string
  name: string
  shortDescription: string
  price: string
  image: string
  imageAlt: string
  fullDescription: string
  ingredients: string
  allergens: string
  pairing: string
}

type Category = {
  id: string
  name: string
  icon: typeof Coffee
  items: MenuItem[]
}

const categories: Category[] = [
  {
    id: 'coffee',
    name: 'Кава',
    icon: Coffee,
    items: [
      {
        id: 'ethiopian',
        name: 'Ефіопська церемоніальна',
        shortDescription: 'Свіжообсмажена single origin, подача у джебені',
        price: 'від 120 ₴',
        image:
          'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&h=400&fit=crop',
        imageAlt: 'Ефіопська церемоніальна кава у традиційній джебені',
        fullDescription:
          'Унікальна кава з регіону Йіргачеффе, обсмажена до medium-light профілю, щоб розкрити квіткові та цитрусові ноти. Подається у традиційній глиняній джебені — автентичний ритуал, що перетворює каву на медитацію.',
        ingredients: 'Зерно Ефіопія Yirgacheffe, вода',
        allergens: 'Немає',
        pairing: 'Шоколадний тарт з морською сіллю',
      },
      {
        id: 'yuanyang',
        name: 'Юаньян',
        shortDescription: 'Гонконгський кавово-чайний напій з молоком',
        price: '95 ₴',
        image:
          'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop',
        imageAlt: 'Юаньян — кавово-чайний напій з молоком у склянці',
        fullDescription:
          'Гонконгська класика, що поєднує міцний чорний чай та еспресо з згущеним молоком. Результат — шовковистий напій з повним тілом, де кавова гіркота зустрічає чайну терпкість та молочну солодкість.',
        ingredients: 'Еспресо, чорний чай, згущене молоко',
        allergens: 'Молоко',
        pairing: 'Ванільна панакота з ягідним соусом',
      },
      {
        id: 'coffee-tonic',
        name: 'Кавовий тонік',
        shortDescription: 'Скандинавський рецепт — еспресо + тонік + лайм',
        price: '110 ₴',
        image:
          'https://images.unsplash.com/photo-1499961024560-4ec3ae89b43b?w=600&h=400&fit=crop',
        imageAlt: 'Кавовий тонік з лаймом та льодом у високому склянці',
        fullDescription:
          'Скандинавський хіт: подвійний еспресо повільно заливається на тонік з льодом. Кава створює каскадний ефект, а лайм додає цитрусову свіжість. Ідеальний літній напій для тих, хто шукає щось нове.',
        ingredients: 'Подвійний еспресо, тонік, лайм, лід',
        allergens: 'Немає',
        pairing: 'Чізкейк на кавовому бісквіті',
      },
    ],
  },
  {
    id: 'alcoholic',
    name: 'Алкогольні коктейлі',
    icon: Wine,
    items: [
      {
        id: 'espresso-martini',
        name: 'Еспресо мартіні',
        shortDescription: 'Горілка, кавовий лікер, свіжий еспресо, ванільний сироп',
        price: '220 ₴',
        image:
          'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop',
        imageAlt: 'Еспресо мартіні з кавовою пінкою у коктейльному бокалі',
        fullDescription:
          'Наш фірмовий коктейль: свіжозварений еспресо шейкується з преміум горілкою, кавовим лікером Kahlúa та краплею ванільного сиропу. Потрійна кавова пінка зверху — наша фішка.',
        ingredients: 'Горілка, кавовий лікер Kahlúa, свіжий еспресо, ванільний сироп',
        allergens: 'Алкоголь',
        pairing: 'Тірамісу з маскарпоне',
      },
      {
        id: 'coffee-negroni',
        name: 'Кавовий негроні',
        shortDescription: 'Джин, кампарі, солодкий вермут, cold brew',
        price: '240 ₴',
        image:
          'https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=600&h=400&fit=crop',
        imageAlt: 'Кавовий негроні з апельсиновою цедрою у рокс-склянці',
        fullDescription:
          'Класичний негроні з кавовим twist: cold brew настоюється на джині протягом 12 годин, потім змішується з кампарі та солодким вермутом. Апельсинова цедра підкреслює гіркуватий кавовий характер.',
        ingredients: 'Джин, кампарі, солодкий вермут, cold brew, апельсинова цедра',
        allergens: 'Алкоголь',
        pairing: 'Шоколадний тарт з морською сіллю',
      },
      {
        id: 'irish-coffee',
        name: 'Айріш кава',
        shortDescription: 'Витриманий віскі, гаряча кава, вершки',
        price: '200 ₴',
        image:
          'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&h=400&fit=crop',
        imageAlt: 'Айріш кава з шаром вершків у скляному келиху',
        fullDescription:
          "Класичний ірландський рецепт: гаряча кава з витриманим віскі Jameson, підсолоджена демерара-цукром. Зверху — холодні злегка збиті вершки, через які п'ється гарячий напій.",
        ingredients: 'Гаряча кава, ірландський віскі Jameson, демерара-цукор, вершки',
        allergens: 'Алкоголь, молоко',
        pairing: 'Панакота з ягідним соусом',
      },
    ],
  },
  {
    id: 'non-alcoholic',
    name: 'Безалкогольні',
    icon: GlassWater,
    items: [
      {
        id: 'lavender-raf',
        name: 'Лавандовий раф',
        shortDescription: 'Еспресо, вершки, лавандовий сироп',
        price: '130 ₴',
        image:
          'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&h=400&fit=crop',
        imageAlt: 'Лавандовий раф з ніжною пінкою у керамічній чашці',
        fullDescription:
          'Ніжний раф-кава з натуральним лавандовим сиропом: еспресо збивається з вершками та лавандою у єдину шовковисту текстуру. Квітковий аромат заспокоює, а кава тонізує — ідеальний баланс.',
        ingredients: 'Еспресо, вершки 11%, натуральний лавандовий сироп',
        allergens: 'Молоко',
        pairing: 'Чізкейк на кавовому бісквіті',
      },
      {
        id: 'coffee-smoothie',
        name: 'Кавовий смузі',
        shortDescription: 'Cold brew, банан, мигдальне молоко, мед',
        price: '140 ₴',
        image:
          'https://images.unsplash.com/photo-1553787499-6f9133860278?w=600&h=400&fit=crop',
        imageAlt: 'Кавовий смузі з бананом у високому склянці',
        fullDescription:
          'Поживний та освіжаючий: cold brew змішується з бананом, мигдальним молоком та медом у dense smoothie. Кавеїн + вітаміни + клітковина — повноцінний сніданок у склянці.',
        ingredients: 'Cold brew, банан, мигдальне молоко, мед, лід',
        allergens: 'Горіхи (мигдаль)',
        pairing: 'Фруктовий тарт з сезонними ягодами',
      },
    ],
  },
  {
    id: 'desserts',
    name: 'Десерти',
    icon: Cake,
    items: [
      {
        id: 'tiramisu',
        name: 'Тірамісу',
        shortDescription: 'Класичний рецепт з маскарпоне та савоярді',
        price: '160 ₴',
        image:
          'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=400&fit=crop',
        imageAlt: 'Класичний тірамісу з какао-пудрою на білій тарілці',
        fullDescription:
          'Італійська класика за автентичним рецептом: бісквіт савоярді просочений свіжозвареним еспресо та марсалою, шари крему з маскарпоне, яєчних жовтків та цукру. Зверху — щедрий шар какао-пудри.',
        ingredients: 'Маскарпоне, савоярді, еспресо, яєчні жовтки, цукор, какао, марсала',
        allergens: 'Молоко, яйця, глютен, алкоголь',
        pairing: 'Ефіопська церемоніальна кава',
      },
      {
        id: 'chocolate-tart',
        name: 'Шоколадний тарт',
        shortDescription: 'Чорний шоколад 70%, морська сіль, пісочна основа',
        price: '145 ₴',
        image:
          'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=400&fit=crop',
        imageAlt: 'Шоколадний тарт з морською сіллю та карамеллю',
        fullDescription:
          'Інтенсивний шоколадний ганаш з бельгійського чорного шоколаду 70% на крихкій пісочній основі. Кристали морської солі Maldon зверху розкривають глибину шоколаду та створюють контраст солодкого і солоного.',
        ingredients: 'Чорний шоколад 70%, вершкове масло, пісочне тісто, морська сіль Maldon',
        allergens: 'Молоко, глютен',
        pairing: 'Кавовий негроні або еспресо',
      },
      {
        id: 'panna-cotta',
        name: 'Панакота',
        shortDescription: 'Ніжна ванільна панакота з ягідним соусом',
        price: '120 ₴',
        image:
          'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop',
        imageAlt: 'Ванільна панакота з ягідним соусом на тарілці',
        fullDescription:
          'Класична італійська панакота з натуральною ванілі — ніжна, тремтлива, з ідеальною текстурою. Зверху — домашній соус із сезонних ягід. Легкий десерт, який обожнюють і дорослі, і діти.',
        ingredients: 'Вершки, ваніль, цукор, желатин, сезонні ягоди',
        allergens: 'Молоко',
        pairing: 'Юаньян або лавандовий раф',
      },
    ],
  },
]

const allCategoryId = 'all'

const filterTabs = [
  { id: allCategoryId, name: 'Все', icon: UtensilsCrossed },
  ...categories.map((c) => ({ id: c.id, name: c.name, icon: c.icon })),
]

export default function MenuGridSection() {
  const [activeCategory, setActiveCategory] = useState(allCategoryId)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const filteredItems =
    activeCategory === allCategoryId
      ? categories.flatMap((c) => c.items)
      : categories.find((c) => c.id === activeCategory)?.items ?? []

  const openDrawer = (item: MenuItem) => {
    setSelectedItem(item)
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedItem(null)
  }

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDrawerOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer()
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isDrawerOpen])

  return (
    <section className="bg-background py-20 md:py-32" aria-label="Меню KavaBAR">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Filter Tabs */}
        <div className="mb-12 md:mb-16">
          <nav
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-none md:mx-0 md:flex-wrap md:justify-center md:gap-3 md:px-0"
            aria-label="Фільтр категорій меню"
          >
            {filterTabs.map((tab) => {
              const isActive = activeCategory === tab.id
              const TabIcon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-accent text-accent-foreground shadow-md'
                      : 'border border-border bg-card text-muted-foreground hover:border-accent hover:text-accent'
                  }`}
                  aria-pressed={isActive}
                >
                  <TabIcon className="h-4 w-4" strokeWidth={1.5} />
                  {tab.name}
                  <Badge
                    variant={isActive ? 'secondary' : 'outline'}
                    className={`ml-1 text-xs ${isActive ? 'bg-accent-foreground/20 text-accent-foreground' : ''}`}
                  >
                    {tab.id === allCategoryId
                      ? categories.reduce((sum, c) => sum + c.items.length, 0)
                      : (categories.find((c) => c.id === tab.id)?.items.length ?? 0)}
                  </Badge>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {filteredItems.map((item, index) => (
            <article
              key={item.id}
              className={`stagger-${Math.min(index + 1, 6)} group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg`}
              onClick={() => openDrawer(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openDrawer(item)
                }
              }}
              aria-label={`${item.name} — ${item.price}. Натисніть для деталей`}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="aspect-[3/2] w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-110"
                  loading="lazy"
                />
                {/* Price badge */}
                <div className="absolute right-3 top-3">
                  <Badge
                    variant="accent"
                    className="rounded-full px-3 py-1 text-sm font-semibold shadow-md"
                  >
                    {item.price}
                  </Badge>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">
                  {item.name}
                </h3>
                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                  {item.shortDescription}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm transition-opacity"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      {/* Detail Drawer */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col overflow-y-auto bg-card shadow-2xl transition-transform duration-500 ease-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={selectedItem ? `Деталі: ${selectedItem.name}` : 'Деталі позиції'}
      >
        {selectedItem && (
          <>
            {/* Drawer Image */}
            <div className="relative">
              <img
                src={selectedItem.image}
                alt={selectedItem.imageAlt}
                className="aspect-[4/3] w-full object-cover"
              />
              {/* Close button */}
              <button
                onClick={closeDrawer}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-card cursor-pointer"
                aria-label="Закрити"
              >
                <X className="h-5 w-5" />
              </button>
              {/* Price badge */}
              <div className="absolute bottom-4 left-4">
                <Badge
                  variant="accent"
                  className="rounded-full px-4 py-2 text-base font-semibold shadow-lg"
                >
                  {selectedItem.price}
                </Badge>
              </div>
            </div>

            {/* Drawer Content */}
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <h3 className="mb-4 font-serif text-2xl font-semibold text-foreground md:text-3xl">
                {selectedItem.name}
              </h3>

              <p className="mb-6 text-base font-light leading-relaxed text-muted-foreground">
                {selectedItem.fullDescription}
              </p>

              {/* Details */}
              <div className="mb-8 space-y-4">
                <div className="rounded-2xl border border-border bg-muted/50 p-4">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Склад
                  </p>
                  <p className="text-sm text-foreground">
                    {selectedItem.ingredients}
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-muted/50 p-4">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Алергени
                  </p>
                  <p className="text-sm text-foreground">
                    {selectedItem.allergens}
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-muted/50 p-4">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Рекомендована пара
                  </p>
                  <p className="text-sm text-foreground">
                    {selectedItem.pairing}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-auto">
                <Button
                  className="w-full rounded-full bg-accent px-10 py-4 text-base font-medium text-accent-foreground transition-all duration-300 hover:bg-accent/90 hover:shadow-lg"
                  size="xl"
                >
                  Забронювати столик
                </Button>
              </div>
            </div>
          </>
        )}
      </aside>
    </section>
  )
}
