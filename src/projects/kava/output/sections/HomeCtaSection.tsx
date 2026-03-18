import { ArrowRight, BookOpen } from 'lucide-react'
import { Button } from '@/core/ui/Button'
import { ProjectLink as Link } from '@/core/lib/project-context'

export default function HomeCtaSection() {
  return (
    <section className="bg-accent px-4 py-20 md:px-6 md:py-32 lg:px-8 relative overflow-hidden">
      {/* Decorative organic blobs */}
      <div
        className="absolute top-[-60px] left-[-40px] w-48 h-48 rounded-full bg-accent-foreground/5 animate-organic-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-40px] right-[-30px] w-64 h-64 rounded-full bg-accent-foreground/5 animate-organic-pulse"
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-2xl text-center relative z-10">
        <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl text-accent-foreground font-serif mb-6">
          Ваш столик вже чекає
        </h2>

        <p className="text-accent-foreground/90 text-lg md:text-xl font-light mb-10 max-w-xl mx-auto">
          Оберіть зручний час і забронюйте місце у KavaBAR. Ми передзвонимо
          протягом 15 хвилин.
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
            className="bg-white text-accent hover:bg-white/90 rounded-full px-10 py-4 font-medium text-base w-full sm:w-auto"
          >
            <Link to="/menu">
              <BookOpen className="mr-2 h-5 w-5" />
              Подивитись меню
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
