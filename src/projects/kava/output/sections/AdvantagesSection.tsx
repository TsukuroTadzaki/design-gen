'use client'

import { useEffect, useRef, useState } from 'react'
import { Globe, Lamp, Music, Martini, Heart } from 'lucide-react'

const advantages = [
  {
    id: 'world-coffee',
    title: 'Кава з усього світу',
    description:
      'Понад 30 рецептів з різних країн — від ефіопської церемоніальної кави до японського бруї',
    icon: Globe,
  },
  {
    id: 'atmosphere',
    title: 'Камерна атмосфера',
    description:
      'Кілька столів, приглушене світло — ідеально для розмов, побачень та ділових зустрічей',
    icon: Lamp,
  },
  {
    id: 'live-stage',
    title: 'Жива сцена',
    description:
      "Четвер — поезія, субота — музика або стендап. Камерно, близько, без бар'єру між залом та виконавцем",
    icon: Music,
  },
  {
    id: 'cocktails',
    title: 'Кавові коктейлі',
    description:
      'Алкогольні та безалкогольні коктейлі, де кава — головний герой',
    icon: Martini,
  },
  {
    id: 'desserts',
    title: 'Десерти для всієї родини',
    description:
      'Від тірамісу до дитячих панакот — свіжі солодощі кожного дня',
    icon: Heart,
  },
]

export default function AdvantagesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    const el = sectionRef.current
    if (el) observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-20 md:py-32"
      aria-label="Переваги KavaBAR"
    >
      {/* Decorative organic blob */}
      <div
        className="animate-organic-pulse pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
            Чому обирають нас
          </h2>
        </div>

        {/* Card Grid — 5 items: 3 top row + 2 bottom centered */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {advantages.map((item, index) => (
            <article
              key={item.id}
              className={`group w-full rounded-2xl border border-border bg-card p-8 shadow-md transition-all duration-500 hover:scale-[1.03] hover:shadow-lg sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100 + 100}ms` : '0ms',
              }}
            >
              {/* Icon */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                <item.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="mb-3 font-serif text-xl font-semibold text-card-foreground">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-base font-light leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
