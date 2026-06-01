import { Suspense, lazy } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

// Lazy-load below-fold sections for fast initial paint
const FeaturedCollection = lazy(() => import('./components/FeaturedCollection'))
const BrandStatement     = lazy(() => import('./components/BrandStatement'))
const InteractiveThree   = lazy(() => import('./components/InteractiveThree'))
const FeaturedProducts   = lazy(() => import('./components/FeaturedProducts'))
const LifestyleBanner    = lazy(() => import('./components/LifestyleBanner'))
const FinalCTA           = lazy(() => import('./components/FinalCTA'))

export default function App() {
  useSmoothScroll()

  return (
    <div className="relative bg-crown-black text-crown-white overflow-x-hidden">
      {/* Global UI */}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      {/* Page sections */}
      <main>
        {/* Hero loads eagerly — it's above the fold */}
        <Hero />

        {/* Everything below is lazy */}
        <Suspense fallback={<div className="h-screen bg-crown-black" />}>
          <FeaturedCollection />
          <BrandStatement />
          <InteractiveThree />
          <FeaturedProducts />
          <LifestyleBanner />
          <FinalCTA />
        </Suspense>
      </main>
    </div>
  )
}
