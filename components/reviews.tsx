"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const reviews = [
  {
    id: 1,
    name: "Анна и Сергей",
    date: "Октябрь 2024",
    rating: 5,
    text: "Невероятное место! Провели здесь неделю и не хотелось уезжать. Чистейший воздух, тишина, уютные номера. Особенно понравилась баня и рыбалка на рассвете.",
  },
  {
    id: 2,
    name: "Мария Петрова",
    date: "Сентябрь 2024",
    rating: 5,
    text: "Приезжаем сюда уже третий год подряд. Дети в восторге от природы, а мы с мужем наслаждаемся покоем. Хозяева — замечательные люди, всегда помогут и подскажут.",
  },
  {
    id: 3,
    name: "Дмитрий К.",
    date: "Август 2024",
    rating: 5,
    text: "Идеальное место для отдыха от городской суеты. Красивейшие закаты над озером, вкусная домашняя еда, комфортные номера. Обязательно вернёмся!",
  },
]

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section id="reviews" ref={sectionRef} className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Отзывы гостей</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Узнайте, что говорят наши гости о своём отдыхе
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {reviews.map((review, index) => (
              <Card
                key={review.id}
                className={cn(
                  "transition-all duration-500 border-0 shadow-xl",
                  index === currentIndex
                    ? "opacity-100 scale-100 relative"
                    : "opacity-0 scale-95 absolute inset-0 pointer-events-none",
                )}
              >
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-lg text-foreground leading-relaxed mb-6 italic">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button variant="outline" size="icon" onClick={prevReview} className="rounded-full bg-transparent">
              ←
            </Button>
            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentIndex ? "bg-primary w-8" : "bg-border hover:bg-border/60",
                  )}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={nextReview} className="rounded-full bg-transparent">
              →
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
