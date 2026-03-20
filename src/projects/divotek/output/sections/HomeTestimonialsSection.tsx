"use client"

import { motion } from "framer-motion"
import { Quote, Star, Monitor, Search, Wrench } from "lucide-react"
import { Card } from "@/core/ui/Card"

const featured = {
  name: "Ірина К.",
  role: "Власниця студії йоги",
  text: "Довго не могла вирішитись замовити сайт — боялась, що процес затягнеться і результат не виправдає вкладень. DiVotek зробили все за 5 тижнів, навчили мене оновлювати розклад самостійно. За перший місяць після запуску отримала 40 нових записів через форму на сайті.",
  service: "Створення сайту",
  icon: Monitor,
  initials: "ІК",
}

const supporting = [
  {
    id: "oleg",
    name: "Олег П.",
    role: "Директор транспортної компанії",
    text: "Потрібен був корпоративний сайт з калькулятором вартості доставки. Інші підрядники або не розуміли задачу, або називали космічні суми. DiVotek дали чіткий кошторис, пояснили кожен пункт і реалізували все як домовлялись. Вже рік працюємо — жодних проблем.",
    service: "Створення сайту + підтримка",
    icon: Wrench,
    initials: "ОП",
  },
  {
    id: "natalia",
    name: "Наталія М.",
    role: "Маркетолог мережі клінік",
    text: "Замовляли SEO-просування після редизайну сайту. За 4 місяці трафік з пошуку зріс на 180%. Подобається, що щомісяця отримую зрозумілий звіт — бачу динаміку і розумію, на що йдуть кошти.",
    service: "SEO-просування",
    icon: Search,
    initials: "НМ",
  },
]

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
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export default function HomeTestimonialsSection() {
  return (
    <section className="relative bg-secondary py-16 md:py-24 overflow-hidden">
      {/* Layer 2: BACKGROUND-PATTERN dots */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.03,
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Layer 5: REVEAL-ANIMATION fade-up with stagger */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {/* Section title */}
          <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground">
              Що кажуть наші клієнти
            </h2>
          </motion.div>

          {/* Featured testimonial — T-05 hero tier */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card/10 backdrop-blur-sm border-border/20 rounded-xl shadow-lg p-0 mb-8 md:mb-12 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left: avatar area with decorative quote */}
                <div className="relative flex flex-col items-center justify-center p-8 md:p-12 bg-primary/10">
                  <Quote className="absolute top-6 left-6 w-16 h-16 text-primary/20" />
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary flex items-center justify-center mb-6 shadow-xl">
                    <span className="text-3xl md:text-4xl font-bold text-primary-foreground">
                      {featured.initials}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-secondary-foreground">
                    {featured.name}
                  </h3>
                  <p className="text-muted-foreground mt-1">{featured.role}</p>
                  <div className="flex items-center gap-1.5 mt-4">
                    <featured.icon className="w-4 h-4 text-accent" />
                    <span className="text-sm text-accent font-medium">
                      {featured.service}
                    </span>
                  </div>
                  {/* Star rating */}
                  <div className="flex gap-1 mt-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={`star-featured-${i}`}
                        className="w-5 h-5 fill-accent text-accent"
                      />
                    ))}
                  </div>
                </div>

                {/* Right: quote text */}
                <div className="flex items-center p-8 md:p-12">
                  <div>
                    <Quote className="w-10 h-10 text-accent/30 mb-4 -scale-x-100" />
                    <p className="text-lg md:text-xl leading-relaxed text-secondary-foreground/90">
                      {featured.text}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Supporting testimonials — T-05 grid tier */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {supporting.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <Card className="group bg-card/10 backdrop-blur-sm border-border/20 rounded-xl shadow-lg p-6 md:p-8 h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                  <Quote className="w-8 h-8 text-accent/20 mb-4" />
                  <p className="text-secondary-foreground/85 leading-relaxed mb-6">
                    {item.text}
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-primary">
                        {item.initials}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary-foreground">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/20">
                    <div className="flex items-center gap-1.5">
                      <item.icon className="w-4 h-4 text-accent" />
                      <span className="text-xs text-accent font-medium">
                        {item.service}
                      </span>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={`star-${item.id}-${i}`}
                          className="w-3.5 h-3.5 fill-accent text-accent"
                        />
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
