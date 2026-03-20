"use client"

import { motion } from "framer-motion"
import { CalendarCheck, ShieldCheck, Receipt, PackageCheck, Settings } from "lucide-react"

const advantages = [
  {
    icon: CalendarCheck,
    title: "15+ років у розробці",
    description:
      "За цей час ми реалізували сотні проектів різної складності. Кожен новий проект спирається на перевірені рішення та уроки, які ми вже засвоїли — тому ви не платите за наші помилки.",
  },
  {
    icon: ShieldCheck,
    title: "Гарантійний період",
    description:
      "Після запуску сайту ми не зникаємо. Гарантійний період включає виправлення багів, технічну підтримку та консультації. Ви не залишитесь наодинці з новим сайтом.",
  },
  {
    icon: Receipt,
    title: "Прозоре ціноутворення",
    description:
      "Вартість формується від реальної складності проекту. Ви отримуєте детальний кошторис до початку роботи і знаєте, за що платите на кожному етапі.",
  },
  {
    icon: PackageCheck,
    title: "Проект під ключ",
    description:
      "Від першої консультації до запуску і навчання — ми ведемо проект повністю. Вам не потрібно координувати кількох спеціалістів окремо.",
  },
  {
    icon: Settings,
    title: "Індивідуальний функціонал",
    description:
      "Кожне рішення розробляється під ваші конкретні потреби — від кастомних форм до складних інтеграцій з CRM.",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function HomeAdvantagesSection() {
  return (
    <section className="relative py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Чому обирають DiVotek
          </h2>
        </motion.div>

        {/* Card Grid — F-01 Symmetric 3-column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {advantages.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl bg-card p-6 md:p-8 border border-border shadow-lg transition-all hover:border-accent/50 hover:shadow-xl hover:scale-[1.02]"
            >
              {/* HOVER-EFFECT: border-reveal — corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* HOVER-EFFECT: border-reveal — gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* HOVER-EFFECT: border-reveal — bottom accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-500" />

              {/* Card Content */}
              <div className="relative z-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-lg md:text-xl font-bold text-card-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
