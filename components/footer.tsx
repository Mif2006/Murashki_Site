export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">Дом на озёрах Мурашки</h3>
            <p className="text-background/80 leading-relaxed">Уютный отдых на природе в окружении озёр и леса</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <nav className="flex flex-col gap-2">
              <a href="#about" className="text-background/80 hover:text-background transition-colors">
                О нас
              </a>
              <a href="#rooms" className="text-background/80 hover:text-background transition-colors">
                Номера
              </a>
              <a href="#activities" className="text-background/80 hover:text-background transition-colors">
                Активности
              </a>
              <a href="#gallery" className="text-background/80 hover:text-background transition-colors">
                Галерея
              </a>
              <a href="#contact" className="text-background/80 hover:text-background transition-colors">
                Контакты
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-2 text-background/80">
              <p>+375 (29) 123-45-67</p>
              <p>info@murashki-lakes.by</p>
              <p>Брестская область, Браславский район</p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-background/60">
          <p>© {currentYear} Дом на озёрах Мурашки. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
