"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Users, Home, Bed, Waves, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"

const amenities = [
  "Полностью оборудованная кухня",
  "Русская баня на дровах",
  "Камин и панорамные окна",
  "Собственный причал и лодки",
  "Wi-Fi и спутниковое ТВ",
  "Мангальная зона и терраса",
  "Постельное белье и полотенца",
  "Парковка на территории",
]

const highlights = [
  { icon: Users, value: "До 6", label: "гостей" },
  { icon: Home, value: "120", label: "м² площадь" },
  { icon: Bed, value: "2", label: "спальни" },
  { icon: Waves, value: "30", label: "м до озера" },
]

const houseImages = [
  { src: "/house-exterior-day.webp", alt: "Внешний вид дома" },
  { src: "/interior-living-room.webp", alt: "Гостиная с камином" },
  { src: "/dining-area.webp", alt: "Обеденная зона" },
  { src: "/interior-bathroom.webp", alt: "Ванная комната" },
  { src: "/lake-deck-view.webp", alt: "Вид на озеро с террасы" },
  { src: "/house-winter.webp", alt: "Дом зимой" },
]

export default function HouseRental() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const nextImage = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % houseImages.length)
      setIsTransitioning(false)
    }, 300)
  }

  const prevImage = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImage((prev) => (prev - 1 + houseImages.length) % houseImages.length)
      setIsTransitioning(false)
    }, 300)
  }

  return (
    <section id="house" ref={sectionRef} className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Весь дом в ваше распоряжение
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Арендуйте полностью весь гостевой дом для вашей семьи или компании друзей
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image section */}
          <div
            className="relative transition-all duration-700 delay-100"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateX(0)" : "translateX(-10%)" }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src={houseImages[currentImage].src || "/placeholder.svg"}
                alt={houseImages[currentImage].alt}
                className={`w-full h-[600px] object-cover transition-all duration-500 ${isTransitioning ? "opacity-0 scale-105" : "opacity-100 scale-100"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Carousel controls */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Image indicators */}
              <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2">
                {houseImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsTransitioning(true)
                      setTimeout(() => {
                        setCurrentImage(index)
                        setIsTransitioning(false)
                      }, 300)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${currentImage === index ? "bg-white w-8" : "bg-white/50"}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              {/* Floating price card */}
              <div className="absolute bottom-6 left-6 right-6 bg-background/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Стоимость аренды</p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-4xl font-bold text-primary">280 BYN</span>
                      <span className="text-muted-foreground">/ сутки</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Минимум 2 ночи</p>
                  </div>
                  <Button size="lg" className="rounded-full">
                    Забронировать
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Details section */}
          <div
            className="transition-all duration-700 delay-300"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateX(0)" : "translateX(10%)" }}
          >
            {/* Key highlights */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {highlights.map((item, index) => {
                const Icon = item.icon
                return (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
                  >
                    <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="font-serif text-3xl font-bold text-foreground mb-1">{item.value}</div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                  </div>
                )
              })}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Комфорт для всей семьи</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Просторный деревянный дом с современными удобствами и аутентичной атмосферой. Две уютные спальни,
                большая гостиная с камином, полностью оборудованная кухня и традиционная русская баня.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Идеально подходит для семейного отдыха, празднования событий или спокойного уик-энда вдали от городской
                суеты.
              </p>
            </div>

            {/* Amenities list */}
            <div>
              <h4 className="font-serif text-xl font-bold text-foreground mb-4">Что включено</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{amenity}</span>
                  </div>
                ))}
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
