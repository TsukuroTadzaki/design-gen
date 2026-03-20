'use client'

import { useState, useEffect, useCallback, type FormEvent } from 'react'
import { ProjectLink as Link, useProjectLocation } from '@/core/lib/project-context'
import {
  Menu,
  X,
  Phone,
  Search,
  Heart,
  GitCompareArrows,
  ShoppingCart,
  Clock,
  CheckCircle,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/core/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/core/ui/Dialog'
import { Input } from '@/core/ui/Input'

/* ─── Navigation ─── */

const navLinks = [
  { label: 'Каталог', to: '/catalog' },
  { label: 'Акції', to: '/promotions' },
  { label: 'Доставка і оплата', to: '/delivery-payment' },
  { label: 'Про нас', to: '/about' },
  { label: 'Новини', to: '/news' },
  { label: 'Контакти', to: '/contacts' },
]

const mobileNavLinks = [
  { label: 'Головна', to: '/' },
  ...navLinks,
  { label: 'Улюблене', to: '/wishlist' },
  { label: 'Порівняння', to: '/compare' },
  { label: 'Кошик', to: '/cart' },
]

/* ─── Component ─── */

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [topBarVisible, setTopBarVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const [isCallbackSubmitted, setIsCallbackSubmitted] = useState(false)
  const location = useProjectLocation()

  /* ── Scroll handler ── */
  const handleScroll = useCallback(() => {
    const y = window.scrollY
    setIsScrolled(y > 10)
    setTopBarVisible(y <= 60)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  /* ── Lock body scroll ── */
  useEffect(() => {
    if (isMobileMenuOpen || isCallbackOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen, isCallbackOpen])

  /* ── Close mobile menu on route change ── */
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  /* ── Callback form handler ── */
  const handleCallbackSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsCallbackSubmitted(true)
    setTimeout(() => {
      setIsCallbackOpen(false)
      setIsCallbackSubmitted(false)
    }, 2500)
  }

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ═══════ TOP BAR ═══════ */}
      <div
        className={`bg-primary text-primary-foreground transition-all duration-300 ${
          topBarVisible
            ? 'max-h-10 opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs md:px-6 lg:px-8">
          {/* Left: phone + schedule */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+380XXXXXXXX"
              className="flex items-center gap-1.5 font-medium transition-opacity hover:opacity-80"
              aria-label="Зателефонувати"
            >
              <Phone className="h-3 w-3" />
              <span>+380 (XX) XXX-XX-XX</span>
            </a>
            <span className="hidden items-center gap-1.5 sm:flex">
              <Clock className="h-3 w-3" />
              <span>Пн–Сб: 9:00–19:00</span>
            </span>
          </div>

          {/* Right: social links */}
          <div className="flex items-center gap-3">
            <a
              href="#viber"
              className="transition-opacity hover:opacity-80"
              aria-label="Viber"
            >
              Viber
            </a>
            <span className="opacity-40">|</span>
            <a
              href="#telegram"
              className="transition-opacity hover:opacity-80"
              aria-label="Telegram"
            >
              Telegram
            </a>
          </div>
        </div>
      </div>

      {/* ═══════ MAIN BAR ═══════ */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-card/95 shadow-md backdrop-blur-md'
            : 'bg-card shadow-sm'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 md:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 py-3 md:py-4"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-lg font-bold leading-none">B</span>
            </div>
            <span className="text-xl font-semibold text-foreground">
              Barkas
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden flex-1 items-center justify-center gap-0.5 lg:flex"
            aria-label="Головна навігація"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(link.to)
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-1 lg:flex">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="rounded-lg p-2.5 text-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Пошук"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className={`rounded-lg p-2.5 transition-colors hover:bg-muted ${
                isActive('/wishlist')
                  ? 'text-primary'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
              aria-label="Улюблене"
            >
              <Heart className="h-5 w-5" />
            </Link>

            {/* Compare */}
            <Link
              to="/compare"
              className={`rounded-lg p-2.5 transition-colors hover:bg-muted ${
                isActive('/compare')
                  ? 'text-primary'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
              aria-label="Порівняння"
            >
              <GitCompareArrows className="h-5 w-5" />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className={`relative rounded-lg p-2.5 transition-colors hover:bg-muted ${
                isActive('/cart')
                  ? 'text-primary'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
              aria-label="Кошик"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                0
              </span>
            </Link>

            {/* CTA — Callback */}
            <Button
              onClick={() => setIsCallbackOpen(true)}
              className="ml-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
            >
              Отримати консультацію
            </Button>
          </div>

          {/* Mobile: cart icon + hamburger */}
          <div className="ml-auto flex items-center gap-1 lg:hidden">
            <Link
              to="/cart"
              className="relative rounded-lg p-2 text-foreground/60"
              aria-label="Кошик"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground">
                0
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-10 rounded-lg p-2 text-foreground transition-colors"
              aria-label={isMobileMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Search Bar — expandable */}
        <div
          className={`hidden overflow-hidden transition-all duration-300 lg:block ${
            isSearchOpen ? 'max-h-16' : 'max-h-0'
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 pb-3 md:px-6 lg:px-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Шукати човни, мотори, аксесуари..."
                className="w-full rounded-lg border-border bg-muted/50 pl-10 pr-4 py-2.5 text-sm focus:bg-background"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ MOBILE MENU — Slide-over Drawer from Right ═══════ */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'visible' : 'invisible pointer-events-none'
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-foreground/40 transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-card shadow-2xl transition-transform duration-500 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col overflow-y-auto px-5 pt-20 pb-6">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Пошук..."
                className="w-full rounded-lg pl-10 text-sm"
              />
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-0.5" aria-label="Мобільна навігація">
              {mobileNavLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    isActive(link.to)
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Bottom: phone + CTA */}
            <div className="mt-auto flex flex-col gap-3 border-t border-border pt-5">
              <a
                href="tel:+380XXXXXXXX"
                className="flex items-center gap-2.5 px-4 text-foreground/70 transition-colors hover:text-foreground"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm font-medium">+380 (XX) XXX-XX-XX</span>
              </a>
              <div className="flex items-center gap-2.5 px-4 text-foreground/50">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Пн–Сб: 9:00–19:00</span>
              </div>
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setIsCallbackOpen(true)
                }}
                className="mt-2 w-full rounded-lg bg-accent px-6 py-4 text-base font-semibold text-accent-foreground shadow-sm transition-all hover:shadow-md"
              >
                Отримати консультацію
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ CALLBACK MODAL ═══════ */}
      <Dialog open={isCallbackOpen} onOpenChange={setIsCallbackOpen}>
        <DialogContent className="rounded-lg sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Отримати консультацію
            </DialogTitle>
            <DialogDescription>
              Залиште номер — наш консультант зателефонує протягом 30 хвилин та
              допоможе з вибором
            </DialogDescription>
          </DialogHeader>

          {isCallbackSubmitted ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">Дякуємо!</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ми зателефонуємо найближчим часом
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleCallbackSubmit}
              className="flex flex-col gap-4 pt-2"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="callback-name" className="text-sm font-medium">
                  Ваше ім'я
                </label>
                <Input
                  id="callback-name"
                  placeholder="Ім'я"
                  required
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="callback-phone" className="text-sm font-medium">
                  Телефон
                </label>
                <Input
                  id="callback-phone"
                  type="tel"
                  placeholder="+380"
                  required
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="callback-topic"
                  className="text-sm font-medium"
                >
                  Тема звернення
                </label>
                <select
                  id="callback-topic"
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Оберіть тему
                  </option>
                  <option value="boat">Підбір човна</option>
                  <option value="motor">Підбір мотора</option>
                  <option value="equipment">Обладнання та аксесуари</option>
                  <option value="order">Питання по замовленню</option>
                  <option value="other">Інше</option>
                </select>
              </div>
              <Button
                type="submit"
                className="mt-2 w-full rounded-lg bg-accent py-3 text-base font-semibold text-accent-foreground transition-all hover:shadow-md"
              >
                Зателефонуйте мені
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Натискаючи кнопку, ви погоджуєтесь з обробкою персональних даних
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </header>
  )
}
