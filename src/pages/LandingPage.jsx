import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import CategoriesSection from '../components/landing/CategoriesSection'
import FaqSection from '../components/landing/FaqSection'
import FinalCtaSection from '../components/landing/FinalCtaSection'
import HeroSection from '../components/landing/HeroSection'
import PlanRentalSection from '../components/landing/PlanRentalSection'
import PopularCarsSection from '../components/landing/PopularCarsSection'
import ServicesSection from '../components/landing/ServicesSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import WhyChooseUsSection from '../components/landing/WhyChooseUsSection'
import carsData from '../data/fallbackCars'
import { getTripDetailsFromNavigation } from '../lib/utils'
import {
  categories,
  conciergeStandards,
  faqs,
  heroHighlights,
  heroImage,
  services,
  testimonials,
  whyChooseUs,
  whyImage,
} from '../data/landingPageData'

function LandingPage() {
  const location = useLocation()
  const [tripDetails, setTripDetails] = useState(() => getTripDetailsFromNavigation(location))
  const popularCars = carsData.slice(0, 3)

  return (
    <>
      <HeroSection heroImage={heroImage} heroHighlights={heroHighlights}>
        <PlanRentalSection tripDetails={tripDetails} setTripDetails={setTripDetails} />
      </HeroSection>
      <PopularCarsSection cars={popularCars} tripDetails={tripDetails} />
      <ServicesSection services={services} conciergeStandards={conciergeStandards} />

      <CategoriesSection categories={categories} />
      <WhyChooseUsSection items={whyChooseUs} whyImage={whyImage} />
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection faqs={faqs} />
      <FinalCtaSection />
    </>
  )
}

export default LandingPage
