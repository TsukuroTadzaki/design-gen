'use client'

import { useEffect, useState } from 'react'
import { Coffee, Wine, GlassWater, Cake, UtensilsCrossed } from 'lucide-react'

const filters = [
  { label: 'Все', icon: UtensilsCrossed },
  { label: 'Кава', icon: Coffee },
  { label: 'Алкогольні коктейлі', icon: Wine },
  { label: 'Безалкогольні', icon: GlassWater },
  { label: 'Десерти', icon: Cake },
]

export default function MenuHeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState('Все')

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(timer)
  }, [])

  return (
    <section
      className="relative overflow-hidden bg-primary py-24 md:py-32 lg:py-36"
      aria-label="Меню KavaBAR"
    >
      {/* Floating organic shapes — hidden on mobile for performance */}
      <div
        className="animate-float absolute -top-16 -left-16 hidden h-72 w-72 rounded-full bg-secondary/10 blur-3xl md:block"
        style={{ animationDelay: '0s' }}
        aria-hidden="true"
      />
      <div
        className="animate-float absolute -right-20 -bottom-20 hidden h-80 w-80 rounded-full bg-accent/10 blur-3xl md:block"
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      />
      <div
        className="animate-organic-pulse absolute top-1/2 left-1/4 hidden h-48 w-48 -translate-y-1/2 rounded-full bg-secondary/8 blur-2xl lg:block"
        style={{ animationDelay: '1s' }}
        aria-hidden="true"
      />
      <div
        className="animate-float absolute right-1/4 top-1/4 hidden h-40 w-40 rounded-full bg-accent/6 blur-2xl lg:block"
        style={{ animationDelay: '3s' }}
        aria-hidden="true"
      />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-1000 ease-out ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Badge */}
          <span className="stagger-1 mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary backdrop-blur-sm">
            <Coffee className="h-3.5 w-3.5" />
            Смакуй світ
          </span>

          {/* Headline — serif per style tokens */}
          <h1 className="stagger-2 mb-5 font-serif text-4xl font-semibold leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl xl:text-7xl">
            Наше меню
          </h1>

          {/* Subheadline */}
          <p className="stagger-3 mx-auto mb-10 max-w-xl text-base font-light leading-relaxed text-primary-foreground/75 md:mb-14 md:text-lg lg:text-xl">
            Від класичного еспресо до авторських коктейлів — оберіть свій смак
          </p>

          {/* Filter tabs */}
          <div className="stagger-4">
            <nav
              className="inline-flex flex-wrap justify-center gap-2 md:gap-3"
              aria-label="Фільтри меню"
            >
              {filters.map((filter) => {
                const Icon = filter.icon
                const isActive = activeFilter === filter.label

                return (
                  <button
                    key={filter.label}
                    onClick={() => setActiveFilter(filter.label)}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 md:px-6 md:py-3 md:text-base ${
                      isActive
                        ? 'scale-[1.03] bg-accent text-accent-foreground shadow-md'
                        : 'border border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground/80 backdrop-blur-sm hover:scale-[1.03] hover:border-primary-foreground/40 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                    }`}
                    aria-pressed={isActive}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{filter.label}</span>
                    <span className="sm:hidden">
                      {filter.label === 'Алкогольні коктейлі'
                        ? 'Коктейлі'
                        : filter.label}
                    </span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Organic Wave Divider — bottom */}
      <div className="absolute right-0 bottom-0 left-0">
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
