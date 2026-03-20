"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Star, User, Ship, Radar, Building2 } from "lucide-react"
import { Card } from "@/core/ui/Card"

const testimonials = [
  {
    id: "sergiy",
    name: "Сергій К.",
    text: "Купував перший надувний човен і взагалі не розбирався. Консультант Олексій витратив зі мною годину по телефону, підібрав човен, мотор і навіть порадив якір під моє озеро. Все прийшло за 3 дні. Вже другий сезон ходжу — жодних проблем.",
    details: "Човен Bark BT-310 + мотор Parsun 5 к.с.",
    rating: 5,
    icon: Ship,
  },
  {
    id: "dmytro",
    name: "Дмитро В.",
    text: "Шукав ехолот Garmin Striker 5cv — порівнював ціни по 6 магазинах. У Barkas була найнижча ціна і товар відправили в той же день. Ніяких \"зателефонуйте для уточнення ціни\" — все чесно на сайті.",
    details: "Ехолот Garmin Striker Vivid 5cv",
    rating: 5,
    icon: Radar,
  },
  {
    id: "baza",
    name: "База відпочинку «Дніпровська»",
    text: "Замовляли 4 човни для прокату гостям. Менеджер одразу запропонував моделі, які легко ремонтуються і прості для новачків. Дали знижку та оформили все на юрособу за один день.",
    details: "4× Kolibri K-280CT + жилети + весла",
    rating: 5,
    icon: Building2,
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-12 md:py-16">
      {/* Layer 2: Background dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--primary-foreground) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.03,
        }}
      />

      {/* Layer 3: Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground">
            Що кажуть клієнти
          </h2>
        </motion.div>

        {/* Layer 5: Reveal animation — staggered card grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={cardVariants}>
              <Card className="bg-card rounded-lg border border-border p-6 h-full flex flex-col hover:shadow-md transition-shadow">
                {/* Star rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={`star-${testimonial.id}-${i}`}
                      className="w-4 h-4 fill-accent text-accent"
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-card-foreground text-sm md:text-base leading-relaxed flex-1 mb-6">
                  {testimonial.text}
                </p>

                {/* Divider */}
                <div className="h-px bg-border mb-4" />

                {/* Author info */}
                <div className="flex items-center gap-3">
                  {/* Avatar placeholder with icon */}
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <testimonial.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-card-foreground text-sm truncate">
                      {testimonial.name}
                    </p>
                    <p className="text-muted-foreground text-xs truncate">
                      {testimonial.details}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
