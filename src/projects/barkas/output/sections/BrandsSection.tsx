"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import {
  Ship,
  Anchor,
  Navigation,
  Radar,
  Compass,
  Waves,
  Zap,
  Shield,
} from "lucide-react"

const brands = [
  { id: "bark", name: "Bark", icon: Ship },
  { id: "kolibri", name: "Kolibri", icon: Anchor },
  { id: "aqua-star", name: "Aqua-Star", icon: Waves },
  { id: "parsun", name: "Parsun", icon: Zap },
  { id: "garmin", name: "Garmin", icon: Radar },
  { id: "lowrance", name: "Lowrance", icon: Navigation },
  { id: "ladya", name: "Ладья", icon: Ship },
  { id: "storm", name: "Storm", icon: Waves },
  { id: "mercury", name: "Mercury", icon: Zap },
  { id: "humminbird", name: "Humminbird", icon: Compass },
  { id: "tohatsu", name: "Tohatsu", icon: Anchor },
  { id: "suzuki", name: "Suzuki Marine", icon: Navigation },
  { id: "brig", name: "BRIG", icon: Shield },
  { id: "sailor", name: "Sailor", icon: Compass },
  { id: "aqua-mania", name: "Aqua Mania", icon: Waves },
]

export default function BrandsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const animationRef = useRef<number>(0)
  const positionRef = useRef(0)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const speed = 0.5
    let lastTime = 0

    const animate = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp
      const delta = timestamp - lastTime
      lastTime = timestamp

      if (!isPaused && container) {
        positionRef.current += speed * (delta / 16)
        const halfWidth = container.scrollWidth / 2
        if (positionRef.current >= halfWidth) {
          positionRef.current -= halfWidth
        }
        container.style.transform = `translateX(-${positionRef.current}px)`
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [isPaused])

  const duplicatedBrands = [...brands, ...brands]

  return (
    <section className="bg-background py-12 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Партнери
            </span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
            Офіційний дилер
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Працюємо напряму з виробниками — ви отримуєте заводську гарантію та
            найкращу ціну
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden">
          <div ref={scrollRef} className="flex gap-8 md:gap-12 w-max will-change-transform">
            {duplicatedBrands.map((brand, index) => {
              const Icon = brand.icon
              return (
                <div
                  key={`${brand.id}-${index}`}
                  className="group flex flex-col items-center justify-center gap-3 min-w-[120px] md:min-w-[140px] py-4"
                >
                  <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-lg bg-card border border-border shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all duration-300">
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 whitespace-nowrap">
                    {brand.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
