import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const PILLARS = ['DISCIPLINE.', 'PURPOSE.', 'SELF-MASTERY.']

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const pillarsRef = useRef<HTMLDivElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const lineRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pillar words stagger in
      const pillarEls = pillarsRef.current?.querySelectorAll<HTMLElement>('.manifesto-pillar')
      if (pillarEls?.length) {
        gsap.from(Array.from(pillarEls), {
          y: 80,
          opacity: 0,
          stagger: 0.15,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: 'top 78%',
          },
        })
      }

      // Sub paragraph — simple fade (no DOM mutation)
      gsap.from(subRef.current, {
        y: 30,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: subRef.current,
          start: 'top 85%',
        },
      })

      // Horizontal line wipe
      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 88%',
        },
      })

      // Slow background gradient shift on scroll
      gsap.fromTo(sectionRef.current,
        { backgroundPosition: '0% 50%' },
        {
          backgroundPosition: '100% 50%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-44 px-6 md:px-16 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #080808 0%, #0e0e0e 35%, #141414 55%, #0a0a0a 80%, #080808 100%)',
        backgroundSize: '300% 300%',
      }}
    >
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crown-border to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <p className="text-[9px] tracking-widest3 uppercase text-crown-muted mb-14">— Our Manifesto</p>

        {/* Pillars */}
        <div ref={pillarsRef} className="mb-16">
          {PILLARS.map((word) => (
            <div
              key={word}
              className="manifesto-pillar overflow-hidden"
            >
              <h2
                className="font-heading leading-[0.92] text-crown-white select-none"
                style={{ fontSize: 'clamp(3.5rem, 12vw, 11rem)' }}
              >
                {word}
              </h2>
            </div>
          ))}
        </div>

        {/* Divider line */}
        <div ref={lineRef} className="w-16 h-px bg-crown-ash mb-12" />

        {/* Sub copy */}
        <p
          ref={subRef}
          className="text-base md:text-lg text-crown-ash leading-loose max-w-2xl font-light tracking-wide"
        >
          Crown &amp; Conquer exists for those who refuse to settle. For those
          who choose discipline over comfort and purpose over excuses. This is
          not clothing. This is the uniform of the relentless.
        </p>
      </div>

      {/* Large background C */}
      <div className="absolute -bottom-16 right-0 pointer-events-none select-none overflow-hidden">
        <span className="font-heading text-[30vw] text-white/[0.018] leading-none">C</span>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crown-border to-transparent" />
    </section>
  )
}
