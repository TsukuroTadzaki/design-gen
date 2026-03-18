'use client'

import { useEffect, useRef, useState } from 'react'
import { ClipboardEdit, PhoneCall, Coffee } from 'lucide-react'

const steps = [
  {
    id: 'step-1',
    number: 1,
    title: 'Залиште заявку',
    description:
      'Заповніть коротку форму на сайті — дата, час, кількість гостей',
    icon: ClipboardEdit,
  },
  {
    id: 'step-2',
    number: 2,
    title: 'Менеджер передзвонить',
    description:
      'Протягом 15 хвилин ми зателефонуємо, щоб підтвердити бронювання',
    icon: PhoneCall,
  },
  {
    id: 'step-3',
    number: 3,
    title: 'Насолоджуйтесь вечором',
    description:
      'Ваш столик чекає — залишається тільки прийти та обрати напій',
    icon: Coffee,
  },
]

export default function HowItWorksSection() {
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
      aria-label="Як забронювати столик"
    >
      {/* Decorative organic blob */}
      <div
        className="animate-organic-pulse pointer-events-none absolute right-0 top-0 h-80 w-80 -translate-y-1/3 translate-x-1/3 rounded-full bg-accent/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
            Як забронювати столик
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Horizontal connector line — visible only on desktop */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-8 hidden lg:block"
            aria-hidden="true"
          >
            <div className="mx-auto flex max-w-4xl items-center justify-between px-16">
              <div className="h-px w-full bg-border" />
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
            {steps.map((step, index) => (
              <article
                key={step.id}
                className={`group relative flex flex-col items-center text-center transition-all duration-500 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 150 + 100}ms` : '0ms',
                }}
              >
                {/* Step number badge */}
                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent bg-card font-serif text-xl font-semibold text-accent shadow-md transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-[1.03]">
                  {step.number}
                </div>

                {/* Card */}
                <div className="flex w-full flex-1 flex-col items-center rounded-2xl border border-border bg-card p-8 shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
                  {/* Icon */}
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <step.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 font-serif text-lg font-semibold text-card-foreground md:text-xl">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base font-light leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
