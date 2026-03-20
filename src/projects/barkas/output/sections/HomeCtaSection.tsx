import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/core/ui/Button'
import { Input } from '@/core/ui/Input'
import { ProjectLink } from '@/core/lib/project-context'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/core/ui/Dialog'

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function HomeCtaSection() {
  const [consultOpen, setConsultOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  const handleClose = () => {
    setConsultOpen(false)
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({ name: '', phone: '', message: '' })
    }, 300)
  }

  return (
    <section className="relative overflow-hidden bg-accent py-12 md:py-16">
      {/* Layer 1: Accent background — applied via bg-accent */}

      {/* Layer 2: Visual texture — subtle dot pattern for non-flat appearance */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--foreground) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.06,
        }}
      />

      {/* Layer 2b: Gradient overlay for depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />

      {/* Layer 3: Content — C-01 Centered Single Column */}
      <div className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8 text-center"
        >
          {/* Headline */}
          <motion.h2
            variants={fadeUpVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-accent-foreground mb-4"
          >
            {"Готові обрати свій човен?"}
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeUpVariants}
            className="text-lg md:text-xl text-accent-foreground/90 mb-8 max-w-2xl mx-auto"
          >
            {"Перегляньте каталог самостійно або зверніться до консультанта — допоможемо підібрати ідеальний варіант під ваші задачі та бюджет."}
          </motion.p>

          {/* Layer 4: CTA Buttons with HOVER-EFFECT arrow-shift */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          >
            <ProjectLink to="/catalog">
              <Button className="group bg-primary text-primary-foreground rounded-lg px-8 py-5 text-lg font-semibold shadow-md hover:shadow-lg transition-all">
                {"Перейти до каталогу"}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </ProjectLink>

            <Button
              onClick={() => setConsultOpen(true)}
              className="group bg-white text-accent rounded-lg px-8 py-5 text-lg font-semibold shadow-md hover:shadow-lg hover:bg-white/90 transition-all"
            >
              {"Отримати консультацію"}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Phone number */}
          <motion.div variants={fadeUpVariants}>
            <a
              href="tel:+380XXXXXXXX"
              className="inline-flex items-center gap-2 text-accent-foreground/80 hover:text-accent-foreground transition-colors text-base"
            >
              <Phone className="w-4 h-4" />
              <span>+380 (XX) XXX-XX-XX</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Consultation Dialog */}
      <Dialog open={consultOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-card-foreground">
              {"Отримати консультацію"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {"Залиште контактні дані — наш консультант зв'яжеться з вами протягом 30 хвилин у робочий час."}
            </DialogDescription>
          </DialogHeader>

          {formSubmitted ? (
            <div className="flex flex-col items-center py-8 gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">
                {"Дякуємо за заявку!"}
              </h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                {"Наш консультант зв'яжеться з вами протягом 30 хвилин у робочий час."}
              </p>
              <Button
                onClick={handleClose}
                className="bg-accent text-accent-foreground rounded-lg px-6 py-3 font-semibold mt-2"
              >
                {"Закрити"}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div>
                <label
                  htmlFor="consult-name"
                  className="block text-sm font-medium text-card-foreground mb-1.5"
                >
                  {"Ім'я"}
                </label>
                <Input
                  id="consult-name"
                  placeholder="Ваше ім'я"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="rounded-lg"
                />
              </div>
              <div>
                <label
                  htmlFor="consult-phone"
                  className="block text-sm font-medium text-card-foreground mb-1.5"
                >
                  {"Телефон"}
                </label>
                <Input
                  id="consult-phone"
                  type="tel"
                  placeholder="+380 (XX) XXX-XX-XX"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="rounded-lg"
                />
              </div>
              <div>
                <label
                  htmlFor="consult-message"
                  className="block text-sm font-medium text-card-foreground mb-1.5"
                >
                  {"Коментар (необов'язково)"}
                </label>
                <textarea
                  id="consult-message"
                  placeholder="Розкажіть, що шукаєте або які питання маєте"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={3}
                  className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-accent text-accent-foreground rounded-lg px-6 py-3 font-semibold group"
              >
                <Send className="mr-2 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                {"Надіслати заявку"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
