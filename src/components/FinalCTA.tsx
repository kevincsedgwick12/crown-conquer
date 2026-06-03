import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function JoinKingdom() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const formRef    = useRef<HTMLFormElement>(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 60, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
      })
      gsap.from(subRef.current, {
        y: 30, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: subRef.current, start: 'top 85%' },
      })
      gsap.from(formRef.current, {
        y: 24, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 88%' },
      })

      // Ambient background drift
      gsap.to(sectionRef.current, {
        backgroundPosition: '100% 50%',
        ease: 'none',
        duration: 10,
        repeat: -1,
        yoyo: true,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      id="join"
      className="relative py-36 px-6 overflow-hidden noise"
      style={{
        background: 'linear-gradient(120deg, #080808 0%, #0e0e0e 40%, #111111 70%, #080808 100%)',
        backgroundSize: '300% 300%',
      }}
    >
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crown-border to-transparent" />

      {/* Scanline sweep */}
      <div
        id="join-scanline"
        className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-crown-white/[0.06] to-transparent pointer-events-none"
        style={{ animation: 'scan 6s linear infinite' }}
      />

      {/* Corner accents */}
      {[
        'top-8 left-8 border-t border-l',
        'top-8 right-8 border-t border-r',
        'bottom-8 left-8 border-b border-l',
        'bottom-8 right-8 border-b border-r',
      ].map(cls => (
        <div key={cls} className={`absolute ${cls} w-8 h-8 border-crown-border/25 pointer-events-none`} />
      ))}

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <p className="text-[9px] tracking-widest3 uppercase text-crown-muted mb-8">
          — Join The Movement
        </p>

        <h2
          ref={headingRef}
          className="font-heading leading-none text-crown-white select-none mb-6"
          style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)' }}
        >
          JOIN THE<br />KINGDOM
        </h2>

        <p
          ref={subRef}
          className="text-sm text-crown-ash leading-loose mb-12 tracking-wider font-light"
        >
          Exclusive drops. Early access. No excuses.
        </p>

        {/* Email form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto mb-14"
        >
          {submitted ? (
            <div className="w-full py-4 border border-crown-border/60 flex items-center justify-center">
              <span className="text-[10px] tracking-widest uppercase text-crown-ash">
                Welcome to the Kingdom.
              </span>
            </div>
          ) : (
            <>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="
                  flex-1 px-5 py-4
                  bg-transparent
                  border border-crown-border
                  text-[11px] tracking-wider text-crown-white
                  placeholder:text-crown-muted
                  focus:outline-none focus:border-crown-white/40
                  transition-colors duration-300
                  cursor-none
                "
                style={{ WebkitAppearance: 'none' }}
              />
              <button
                type="submit"
                className="
                  px-8 py-4
                  bg-crown-white text-crown-black
                  text-[10px] font-semibold tracking-widest uppercase
                  hover:bg-crown-cream transition-colors duration-300
                  cursor-none whitespace-nowrap
                  border border-crown-white
                "
              >
                Join Now
              </button>
            </>
          )}
        </form>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
          {['Free Shipping $75+', 'Premium Quality', '30-Day Returns'].map(badge => (
            <div key={badge} className="flex items-center gap-2 text-crown-muted">
              <span className="w-4 h-px bg-crown-border" />
              <span className="text-[9px] tracking-widest uppercase">{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crown-border to-transparent" />

      <style>{`
        @keyframes scan {
          from { transform: translateX(-100vw); }
          to   { transform: translateX(100vw); }
        }
      `}</style>
    </section>
  )
}
