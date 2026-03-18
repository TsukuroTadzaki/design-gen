import { ArrowRight, Bell } from 'lucide-react'
import { Button } from '@/core/ui/Button'
import { ProjectLink as Link } from '@/core/lib/project-context'

export default function EventsCtaSection() {
  return (
    <section className="bg-accent px-4 py-20 md:px-6 md:py-32 lg:px-8 relative overflow-hidden">
      {/* Decorative organic blobs */}
      <div
        className="absolute top-[-60px] right-[-50px] w-56 h-56 rounded-full bg-accent-foreground/5 animate-organic-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-50px] left-[-40px] w-44 h-44 rounded-full bg-accent-foreground/5 animate-organic-pulse"
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-2xl text-center relative z-10">
        <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl text-accent-foreground font-serif mb-6">
          Не пропустіть наступний вечір
        </h2>

        <p className="text-accent-foreground/90 text-lg md:text-xl font-light mb-10 max-w-xl mx-auto">
          Кількість місць обмежена — бронюйте столик заздалегідь, щоб
          гарантовано потрапити
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 rounded-full px-10 py-4 font-medium text-base w-full sm:w-auto"
          >
            <Link to="/contacts">
              Забронювати столик
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10 rounded-full px-10 py-4 font-medium text-base w-full sm:w-auto"
          >
            <a href="#schedule">
              <Bell className="mr-2 h-5 w-5" />
              Підписатись на розклад
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
