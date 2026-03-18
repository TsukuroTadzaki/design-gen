'use client'

import { useEffect, useRef, useState } from 'react'
import { Quote, Star, Heart, Briefcase, Users } from 'lucide-react'

const testimonials = [
  {
    id: 'marina',
    name: 'Марина, 26',
    text: 'Ходимо з хлопцем кожну суботу на живу музику. Еспресо мартіні тут найкращий, що я пила. І головне — можна нормально поговорити, не перекрикуючи колонки.',
    context: 'Постійна гостя, пара',
    icon: Heart,
    initials: 'М',
  },
  {
    id: 'oleksiy',
    name: 'Олексій, 39',
    text: 'Призначаю тут зустрічі з клієнтами. Атмосфера справляє враження — одразу видно, що місце з характером. Бариста порадив мені ефіопську каву, і тепер я не можу пити звичайний американо.',
    context: 'Ділові зустрічі',
    icon: Briefcase,
    initials: 'О',
  },
  {
    id: 'natalia',
    name: 'Наталія, 33',
    text: 'Нарешті знайшли кафе, де можна піти з дитиною і не сидіти серед аніматорів. Донька обожнює панакоту, а ми з чоловіком — лавандовий раф. Ідеальна неділя.',
    context: 'Сімейний візит',
    icon: Users,
    initials: 'Н',
  },
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
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
      { threshold: 0.15 }
    )

    const el = sectionRef.current
    if (el) observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const active = testimonials[activeIndex]

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-foreground py-20 md:py-32"
    >
      {/* Decorative organic blobs */}
      <div
        className="animate-organic-pulse absolute -left-32 -top-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="animate-organic-pulse absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Section heading */}
        <div
          className={`mb-16 text-center md:mb-20 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <h2 className="font-serif text-3xl font-semibold text-primary-foreground md:text-4xl lg:text-5xl">
            Що кажуть гості
          </h2>
        </div>

        {/* Featured testimonial — large avatar hero layout */}
        <div
          className={`flex flex-col items-center ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.2s' }}
        >
          {/* Large avatar with rating badge */}
          <div className="relative mb-8">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary/20 ring-4 ring-secondary/30 md:h-44 md:w-44 lg:h-48 lg:w-48">
              <span className="font-serif text-4xl font-semibold text-primary-foreground md:text-5xl lg:text-6xl">
                {active.initials}
              </span>
            </div>
            {/* Floating rating badge */}
            <div className="absolute -right-2 -top-1 flex items-center gap-1 rounded-full bg-accent px-3 py-1.5 shadow-md md:-right-3 md:-top-2">
              <Star className="h-3.5 w-3.5 fill-accent-foreground text-accent-foreground" />
              <span className="text-xs font-medium text-accent-foreground">5.0</span>
            </div>
          </div>

          {/* Quote icon */}
          <div className="mb-6">
            <Quote className="h-8 w-8 text-secondary/50 md:h-10 md:w-10" />
          </div>

          {/* Testimonial text */}
          <blockquote className="mb-8 max-w-2xl text-center">
            <p className="font-light leading-relaxed text-primary-foreground/90 text-lg md:text-xl lg:text-2xl">
              {active.text}
            </p>
          </blockquote>

          {/* Author info */}
          <div className="mb-2 flex items-center gap-3">
            <active.icon className="h-4 w-4 text-secondary" />
            <span className="font-serif text-lg font-semibold text-primary-foreground">
              {active.name}
            </span>
          </div>
          <span className="text-sm text-primary-foreground/60">
            {active.context}
          </span>
        </div>

        {/* Navigation dots */}
        <div className="mt-12 flex items-center justify-center gap-3 md:mt-16">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setActiveIndex(index)}
              aria-label={`Показати відгук від ${testimonial.name}`}
              className={`transition-all duration-300 ${
                index === activeIndex
                  ? 'h-3 w-8 rounded-full bg-accent'
                  : 'h-3 w-3 rounded-full bg-primary-foreground/30 hover:bg-primary-foreground/50'
              }`}
            />
          ))}
        </div>

        {/* Mini preview cards for other testimonials (desktop) */}
        <div className="mt-12 hidden gap-6 md:mt-16 md:grid md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setActiveIndex(index)}
              className={`group rounded-2xl border p-6 text-left transition-all duration-300 ${
                index === activeIndex
                  ? 'border-accent/40 bg-primary/20 shadow-md'
                  : 'border-primary-foreground/10 bg-primary-foreground/5 hover:border-secondary/30 hover:bg-primary/10'
              }`}
            >
              <div className="mb-3 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                    index === activeIndex
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-primary-foreground/10 text-primary-foreground/60 group-hover:bg-secondary/20'
                  }`}
                >
                  <span className="font-serif text-sm font-semibold">
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-primary-foreground/50">
                    {testimonial.context}
                  </p>
                </div>
              </div>
              <p className="line-clamp-2 text-sm leading-relaxed text-primary-foreground/70">
                {testimonial.text}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
