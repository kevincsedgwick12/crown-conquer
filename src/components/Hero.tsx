import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useMagnetic } from '../hooks/useMagnetic'
import { useDiscount } from '../context/DiscountContext'

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const bgLayerRef  = useRef<HTMLDivElement>(null)
  const headingRef  = useRef<HTMLHeadingElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)
  const eyebrowRef  = useRef<HTMLDivElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)
  const scrollRef   = useRef<HTMLDivElement>(null)

  const btnPrimary   = useMagnetic(0.4)
  const btnSecondary = useMagnetic(0.4)
  const { getShopUrl } = useDiscount()

  // Subtle mouse parallax on background
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 24
      const y = (e.clientY / window.innerHeight - 0.5) * 14
      gsap.to(bgLayerRef.current, {
        x, y,
        duration: 2.4,
        ease: 'power2.out',
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background subtle zoom-in on load
      gsap.fromTo(bgLayerRef.current,
        { scale: 1.08 },
        { scale: 1.0, duration: 2.8, ease: 'power2.out', delay: 0.1 }
      )

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.4 })
      tl.from(eyebrowRef.current,  { y: 20, opacity: 0, duration: 0.9 })
      tl.from(headingRef.current,  { y: 100, opacity: 0, duration: 1.2, ease: 'power3.out' }, 0.25)
      tl.from(subRef.current,      { y: 32, opacity: 0, duration: 0.9 }, 0.75)
      tl.from(ctaRef.current,      { y: 28, opacity: 0, duration: 0.8 }, 1.05)
      tl.from(scrollRef.current,   { opacity: 0, duration: 0.7 }, 1.5)

      gsap.fromTo('#hero-scroll-line',
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1, transformOrigin: 'top', duration: 1.2, ease: 'power2.inOut', repeat: -1, yoyo: true, delay: 2.0 }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-crown-black"
    >
      {/* ── Video background ── */}
      <div
        ref={bgLayerRef}
        className="absolute inset-0 z-0 scale-110"
        style={{ willChange: 'transform' }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://cdn.jsdelivr.net/gh/kevincsedgwick12/crown-conquer@main/public/hero-bg.mp4"
        />
        {/* Dark overlay so text stays legible */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.55)' }} />
        {/* Vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 100%)'
        }} />
        {/* Noise grain */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
          backgroundSize: '200px 200px',
        }} />
      </div>

      {/* Bottom fade to black */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-crown-black pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-6xl mx-auto">

        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center gap-5 mb-10">
          <span className="w-14 h-px bg-gradient-to-r from-transparent to-crown-border" />
          <span className="text-[9px] tracking-widest3 uppercase text-crown-muted font-medium">
            Crown &amp; Conquer — Premium Athletic Apparel
          </span>
          <span className="w-14 h-px bg-gradient-to-l from-transparent to-crown-border" />
        </div>

        {/* Main heading */}
        <h1
          ref={headingRef}
          className="font-heading leading-[0.88] tracking-wider text-crown-white mb-5 select-none"
          style={{ fontSize: 'clamp(4.5rem, 16vw, 15rem)' }}
        >
          CROWN THE<br />DISCIPLINED
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="tracking-[0.28em] uppercase text-crown-ash font-light mb-14 max-w-md leading-relaxed"
          style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.9rem)' }}
        >
          The uniform of the relentless pursuit of greatness.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
          <a
            ref={btnPrimary}
            href={getShopUrl('/shop')}
            className="
              relative overflow-hidden
              px-12 py-[14px]
              bg-crown-white text-crown-black
              text-[10px] font-semibold tracking-widest uppercase
              hover:bg-crown-cream transition-colors duration-300
              cursor-none
            "
          >
            <span className="mag-btn-inner relative z-10">Shop Collection</span>
          </a>

          <a
            ref={btnSecondary}
            href={getShopUrl('/shop')}
            className="
              relative overflow-hidden
              px-12 py-[14px]
              border border-crown-white/25
              text-crown-white
              text-[10px] font-semibold tracking-widest uppercase
              hover:border-crown-white/60
              transition-all duration-400
              cursor-none group
            "
          >
            <span className="mag-btn-inner relative z-10">Explore The Kingdom</span>
            <span className="
              absolute inset-0 bg-crown-white/[0.06]
              translate-y-full group-hover:translate-y-0
              transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
            " />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-[8px] tracking-widest3 uppercase text-crown-muted">Scroll</span>
        <div
          id="hero-scroll-line"
          className="w-px h-14 bg-gradient-to-b from-crown-ash to-transparent"
        />
      </div>

      {/* Corner accent marks */}
      <div className="absolute top-24 left-8 w-8 h-8 border-t border-l border-crown-border/30 pointer-events-none z-20" />
      <div className="absolute top-24 right-8 w-8 h-8 border-t border-r border-crown-border/30 pointer-events-none z-20" />
      <div className="absolute bottom-24 left-8 w-8 h-8 border-b border-l border-crown-border/30 pointer-events-none z-20" />
      <div className="absolute bottom-24 right-8 w-8 h-8 border-b border-r border-crown-border/30 pointer-events-none z-20" />
    </section>
  )
}
