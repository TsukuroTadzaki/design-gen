"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Phone } from "lucide-react"
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

export default function HomeCtaSection() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const handleClose = () => {
    setIsFormOpen(false)
    setTimeout(() => setIsSubmitted(false), 300)
  }

  return (
    <section className="relative overflow-hidden bg-accent py-16 md:py-24">
      {/* Layer 2: GRADIENT-LAYER mesh — 3 gradient layers for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/15 opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-tl from-secondary/15 via-transparent to-primary/10 mix-blend-multiply opacity-15" />
        <div className="absolute -top-1/2 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl animate-mesh-pulse" />
        <div className="absolute -bottom-1/3 -right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-secondary/10 to-transparent blur-3xl animate-mesh-pulse" style={{ animationDelay: "2.5s" }} />
      </div>

      {/* Layer 3: Content — C-01 Centered Single Column */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 md:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-foreground mb-4 md:mb-6"
          >
            Готові обговорити ваш проект?
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="text-lg md:text-xl text-accent-foreground/85 mb-8 md:mb-10 max-w-2xl mx-auto"
          >
            Розкажіть нам про вашу задачу — ми підготуємо індивідуальну пропозицію з кошторисом і строками
          </motion.p>

          {/* Layer 4: HOVER-EFFECT arrow-shift on buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              onClick={() => setIsFormOpen(true)}
              className="group bg-secondary text-secondary-foreground rounded-xl px-8 py-5 text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all"
            >
              Замовити консультацію
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <ProjectLink to="/contacts">
              <Button
                variant="outline"
                className="group border-2 border-accent-foreground text-accent-foreground bg-transparent hover:bg-accent-foreground/10 rounded-xl px-8 py-5 text-lg font-semibold transition-all"
              >
                <Phone className="mr-2 w-5 h-5" />
                Зателефонувати нам
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </ProjectLink>
          </motion.div>
        </motion.div>
      </div>

      {/* Consultation Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-card sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-card-foreground">
              Замовити консультацію
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Заповніть форму і ми зв'яжемось з вами протягом робочого дня
            </DialogDescription>
          </DialogHeader>

          {isSubmitted ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-8 h-8 text-accent rotate-[-90deg]" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Дякуємо!</h3>
              <p className="text-muted-foreground">
                {"Ми отримали вашу заявку і зв'яжемось найближчим часом."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label htmlFor="cta-name" className="block text-sm font-medium text-card-foreground mb-1.5">
                  {"Ваше ім'я"}
                </label>
                <Input
                  id="cta-name"
                  placeholder="Олександр Петренко"
                  required
                  className="rounded-xl"
                />
              </div>
              <div>
                <label htmlFor="cta-phone" className="block text-sm font-medium text-card-foreground mb-1.5">
                  Телефон
                </label>
                <Input
                  id="cta-phone"
                  type="tel"
                  placeholder="+380 (XX) XXX-XX-XX"
                  required
                  className="rounded-xl"
                />
              </div>
              <div>
                <label htmlFor="cta-email" className="block text-sm font-medium text-card-foreground mb-1.5">
                  Email
                </label>
                <Input
                  id="cta-email"
                  type="email"
                  placeholder="email@company.com"
                  className="rounded-xl"
                />
              </div>
              <div>
                <label htmlFor="cta-message" className="block text-sm font-medium text-card-foreground mb-1.5">
                  Опишіть вашу задачу
                </label>
                <textarea
                  id="cta-message"
                  rows={3}
                  placeholder="Коротко опишіть, що вам потрібно..."
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-accent text-accent-foreground rounded-xl px-8 py-4 font-semibold hover:scale-[1.02] transition-all"
              >
                Надіслати заявку
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
