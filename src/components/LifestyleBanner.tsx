import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function LifestyleSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef      = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic parallax on background
      gsap.to(bgRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Heading clip-reveal (no DOM mutation — safe with React)
      gsap.from(headingRef.current, {
        y: 70,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 77%',
        },
      })

      gsap.from(subRef.current, {
        opacity: 0, y: 30, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: subRef.current, start: 'top 85%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="lifestyle"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background — cinematic dark atmosphere simulating gym/studio */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-125"
        style={{ willChange: 'transform' }}
      >
        {/* Primary dark base */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(160deg, #080808 0%, #0f0f0f 30%, #060606 65%, #030303 100%)',
        }} />

        {/* Simulated overhead lighting — like a gym beam */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 40% 60% at 50% -5%, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 35%, transparent 65%)',
        }} />

        {/* Left side dramatic shadow */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.5) 100%)',
        }} />

        {/* Floor reflection hint */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{
          background: 'linear-gradient(0deg, rgba(255,255,255,0.012) 0%, transparent 100%)',
        }} />

        {/* Noise grain for realism */}
        <div className="absolute inset-0 opacity-[0.18]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
          backgroundSize: '256px 256px',
        }} />
      </div>

      {/* Dark overlays */}
      <div className="absolute inset-0 z-10" style={{
        background: 'linear-gradient(to bottom, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.05) 50%, rgba(8,8,8,0.5) 100%)',
      }} />

      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crown-border to-transparent z-20" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <p className="text-[9px] tracking-widest3 uppercase text-crown-muted mb-10">
          — Lifestyle
        </p>

        <h2
          ref={headingRef}
          className="font-heading leading-none text-crown-white select-none mb-10"
          style={{ fontSize: 'clamp(2.5rem, 9vw, 8.5rem)' }}
        >
          THE UNIFORM OF THE RELENTLESS
        </h2>

        <p
          ref={subRef}
          className="text-sm text-crown-ash tracking-wider leading-loose max-w-md mx-auto mb-14 font-light"
        >
          Every piece is built for the athlete who trains in silence
          and lets results do the talking.
        </p>

        {/* Stats row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16">
          {[
            { value: '10K+',  label: 'Athletes' },
            { value: '42',    label: 'Countries' },
            { value: '480GSM', label: 'Premium Cotton' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p
                className="font-heading leading-none text-crown-white mb-2"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
              >
                {stat.value}
              </p>
              <p className="text-[9px] tracking-widest uppercase text-crown-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Vertical accent lines */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 w-px h-28 bg-gradient-to-b from-transparent via-crown-border to-transparent hidden lg:block z-20" />
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-px h-28 bg-gradient-to-b from-transparent via-crown-border to-transparent hidden lg:block z-20" />

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crown-border to-transparent z-20" />
    </section>
  )
}
