import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  { id: 1, name: 'Crown Zip Hoodie',    cat: 'Outerwear',  price: '$109', badge: 'New',      shade: '#131313' },
  { id: 2, name: 'Conquer Jogger',      cat: 'Bottoms',    price: '$79',  badge: null,        shade: '#0f0f0f' },
  { id: 3, name: 'Relentless Tee',      cat: 'Tops',       price: '$45',  badge: 'Low Stock', shade: '#161616' },
  { id: 4, name: 'Sovereign Shorts',    cat: 'Performance',price: '$59',  badge: null,        shade: '#111111' },
]

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fp-header', {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.fp-header', start: 'top 85%' },
      })

      gsap.from('.fp-card', {
        y: 100, opacity: 0,
        stagger: 0.1,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.fp-card', start: 'top 88%' },
      })

      // Floating animation on each card after reveal
      document.querySelectorAll<HTMLElement>('.fp-card').forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -8 : -12,
          duration: 2.5 + i * 0.3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.4,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-6 md:px-16 bg-crown-black overflow-hidden"
    >
      {/* Section header */}
      <div className="fp-header flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-4">
        <div>
          <p className="text-[10px] tracking-widest3 uppercase text-crown-ash mb-3">
            — Essentials
          </p>
          <h2 className="font-heading text-[clamp(2.5rem,7vw,6rem)] leading-none text-crown-white">
            Most Wanted
          </h2>
        </div>
        <p className="text-xs text-crown-ash max-w-xs leading-relaxed">
          The pieces worn by those who train hard, live harder,
          and refuse to settle for ordinary.
        </p>
      </div>

      {/* Product cards grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {ITEMS.map(item => (
          <div
            key={item.id}
            className="fp-card group relative cursor-none"
            style={{ willChange: 'transform' }}
          >
            {/* Card visual */}
            <div
              className="relative aspect-[2/3] mb-4 overflow-hidden"
              style={{ background: item.shade }}
            >
              {/* Texture */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.02) 20px, rgba(255,255,255,0.02) 21px)',
                }}
              />

              {/* Brand watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className="font-heading text-[6rem] text-white/[0.04] leading-none">C</span>
              </div>

              {/* Category label */}
              <div className="absolute top-3 left-3">
                <span className="text-[8px] tracking-widest uppercase text-crown-muted">
                  {item.cat}
                </span>
              </div>

              {/* Badge */}
              {item.badge && (
                <div className="absolute top-3 right-3">
                  <span className="text-[8px] tracking-widest uppercase bg-crown-white text-crown-black px-2 py-0.5 font-semibold">
                    {item.badge}
                  </span>
                </div>
              )}

              {/* Hover overlay with add-to-cart */}
              <div className="
                absolute inset-x-0 bottom-0 h-0 bg-crown-white/90
                group-hover:h-12 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
                flex items-center justify-center overflow-hidden
              ">
                <span className="text-[9px] font-semibold tracking-widest uppercase text-crown-black whitespace-nowrap">
                  Add to Bag
                </span>
              </div>

              {/* Shimmer on hover */}
              <div className="
                absolute inset-0 opacity-0 group-hover:opacity-100
                transition-opacity duration-700
                bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent
              " />
            </div>

            {/* Info row */}
            <div className="flex items-start justify-between px-1">
              <div>
                <h3 className="text-[13px] font-medium text-crown-white tracking-wide mb-0.5 group-hover:text-crown-cream transition-colors">
                  {item.name}
                </h3>
                <p className="text-[10px] text-crown-muted tracking-wider uppercase">{item.cat}</p>
              </div>
              <span className="text-[13px] font-medium text-crown-white">{item.price}</span>
            </div>

            {/* Underline reveal */}
            <div className="mt-3 px-1">
              <div className="w-0 group-hover:w-full h-px bg-crown-border transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
            </div>
          </div>
        ))}
      </div>

      {/* Background large text */}
      <div className="
        absolute bottom-0 left-0
        font-heading text-[22vw] text-white/[0.015]
        leading-none select-none pointer-events-none -z-0
      ">
        CONQUER
      </div>
    </section>
  )
}
