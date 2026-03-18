'use client'

import { useEffect, useRef, useState } from 'react'
import { Calendar, Clock, Mic, BookOpen, ArrowRight } from 'lucide-react'
import { Button } from '@/core/ui/Button'

const events = [
  {
    id: 'poetry-slam',
    date: '20',
    month: 'березня',
    day: 'Четвер',
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
    day: 'Субота',
    title: 'Акустичний вечір — Дмитро Шуров',
    description:
      'Фортепіано, голос та кава. Інтимний сет від відомого музиканта.',
    time: '20:00',
    category: 'sound' as const,
    icon: Mic,
    cta: 'Забронювати',
  },
  {
    id: 'prose-reading',
    date: '27',
    month: 'березня',
    day: 'Четвер',
    title: 'Читання прози: сучасні українські автори',
    description: 'Три автори, три уривки, одна розмова після.',
    time: '19:00',
    category: 'word' as const,
    icon: BookOpen,
    cta: 'Забронювати',
  },
]

export default function UpcomingEventsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-muted py-20 md:py-32"
    >
      {/* Decorative organic blob */}
      <div
        className="animate-organic-pulse absolute -right-40 top-1/4 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`mb-12 md:mb-16 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
                Найближчі події
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                Щочетверга — літературні вечори та поетичні слеми. Щосуботи —
                жива музика або стендап. Кількість місць обмежена.
              </p>
            </div>
            <a
              href="/events"
              className="group hidden items-center gap-2 whitespace-nowrap font-medium text-accent transition-colors hover:text-accent/80 md:flex"
            >
              Дивитись всі події
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Event list */}
        <div className="flex flex-col gap-4 md:gap-5">
          {events.map((event, index) => (
            <article
              key={event.id}
              className={`group rounded-2xl border border-border bg-card p-5 shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg md:p-0 ${
                isVisible ? `stagger-${index + 1}` : 'opacity-0'
              }`}
            >
              {/* Desktop: horizontal flex layout */}
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-0">
                {/* Date badge */}
                <div className="flex items-center gap-4 md:w-48 md:flex-col md:gap-1 md:border-r md:border-border md:py-8 lg:w-56">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-accent/10 md:h-16 md:w-16">
                    <span className="font-serif text-2xl font-semibold text-accent md:text-3xl">
                      {event.date}
                    </span>
                  </div>
                  <div className="md:text-center">
                    <p className="text-sm font-medium text-foreground">
                      {event.month}
                    </p>
                    <p className="text-xs text-muted-foreground">{event.day}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 md:px-6 md:py-8 lg:px-8">
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                        event.category === 'word'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-accent/10 text-accent'
                      }`}
                    >
                      <event.icon className="h-3 w-3" />
                      {event.category === 'word' ? 'Слово' : 'Звук'}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground md:text-xl">
                    {event.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {event.description}
                  </p>
                </div>

                {/* CTA button */}
                <div className="md:pr-6 lg:pr-8">
                  <Button
                    className="w-full rounded-full bg-accent px-8 py-3 font-medium text-accent-foreground transition-all duration-300 hover:scale-[1.03] hover:shadow-md md:w-auto"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {event.cta}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center md:hidden">
          <a
            href="/events"
            className="group inline-flex items-center gap-2 font-medium text-accent transition-colors hover:text-accent/80"
          >
            Дивитись всі події
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
