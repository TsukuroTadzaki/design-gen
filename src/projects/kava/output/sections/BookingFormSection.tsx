import { useState } from 'react'
import { Phone, Mail, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/core/ui/Button'
import { Card } from '@/core/ui/Card'
import { Input } from '@/core/ui/Input'
import { Textarea } from '@/core/ui/Textarea'

const infoCards = [
  {
    id: 'phone',
    icon: Phone,
    label: 'Телефон',
    value: '+380 (XX) XXX-XX-XX',
    description: 'Зателефонуйте, якщо потрібна швидка відповідь',
  },
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    value: 'hello@kavabar.ua',
    description: 'Для запитань та співпраці',
  },
  {
    id: 'hours',
    icon: Clock,
    label: 'Графік роботи',
    value: 'Пн-Нд: 09:00 — 23:00',
    description: 'Чт, Сб: до 00:00 (вечори подій)',
  },
]

export default function BookingFormSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <section className="bg-accent py-20 md:py-32 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl text-accent-foreground mb-4" style={{ fontFamily: 'serif' }}>
            Забронювати столик
          </h2>
          <p className="text-accent-foreground/80 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Залиште заявку — менеджер передзвонить протягом 15 хвилин для підтвердження
          </p>
        </div>

        {/* C-02 layout: Form (left 60-70%) + Info sidebar (right 30-40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Form — left column */}
          <Card className="lg:col-span-3 rounded-2xl shadow-md border border-border p-6 md:p-8 lg:p-10">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold text-2xl text-card-foreground mb-3" style={{ fontFamily: 'serif' }}>
                  Дякуємо!
                </h3>
                <p className="text-muted-foreground text-lg max-w-md">
                  Менеджер передзвонить протягом 15 хвилин.
                </p>
                <Button
                  type="button"
                  className="mt-8 rounded-full px-10 py-4 h-auto font-medium"
                  variant="accent"
                  onClick={() => setIsSubmitted(false)}
                >
                  Нове бронювання
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Name + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="booking-name" className="text-sm font-medium text-card-foreground">
                      Ваше імʼя <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="booking-name"
                      type="text"
                      placeholder="Олена"
                      required
                      className="h-12 rounded-xl bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="booking-phone" className="text-sm font-medium text-card-foreground">
                      Телефон <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="booking-phone"
                      type="tel"
                      placeholder="+380 (XX) XXX-XX-XX"
                      required
                      className="h-12 rounded-xl bg-background border-border"
                    />
                  </div>
                </div>

                {/* Row 2: Date + Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="booking-date" className="text-sm font-medium text-card-foreground">
                      Дата <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="booking-date"
                      type="date"
                      required
                      className="h-12 rounded-xl bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="booking-time" className="text-sm font-medium text-card-foreground">
                      Час <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="booking-time"
                      type="time"
                      required
                      className="h-12 rounded-xl bg-background border-border"
                    />
                  </div>
                </div>

                {/* Row 3: Guests */}
                <div className="space-y-2">
                  <label htmlFor="booking-guests" className="text-sm font-medium text-card-foreground">
                    Кількість гостей <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="booking-guests"
                    type="number"
                    min={1}
                    max={20}
                    placeholder="2"
                    required
                    className="h-12 rounded-xl bg-background border-border md:max-w-[200px]"
                  />
                </div>

                {/* Row 4: Comment */}
                <div className="space-y-2">
                  <label htmlFor="booking-comment" className="text-sm font-medium text-card-foreground">
                    Побажання
                  </label>
                  <Textarea
                    id="booking-comment"
                    placeholder="Столик біля вікна, святкування дня народження..."
                    rows={4}
                    className="rounded-xl bg-background border-border resize-none"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full md:w-auto rounded-full px-10 py-4 h-auto text-base font-medium"
                  variant="accent"
                  size="xl"
                >
                  Забронювати
                </Button>
              </form>
            )}
          </Card>

          {/* Info sidebar — right column */}
          <div className="lg:col-span-2 space-y-6">
            {infoCards.map((card, index) => (
              <Card
                key={card.id}
                className={`rounded-2xl shadow-md border border-border p-6 md:p-8 transition-transform duration-300 hover:scale-[1.03] stagger-${index + 1}`}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <card.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{card.label}</p>
                    <p className="font-semibold text-card-foreground text-lg" style={{ fontFamily: 'serif' }}>
                      {card.value}
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">{card.description}</p>
                  </div>
                </div>
              </Card>
            ))}

            {/* Extra trust note */}
            <div className="rounded-2xl bg-accent-foreground/10 border border-accent-foreground/20 p-6 text-accent-foreground">
              <p className="text-sm font-light leading-relaxed">
                Не хочете чекати? Зателефонуйте нам напряму — ми забронюємо столик під час розмови.
              </p>
              <a
                href="tel:+380XXXXXXXX"
                className="inline-flex items-center gap-2 mt-3 text-accent-foreground font-medium hover:underline"
              >
                <Phone className="w-4 h-4" />
                +380 (XX) XXX-XX-XX
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
