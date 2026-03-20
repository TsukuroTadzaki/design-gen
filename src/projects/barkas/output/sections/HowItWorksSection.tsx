"use client"

import { motion } from "framer-motion"
import { Search, ClipboardCheck, CreditCard, Waves } from "lucide-react"

const steps = [
  {
    number: 1,
    title: "Оберіть або попросіть підібрати",
    description:
      "Знайдіть потрібне в каталозі самостійно або зателефонуйте — консультант підбере варіанти під ваші задачі та бюджет.",
    icon: Search,
  },
  {
    number: 2,
    title: "Перевірте комплект",
    description:
      "Ми покажемо повну вартість зі всіма необхідними аксесуарами. Жодних доплат при оформленні.",
    icon: ClipboardCheck,
  },
  {
    number: 3,
    title: "Оформіть замовлення",
    description:
      "Оплатіть онлайн або при отриманні. Безпечна доставка по всій Україні — від Нової Пошти до адресної для габаритних вантажів.",
    icon: CreditCard,
  },
  {
    number: 4,
    title: "Виходьте на воду",
    description:
      "Отримайте замовлення з повною гарантією виробника. Залишаємося на зв'язку для будь-яких запитань.",
    icon: Waves,
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export default function HowItWorksSection() {
  return (
    <section className="bg-muted py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center md:mb-12"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Процес замовлення
            </span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
            Як замовити
          </h2>
        </motion.div>

        {/* Steps grid with connector line */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="relative"
        >
          {/* Horizontal connector line — visible on desktop only */}
          <div className="pointer-events-none absolute left-0 right-0 top-[52px] hidden lg:block">
            <div className="mx-auto max-w-3xl px-16">
              <div className="h-0.5 w-full bg-accent/30" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                {/* Step number badge */}
                <div className="relative z-10 mb-5 flex h-[64px] w-[64px] items-center justify-center rounded-full border-2 border-accent bg-card text-xl font-semibold text-accent shadow-sm">
                  {step.number}
                </div>

                {/* Card */}
                <div className="w-full rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md">
                  <div className="mb-3 flex justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <step.icon className="h-5 w-5 text-accent" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
