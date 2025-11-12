"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [heroTitle, setHeroTitle] = useState("Дом на озёрах Мурашки")
  const [heroSubtitle, setHeroSubtitle] = useState("Место, где природа говорит тише, а душа слышит громче")
  const [heroButtonText, setHeroButtonText] = useState("Забронировать отдых")

  useEffect(() => {
    setIsVisible(true)
    loadSettings()
  }, [])

  const loadSettings = async () => {
    const { data } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', ['hero_title', 'hero_subtitle', 'hero_button_text'])

    if (data) {
      data.forEach(setting => {
        if (setting.key === 'hero_title') setHeroTitle(setting.value)
        if (setting.key === 'hero_subtitle') setHeroSubtitle(setting.value)
        if (setting.key === 'hero_button_text') setHeroButtonText(setting.value)
      })
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/serene-lake-at-sunrise-with-forest-reflection.jpg)",
          transform: "scale(1.1)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
      </div>

      {/* Content */}
      <div
        className={cn(
          "relative z-10 text-center px-4 max-w-4xl mx-auto transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        )}
      >
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 text-balance">
          {heroTitle}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 text-pretty leading-relaxed">
          {heroSubtitle}
        </p>
        <Button
          size="lg"
          className="rounded-full px-8 py-6 text-lg shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
        >
          {heroButtonText}
        </Button>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </a>
    </section>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
