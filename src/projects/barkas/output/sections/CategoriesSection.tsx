"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Ship, Anchor, Sailboat, Zap, Radar, Package, ArrowRight } from "lucide-react"
import { ProjectLink } from "@/core/lib/project-context"

const categories = [
  {
    id: "inflatable-boats",
    name: "Надувні човни",
    imageDescription: "Надувний ПВХ човен на воді",
    cta: "Від 3 500 грн",
    icon: Ship,
    href: "/catalog/inflatable-boats",
  },
  {
    id: "rib-boats",
    name: "RIB-човни",
    imageDescription: "RIB-човен з жорстким дном",
    cta: "Від 25 000 грн",
    icon: Anchor,
    href: "/catalog/rib-boats",
  },
  {
    id: "aluminum-boats",
    name: "Алюмінієві човни",
    imageDescription: "Алюмінієвий човен-катер",
    cta: "Від 45 000 грн",
    icon: Sailboat,
    href: "/catalog/aluminum-boats",
  },
  {
    id: "motors",
    name: "Мотори",
    imageDescription: "Підвісний мотор на транці",
    cta: "Від 8 000 грн",
    icon: Zap,
    href: "/catalog/motors",
  },
  {
    id: "electronics",
    name: "Ехолоти та навігація",
    imageDescription: "Ехолот на приладовій панелі",
    cta: "Від 2 500 грн",
    icon: Radar,
    href: "/catalog/electronics",
  },
  {
    id: "accessories",
    name: "Аксесуари",
    imageDescription: "Набір аксесуарів для човна",
    cta: "Від 150 грн",
    icon: Package,
    href: "/catalog/accessories",
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

export default function CategoriesSection() {
  return (
    <section className="bg-muted py-12 md:py-16 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-10 md:mb-12" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-3">
              Що ви шукаєте?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Оберіть напрямок — ми покажемо найкращі варіанти
            </p>
          </motion.div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <ProjectLink to={category.href} className="block h-full">
                  <div className="group relative bg-card rounded-lg border border-border p-6 h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-primary/20">
                      <category.icon className="w-6 h-6 text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {category.imageDescription}
                    </p>

                    {/* Price + Arrow */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-accent">
                        {category.cta}
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                  </div>
                </ProjectLink>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
