"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CalendarCheck, Award, ShieldCheck } from "lucide-react"
import { Button } from "@/core/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/core/ui/Dialog"
import { Input } from "@/core/ui/Input"
import { ProjectLink } from "@/core/lib/project-context"

const stats = [
  { value: "15+", label: "років досвіду", icon: CalendarCheck },
  { value: "200+", label: "реалізованих проектів", icon: Award },
  { value: "100%", label: "гарантійне обслуговування", icon: ShieldCheck },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

/* ---------- Geometric block with 3D hover (rotateY 8deg) ---------- */
function GeometricBlock({
  className,
  children,
}: {
  className: string
  children?: React.ReactNode
}) {
  return (
    <motion.div
      className={`${className} cursor-pointer shadow-lg hover:shadow-xl will-change-transform`}
      whileHover={{ rotateY: 8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Geometric Composite Grid (H-05 right column) ---------- */
function GeometricGrid() {
  return (
    <div className="relative w-full max-w-md mx-auto lg:max-w-none aspect-square">
      {/* 3x4 CSS Grid composition — colored blocks, circles, nested rectangles */}
      <div className="grid grid-cols-4 grid-rows-4 gap-3 md:gap-4 w-full h-full">
        {/* Row 1-2, Col 1-2: Large primary block with nested element */}
        <GeometricBlock className="col-span-2 row-span-2 bg-primary rounded-xl relative overflow-hidden">
          <div className="absolute inset-3 border-2 border-primary-foreground/20 rounded-lg" />
          <div className="absolute bottom-3 left-3 right-3 h-1/3 bg-primary-foreground/10 rounded-md" />
        </GeometricBlock>

        {/* Row 1, Col 3: Small accent square */}
        <GeometricBlock className="col-span-1 row-span-1 bg-accent rounded-xl relative overflow-hidden">
          <div className="absolute inset-2 border border-accent-foreground/20 rounded-md" />
        </GeometricBlock>

        {/* Row 1, Col 4: Circle */}
        <GeometricBlock className="col-span-1 row-span-1 bg-primary/30 rounded-full" />

        {/* Row 2, Col 3-4: Wide accent bar */}
        <GeometricBlock className="col-span-2 row-span-1 bg-accent/40 rounded-xl relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1/3 bg-accent/30 rounded-l-xl" />
        </GeometricBlock>

        {/* Row 3, Col 1: Small circle */}
        <GeometricBlock className="col-span-1 row-span-1 bg-accent rounded-full" />

        {/* Row 3, Col 2-3: Wide primary block with lines */}
        <GeometricBlock className="col-span-2 row-span-1 bg-primary/50 rounded-xl relative overflow-hidden">
          <div className="absolute top-1/4 left-3 right-3 h-px bg-primary-foreground/15" />
          <div className="absolute top-1/2 left-3 right-3 h-px bg-primary-foreground/15" />
          <div className="absolute top-3/4 left-3 right-3 h-px bg-primary-foreground/15" />
        </GeometricBlock>

        {/* Row 3-4, Col 4: Tall accent block */}
        <GeometricBlock className="col-span-1 row-span-2 bg-primary rounded-xl relative overflow-hidden">
          <div className="absolute inset-2 border border-primary-foreground/15 rounded-lg" />
          <div className="absolute top-1/2 left-2 right-2 h-px bg-primary-foreground/20" />
        </GeometricBlock>

        {/* Row 4, Col 1-2: Wide muted block */}
        <GeometricBlock className="col-span-2 row-span-1 bg-primary/20 rounded-xl relative overflow-hidden">
          <div className="absolute inset-y-2 left-2 w-1/4 bg-accent/30 rounded-md" />
        </GeometricBlock>

        {/* Row 4, Col 3: Small circle */}
        <GeometricBlock className="col-span-1 row-span-1 bg-accent/60 rounded-full" />
      </div>
    </div>
  )
}

/* ================================================================== */
export default function HomeHeroSection() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <section className="relative min-h-screen bg-secondary overflow-hidden">
      {/* Layer 2: Animated grid background pattern */}
      <div
        className="absolute inset-0 pointer-events-none animate-grid-drift"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--secondary-foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--secondary-foreground) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.04,
        }}
      />
      <style>{`@keyframes grid-drift{0%{background-position:0 0}100%{background-position:32px 32px}}.animate-grid-drift{animation:grid-drift 20s linear infinite}`}</style>

      {/* Layer 3: Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8 pt-28 md:pt-36 pb-16 md:pb-24 lg:pb-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* ---- Left column: Text ---- */}
          <div>
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground leading-tight"
            >
              Створюємо сайти, які працюють на ваш бізнес
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg md:text-xl text-secondary-foreground/70 max-w-xl"
            >
              Веб-розробка під ключ від команди з 15-річним досвідом. Від
              стратегії до запуску — і далі.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={() => {
                  setFormSubmitted(false)
                  setDialogOpen(true)
                }}
                className="bg-accent text-accent-foreground rounded-xl px-8 py-5 text-lg font-semibold group"
              >
                Обговорити проект
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <ProjectLink to="/portfolio">
                <Button
                  variant="outline"
                  className="border-2 border-secondary-foreground/30 text-secondary-foreground rounded-xl px-8 py-5 text-lg w-full sm:w-auto hover:bg-secondary-foreground/10"
                >
                  Переглянути портфоліо
                </Button>
              </ProjectLink>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-wrap gap-6 md:gap-10"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-secondary-foreground/50">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ---- Right column: Geometric Composite Grid ---- */}
          <motion.div
            variants={itemVariants}
            className="hidden md:block"
          >
            <GeometricGrid />
          </motion.div>
        </motion.div>
      </div>

      {/* Dialog: "Обговорити проект" form */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Обговоримо ваш проект</DialogTitle>
            <DialogDescription>
              Залиште контактні дані і ми зв'яжемось протягом робочого дня.
            </DialogDescription>
          </DialogHeader>

          {formSubmitted ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 mx-auto mb-4 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-accent" />
              </div>
              <p className="text-lg font-semibold text-card-foreground">
                Дякуємо за заявку!
              </p>
              <p className="text-muted-foreground mt-2">
                Ми зв'яжемось з вами найближчим часом.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <Input placeholder="Ваше ім'я" required />
              <Input type="tel" placeholder="Телефон" required />
              <Input type="email" placeholder="Email" />
              <textarea
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[100px] resize-none"
                placeholder="Опишіть ваш проект"
              />
              <Button
                type="submit"
                className="w-full bg-accent text-accent-foreground rounded-xl py-4 font-semibold"
              >
                Надіслати заявку
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
