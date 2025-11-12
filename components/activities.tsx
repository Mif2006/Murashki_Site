"use client"

import { useEffect, useRef, useState } from "react"
import { Waves, Fish, Trees, Flame, Ship, Camera } from "lucide-react"

const activities = [
  {
    icon: Waves,
    title: "Купание в озере",
    description: "Чистейшая вода и оборудованный пляж",
  },
  {
    icon: Fish,
    title: "Рыбалка",
    description: "Щука, окунь, карась ждут рыбаков",
  },
  {
    icon: Trees,
    title: "Прогулки по лесу",
    description: "Грибы, ягоды и свежий воздух",
  },
  {
    icon: Flame,
    title: "Русская баня",
    description: "Традиционная парная на дровах",
  },
  {
    icon: Ship,
    title: "Катание на лодке",
    description: "Вёсельные лодки и катамараны",
  },
  {
    icon: Camera,
    title: "Фотосессии",
    description: "Живописные локации для снимков",
  },
]

export default function Activities() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll("[data-activity-index]")
            items.forEach((item, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => [...prev, index])
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="activities" ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 mb-16">
        <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
          <img src="/sailing-sunset.webp" alt="Парусный спорт на закате" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <h3 className="font-serif text-3xl md:text-4xl font-bold mb-2">Водные приключения</h3>
            <p className="text-lg opacity-90">Насладитесь магией заката на озере</p>
          </div>
        </div>
      </div>

      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"
          style={{ transform: "translate(30%, -30%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"
          style={{ transform: "translate(-30%, 30%)" }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Активности и природа вокруг
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Откройте для себя разнообразие развлечений на свежем воздухе
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <div
                key={index}
                data-activity-index={index}
                className={cn(
                  "group p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1",
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                )}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2">{activity.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{activity.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
