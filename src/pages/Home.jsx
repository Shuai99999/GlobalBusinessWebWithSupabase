import { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import ProductShowcase from '../components/ProductShowcase'
import Advantages from '../components/Advantages'
import RecentProducts from '../components/RecentProducts'
import CompanyIntro from '../components/CompanyIntro'
import ContactSection from '../components/ContactSection'
import { useSectionScroll } from '../hooks/useSectionScroll'

const Home = () => {
  useSectionScroll()

  return (
    <>
      <section className="snap-section">
        <HeroSection />
      </section>
      <section className="snap-section">
        <ProductShowcase />
      </section>
      <section className="snap-section">
        <Advantages />
      </section>
      <section className="snap-section">
        <RecentProducts />
      </section>
      <section className="snap-section">
        <CompanyIntro />
      </section>
      <section className="snap-section snap-section-last">
        <ContactSection />
      </section>
    </>
  )
}

export default Home

