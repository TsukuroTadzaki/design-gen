'use client'

import { useState, useEffect, useCallback, type FormEvent } from 'react'
import { ProjectLink as Link, useProjectLocation } from '@/core/lib/project-context'
import { Menu, X, Phone, Calendar, Clock, Users, CheckCircle } from 'lucide-react'
import { Button } from '@/core/ui/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/core/ui/Dialog'
import { Input } from '@/core/ui/Input'

const navLinks = [
  { label: 'Меню', to: '/menu' },
  { label: 'Події', to: '/events' },
  { label: 'Контакти', to: '/contacts' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isBookingSubmitted, setIsBookingSubmitted] = useState(false)
  const location = useProjectLocation()

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsBookingSubmitted(true)
    setTimeout(() => {
      setIsBookingOpen(false)
      setIsBookingSubmitted(false)
    }, 2500)
  }

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const isActive = (path: string) => location.pathname === path

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="relative z-10 font-serif text-xl font-semibold tracking-wide transition-colors duration-300 md:text-2xl"
          >
            <span
              className={
                isScrolled ? 'text-primary' : 'text-primary-foreground'
              }
            >
              Kava
            </span>
            <span
              className={isScrolled ? 'text-accent' : 'text-accent'}
            >
              BAR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Головна навігація">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive(link.to)
                    ? isScrolled
                      ? 'text-accent'
                      : 'text-accent'
                    : isScrolled
                      ? 'text-foreground/80 hover:text-foreground'
                      : 'text-primary-foreground/80 hover:text-primary-foreground'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-accent" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="tel:+380XXXXXXXX"
              className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                isScrolled
                  ? 'text-foreground/70 hover:text-foreground'
                  : 'text-primary-foreground/70 hover:text-primary-foreground'
              }`}
              aria-label="Зателефонувати"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden xl:inline">+380 (XX) XXX-XX-XX</span>
            </a>
            <Button
              onClick={() => setIsBookingOpen(true)}
              className="rounded-full bg-accent px-6 py-2 text-sm font-medium text-accent-foreground shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
            >
              Забронювати столик
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`relative z-10 rounded-xl p-2 transition-colors duration-300 lg:hidden ${
              isMobileMenuOpen
                ? 'text-foreground'
                : isScrolled
                  ? 'text-foreground'
                  : 'text-primary-foreground'
            }`}
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

      {/* Mobile Menu — Slide-over Drawer from Right */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'visible' : 'invisible'
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
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-background shadow-2xl transition-transform duration-500 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col px-6 pt-20 pb-8">
            <nav className="flex flex-col gap-1" aria-label="Мобільна навігація">
              <Link
                to="/"
                className={`rounded-2xl px-4 py-3 text-lg font-medium transition-colors ${
                  isActive('/')
                    ? 'bg-accent/10 text-accent'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                Головна
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`rounded-2xl px-4 py-3 text-lg font-medium transition-colors ${
                    isActive(link.to)
                      ? 'bg-accent/10 text-accent'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile contact & CTA */}
            <div className="mt-auto flex flex-col gap-4 border-t border-border pt-6">
              <a
                href="tel:+380XXXXXXXX"
                className="flex items-center gap-3 text-foreground/70 transition-colors hover:text-foreground"
              >
                <Phone className="h-5 w-5" />
                <span className="text-sm font-medium">+380 (XX) XXX-XX-XX</span>
              </a>
              <Button
                onClick={() => { setIsMobileMenuOpen(false); setIsBookingOpen(true) }}
                className="w-full rounded-full bg-accent px-10 py-4 text-base font-medium text-accent-foreground shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              >
                Забронювати столик
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Booking Modal */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Забронювати столик</DialogTitle>
            <DialogDescription>Ми передзвонимо протягом 15 хвилин для підтвердження</DialogDescription>
          </DialogHeader>

          {isBookingSubmitted ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <CheckCircle className="h-12 w-12 text-accent" />
              <p className="text-center text-lg font-medium">Дякуємо! Ми скоро зателефонуємо.</p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4 pt-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="booking-name" className="text-sm font-medium">Ваше ім'я</label>
                <Input id="booking-name" placeholder="Ім'я" required />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="booking-phone" className="text-sm font-medium">Телефон</label>
                <Input id="booking-phone" type="tel" placeholder="+380" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="booking-date" className="text-sm font-medium flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> Дата
                  </label>
                  <Input id="booking-date" type="date" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="booking-time" className="text-sm font-medium flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> Час
                  </label>
                  <Input id="booking-time" type="time" required />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="booking-guests" className="text-sm font-medium flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" /> Кількість гостей
                </label>
                <Input id="booking-guests" type="number" min="1" max="20" defaultValue="2" required />
              </div>
              <Button type="submit" className="mt-2 w-full rounded-full bg-accent py-3 text-accent-foreground hover:bg-accent/90">
                Забронювати
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </header>
  )
}
