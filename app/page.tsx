import Hero from "@/components/hero"
import About from "@/components/about"
import HouseRental from "@/components/house-rental"
import Activities from "@/components/activities"
import Reviews from "@/components/reviews"
import Gallery from "@/components/gallery"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <HouseRental />
      <Activities />
      <Reviews />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  )
}
