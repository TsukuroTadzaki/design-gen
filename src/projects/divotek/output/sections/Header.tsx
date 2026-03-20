'use client'

import { useState, useEffect, useCallback, useRef, type FormEvent } from 'react'
import { ProjectLink as Link, useProjectLocation } from '@/core/lib/project-context'
import {
  Menu, X, Phone, ChevronDown, ArrowRight,
  CheckCircle, User, MessageSquare,
} from 'lucide-react'
import { Button } from '@/core/ui/Button'
import { Sheet, SheetContent, SheetTitle } from '@/core/ui/Sheet'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/core/ui/Dialog'
import { Input } from '@/core/ui/Input'

const serviceLinks = [
  { label: "Створення сайтів", to: "/web-development" },
  { label: "SEO та маркетинг", to: "/seo-marketing" },
]

const navLinks = [
  { label: "Портфоліо", to: "/portfolio" },
  { label: "Про нас", to: "/about" },
  { label: "Блог", to: "/blog" },
  { label: "Контакти", to: "/contacts" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const [isCallbackSubmitted, setIsCallbackSubmitted] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const servicesTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const location = useProjectLocation()

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false)
    setIsServicesOpen(false)
  }, [location.pathname])

  // Close services dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const handleCallbackSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsCallbackSubmitted(true)
    setTimeout(() => {
      setIsCallbackOpen(false)
      setIsCallbackSubmitted(false)
    }, 2500)
  }

  const isActive = (path: string) => location.pathname === path
  const isServiceActive = serviceLinks.some((l) => isActive(l.to))

  const handleServicesEnter = () => {
    clearTimeout(servicesTimeoutRef.current)
    setIsServicesOpen(true)
  }

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => setIsServicesOpen(false), 200)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="relative z-10 flex items-center gap-2 text-xl font-bold tracking-tight transition-colors duration-300 md:text-2xl"
          >
            <span className={isScrolled ? 'text-primary' : 'text-white'}>
              Divo
            </span>
            <span className="text-accent">tek</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Головна навігація">
            {/* Services Dropdown */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isServiceActive
                    ? 'text-accent'
                    : isScrolled
                      ? 'text-foreground/80 hover:text-foreground'
                      : 'text-white/80 hover:text-white'
                }`}
                aria-expanded={isServicesOpen}
              >
                Послуги
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isServicesOpen ? 'rotate-180' : ''
                  }`}
                />
                {isServiceActive && (
                  <span className="absolute bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-accent" />
                )}
              </button>

              {/* Dropdown */}
              <div
                className={`absolute left-0 top-full pt-2 transition-all duration-200 ${
                  isServicesOpen
                    ? 'visible translate-y-0 opacity-100'
                    : 'invisible -translate-y-2 opacity-0'
                }`}
              >
                <div className="min-w-[220px] rounded-xl border border-border bg-card p-2 shadow-xl">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive(link.to)
                          ? 'bg-accent/10 text-accent'
                          : 'text-card-foreground hover:bg-muted'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive(link.to)
                    ? 'text-accent'
                    : isScrolled
                      ? 'text-foreground/80 hover:text-foreground'
                      : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-accent" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions: Phone + CTA */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="tel:+380XXXXXXXX"
              className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                isScrolled
                  ? 'text-foreground/70 hover:text-foreground'
                  : 'text-white/70 hover:text-white'
              }`}
              aria-label="Зателефонувати"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden xl:inline">+380 (XX) XXX-XX-XX</span>
            </a>
            <Button
              onClick={() => setIsCallbackOpen(true)}
              className="group rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              Обговорити проект
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className={`relative z-10 rounded-xl p-2 transition-colors duration-300 lg:hidden ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}
            aria-label="Відкрити меню"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu — Sheet from right */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="right" className="w-80 max-w-[85vw] p-0">
          <SheetTitle className="sr-only">Навігація</SheetTitle>
          <div className="flex h-full flex-col">
            {/* Mobile Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <span className="text-xl font-bold tracking-tight">
                <span className="text-primary">Divo</span>
                <span className="text-accent">tek</span>
              </span>
            </div>

            {/* Mobile Nav */}
            <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Мобільна навігація">
              {/* Home */}
              <Link
                to="/"
                className={`flex items-center rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                  isActive('/')
                    ? 'bg-accent/10 text-accent'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                Головна
              </Link>

              {/* Services group */}
              <div className="mt-1">
                <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Послуги
                </div>
                {serviceLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive(link.to)
                        ? 'bg-accent/10 text-accent'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Other nav links */}
              <div className="mt-1 border-t border-border pt-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive(link.to)
                        ? 'bg-accent/10 text-accent'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Mobile Footer: phone + CTA */}
            <div className="border-t border-border px-6 py-6">
              <a
                href="tel:+380XXXXXXXX"
                className="flex items-center gap-3 text-foreground/70 transition-colors hover:text-foreground"
              >
                <Phone className="h-5 w-5" />
                <span className="text-sm font-medium">+380 (XX) XXX-XX-XX</span>
              </a>
              <Button
                onClick={() => {
                  setIsMobileOpen(false)
                  setIsCallbackOpen(true)
                }}
                className="mt-4 w-full rounded-xl bg-accent py-4 text-base font-semibold text-accent-foreground shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                Обговорити проект
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Callback Modal */}
      <Dialog open={isCallbackOpen} onOpenChange={setIsCallbackOpen}>
        <DialogContent className="rounded-xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Обговорити проект</DialogTitle>
            <DialogDescription>
              Залиште контакти — ми зателефонуємо протягом 30 хвилин у робочий час
            </DialogDescription>
          </DialogHeader>

          {isCallbackSubmitted ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <CheckCircle className="h-12 w-12 text-accent" />
              <p className="text-center text-lg font-medium">
                Дякуємо! Ми скоро зв'яжемося з вами.
              </p>
            </div>
          ) : (
            <form onSubmit={handleCallbackSubmit} className="flex flex-col gap-4 pt-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="cb-name" className="flex items-center gap-1.5 text-sm font-medium">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  Ваше ім'я
                </label>
                <Input id="cb-name" placeholder="Ім'я" required />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="cb-phone" className="flex items-center gap-1.5 text-sm font-medium">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  Телефон
                </label>
                <Input id="cb-phone" type="tel" placeholder="+380" required />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="cb-message" className="flex items-center gap-1.5 text-sm font-medium">
                  <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                  Коротко про проект
                </label>
                <textarea
                  id="cb-message"
                  rows={3}
                  placeholder="Розкажіть, що потрібно зробити"
                  className="flex w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <Button
                type="submit"
                className="mt-2 w-full rounded-xl bg-accent py-3 font-semibold text-accent-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                Надіслати заявку
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </header>
  )
}
