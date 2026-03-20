"use client"

import { motion } from "framer-motion"
import {
  BadgePercent,
  PackageCheck,
  MessageCircleQuestion,
  Layers,
  Tag,
} from "lucide-react"

const advantages = [
  {
    id: "price",
    title: "Ціни від виробника",
    description:
      "Працюємо напряму з виробниками без посередників. Офіційна ціна та повна гарантія без прихованих націнок.",
    icon: BadgePercent,
  },
  {
    id: "kit",
    title: "Повна комплектація під ключ",
    description:
      "Підберемо не тільки човен, а й мотор, ехолот, аксесуари та все необхідне. Одне замовлення — повна готовність до води.",
    icon: PackageCheck,
  },
  {
    id: "experts",
    title: "Досвідчені консультанти",
    description:
      "Наші спеціалісти самі ходять на воді та знають особливості кожної моделі з практичного досвіду.",
    icon: MessageCircleQuestion,
  },
  {
    id: "range",
    title: "Великий асортимент",
    description:
      "Понад 500 моделей човнів та тисячі аксесуарів від 15+ брендів.",
    icon: Layers,
  },
  {
    id: "discounts",
    title: "Система знижок",
    description:
      "Регулярні акції, знижки на комплекти та програма лояльності. Комплектом завжди вигідніше.",
    icon: Tag,
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
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export default function AdvantagesSection() {
  return (
    <section className="bg-background py-12 md:py-16 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            Чому обирають Barkas
          </h2>
        </motion.div>

        {/* Card grid — F-01 Symmetric Card Grid: 3 cols, 5 items (3+2) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {advantages.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-6 w-6 text-primary" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
