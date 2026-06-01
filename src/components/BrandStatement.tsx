import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { splitWords } from '../utils/splitText'

gsap.registerPlugin(ScrollTrigger)

export default function BrandStatement() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headingRef  = useRef<HTMLHeadingElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word reveal on scroll
      if (headingRef.current) {
        const words = splitWords(headingRef.current)
        gsap.from(words, {
          y: '110%',
          opacity: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 78%',
          },
        })
      }

      gsap.from(subRef.current, {
        opacity: 0, y: 30, duration: 1.0, ease: 'power3.out',
        scrollTrigger: {
          trigger: subRef.current,
          start: 'top 85%',
        },
      })

      // Animated gradient background
      gsap.fromTo(
        sectionRef.current,
        { backgroundPosition: '0% 50%' },
        {
          backgroundPosition: '100% 50%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="
        relative min-h-[70vh] flex flex-col items-center justify-center
        px-6 py-28 overflow-hidden noise
      "
      style={{
        background: 'linear-gradient(135deg, #080808 0%, #111111 40%, #1a1a1a 60%, #080808 100%)',
        backgroundSize: '300% 300%',
      }}
    >
      {/* Horizontal rule top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crown-border to-transparent" />

      {/* Large brand statement */}
      <div className="text-center max-w-4xl">
        <p className="text-[10px] tracking-widest3 uppercase text-crown-ash mb-10">
          — Our Philosophy
        </p>

        <h2
          ref={headingRef}
          className="
            font-heading text-[clamp(3rem,10vw,9rem)]
            leading-none text-crown-white select-none mb-10
          "
        >
          Discipline Creates Kings.
        </h2>

        <p
          ref={subRef}
          className="
            text-sm md:text-base tracking-wider text-crown-ash leading-relaxed
            max-w-xl mx-auto font-light
          "
        >
          Every rep. Every set. Every sacrifice. We exist for those who understand
          that greatness is not given — it is built, day after relentless day.
        </p>
      </div>

      {/* Decorative large character */}
      <div
        className="
          absolute -bottom-12 right-8 md:right-16
          font-heading text-[20rem] text-crown-white/[0.015]
          leading-none select-none pointer-events-none
        "
      >
        C
      </div>

      {/* Horizontal rule bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crown-border to-transparent" />
    </section>
  )
}
