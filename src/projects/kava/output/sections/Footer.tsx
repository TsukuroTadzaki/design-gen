import { ProjectLink as Link } from '@/core/lib/project-context'
import { Button } from '@/core/ui/Button'
import {
  Coffee,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Send,
} from 'lucide-react'

const navLinks = [
  { label: 'Головна', to: '/' },
  { label: 'Меню', to: '/menu' },
  { label: 'Події', to: '/events' },
  { label: 'Контакти', to: '/contacts' },
]

const schedule = [
  { days: 'Понеділок — Середа', hours: '09:00 — 23:00' },
  { days: 'Четвер', hours: '09:00 — 00:00' },
  { days: "П'ятниця", hours: '09:00 — 23:00' },
  { days: 'Субота', hours: '09:00 — 00:00' },
  { days: 'Неділя', hours: '09:00 — 23:00' },
]

const socials = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Telegram', icon: Send, href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="mb-4 inline-flex items-center gap-2">
              <Coffee className="h-7 w-7 text-secondary" />
              <span className="font-serif text-2xl font-semibold tracking-tight text-primary-foreground">
                KavaBAR
              </span>
            </Link>
            <p className="mt-3 font-serif text-lg italic text-secondary">
              Твій острів спокою
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              Камерний простір для тих, хто цінує тишу, смак та живе мистецтво.
              Кава, коктейлі, десерти та жива сцена двічі на тиждень.
            </p>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <h3 className="mb-5 font-serif text-base font-semibold text-secondary">
              Навігація
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-primary-foreground/70 transition-colors duration-200 hover:text-secondary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-6">
              <Button
                asChild
                className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.03] hover:bg-accent/90"
              >
                <Link to="/contacts">Забронювати столик</Link>
              </Button>
            </div>
          </div>

          {/* Column 3 — Schedule */}
          <div>
            <h3 className="mb-5 font-serif text-base font-semibold text-secondary">
              Графік роботи
            </h3>
            <ul className="space-y-2.5">
              {schedule.map((item) => (
                <li
                  key={item.days}
                  className="flex items-start gap-2 text-sm"
                >
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-secondary/60" />
                  <span>
                    <span className="text-primary-foreground/70">
                      {item.days}
                    </span>
                    <br />
                    <span className="font-medium text-primary-foreground/90">
                      {item.hours}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact Details */}
          <div>
            <h3 className="mb-5 font-serif text-base font-semibold text-secondary">
              Контакти
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+380XXXXXXXX"
                  className="flex items-center gap-3 text-sm text-primary-foreground/70 transition-colors duration-200 hover:text-secondary"
                >
                  <Phone className="h-4 w-4 shrink-0 text-secondary/60" />
                  +380 (XX) XXX-XX-XX
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@kavabar.ua"
                  className="flex items-center gap-3 text-sm text-primary-foreground/70 transition-colors duration-200 hover:text-secondary"
                >
                  <Mail className="h-4 w-4 shrink-0 text-secondary/60" />
                  hello@kavabar.ua
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary/60" />
                <span>[Адреса закладу]</span>
              </li>
            </ul>

            {/* Social links */}
            <div className="mt-6">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-primary-foreground/50">
                Соцмережі
              </p>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/60 transition-all duration-200 hover:scale-[1.03] hover:border-secondary hover:text-secondary"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-primary-foreground/50 md:flex-row md:px-6 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} KavaBAR. Всі права захищені.
          </p>
          <p>Твій острів спокою</p>
        </div>
      </div>
    </footer>
  )
}
