'use client'

import { ProjectLink as Link } from '@/core/lib/project-context'
import {
  Phone, Mail, Clock, MapPin,
  Facebook, Instagram, Linkedin, Send,
  ArrowUpRight,
} from 'lucide-react'

const serviceLinks = [
  { label: "Створення сайтів", to: "/web-development" },
  { label: "SEO-просування", to: "/seo-marketing" },
  { label: "Маркетинг", to: "/seo-marketing" },
]

const blogLinks = [
  { label: "Веб-розробка", to: "/blog" },
  { label: "SEO та просування", to: "/blog" },
  { label: "Маркетинг", to: "/blog" },
  { label: "Кейси", to: "/blog" },
]

const contactInfo = [
  { icon: Phone, label: "+380 (XX) XXX-XX-XX", href: "tel:+380XXXXXXXX" },
  { icon: Mail, label: "info@divotek.com", href: "mailto:info@divotek.com" },
  { icon: Clock, label: "Пн-Пт: 9:00–18:00", href: null },
  { icon: MapPin, label: "Україна", href: null },
]

const socials = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Send, label: "Telegram", href: "#" },
]

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main footer content — FT-02 Asymmetric 5:7 Split */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">

          {/* Left — Brand block (5/12) */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight md:text-3xl">
              <span className="text-white">Divo</span>
              <span className="text-accent">tek</span>
            </Link>

            <p className="mt-4 text-lg font-medium text-white/90">
              Код. Стратегія. Результат.
            </p>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-secondary-foreground/70">
              Створюємо сайти, які працюють на ваш бізнес. Веб-розробка під ключ від команди з 15-річним досвідом.
            </p>

            {/* Social links */}
            <div className="mt-8 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-secondary-foreground/70 transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] hover:shadow-xl"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Right — 3 Navigation columns (7/12) */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-7">

            {/* Column 1: Послуги */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Послуги
              </h3>
              <ul className="mt-4 space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-1 text-sm text-secondary-foreground/70 transition-colors duration-300 hover:text-accent"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Блог */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Блог
              </h3>
              <ul className="mt-4 space-y-3">
                {blogLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-1 text-sm text-secondary-foreground/70 transition-colors duration-300 hover:text-accent"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Контакти */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Контакти
              </h3>
              <ul className="mt-4 space-y-3">
                {contactInfo.map((item) => {
                  const content = (
                    <span className="inline-flex items-center gap-2 text-sm text-secondary-foreground/70 transition-colors duration-300 hover:text-accent">
                      <item.icon className="h-4 w-4 shrink-0 text-accent" />
                      {item.label}
                    </span>
                  )
                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a href={item.href}>{content}</a>
                      ) : (
                        content
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-6 lg:px-8">
          <p className="text-xs text-secondary-foreground/50">
            &copy; {new Date().getFullYear()} DiVotek. Усі права захищено.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/about"
              className="text-xs text-secondary-foreground/50 transition-colors duration-300 hover:text-accent"
            >
              Про нас
            </Link>
            <Link
              to="/portfolio"
              className="text-xs text-secondary-foreground/50 transition-colors duration-300 hover:text-accent"
            >
              Портфоліо
            </Link>
            <Link
              to="/contacts"
              className="text-xs text-secondary-foreground/50 transition-colors duration-300 hover:text-accent"
            >
              Контакти
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
