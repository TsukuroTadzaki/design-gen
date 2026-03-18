'use client'

import { useEffect, useState } from 'react'
import { ProjectLink as Link } from '@/core/lib/project-context'
import { ArrowRight, Music, BookOpen, Mic } from 'lucide-react'
import { Button } from '@/core/ui/Button'

export default function EventsHeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(timer)
  }, [])

  return (
    <section
      className="relative w-full overflow-hidden bg-foreground"
      aria-label="Герой сторінки подій KavaBAR"
    >
      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Decorative organic blobs */}
      <div
        className="animate-organic-pulse absolute -top-32 -left-32 h-72 w-72 rounded-full bg-accent/8 blur-3xl md:h-96 md:w-96"
        aria-hidden="true"
      />
      <div
        className="animate-float absolute -right-20 bottom-20 h-56 w-56 rounded-full bg-secondary/10 blur-3xl md:h-80 md:w-80"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column — Text */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            {/* Badge */}
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent backdrop-blur-sm md:mb-6">
              <Mic className="h-3.5 w-3.5" />
              Четверги та суботи
            </span>

            {/* Headline — serif per style tokens */}
            <h1 className="mb-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-primary-foreground md:mb-6 md:text-5xl lg:text-6xl">
              Більше, ніж кава
            </h1>

            {/* Subheadline */}
            <p className="mb-8 max-w-lg text-base font-light leading-relaxed text-primary-foreground/80 md:mb-10 md:text-lg lg:text-xl">
              Щочетверга та щосуботи наша сцена оживає — поезія, музика,
              стендап. Камерно, близько, по-справжньому.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button
                asChild
                className="rounded-full bg-accent px-10 py-4 text-base font-medium text-accent-foreground shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              >
                <Link to="/contacts">
                  Забронювати на найближчу подію
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Stats row */}
            <div className="mt-10 flex flex-wrap gap-8 md:mt-12 md:gap-12">
              <div>
                <p className="font-serif text-2xl font-semibold text-secondary md:text-3xl">
                  50+
                </p>
                <p className="mt-1 text-sm font-light text-primary-foreground/60">
                  вечорів на рік
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl font-semibold text-secondary md:text-3xl">
                  30
                </p>
                <p className="mt-1 text-sm font-light text-primary-foreground/60">
                  камерних місць
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl font-semibold text-secondary md:text-3xl">
                  2
                </p>
                <p className="mt-1 text-sm font-light text-primary-foreground/60">
                  формати: слово і звук
                </p>
              </div>
            </div>
          </div>

          {/* Right Column — Image with floating elements */}
          <div
            className={`relative transition-all delay-200 duration-1000 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-md">
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
                alt="Живий виступ у KavaBAR — камерна сцена з музикантом у теплому приглушеному світлі"
                className="aspect-[4/5] w-full object-cover md:aspect-[3/4] lg:aspect-[4/5]"
              />

              {/* Gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
            </div>

            {/* Floating card — Thursday */}
            <div className="absolute -left-4 bottom-16 rounded-2xl border border-border/20 bg-card/90 p-4 shadow-md backdrop-blur-md md:-left-8 md:bottom-24 md:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">
                    Четверги — слово
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Поезія, проза, слеми
                  </p>
                </div>
              </div>
            </div>

            {/* Floating card — Saturday */}
            <div className="absolute -right-4 top-8 rounded-2xl border border-border/20 bg-card/90 p-4 shadow-md backdrop-blur-md md:-right-8 md:top-12 md:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20 text-secondary">
                  <Music className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">
                    Суботи — звук
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Джаз, акустика, стендап
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Organic Wave Divider — transition to next light section */}
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
            d="M0 60V30C120 10 240 0 360 5C480 10 600 30 720 35C840 40 960 30 1080 20C1200 10 1320 5 1380 5L1440 5V60H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  )
}
