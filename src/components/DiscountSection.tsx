import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useDiscount } from '../context/DiscountContext'

gsap.registerPlugin(ScrollTrigger)

export default function DiscountSection() {
  const { code, applyCode, clearCode, getShopUrl } = useDiscount()

  const [input, setInput]       = useState('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const inputRef                = useRef<HTMLInputElement>(null)

  const sectionRef  = useRef<HTMLElement>(null)
  const eyebrowRef  = useRef<HTMLDivElement>(null)
  const headingRef  = useRef<HTMLDivElement>(null)
  const formRef     = useRef<HTMLDivElement>(null)
  const successRef  = useRef<HTMLDivElement>(null)

  /* ── Scroll animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(eyebrowRef.current, {
        y: 20, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      })
      gsap.from(headingRef.current, {
        y: 60, opacity: 0, duration: 1.1, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        delay: 0.1,
      })
      gsap.from(formRef.current, {
        y: 30, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        delay: 0.25,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* ── When a code becomes active, animate the success block in ── */
  useEffect(() => {
    if (code && successRef.current) {
      gsap.fromTo(successRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      )
    }
  }, [code])

  function handleApply() {
    const trimmed = input.trim()
    if (!trimmed) { setErrorMsg('Please enter a promo code'); inputRef.current?.focus(); return }
    const result = applyCode(trimmed)
    if (result === 'invalid') {
      setErrorMsg('Invalid code — please check and try again')
      inputRef.current?.select()
    } else {
      setInput('')
      setErrorMsg(null)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleApply()
    if (errorMsg) setErrorMsg(null)
  }

  return (
    <section
      ref={sectionRef}
      id="promo"
      className="relative py-28 md:py-36 px-6 md:px-16 bg-crown-black overflow-hidden"
    >
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crown-border to-transparent" />

      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-heading text-[22vw] text-white/[0.022] leading-none tracking-wider">
          PROMO
        </span>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">

        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center justify-center gap-5 mb-10">
          <span className="w-14 h-px bg-gradient-to-r from-transparent to-crown-border" />
          <span className="text-[9px] tracking-widest3 uppercase text-crown-muted font-medium">
            Exclusive Offer
          </span>
          <span className="w-14 h-px bg-gradient-to-l from-transparent to-crown-border" />
        </div>

        {/* Heading */}
        <div ref={headingRef}>
          <h2
            className="font-heading leading-none text-crown-white mb-4 select-none"
            style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
          >
            UNLOCK YOUR
          </h2>
          <h2
            className="font-heading leading-none mb-12 select-none"
            style={{
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              WebkitTextStroke: '1px rgba(255,255,255,0.35)',
              color: 'transparent',
            }}
          >
            DISCOUNT
          </h2>
          <p className="text-[11px] tracking-[0.22em] uppercase text-crown-ash font-light mb-14">
            Enter your promo code below to unlock your exclusive reward.
          </p>
        </div>

        {/* Form / success */}
        <div ref={formRef}>
          {!code ? (
            /* ── Input state ── */
            <div className="flex flex-col items-center gap-6">
              <div className="w-full max-w-md relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => { setInput(e.target.value.toUpperCase()); setErrorMsg(null) }}
                  onKeyDown={handleKeyDown}
                  placeholder="YOUR CODE HERE"
                  maxLength={32}
                  spellCheck={false}
                  autoComplete="off"
                  className={`
                    w-full bg-transparent text-center
                    border-b-2 ${errorMsg ? 'border-red-400' : 'border-crown-border focus:border-crown-white'}
                    outline-none
                    text-lg md:text-2xl font-heading tracking-[0.3em] uppercase text-crown-white
                    placeholder:text-crown-border/50 placeholder:text-base placeholder:tracking-widest
                    py-3 pb-4
                    transition-colors duration-300
                    cursor-none
                  `}
                  style={{ WebkitAppearance: 'none' }}
                />
                {errorMsg && (
                  <p className="absolute -bottom-6 left-0 right-0 text-center text-[9px] tracking-widest uppercase text-red-400">
                    {errorMsg}
                  </p>
                )}
              </div>

              <button
                onClick={handleApply}
                className="
                  mt-2 px-14 py-4
                  bg-crown-white text-crown-black
                  text-[10px] font-semibold tracking-widest uppercase
                  hover:bg-crown-cream transition-colors duration-300
                  cursor-none
                "
              >
                Apply Code
              </button>
            </div>
          ) : (
            /* ── Applied state ── */
            <div ref={successRef} className="flex flex-col items-center gap-8">
              {/* Code badge */}
              <div
                className="inline-flex items-center gap-4 px-8 py-4"
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {/* Check */}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l4 4 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-heading text-2xl tracking-[0.25em] text-crown-white">
                  {code}
                </span>
                <span className="text-[9px] tracking-widest uppercase text-crown-muted">
                  Applied
                </span>
              </div>

              <p className="text-[10px] tracking-[0.2em] uppercase text-crown-ash">
                Your discount will activate automatically at checkout.
              </p>

              {/* Shop CTA */}
              <a
                href={getShopUrl('/collections/all')}
                className="
                  px-14 py-4
                  bg-crown-white text-crown-black
                  text-[10px] font-semibold tracking-widest uppercase
                  hover:bg-crown-cream transition-colors duration-300
                  cursor-none
                "
              >
                Shop Collection
              </a>

              {/* Remove */}
              <button
                onClick={clearCode}
                className="text-[9px] tracking-widest uppercase text-crown-border hover:text-crown-ash transition-colors duration-200 cursor-none"
              >
                Remove Code
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crown-border to-transparent" />
    </section>
  )
}
