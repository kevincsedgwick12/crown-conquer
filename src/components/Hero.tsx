import { useEffect, useRef, lazy, Suspense } from 'react'
import { gsap } from 'gsap'
import { useMagnetic } from '../hooks/useMagnetic'

// Lazy-load the heavy Three.js scene
const CrownScene = lazy(() => import('./three/CrownScene'))

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headingRef  = useRef<HTMLHeadingElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)
  const eyebrowRef  = useRef<HTMLDivElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)
  const scrollRef   = useRef<HTMLDivElement>(null)

  const btnPrimary   = useMagnetic(0.4)
  const btnSecondary = useMagnetic(0.4)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.3 })

      // Eyebrow line
      tl.from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.8 }, 0.2)

      // Heading characters stagger
      const chars = headingRef.current?.querySelectorAll<HTMLElement>('.char')
      if (chars?.length) {
        tl.from(chars, {
          y: 80, opacity: 0, stagger: 0.025, duration: 0.9, ease: 'power3.out',
        }, 0.45)
      } else {
        tl.from(headingRef.current, { y: 60, opacity: 0, duration: 0.9 }, 0.45)
      }

      // Sub
      tl.from(subRef.current,  { y: 30, opacity: 0, duration: 0.8 }, 0.85)
      // CTAs
      tl.from(ctaRef.current,  { y: 24, opacity: 0, duration: 0.7 }, 1.05)
      // Scroll hint
      tl.from(scrollRef.current, { opacity: 0, duration: 0.6 }, 1.4)

      // Infinite scroll line pulse
      gsap.fromTo(
        '#hero-scroll-line',
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1, transformOrigin: 'top', duration: 1.1, ease: 'power2.inOut', repeat: -1, yoyo: true, delay: 1.6 },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Split heading into char spans for stagger animation
  useEffect(() => {
    const el = headingRef.current
    if (!el) return
    const text = el.textContent ?? ''
    el.innerHTML = text
      .split('')
      .map(c =>
        c === ' '
          ? '<span style="display:inline-block;width:0.28em"> </span>'
          : `<span class="char" style="display:inline-block">${c}</span>`
      )
      .join('')
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-crown-black"
    >
      {/* ── Three.js crown (full-bleed, behind content) ── */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <CrownScene />
        </Suspense>
      </div>

      {/* ── Gradient vignette ── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-crown-black/60 via-transparent to-crown-black pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-crown-black/50 via-transparent to-crown-black/50 pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">

        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center gap-4 mb-8">
          <span className="w-10 h-px bg-crown-ash" />
          <span className="text-[10px] tracking-widest3 uppercase text-crown-ash font-medium">
            Premium Athletic Apparel
          </span>
          <span className="w-10 h-px bg-crown-ash" />
        </div>

        {/* Main heading */}
        <h1
          ref={headingRef}
          className="font-heading text-[clamp(4rem,14vw,13rem)] leading-none tracking-widest text-crown-white mb-4 select-none"
        >
          CROWN &amp; CONQUER
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          className="text-[clamp(0.9rem,2.5vw,1.25rem)] tracking-[0.2em] uppercase text-crown-ash font-light mb-12"
        >
          Built For The Relentless.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
          <button
            ref={btnPrimary as React.RefObject<HTMLButtonElement>}
            className="
              relative overflow-hidden
              px-10 py-4
              bg-crown-white text-crown-black
              text-[11px] font-semibold tracking-widest uppercase
              transition-all duration-300 hover:bg-crown-cream
              group cursor-none
            "
          >
            <span className="mag-btn-inner relative z-10">Shop Now</span>
          </button>

          <button
            ref={btnSecondary as React.RefObject<HTMLButtonElement>}
            className="
              relative overflow-hidden
              px-10 py-4
              border border-crown-white/40 text-crown-white
              text-[11px] font-semibold tracking-widest uppercase
              hover:border-crown-white transition-all duration-300
              group cursor-none
            "
          >
            <span className="mag-btn-inner relative z-10">Explore Collection</span>
            {/* Hover fill */}
            <span className="
              absolute inset-0 bg-crown-white/10
              translate-y-full group-hover:translate-y-0
              transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
            " />
          </button>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-widest3 uppercase text-crown-muted">Scroll</span>
        <div
          id="hero-scroll-line"
          className="w-px h-12 bg-gradient-to-b from-crown-ash to-transparent"
        />
      </div>
    </section>
  )
}
