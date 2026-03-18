'use client'

import { useEffect, useRef, useState } from 'react'
import { Calendar, BookOpen, Mic, Music, Clock, MapPin } from 'lucide-react'
import { Button } from '@/core/ui/Button'

type Category = 'all' | 'word' | 'sound'

const categories: { id: Category; label: string; description: string }[] = [
  {
    id: 'all',
    label: 'Усі події',
    description: '',
  },
  {
    id: 'word',
    label: 'Четверги — слово',
    description:
      'Літературні вечори, поетичні слеми, читання прози. Тут слова мають вагу, а тиша між ними — цінність.',
  },
  {
    id: 'sound',
    label: 'Суботи — звук',
    description:
      'Живий джаз, акустичні сети, стендап-комедія. Сцена на відстані витягнутої руки — ви не дивитесь виступ, ви в ньому.',
  },
]

const events = [
  {
    id: 'poetry-slam',
    date: '20',
    month: 'березня',
    dayLabel: 'Чт, 20 березня',
    title: 'Поетичний слем «Нічна зміна»',
    description:
      'Відкритий мікрофон для поетів. 5 хвилин, один голос, без фільтрів.',
    time: '19:00',
    category: 'word' as const,
    icon: BookOpen,
    cta: 'Забронювати',
  },
  {
    id: 'acoustic-shurov',
    date: '22',
    month: 'березня',
    dayLabel: 'Сб, 22 березня',
    title: 'Акустичний вечір — Дмитро Шуров',
    description:
      'Фортепіано, голос та кава. Інтимний сет від відомого музиканта.',
    time: '20:00',
    category: 'sound' as const,
    icon: Music,
    cta: 'Забронювати',
  },
  {
    id: 'prose-reading',
    date: '27',
    month: 'березня',
    dayLabel: 'Чт, 27 березня',
    title: 'Читання прози: сучасні українські автори',
    description: 'Три автори, три уривки, одна розмова після.',
    time: '19:00',
    category: 'word' as const,
    icon: BookOpen,
    cta: 'Забронювати',
  },
]

export default function EventsScheduleSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const el = sectionRef.current
    if (el) observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [])

  const filteredEvents =
    activeCategory === 'all'
      ? events
      : events.filter((e) => e.category === activeCategory)

  const activeDescription =
    categories.find((c) => c.id === activeCategory)?.description || ''

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-20 md:py-32"
    >
      {/* Decorative organic blob */}
      <div
        className="animate-organic-pulse absolute -left-32 top-1/3 h-64 w-64 rounded-full bg-secondary/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="animate-float absolute -right-24 bottom-1/4 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`mb-10 md:mb-14 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
            Розклад
          </h2>
        </div>

        {/* Filter tabs */}
        <div
          className={`mb-8 md:mb-12 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-accent text-accent-foreground shadow-md'
                    : 'border border-border bg-card text-foreground hover:border-accent/40 hover:bg-accent/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Category description */}
          {activeDescription && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {activeDescription}
            </p>
          )}
        </div>

        {/* Event card grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event, index) => (
            <article
              key={event.id}
              className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg ${
                isVisible ? `stagger-${index + 1}` : 'opacity-0'
              }`}
            >
              {/* Card image area with category badge */}
              <div className="relative h-48 overflow-hidden bg-secondary/20">
                {/* Placeholder atmospheric image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-primary/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <event.icon className="h-16 w-16 text-secondary/60" />
                </div>

                {/* Category badge overlay */}
                <div className="absolute left-4 top-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${
                      event.category === 'word'
                        ? 'bg-primary/80 text-primary-foreground'
                        : 'bg-accent/80 text-accent-foreground'
                    }`}
                  >
                    <event.icon className="h-3 w-3" />
                    {event.category === 'word' ? 'Слово' : 'Звук'}
                  </span>
                </div>

                {/* Date badge overlay */}
                <div className="absolute right-4 top-4">
                  <div className="flex flex-col items-center rounded-xl bg-card/90 px-3 py-2 shadow-md backdrop-blur-sm">
                    <span className="font-serif text-2xl font-semibold leading-none text-foreground">
                      {event.date}
                    </span>
                    <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {event.month}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-lg font-semibold text-foreground md:text-xl">
                  {event.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {event.description}
                </p>

                {/* Metadata */}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {event.dayLabel}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {event.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    KavaBAR
                  </span>
                </div>

                {/* CTA */}
                <div className="mt-5">
                  <Button className="w-full rounded-full bg-accent px-8 py-3 font-medium text-accent-foreground transition-all duration-300 hover:scale-[1.03] hover:shadow-md">
                    <Mic className="mr-2 h-4 w-4" />
                    {event.cta}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filteredEvents.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              Подій у цій категорії поки немає
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
