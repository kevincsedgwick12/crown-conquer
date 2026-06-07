import { Suspense, lazy } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { DiscountProvider } from './context/DiscountContext'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

// Lazy-load below-fold sections for fast initial paint
const FeaturedProduct    = lazy(() => import('./components/FeaturedCollection'))
const BestSellers        = lazy(() => import('./components/FeaturedProducts'))
const Manifesto          = lazy(() => import('./components/BrandStatement'))
const LifestyleSection   = lazy(() => import('./components/LifestyleBanner'))
const Collections        = lazy(() => import('./components/Collections'))
const DiscountSection    = lazy(() => import('./components/DiscountSection'))
const JoinKingdom        = lazy(() => import('./components/FinalCTA'))
const Footer             = lazy(() => import('./components/Footer'))

export default function App() {
  useSmoothScroll()

  return (
    <DiscountProvider>
    <div className="relative bg-crown-black text-crown-white overflow-x-hidden">
      {/* Global UI */}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      {/* Page sections */}
      <main>
        {/* Hero — above the fold, eager */}
        <Hero />

        {/* Below-fold sections — lazy loaded */}
        <Suspense fallback={<div className="h-screen bg-crown-black" />}>
          <FeaturedProduct />
          <BestSellers />
          <Manifesto />
          <LifestyleSection />
          <Collections />
          <DiscountSection />
          <JoinKingdom />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
    </DiscountProvider>
  )
}
