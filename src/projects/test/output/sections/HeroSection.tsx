import { Button } from '@/core/ui/Button'

export default function HeroSection() {
  return (
    <section className="bg-secondary text-secondary-foreground py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Preview Runtime Works!
        </h1>
        <p className="text-lg md:text-xl text-secondary-foreground/70 mb-8 max-w-2xl mx-auto">
          This is a test project to verify the design generator preview shell is functioning correctly.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="accent" size="lg">Primary CTA</Button>
          <Button variant="outline" size="lg" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10">
            Secondary CTA
          </Button>
        </div>
      </div>
    </section>
  )
}
