'use client'

import { useEffect, useRef, useState } from 'react'
import { Coffee, Wine, Cake, Mic, ArrowRight } from 'lucide-react'
import { Button } from '@/core/ui/Button'

const services = [
  {
    id: 'coffee',
    name: 'Кавові напої',
    icon: Coffee,
    description:
      'Від класичного еспресо до рідкісних рецептів з Ефіопії, Японії та Мексики',
    longDescription:
      'Наше меню — це подорож світом кави. Крім улюбленого капучіно та латте, ви спробуєте юаньян з Гонконгу, кавовий тонік зі Скандинавії, спайсі-моку з Мексики та десятки інших напоїв, які ваш бариста готує за автентичними рецептами. Кожен місяць — нові сезонні позиції.',
    cta: 'Переглянути меню кави',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
    imageAlt:
      'Бариста готує каву — крупний план рук та кавового обладнання у теплому освітленні',
  },
  {
    id: 'cocktails',
    name: 'Коктейлі',
    icon: Wine,
    description:
      'Авторські алкогольні та безалкогольні коктейлі на основі кави',
    longDescription:
      "Кава як основа для вишуканих коктейлів — це наша спеціалізація. Еспресо мартіні з ванільним лікером, холодний айріш з витриманим віскі, кавовий негроні з нотами апельсина. Кожен коктейль — це баланс кавового характеру та алкогольної м'якості, створений для неспішної бесіди.",
    cta: 'Дивитись коктейльну карту',
    image:
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=600&fit=crop',
    imageAlt:
      'Авторський кавовий коктейль у елегантному бокалі з кавовими зернами',
  },
  {
    id: 'desserts',
    name: 'Десерти',
    icon: Cake,
    description:
      'Тірамісу, тарти, чізкейки та сезонні солодощі — все свіже, все щодня',
    longDescription:
      'Наші десерти створені, щоб доповнювати каву, а не перебивати її. Класичний тірамісу з маскарпоне, шоколадний тарт з сіллю, чізкейк на основі кавового бісквіта, а для дітей — ніжні панакоти та молочні муси. Все свіже, все щодня.',
    cta: 'Подивитись десерти',
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=600&fit=crop',
    imageAlt:
      'Тірамісу та кавові десерти на дерев\'яній дошці у теплому світлі',
  },
  {
    id: 'events',
    name: 'Тематичні вечори',
    icon: Mic,
    description:
      'Поезія, музика або стендап на камерній сцені — щочетверга та щосуботи',
    longDescription:
      'Наша невеличка сцена — місце, де народжується магія. У четвер — літературні вечори та поетичні слеми. У суботу — живий джаз, акустика або стендап-комедія. Ніяких гучних колонок — тільки жива енергія виконавця та увага залу. Кількість місць обмежена, бронюйте заздалегідь.',
    cta: 'Дивитись розклад',
    image:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop',
    imageAlt:
      'Камерний живий виступ — музикант на невеликій сцені у теплому освітленні',
  },
]

export default function ServicesSection() {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set())
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-service-id')
            if (id) {
              setVisibleItems((prev) => new Set(prev).add(id))
              observer.unobserve(entry.target)
            }
          }
        })
      },
      { threshold: 0.2 }
    )

    const refs = itemRefs.current
    refs.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const setItemRef = (id: string, el: HTMLElement | null) => {
    if (el) {
      itemRefs.current.set(id, el)
    }
  }

  return (
    <section
      className="bg-muted py-20 md:py-32"
      aria-label="Послуги KavaBAR"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-16 text-center md:mb-20">
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
            Що вас чекає
          </h2>
        </div>

        {/* Alternating Service Blocks */}
        <div className="space-y-16 md:space-y-24 lg:space-y-32">
          {services.map((service, index) => {
            const isReversed = index % 2 !== 0
            const isVisible = visibleItems.has(service.id)

            return (
              <article
                key={service.id}
                ref={(el) => setItemRef(service.id, el)}
                data-service-id={service.id}
                className={`flex flex-col items-center gap-8 md:gap-12 lg:gap-16 ${
                  isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
                } transition-all duration-700 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
              >
                {/* Image */}
                <div className="w-full md:w-1/2">
                  <div className="group relative overflow-hidden rounded-2xl shadow-md">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    {/* Warm overlay on hover */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/5"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex w-full flex-col justify-center md:w-1/2">
                  {/* Icon */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <service.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>

                  {/* Name */}
                  <h3 className="mb-4 font-serif text-2xl font-semibold text-foreground md:text-3xl">
                    {service.name}
                  </h3>

                  {/* Short description */}
                  <p className="mb-4 text-lg font-light leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  {/* Long description */}
                  <p className="mb-8 text-base font-light leading-relaxed text-muted-foreground">
                    {service.longDescription}
                  </p>

                  {/* CTA */}
                  <div>
                    <Button
                      className="group/btn inline-flex items-center gap-2 rounded-full border border-primary bg-transparent px-8 py-3 font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                      variant="ghost"
                    >
                      {service.cta}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
