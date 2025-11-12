"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin } from "lucide-react"
import DatePicker from "@/components/date-picker"
import { supabase } from "@/lib/supabase"

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [checkInDate, setCheckInDate] = useState<Date | null>(null)
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null)
  const [contactPhone1, setContactPhone1] = useState("+375 (29) 123-45-67")
  const [contactPhone2, setContactPhone2] = useState("+375 (33) 765-43-21")
  const [contactEmail, setContactEmail] = useState("info@murashki-lakes.by")
  const [addressLine1, setAddressLine1] = useState("Беларусь, Брестская область")
  const [addressLine2, setAddressLine2] = useState("Браславский район")
  const [addressLine3, setAddressLine3] = useState("Озёра Мурашки")
  const [coordinates, setCoordinates] = useState("Координаты: 55.6416° N, 27.0444° E")

  useEffect(() => {
    loadSettings()

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

  const loadSettings = async () => {
    const { data } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', ['contact_phone_1', 'contact_phone_2', 'contact_email', 'contact_address_line1', 'contact_address_line2', 'contact_address_line3', 'contact_coordinates'])

    if (data) {
      data.forEach(setting => {
        if (setting.key === 'contact_phone_1') setContactPhone1(setting.value)
        if (setting.key === 'contact_phone_2') setContactPhone2(setting.value)
        if (setting.key === 'contact_email') setContactEmail(setting.value)
        if (setting.key === 'contact_address_line1') setAddressLine1(setting.value)
        if (setting.key === 'contact_address_line2') setAddressLine2(setting.value)
        if (setting.key === 'contact_address_line3') setAddressLine3(setting.value)
        if (setting.key === 'contact_coordinates') setCoordinates(setting.value)
      })
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Контакты и бронирование
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Свяжитесь с нами для бронирования или уточнения деталей
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6 transition-all duration-700">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Телефон</h3>
                    <p className="text-muted-foreground">{contactPhone1}</p>
                    <p className="text-muted-foreground">{contactPhone2}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">{contactEmail}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Адрес</h3>
                    <p className="text-muted-foreground">
                      {addressLine1}
                      <br />
                      {addressLine2}
                      <br />
                      {addressLine3}
                      <br />
                      {coordinates}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Map */}
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=27.0144%2C55.6216%2C27.0744%2C55.6616&layer=mapnik&marker=55.6416%2C27.0444"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Карта местоположения озёр Мурашки"
              />
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-0 shadow-xl transition-all duration-700 delay-200">
            <CardContent className="p-8">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6">Форма обратной связи</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Имя
                  </label>
                  <Input
                    id="name"
                    placeholder="Ваше имя"
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Телефон
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+375 (___) ___-__-__"
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <DatePicker
                    label="Дата заезда"
                    value={checkInDate}
                    onChange={(date) => {
                      setCheckInDate(date)
                      if (checkOutDate && date && checkOutDate <= date) {
                        setCheckOutDate(null)
                      }
                    }}
                    minDate={new Date()}
                  />
                  <DatePicker
                    label="Дата выезда"
                    value={checkOutDate}
                    onChange={setCheckOutDate}
                    minDate={checkInDate ? new Date(checkInDate.getTime() + 86400000) : new Date()}
                  />
                </div>
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-foreground mb-2">
                    Количество гостей
                  </label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="6"
                    placeholder="1-6 гостей"
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Сообщение
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Расскажите о своих планах на отдых..."
                    rows={4}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-full py-6 text-lg hover:shadow-lg transition-all duration-300"
                >
                  Отправить
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
