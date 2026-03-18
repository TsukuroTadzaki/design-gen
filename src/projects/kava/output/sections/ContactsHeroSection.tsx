'use client'

import { useEffect, useState } from 'react'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'

export default function ContactsHeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(timer)
  }, [])

  const contactItems = [
    {
      id: 'address',
      icon: MapPin,
      label: 'Адреса',
      value: '[Адреса закладу]',
    },
    {
      id: 'phone',
      icon: Phone,
      label: 'Телефон',
      value: '+380 (XX) XXX-XX-XX',
      href: 'tel:+380XXXXXXXX',
    },
    {
      id: 'hours',
      icon: Clock,
      label: 'Графік роботи',
      value: 'Пн-Нд: 09:00 — 23:00 | Чт, Сб: до 00:00',
    },
    {
      id: 'email',
      icon: Mail,
      label: 'Email',
      value: 'hello@kavabar.ua',
      href: 'mailto:hello@kavabar.ua',
    },
  ]

  return (
    <section
      className="relative min-h-[60vh] w-full overflow-hidden md:min-h-[55vh] lg:min-h-[65vh]"
      aria-label="Контактна інформація KavaBAR"
    >
      {/* Background Image — exterior / entrance of KavaBAR */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=80"
          alt="Фасад KavaBAR — вхід до закладу з теплим освітленням"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Dark Gradient Overlay — from bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/60 to-foreground/30" />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Decorative organic blob */}
      <div
        className="animate-organic-pulse absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl md:h-80 md:w-80"
        aria-hidden="true"
      />

      {/* Content — positioned at bottom */}
      <div className="relative flex min-h-[60vh] items-end md:min-h-[55vh] lg:min-h-[65vh]">
        <div className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-6 md:pb-20 lg:px-8 lg:pb-24">
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            {/* Headline — serif per style tokens */}
            <h1 className="mb-8 font-serif text-3xl font-semibold leading-tight tracking-tight text-primary-foreground md:mb-10 md:text-5xl lg:text-6xl">
              Завітайте до нас
            </h1>

            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {contactItems.map((item) => (
                <div
                  key={item.id}
                  className="group flex items-start gap-3 rounded-2xl border border-primary-foreground/10 bg-foreground/30 p-4 backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-foreground/40 md:p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-primary-foreground/50">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium leading-snug text-primary-foreground transition-colors duration-200 hover:text-accent md:text-base"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium leading-snug text-primary-foreground md:text-base">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Organic Wave Divider — matches next section (light → bg-background) */}
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
