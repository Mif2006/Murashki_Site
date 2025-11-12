"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

const images = [
  {
    src: "/house-evening-dock.webp",
    alt: "Дом на озере вечером с причалом и лодкой",
  },
  {
    src: "/house-exterior-day.webp",
    alt: "Фасад дома днём",
  },
  {
    src: "/sailing-sunset.webp",
    alt: "Парусный спорт на закате",
  },
  {
    src: "/interior-living-room.webp",
    alt: "Гостиная с камином и трофеями",
  },
  {
    src: "/interior-bathroom.webp",
    alt: "Ванная комната с душевой кабиной",
  },
  {
    src: "/lake-deck-view.webp",
    alt: "Вид на озеро с террасы",
  },
  {
    src: "/lake-swing.webp",
    alt: "Качели у озера",
  },
  {
    src: "/dining-area.webp",
    alt: "Обеденная зона с камином",
  },
  {
    src: "/house-winter.webp",
    alt: "Дом зимой в снегу",
  },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [visibleImages, setVisibleImages] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imgs = entry.target.querySelectorAll("[data-image-index]")
            imgs.forEach((img, index) => {
              setTimeout(() => {
                setVisibleImages((prev) => [...prev, index])
              }, index * 80)
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
    <section id="gallery" ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Галерея</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Взгляните на красоту нашего уголка природы
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              data-image-index={index}
              className={cn(
                "aspect-square overflow-hidden rounded-2xl cursor-pointer group transition-all duration-500",
                visibleImages.includes(index) ? "opacity-100 scale-100" : "opacity-0 scale-90",
              )}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={images[selectedImage].src || "/placeholder.svg"}
            alt={images[selectedImage].alt}
            className="max-w-full max-h-full object-contain animate-scale-in"
          />
        </div>
      )}
    </section>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
