'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqItems = [
  {
    id: 'alcohol',
    question: 'У вас мало алкоголю?',
    answer:
      'Ми фокусуємось на кавових коктейлях — і алкогольних, і безалкогольних. Еспресо мартіні, кавовий негроні, айріш — це витончені напої з глибиною, якої немає у звичайних коктейлях.',
  },
  {
    id: 'booking',
    question: 'Чи потрібно бронювати столик?',
    answer:
      'На тематичні вечори — рекомендуємо за 2-3 дні. У звичайні дні можна прийти без бронювання, але краще залишити заявку, щоб точно мати місце.',
  },
  {
    id: 'children',
    question: 'Чи можна прийти з дитиною?',
    answer:
      'Звичайно! У нас є десерти для дітей — панакота, молочні муси. Атмосфера спокійна, але привітна.',
  },
  {
    id: 'events-price',
    question: 'Скільки коштує вхід на виступи?',
    answer:
      'Вхід безкоштовний — він включений у вартість вашого замовлення. Просто забронюйте столик заздалегідь.',
  },
]

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null)
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

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-20 md:py-32"
      aria-label="Часті запитання"
    >
      {/* Decorative organic blob */}
      <div
        className="animate-organic-pulse pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-secondary/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
            Часті запитання
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openId === item.id

            return (
              <div
                key={item.id}
                className={`rounded-2xl border border-border bg-card shadow-sm transition-all duration-500 ${
                  isOpen ? 'shadow-md' : ''
                } ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100 + 100}ms` : '0ms',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-8 md:py-6"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <span className="font-serif text-lg font-semibold text-card-foreground md:text-xl">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    strokeWidth={2}
                  />
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-base font-light leading-relaxed text-muted-foreground md:px-8 md:pb-6">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
