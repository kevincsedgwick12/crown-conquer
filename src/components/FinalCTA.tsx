import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMagnetic } from '../hooks/useMagnetic'
import { splitWords } from '../utils/splitText'

gsap.registerPlugin(ScrollTrigger)

export default function FinalCTA() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headingRef  = useRef<HTMLHeadingElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)
  const btnShop     = useMagnetic(0.45)
  const btnJoin     = useMagnetic(0.45)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated gradient drift on section bg
      gsap.to(sectionRef.current, {
        backgroundPosition: '100% 50%',
        ease: 'none',
        duration: 8,
        repeat: -1,
        yoyo: true,
      })

      // Heading word-by-word
      if (headingRef.current) {
        const words = splitWords(headingRef.current)
        gsap.from(words, {
          y: '120%',
          stagger: 0.07,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
        })
      }

      gsap.from(subRef.current, {
        y: 30, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: subRef.current, start: 'top 85%' },
      })

      gsap.from(ctaRef.current, {
        y: 24, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 88%' },
      })

      // Animated scanline sweep
      gsap.fromTo('#cta-scanline', { x: '-100%' }, {
        x: '100%', duration: 3, ease: 'none', repeat: -1, delay: 1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="
        relative min-h-screen flex flex-col items-center justify-center
        px-6 overflow-hidden noise
      "
      style={{
        background: 'linear-gradient(120deg, #080808 0%, #0e0e0e 50%, #111111 100%)',
        backgroundSize: '300% 300%',
      }}
    >
      {/* Scanline sweep */}
      <div
        id="cta-scanline"
        className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-crown-white/10 to-transparent pointer-events-none"
      />

      {/* Horizontal rules */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crown-border to-transparent" />

      {/* Corner accents */}
      {['top-10 left-10', 'top-10 right-10', 'bottom-10 left-10', 'bottom-10 right-10'].map(pos => (
        <div
          key={pos}
          className={`absolute ${pos} w-8 h-8 border-crown-border/40`}
          style={{
            borderTop:    pos.includes('top')    ? '1px solid' : 'none',
            borderBottom: pos.includes('bottom') ? '1px solid' : 'none',
            borderLeft:   pos.includes('left')   ? '1px solid' : 'none',
            borderRight:  pos.includes('right')  ? '1px solid' : 'none',
            borderColor:  'rgba(42,42,42,0.6)',
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <p className="text-[10px] tracking-widest3 uppercase text-crown-ash mb-10">
          — Join The Movement
        </p>

        <h2
          ref={headingRef}
          className="
            font-heading text-[clamp(3rem,11vw,9.5rem)]
            leading-none text-crown-white mb-8 select-none
          "
        >
          Ready To Conquer?
        </h2>

        <p
          ref={subRef}
          className="text-sm text-crown-ash leading-loose max-w-md mx-auto mb-14"
        >
          Step into the brand worn by those who never compromise.
          Your reign starts now.
        </p>

        {/* CTA buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            ref={btnShop as React.RefObject<HTMLButtonElement>}
            className="
              relative overflow-hidden px-14 py-5
              bg-crown-white text-crown-black
              text-[11px] font-semibold tracking-widest uppercase
              hover:bg-crown-cream transition-colors duration-300 cursor-none
            "
          >
            <span className="mag-btn-inner">Shop The Collection</span>
          </button>

          <button
            ref={btnJoin as React.RefObject<HTMLButtonElement>}
            className="
              relative overflow-hidden px-14 py-5
              border border-crown-white/30
              text-crown-white text-[11px] font-semibold tracking-widest uppercase
              hover:border-crown-white transition-all duration-400 cursor-none group
            "
          >
            <span className="mag-btn-inner relative z-10">Join The Brotherhood</span>
            <span className="
              absolute inset-0 bg-crown-white/08
              translate-y-full group-hover:translate-y-0
              transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
            " />
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-8 mt-16 flex-wrap">
          {['Free Shipping $75+', 'Premium Quality', '30-Day Returns'].map(badge => (
            <div key={badge} className="flex items-center gap-2 text-crown-muted">
              <span className="w-3 h-px bg-crown-border" />
              <span className="text-[9px] tracking-widest uppercase">{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="
        absolute bottom-0 left-0 right-0
        px-8 md:px-16 py-6
        border-t border-crown-border
        flex flex-col sm:flex-row items-center justify-between gap-3
      ">
        <span className="font-heading text-xl tracking-widest2 text-crown-white/40">
          CROWN &amp; CONQUER
        </span>
        <p className="text-[9px] tracking-widest uppercase text-crown-muted">
          © 2025 Crown &amp; Conquer. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Instagram', 'TikTok', 'Twitter'].map(s => (
            <a
              key={s}
              href="#"
              className="text-[9px] tracking-widest uppercase text-crown-muted hover:text-crown-white transition-colors cursor-none"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
