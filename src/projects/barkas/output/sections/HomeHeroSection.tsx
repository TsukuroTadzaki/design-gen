import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Ship, Shield, Users } from 'lucide-react'
import { Button } from '@/core/ui/Button'
import { ProjectLink } from '@/core/lib/project-context'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function HomeHeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] overflow-hidden bg-foreground pt-20"
    >
      {/* Layer 1: Dark background — applied via bg-foreground */}

      {/* Layer 2: Background dots pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--background) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.03,
        }}
      />

      {/* Layer 3: Subtle gradient overlay for depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/10 via-transparent to-secondary/5" />

      {/* Layer 3: Content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(85vh-5rem)] max-w-7xl items-center px-4 md:px-6 lg:px-8">
        <motion.div
          className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          {/* Left column: Text + CTAs */}
          <div className="order-2 lg:order-1">
            <motion.h1
              variants={itemVariants}
              className="text-3xl font-semibold leading-tight tracking-tight text-background sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Човни та обладнання за цінами виробника
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-xl text-base font-normal leading-relaxed text-background/70 md:text-lg"
            >
              Мультибрендовий магазин плавзасобів з професійним підбором — від
              надувного човна до катера під ключ
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <ProjectLink to="/catalog">
                <Button className="group w-full rounded-lg bg-accent px-8 py-5 text-lg font-semibold text-accent-foreground shadow-lg transition-all hover:shadow-xl sm:w-auto">
                  Перейти до каталогу
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </ProjectLink>
              <ProjectLink to="/contacts">
                <Button
                  variant="outline"
                  className="group w-full rounded-lg border-background/30 px-8 py-5 text-lg font-semibold text-background transition-all hover:border-background/60 hover:bg-background/10 sm:w-auto"
                >
                  Підібрати комплект
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </ProjectLink>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap gap-6 text-sm text-background/50"
            >
              <div className="flex items-center gap-2">
                <Ship className="h-4 w-4 text-secondary" />
                <span>500+ моделей</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-secondary" />
                <span>Офіційна гарантія</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-secondary" />
                <span>15+ брендів</span>
              </div>
            </motion.div>
          </div>

          {/* Right column: Hero image + floating badge */}
          <motion.div
            variants={itemVariants}
            className="relative order-1 lg:order-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-2xl lg:aspect-[5/4]">
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80&auto=format&fit=crop"
                alt="Човен на спокійній воді в ранковому тумані"
                className="h-full w-full object-cover"
              />
              {/* Dark overlay for image depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-foreground/10" />
            </div>

            {/* Floating badge — "500+ моделей" */}
            <div className="absolute -bottom-4 -left-4 z-20 animate-float rounded-lg bg-card px-5 py-3 shadow-lg md:-bottom-6 md:-left-6">
              <p className="text-2xl font-semibold text-primary">500+</p>
              <p className="text-xs font-normal text-muted-foreground">
                моделей у каталозі
              </p>
            </div>

            {/* Floating badge — brands */}
            <div className="absolute -right-3 -top-3 z-20 animate-float rounded-lg bg-accent px-4 py-2 shadow-lg [animation-delay:2s] md:-right-5 md:-top-5">
              <p className="text-sm font-semibold text-accent-foreground">
                15+ брендів
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
