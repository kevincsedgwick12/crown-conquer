import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { splitWords } from '../utils/splitText'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: '10K+',  label: 'Athletes' },
  { value: '42',    label: 'Countries' },
  { value: '100%',  label: 'Premium Cotton' },
]

export default function LifestyleBanner() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef      = useRef<HTMLDivElement>(null)
  const textRef    = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic parallax on background pseudo-element
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Word reveal on scroll
      if (textRef.current) {
        const words = splitWords(textRef.current)
        gsap.from(words, {
          y: '110%',
          opacity: 0,
          stagger: 0.1,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
          },
        })
      }

      // Stats counter-up
      gsap.from('.lb-stat', {
        y: 40, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.lb-stat', start: 'top 85%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dark gradient background (replace src with real lifestyle image) */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-110"
        style={{
          background: `
            linear-gradient(160deg, #0a0a0a 0%, #151515 30%, #0d0d0d 60%, #080808 100%)
          `,
        }}
      >
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Radial glow */}
        <div className="absolute inset-0 bg-radial-gradient"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-crown-black/70" />

      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crown-border to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p className="text-[10px] tracking-widest3 uppercase text-crown-ash mb-10">
          — Lifestyle
        </p>

        <h2
          ref={textRef}
          className="
            font-heading text-[clamp(3rem,10vw,9rem)]
            leading-none text-crown-white mb-16 select-none
          "
        >
          Power. Discipline. Self-Mastery.
        </h2>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-20">
          {STATS.map(stat => (
            <div key={stat.label} className="lb-stat text-center">
              <p className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-none text-crown-white mb-1">
                {stat.value}
              </p>
              <p className="text-[10px] tracking-widest uppercase text-crown-ash">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative horizontal lines */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-crown-border to-transparent hidden lg:block" />
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-crown-border to-transparent hidden lg:block" />

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crown-border to-transparent" />
    </section>
  )
}
