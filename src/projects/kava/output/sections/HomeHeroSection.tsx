'use client'

import { useEffect, useRef, useState } from 'react'
import { ProjectLink as Link } from '@/core/lib/project-context'
import { ArrowRight, Calendar } from 'lucide-react'
import { Button } from '@/core/ui/Button'

export default function HomeHeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(timer)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] w-full overflow-hidden md:min-h-[65vh] lg:min-h-[70vh]"
      aria-label="Головний банер KavaBAR"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?auto=format&fit=crop&w=1920&q=80"
          alt="Інтер'єр KavaBAR — приглушене тепле світло, барна стійка з кавовим обладнанням та камерна атмосфера"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Dark Gradient Overlay — from bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/20" />

      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Decorative organic blob — top right */}
      <div
        className="animate-organic-pulse absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl md:h-96 md:w-96"
        aria-hidden="true"
      />

      {/* Content — positioned at bottom */}
      <div className="relative flex min-h-[70vh] items-end md:min-h-[65vh] lg:min-h-[70vh]">
        <div className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-6 md:pb-20 lg:px-8 lg:pb-24">
          <div
            className={`max-w-3xl transition-all duration-1000 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            {/* Badge */}
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent backdrop-blur-sm md:mb-6">
              <Calendar className="h-3.5 w-3.5" />
              Живі виступи: Чт та Сб
            </span>

            {/* Headline — serif per style tokens */}
            <h1 className="mb-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-primary-foreground md:mb-6 md:text-5xl lg:text-6xl xl:text-7xl">
              Зупинись. Вдихни аромат.
              <br />
              <span className="text-secondary">Насолоджуйся моментом.</span>
            </h1>

            {/* Subheadline */}
            <p className="mb-8 max-w-xl text-base font-light leading-relaxed text-primary-foreground/80 md:mb-10 md:text-lg lg:text-xl">
              Кава-бар із світовими рецептами та живими виступами щочетверга і
              щосуботи
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button
                asChild
                className="rounded-full bg-accent px-10 py-4 text-base font-medium text-accent-foreground shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              >
                <Link to="/contacts">
                  Забронювати столик
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-primary-foreground/30 bg-transparent px-10 py-4 text-base font-medium text-primary-foreground backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-primary-foreground/60 hover:bg-primary-foreground/10"
              >
                <Link to="/menu">Переглянути меню</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Organic Wave Divider — bottom */}
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
