"use client"

import { motion } from "framer-motion"
import { HelpCircle, Phone } from "lucide-react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/core/ui/Accordion"
import { Button } from "@/core/ui/Button"
import { ProjectLink } from "@/core/lib/project-context"

const faqItems = [
  {
    id: "faq-boat-help",
    question: "Я не знаю, який човен мені потрібен. Допоможете?",
    answer:
      "Звісно! Зателефонуйте або напишіть — наш консультант поставить кілька запитань про те, де і як ви плануєте ходити, та запропонує 2-3 оптимальні варіанти у вашому бюджеті. Це безкоштовно.",
  },
  {
    id: "faq-final-price",
    question: "Ціни на сайті фінальні? Не буде доплат при оформленні?",
    answer:
      "Так, ціни на сайті актуальні та фінальні. Єдине, що додається — вартість доставки, яку ви побачите при оформленні замовлення до оплати.",
  },
  {
    id: "faq-delivery-speed",
    question: "Як швидко доставите?",
    answer:
      "Товари в наявності відправляємо протягом 1-2 робочих днів. Доставка Новою Поштою по Україні — 1-3 дні. Для габаритних вантажів (катери, великі човни) — організуємо адресну доставку.",
  },
  {
    id: "faq-warranty",
    question: "Чи є гарантія?",
    answer:
      "Так, на всі товари діє офіційна гарантія виробника. Термін гарантії вказаний на картці кожного товару. Ми також допоможемо з гарантійним обслуговуванням якщо виникнуть питання.",
  },
  {
    id: "faq-legal-entity",
    question: "Чи працюєте з юридичними особами?",
    answer:
      "Так, працюємо з ФОП та юрособами. Виставляємо рахунок, оформляємо всі необхідні документи. Для оптових замовлень від 3 одиниць — додаткова знижка.",
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
  return (
    <section className="bg-muted py-12 md:py-16 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            Часті запитання
          </h2>
        </motion.div>

        {/* Q-01 Single-Column Accordion */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <AccordionItem
                  value={item.id}
                  className="border-b border-border bg-card rounded-lg mb-3 px-6 shadow-sm data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-card-foreground hover:no-underline hover:text-primary py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact CTA at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 md:mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Не знайшли відповідь на своє запитання?
          </p>
          <ProjectLink to="/contacts">
            <Button className="bg-accent text-accent-foreground rounded-lg px-6 py-3 font-semibold hover:opacity-90 transition-opacity group">
              <Phone className="mr-2 h-4 w-4" />
              Зв'яжіться з нами
            </Button>
          </ProjectLink>
        </motion.div>
      </div>
    </section>
  )
}
