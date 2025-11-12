"use client"

import { useEffect, useRef, useState } from "react"

export default function About() {
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

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div
            className={cn(
              "transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10",
            )}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">О нас</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Наш гостевой дом расположен на берегу живописных озёр Мурашки, в окружении вековых сосен и берёз. Это
                место, где время течёт иначе — медленнее и осознаннее.
              </p>
              <p>
                Мы создали пространство, где каждая деталь продумана для вашего комфорта: уютные номера с панорамными
                окнами, натуральные материалы в интерьере, и атмосфера домашнего тепла.
              </p>
              <p>
                Здесь вы можете отдохнуть от городской суеты, насладиться тишиной природы, свежим воздухом и традициями
                русского гостеприимства.
              </p>
            </div>
          </div>

          <div
            className={cn(
              "grid grid-cols-2 gap-4 transition-all duration-700 delay-300",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10",
            )}
          >
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/house-evening-dock.webp"
                  alt="Вечерний вид с причала"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/house-exterior-day.webp"
                  alt="Внешний вид дома"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
