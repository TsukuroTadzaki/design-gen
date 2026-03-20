"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, MessageCircleQuestion } from "lucide-react"

const faqItems = [
  {
    id: "faq-1",
    question: "У конкурентів дешевше — навіщо платити більше?",
    answer:
      "Дешевший сайт часто означає шаблонне рішення без урахування вашого бізнесу, без оптимізації під SEO, без гарантійного обслуговування. Через рік ви витратите більше на переробку, ніж заощадили на старті. Ми прозоро показуємо, що входить у вартість.",
  },
  {
    id: "faq-2",
    question: "Я не знаю точно, що хочу — як почати?",
    answer:
      "Це нормально. Саме для цього існує наш етап аналізу — ми допомагаємо сформулювати ваші потреби, показуємо приклади з портфоліо та разом визначаємо структуру і функціонал ще до початку розробки.",
  },
  {
    id: "faq-3",
    question: "Скільки часу займає створення сайту?",
    answer:
      "Типовий сайт — 4-8 тижнів від брифу до запуску, залежно від складності. Перед початком роботи ви отримуєте план з конкретними етапами та дедлайнами.",
  },
  {
    id: "faq-4",
    question: "Чи зможу я сам оновлювати контент?",
    answer:
      "Так. Ми встановлюємо зручну адмін-панель і проводимо навчання. Ви зможете самостійно додавати товари, статті, змінювати тексти та фото — без програміста.",
  },
  {
    id: "faq-5",
    question: "Що входить у гарантійний період?",
    answer:
      "Виправлення технічних помилок, консультації з роботи з адмін-панеллю, моніторинг працездатності сайту. Після гарантії ви можете продовжити обслуговування або керувати сайтом самостійно.",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
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

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="relative bg-muted py-16 md:py-24 overflow-hidden">
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">FAQ</span>
            <div className="h-px w-8 bg-primary" />
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
          >
            Часті запитання
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-muted-foreground text-base md:text-lg max-w-xl mx-auto"
          >
            Відповіді на питання, які найчастіше задають наші клієнти перед початком співпраці
          </motion.p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="space-y-3"
        >
          {faqItems.map((item) => {
            const isOpen = openId === item.id

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="bg-card rounded-xl shadow-lg border border-border overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary rounded-xl"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MessageCircleQuestion className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-semibold text-foreground text-sm md:text-base">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 md:px-6 pb-5 md:pb-6 pl-[4.25rem] md:pl-[4.75rem]">
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
