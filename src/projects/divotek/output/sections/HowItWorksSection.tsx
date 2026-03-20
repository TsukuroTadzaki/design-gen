"use client"

import { motion } from "framer-motion"
import { MessageSquare, Search, Code2, Rocket } from "lucide-react"

const steps = [
  {
    number: 1,
    icon: MessageSquare,
    title: "Знайомство і бриф",
    description:
      "Обговорюємо ваші цілі, аудиторію та побажання. Якщо ви ще не знаєте, що саме потрібно — допоможемо сформулювати.",
  },
  {
    number: 2,
    icon: Search,
    title: "Аналіз та проектування",
    description:
      "Досліджуємо конкурентів, складаємо структуру сайту, формуємо кошторис з детальним описом кожного етапу.",
  },
  {
    number: 3,
    icon: Code2,
    title: "Дизайн та розробка",
    description:
      "Створюємо дизайн, затверджуємо з вами кожен етап. Розробляємо функціонал, тестуємо на різних пристроях.",
  },
  {
    number: 4,
    icon: Rocket,
    title: "Запуск і навчання",
    description:
      "Запускаємо сайт, проводимо навчання для вашої команди. Гарантійний період підтримки — включено.",
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
    <section className="relative bg-background py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="text-center mb-14 md:mb-20"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Процес
            </span>
            <div className="h-px w-8 bg-accent" />
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Як ми працюємо
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Чіткий процес із зрозумілими етапами та дедлайнами
          </motion.p>
        </motion.div>

        {/* Steps grid with connector */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="relative"
        >
          {/* Horizontal connector line — desktop only */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 bg-accent/20">
            <motion.div
              className="h-full bg-accent origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step number badge */}
                <div className="relative z-10 mb-6">
                  <div className="w-[104px] h-[104px] rounded-xl bg-card shadow-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                        Крок
                      </span>
                      <span className="text-3xl font-bold text-primary">
                        {String(step.number).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  {/* Accent dot under badge — connector anchor */}
                  <div className="hidden lg:block absolute -bottom-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent shadow-md shadow-accent/30" />
                </div>

                {/* Vertical connector on mobile */}
                {step.number < steps.length && (
                  <div className="lg:hidden w-0.5 h-6 bg-accent/20 mb-4" />
                )}

                {/* Card */}
                <div className="bg-card rounded-xl shadow-lg p-6 md:p-8 w-full transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
