"use client"

import { motion } from "framer-motion"
import { Monitor, Search, Megaphone, ArrowRight } from "lucide-react"
import { Button } from "@/core/ui/Button"
import { ProjectLink } from "@/core/lib/project-context"

const services = [
  {
    icon: Monitor,
    name: "Створення сайтів",
    description:
      "Розробка сучасних веб-сайтів під ключ: від лендінгу до складного порталу з індивідуальним функціоналом.",
    details:
      "Ми проектуємо та розробляємо сайти, які вирішують конкретні бізнес-задачі. Кожен проект починається з аналізу вашої аудиторії, конкурентів і цілей. На виході — адаптивний сайт з продуманою структурою, швидким завантаженням та готовністю до SEO-просування.",
    cta: "Детальніше",
    link: "/web-development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    icon: Search,
    name: "SEO-просування",
    description:
      "Системна робота над видимістю вашого сайту в Google: від аудиту до стабільного потоку органічного трафіку.",
    details:
      "SEO — це не магія, а послідовна технічна і контентна робота. Ми починаємо з глибокого аудиту вашого сайту, аналізуємо позиції конкурентів і формуємо стратегію просування. Щомісяця надаємо прозорі звіти з динамікою позицій і трафіку.",
    cta: "Детальніше",
    link: "/seo-marketing",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
  {
    icon: Megaphone,
    name: "Маркетинг",
    description:
      "Комплексні маркетингові рішення для залучення клієнтів: контекстна реклама, SMM, аналітика.",
    details:
      "Гарний сайт без трафіку — як магазин у глухому провулку. Ми допомагаємо привести цільових відвідувачів через контекстну рекламу Google Ads, таргетовану рекламу в соціальних мережах та email-маркетинг. Кожна гривня рекламного бюджету — під контролем.",
    cta: "Детальніше",
    link: "/seo-marketing",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&h=600&fit=crop",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
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

export default function ServicesSection() {
  return (
    <section className="relative bg-muted py-16 md:py-24 overflow-hidden">
      {/* Section header with accent-line decorative element */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {/* Section label with accent line */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Наші послуги
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12 md:mb-16 max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Що ми робимо
            </h2>
            <p className="text-lg text-muted-foreground">
              Комплексні рішення для присутності вашого бізнесу в інтернеті
            </p>
          </motion.div>

          {/* Alternating service blocks */}
          <div className="space-y-16 md:space-y-24">
            {services.map((service, index) => {
              const isReversed = index % 2 !== 0
              return (
                <motion.div
                  key={service.name}
                  variants={itemVariants}
                  className={`group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    isReversed ? "lg:direction-rtl" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={`${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-64 md:h-80 lg:h-96 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="bg-card rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent">
                          <service.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground">
                          {service.name}
                        </h3>
                      </div>

                      <p className="text-base text-foreground mb-3 font-medium">
                        {service.description}
                      </p>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {service.details}
                      </p>

                      <ProjectLink to={service.link}>
                        <Button className="bg-accent text-accent-foreground rounded-xl px-8 py-4 font-semibold group/btn">
                          {service.cta}
                          <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </ProjectLink>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
