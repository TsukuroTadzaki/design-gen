'use client'

import { useEffect, useRef, useState } from 'react'
import { Instagram, Facebook, Send, ExternalLink } from 'lucide-react'
import { Button } from '@/core/ui/Button'

const socials = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    description: 'Фото атмосфери, новини меню та закулісся KavaBAR',
    url: 'https://instagram.com/kavabar',
    cta: 'Підписатись',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    description: 'Анонси подій, акції та спілкування з гостями',
    url: 'https://facebook.com/kavabar',
    cta: 'Слідкувати',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: Send,
    description: 'Розклад вечорів, бронювання та швидкий зв\'язок',
    url: 'https://t.me/kavabar',
    cta: 'Приєднатись',
  },
]

export default function SocialsSection() {
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
      className="relative overflow-hidden bg-muted py-20 md:py-32"
      aria-label="Ми в соцмережах"
    >
      {/* Decorative organic blob */}
      <div
        className="animate-organic-pulse pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
            Ми в соцмережах
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {socials.map((social, index) => (
            <article
              key={social.id}
              className={`group rounded-2xl border border-border bg-card p-8 shadow-md transition-all duration-500 hover:scale-[1.03] hover:shadow-lg ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 120 + 100}ms` : '0ms',
              }}
            >
              {/* Icon */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                <social.icon className="h-7 w-7" strokeWidth={1.5} />
              </div>

              {/* Platform Name */}
              <h3 className="mb-2 font-serif text-xl font-semibold text-card-foreground">
                {social.name}
              </h3>

              {/* Description */}
              <p className="mb-6 text-sm font-light leading-relaxed text-muted-foreground">
                {social.description}
              </p>

              {/* CTA Button */}
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-primary px-6 py-3 text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.cta} — ${social.name}`}
                >
                  {social.cta}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
