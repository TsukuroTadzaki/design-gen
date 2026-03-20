import { useState } from "react"
import { ShoppingCart, Heart, GitCompare, Star, Zap, Ship, Anchor, Navigation } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/core/ui/Button"
import { Badge } from "@/core/ui/Badge"
import { ProjectLink } from "@/core/lib/project-context"

const products = [
  {
    id: "bark-bt-310",
    brand: "Bark",
    name: "Bark BT-310 — моторний човен ПВХ",
    specs: "310 см • 3 місця • слань • до 15 к.с.",
    price: "12 800",
    oldPrice: "14 200",
    badge: "Хіт продажів",
    badgeVariant: "default" as const,
    available: true,
    rating: 4.8,
    reviews: 47,
    icon: Ship,
    image: "Тримісний моторний ПВХ човен",
  },
  {
    id: "kolibri-k-280ct",
    brand: "Kolibri",
    name: "Kolibri K-280CT — гребний човен",
    specs: "280 см • 2 місця • надувне дно • 22 кг",
    price: "7 450",
    oldPrice: null,
    badge: "Новинка",
    badgeVariant: "secondary" as const,
    available: true,
    rating: 4.6,
    reviews: 31,
    icon: Anchor,
    image: "Двомісний гребний надувний човен",
  },
  {
    id: "parsun-t5bms",
    brand: "Parsun",
    name: "Parsun T5BMS — мотор 5 к.с.",
    specs: "5 к.с. • 2-тактний • 20 кг • ручний старт",
    price: "16 900",
    oldPrice: "18 500",
    badge: "-9%",
    badgeVariant: "destructive" as const,
    available: true,
    rating: 4.7,
    reviews: 63,
    icon: Zap,
    image: "Підвісний човновий мотор",
  },
  {
    id: "garmin-striker-5cv",
    brand: "Garmin",
    name: "Garmin Striker Vivid 5cv",
    specs: "5\" дисплей • GPS • CHIRP • ClearVü",
    price: "8 200",
    oldPrice: null,
    badge: null,
    badgeVariant: "default" as const,
    available: true,
    rating: 4.9,
    reviews: 89,
    icon: Navigation,
    image: "Ехолот з кольоровим дисплеєм",
  },
  {
    id: "bark-bt-270",
    brand: "Bark",
    name: "Bark BT-270 — моторний човен ПВХ",
    specs: "270 см • 2 місця • слань • до 8 к.с.",
    price: "9 600",
    oldPrice: null,
    badge: null,
    badgeVariant: "default" as const,
    available: true,
    rating: 4.5,
    reviews: 28,
    icon: Ship,
    image: "Двомісний моторний ПВХ човен",
  },
  {
    id: "aqua-star-c330",
    brand: "Aqua-Star",
    name: "Aqua-Star C-330 RFD — моторний",
    specs: "330 см • 4 місця • жорстке дно • до 20 к.с.",
    price: "19 800",
    oldPrice: "22 400",
    badge: "-12%",
    badgeVariant: "destructive" as const,
    available: true,
    rating: 4.7,
    reviews: 35,
    icon: Ship,
    image: "Чотиримісний моторний човен",
  },
  {
    id: "kolibri-vest-90",
    brand: "Kolibri",
    name: "Рятувальний жилет 90+ кг",
    specs: "Розмір XL • 90-110 кг • сертифікований",
    price: "890",
    oldPrice: null,
    badge: null,
    badgeVariant: "default" as const,
    available: true,
    rating: 4.4,
    reviews: 52,
    icon: Anchor,
    image: "Сертифікований рятувальний жилет",
  },
  {
    id: "bravo-pump-7",
    brand: "Bravo",
    name: "Насос Bravo 7 — ножний",
    specs: "6.5 л • подвійна дія • шланг 1.5 м",
    price: "650",
    oldPrice: "780",
    badge: "Акція",
    badgeVariant: "default" as const,
    available: true,
    rating: 4.3,
    reviews: 41,
    icon: Zap,
    image: "Ножний насос для надувних човнів",
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

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={`star-${star}`}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        {rating} ({reviews})
      </span>
    </div>
  )
}

export default function FeaturedProductsSection() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <section className="bg-background py-12 md:py-16 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-3">
            Популярні товари
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Те, що найчастіше обирають наші клієнти
          </p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <div className="group bg-card rounded-lg border border-border p-4 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                {/* Image Area */}
                <div className="relative aspect-[4/3] bg-muted rounded-lg mb-3 overflow-hidden">
                  {/* Placeholder image with icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <product.icon className="w-16 h-16 text-primary/20 transition-transform duration-500 group-hover:scale-110" />
                  </div>

                  {/* Badge */}
                  {product.badge && (
                    <Badge
                      variant={product.badgeVariant}
                      className="absolute top-2 left-2 z-10 text-xs"
                    >
                      {product.badge}
                    </Badge>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="w-8 h-8 rounded-full bg-card/90 backdrop-blur border border-border flex items-center justify-center hover:bg-card transition-colors"
                      aria-label="Додати в обране"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          wishlist.has(product.id)
                            ? "fill-destructive text-destructive"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                    <button
                      className="w-8 h-8 rounded-full bg-card/90 backdrop-blur border border-border flex items-center justify-center hover:bg-card transition-colors"
                      aria-label="Порівняти"
                    >
                      <GitCompare className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>

                  {/* Image alt text (accessibility) */}
                  <img
                    src=""
                    alt={product.image}
                    className="absolute inset-0 w-full h-full object-cover opacity-0"
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  {/* Brand */}
                  <span className="text-xs font-medium text-primary uppercase tracking-wider mb-1">
                    {product.brand}
                  </span>

                  {/* Title */}
                  <ProjectLink
                    to="/product"
                    className="text-sm font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 mb-1.5"
                  >
                    {product.name}
                  </ProjectLink>

                  {/* Specs */}
                  <p className="text-xs text-muted-foreground mb-2">
                    {product.specs}
                  </p>

                  {/* Rating */}
                  <div className="mb-3">
                    <StarRating
                      rating={product.rating}
                      reviews={product.reviews}
                    />
                  </div>

                  {/* Price + CTA */}
                  <div className="mt-auto flex items-end justify-between gap-2">
                    <div>
                      {product.oldPrice && (
                        <span className="block text-xs text-muted-foreground line-through">
                          {product.oldPrice} грн
                        </span>
                      )}
                      <span className="text-lg font-semibold text-foreground">
                        {product.price} грн
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-accent text-accent-foreground rounded-lg px-4 py-2 font-semibold hover:bg-accent/90 transition-colors shrink-0"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1.5" />
                      В кошик
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8 md:mt-10"
        >
          <ProjectLink to="/catalog">
            <Button
              variant="outline"
              className="border-primary text-primary rounded-lg px-6 py-3 font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Переглянути весь каталог
            </Button>
          </ProjectLink>
        </motion.div>
      </div>
    </section>
  )
}
