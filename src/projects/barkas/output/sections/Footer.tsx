'use client'

import { useState } from 'react'
import {
  Anchor,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  ChevronUp,
  Send,
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react'
import { Button } from '@/core/ui/Button'
import { Input } from '@/core/ui/Input'
import { ProjectLink } from '@/core/lib/project-context'

const catalogLinks = [
  { label: 'Надувні човни', to: '/catalog' },
  { label: 'RIB-човни', to: '/catalog' },
  { label: 'Алюмінієві човни', to: '/catalog' },
  { label: 'Мотори', to: '/catalog' },
  { label: 'Ехолоти', to: '/catalog' },
  { label: 'Аксесуари', to: '/catalog' },
]

const customerLinks = [
  { label: 'Доставка і оплата', to: '/delivery-payment' },
  { label: 'Гарантія', to: '/warranty' },
  { label: 'Акції', to: '/promotions' },
]

const companyLinks = [
  { label: 'Про нас', to: '/about' },
  { label: 'Новини', to: '/news' },
  { label: 'Контакти', to: '/contacts' },
]

export default function Footer() {
  const [isCallbackSubmitted, setIsCallbackSubmitted] = useState(false)
  const [callbackPhone, setCallbackPhone] = useState('')

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsCallbackSubmitted(true)
    setTimeout(() => {
      setIsCallbackSubmitted(false)
      setCallbackPhone('')
    }, 3000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-foreground text-background">
      {/* Callback CTA strip */}
      <div className="border-b border-background/10">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h3 className="text-lg font-semibold text-background">
                Потрібна консультація?
              </h3>
              <p className="text-sm text-background/60">
                Залиште номер — зателефонуємо протягом 30 хвилин
              </p>
            </div>
            {isCallbackSubmitted ? (
              <div className="flex items-center gap-2 text-accent">
                <Send className="h-5 w-5" />
                <span className="font-semibold">Дякуємо! Зателефонуємо найближчим часом</span>
              </div>
            ) : (
              <form
                onSubmit={handleCallbackSubmit}
                className="flex w-full max-w-md items-center gap-2"
              >
                <Input
                  type="tel"
                  placeholder="+380 (XX) XXX-XX-XX"
                  value={callbackPhone}
                  onChange={(e) => setCallbackPhone(e.target.value)}
                  required
                  className="border-background/20 bg-background/10 text-background placeholder:text-background/40 focus:border-accent"
                />
                <Button
                  type="submit"
                  className="shrink-0 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
                >
                  Зателефонуйте мені
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <ProjectLink
              to="/"
              className="mb-4 inline-flex items-center gap-2 text-2xl font-bold text-background transition-colors hover:text-accent"
            >
              <Anchor className="h-7 w-7 text-accent" />
              BARKAS
            </ProjectLink>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-background/60">
              Мультибрендовий інтернет-магазин човнів, моторів та водного
              обладнання. Офіційний дилер провідних виробників. Ціни від
              виробника, професійний підбір комплектації.
            </p>

            {/* Contact info */}
            <div className="mb-6 space-y-3">
              <a
                href="tel:+380XXXXXXXX"
                className="flex items-center gap-3 text-sm text-background/80 transition-colors hover:text-accent"
              >
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                +380 (XX) XXX-XX-XX
              </a>
              <a
                href="viber://chat?number=%2B380XXXXXXXX"
                className="flex items-center gap-3 text-sm text-background/80 transition-colors hover:text-accent"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-accent" />
                Viber / Telegram
              </a>
              <a
                href="mailto:info@barkas.ua"
                className="flex items-center gap-3 text-sm text-background/80 transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                info@barkas.ua
              </a>
              <div className="flex items-center gap-3 text-sm text-background/60">
                <Clock className="h-4 w-4 shrink-0 text-accent" />
                Пн-Пт: 9:00–19:00, Сб: 10:00–17:00
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/10 text-background/70 transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:shadow-md"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/10 text-background/70 transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:shadow-md"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/10 text-background/70 transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:shadow-md"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Catalog column */}
          <div className="lg:col-span-3">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/40">
              Каталог
            </h4>
            <nav aria-label="Каталог">
              <ul className="space-y-2.5">
                {catalogLinks.map((link) => (
                  <li key={link.label}>
                    <ProjectLink
                      to={link.to}
                      className="text-sm text-background/70 transition-colors duration-200 hover:text-accent"
                    >
                      {link.label}
                    </ProjectLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Customer column */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/40">
              Покупцям
            </h4>
            <nav aria-label="Покупцям">
              <ul className="space-y-2.5">
                {customerLinks.map((link) => (
                  <li key={link.label}>
                    <ProjectLink
                      to={link.to}
                      className="text-sm text-background/70 transition-colors duration-200 hover:text-accent"
                    >
                      {link.label}
                    </ProjectLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Company column */}
          <div className="lg:col-span-3">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/40">
              Компанія
            </h4>
            <nav aria-label="Компанія">
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <ProjectLink
                      to={link.to}
                      className="text-sm text-background/70 transition-colors duration-200 hover:text-accent"
                    >
                      {link.label}
                    </ProjectLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Payment badges */}
            <div className="mt-8">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-background/40">
                Оплата
              </h4>
              <div className="flex items-center gap-2">
                <div className="flex h-8 items-center rounded bg-background/10 px-3 text-xs font-medium text-background/60">
                  Visa
                </div>
                <div className="flex h-8 items-center rounded bg-background/10 px-3 text-xs font-medium text-background/60">
                  MasterCard
                </div>
                <div className="flex h-8 items-center rounded bg-background/10 px-3 text-xs font-medium text-background/60">
                  Накладений платіж
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 md:flex-row md:px-6 lg:px-8">
          <p className="text-xs text-background/40">
            &copy; {new Date().getFullYear()} Barkas. Всі права захищені.
          </p>

          <div className="flex items-center gap-6">
            <ProjectLink
              to="/delivery-payment"
              className="text-xs text-background/40 transition-colors hover:text-background/70"
            >
              Умови використання
            </ProjectLink>
            <ProjectLink
              to="/warranty"
              className="text-xs text-background/40 transition-colors hover:text-background/70"
            >
              Політика конфіденційності
            </ProjectLink>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Прокрутити вгору"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-card text-foreground border border-border transition-all duration-200 hover:shadow-md hover:scale-105"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
