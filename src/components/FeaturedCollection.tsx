import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMagnetic } from '../hooks/useMagnetic'
import { useDiscount } from '../context/DiscountContext'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedProduct() {
  const sectionRef   = useRef<HTMLElement>(null)
  const productRef   = useRef<HTMLDivElement>(null)
  const contentRef   = useRef<HTMLDivElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const btnShop         = useMagnetic(0.38)
  const { getShopUrl }  = useDiscount()

  // Floating animation + mouse tilt on product
  useEffect(() => {
    const el = imageWrapRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 22
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 14
      gsap.to(el, {
        rotateY: x,
        rotateX: -y,
        transformPerspective: 900,
        duration: 0.6,
        ease: 'power2.out',
      })
    }

    const onLeave = () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 1.2, ease: 'elastic.out(1, 0.4)' })
    }

    sectionRef.current?.addEventListener('mousemove', onMove)
    sectionRef.current?.addEventListener('mouseleave', onLeave)
    return () => {
      sectionRef.current?.removeEventListener('mousemove', onMove)
      sectionRef.current?.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entry
      gsap.from(productRef.current, {
        x: -60, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      gsap.from('.fp-line', {
        y: 50, opacity: 0, stagger: 0.1, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 78%' },
      })

      // Perpetual float
      gsap.to(imageWrapRef.current, {
        y: -16,
        duration: 3.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      // Subtle shadow pulse synced to float
      gsap.to('#hoodie-shadow', {
        scaleX: 0.82,
        opacity: 0.3,
        duration: 3.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="relentless-hoodie"
      className="relative py-28 md:py-36 px-6 md:px-16 bg-crown-charcoal overflow-hidden"
    >
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crown-border to-transparent" />

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <span
          className="font-heading text-[28vw] text-white leading-none absolute -bottom-8 -right-8"
        >
          CC
        </span>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 max-w-7xl mx-auto">

        {/* ── Product visual ── */}
        <div ref={productRef} className="w-full lg:w-1/2 flex flex-col items-center">
          {/* Product card */}
          <div
            ref={imageWrapRef}
            className="relative w-full max-w-md aspect-[3/4]"
            style={{ willChange: 'transform' }}
          >
            {/* Card surface */}
            <div
              className="absolute inset-0 rounded-sm overflow-hidden"
              style={{
                background: 'linear-gradient(155deg, #181818 0%, #111111 40%, #0d0d0d 70%, #0a0a0a 100%)',
                boxShadow: '0 40px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              {/* Fabric texture */}
              <div className="absolute inset-0 opacity-[0.06]" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 12px)',
              }} />

              {/* Spotlight */}
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse 70% 55% at 50% 20%, rgba(255,255,255,0.06) 0%, transparent 65%)',
              }} />

              {/* Hoodie silhouette — geometric shape hinting at garment */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[70%] h-[78%]">
                  {/* Body */}
                  <div className="absolute bottom-0 left-[10%] right-[10%] h-[68%] rounded-b-sm" style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.015) 100%)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }} />
                  {/* Shoulders */}
                  <div className="absolute bottom-[66%] left-0 right-0 h-[22%]" style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.04) 100%)',
                    clipPath: 'polygon(15% 100%, 0% 0%, 40% 0%, 40% 100%, 60% 100%, 60% 0%, 100% 0%, 85% 100%)',
                  }} />
                  {/* Hood */}
                  <div className="absolute bottom-[85%] left-[30%] right-[30%] h-[18%] rounded-t-full" style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderBottom: 'none',
                  }} />
                </div>
              </div>

              {/* Brand watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className="font-heading text-[9rem] text-white/[0.025] leading-none">C&amp;C</span>
              </div>

              {/* New Drop badge */}
              <div className="absolute top-5 left-5">
                <span
                  className="text-[8px] tracking-widest uppercase text-crown-ash px-3 py-1.5"
                  style={{
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  New Drop
                </span>
              </div>

              {/* Price tag */}
              <div className="absolute bottom-5 right-5">
                <span className="font-heading text-2xl text-crown-white/60 tracking-widest">$119</span>
              </div>
            </div>

            {/* Drop shadow beneath card */}
            <div
              id="hoodie-shadow"
              className="absolute -bottom-8 left-[15%] right-[15%] h-8 rounded-full"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, transparent 75%)',
                filter: 'blur(12px)',
              }}
            />
          </div>

          {/* Product name under image */}
          <div className="mt-10 text-center">
            <p className="text-[9px] tracking-widest3 uppercase text-crown-muted mb-2">— Signature Piece</p>
          </div>
        </div>

        {/* ── Copy ── */}
        <div ref={contentRef} className="w-full lg:w-1/2 lg:max-w-lg">
          <p className="fp-line text-[9px] tracking-widest3 uppercase text-crown-muted mb-6">
            — Featured Product
          </p>

          <h2 className="fp-line font-heading leading-none text-crown-white mb-8 select-none" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
            RELENTLESS<br />HOODIE
          </h2>

          {/* Feature list */}
          <div className="fp-line flex flex-col gap-5 mb-10">
            {[
              { label: 'Heavyweight Construction', detail: '480GSM premium cotton blend' },
              { label: 'Oversized Fit',             detail: 'Engineered for performance' },
              { label: 'Built for Discipline',      detail: 'Reinforced seams, lockdown hood' },
            ].map(f => (
              <div key={f.label} className="flex items-start gap-4 border-b border-crown-border/40 pb-5">
                <span className="w-5 h-px bg-crown-ash mt-2.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-crown-white tracking-wide mb-1">{f.label}</p>
                  <p className="text-[11px] text-crown-muted tracking-wider">{f.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sizes */}
          <div className="fp-line flex items-center gap-3 mb-10">
            <span className="text-[9px] tracking-widest uppercase text-crown-muted">Size</span>
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
                <button
                  key={s}
                  className="
                    w-9 h-9 flex items-center justify-center
                    text-[9px] font-medium tracking-wider text-crown-ash
                    border border-crown-border
                    hover:border-crown-white hover:text-crown-white
                    transition-all duration-200 cursor-none
                  "
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="fp-line">
            <a
              ref={btnShop}
              href={getShopUrl('/products/relentless-hoodie')}
              className="
                relative overflow-hidden
                inline-block
                px-14 py-4 w-full sm:w-auto
                bg-crown-white text-crown-black
                text-[10px] font-semibold tracking-widest uppercase
                hover:bg-crown-cream transition-colors duration-300
                cursor-none text-center
              "
            >
              <span className="mag-btn-inner">Shop Now</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crown-border to-transparent" />
    </section>
  )
}
