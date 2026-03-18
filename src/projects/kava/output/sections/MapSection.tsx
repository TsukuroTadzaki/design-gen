'use client'

import { useEffect, useRef, useState } from 'react'
import { Navigation, MapPin, Clock, Phone } from 'lucide-react'
import { Button } from '@/core/ui/Button'

export default function MapSection() {
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
      className="relative bg-background py-20 md:py-32"
      aria-label="Розташування KavaBAR на карті"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Section Heading */}
        <div
          className={`mb-10 text-center transition-all duration-700 ease-out md:mb-14 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-6 opacity-0'
          }`}
        >
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
            Як нас знайти
          </h2>
        </div>

        {/* Map Container with Floating Card */}
        <div
          className={`relative transition-all delay-200 duration-700 ease-out ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Map Embed — full-width, tall */}
          <div className="overflow-hidden rounded-2xl shadow-md">
            <div className="relative h-[350px] w-full md:h-[450px] lg:h-[520px]">
              <iframe
                title="Розташування KavaBAR на карті"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.2!2d30.52!3d50.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDI3JzAwLjAiTiAzMMKwMzEnMTIuMCJF!5e0!3m2!1suk!2sua!4v1"
                className="h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Subtle overlay at edges for blend effect */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-border/20"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Floating Info Card — absolute on desktop, stacked on mobile */}
          <div className="mt-6 lg:absolute lg:bottom-8 lg:left-8 lg:mt-0 lg:max-w-sm">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-md backdrop-blur-sm md:p-8">
              {/* Address */}
              <div className="mb-5 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Адреса
                  </p>
                  <p className="text-sm font-medium leading-snug text-card-foreground md:text-base">
                    [Адреса закладу]
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="mb-5 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Графік
                  </p>
                  <p className="text-sm font-medium leading-snug text-card-foreground md:text-base">
                    Пн-Нд: 09:00 — 23:00
                  </p>
                  <p className="text-sm leading-snug text-muted-foreground">
                    Чт, Сб: до 00:00 (вечори подій)
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Телефон
                  </p>
                  <a
                    href="tel:+380XXXXXXXX"
                    className="text-sm font-medium leading-snug text-card-foreground transition-colors duration-200 hover:text-accent md:text-base"
                  >
                    +380 (XX) XXX-XX-XX
                  </a>
                </div>
              </div>

              {/* Route CTA */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=50.45,30.52"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button className="w-full rounded-full bg-accent px-10 py-4 font-medium text-accent-foreground transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
                  <Navigation className="mr-2 h-4 w-4" />
                  Прокласти маршрут
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Organic Wave Divider — next section is muted (contacts-socials) */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 60V35C180 15 360 5 540 10C720 15 900 35 1080 40C1200 43 1320 35 1380 30L1440 25V60H0Z"
            className="fill-muted"
          />
        </svg>
      </div>
    </section>
  )
}
