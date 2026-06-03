import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BEST_SELLERS = [
  {
    id: 1,
    name: 'Relentless Hoodie',
    category: 'Outerwear',
    price: '$119',
    badge: 'Best Seller',
    shade: ['#161616', '#0e0e0e'],
    highlight: 'rgba(255,255,255,0.05)',
  },
  {
    id: 2,
    name: 'Conquer Jogger',
    category: 'Bottoms',
    price: '$89',
    badge: 'New Drop',
    shade: ['#131313', '#0c0c0c'],
    highlight: 'rgba(255,255,255,0.04)',
  },
  {
    id: 3,
    name: 'Reign Oversized Tee',
    category: 'Tops',
    price: '$55',
    badge: 'Low Stock',
    shade: ['#181818', '#101010'],
    highlight: 'rgba(255,255,255,0.035)',
  },
  {
    id: 4,
    name: 'Discipline Shorts',
    category: 'Performance',
    price: '$69',
    badge: null,
    shade: ['#141414', '#0d0d0d'],
    highlight: 'rgba(255,255,255,0.04)',
  },
]

function BestSellerCard({ item, index }: { item: typeof BEST_SELLERS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const img = card.querySelector<HTMLElement>('.bs-img')

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 14
      gsap.to(card, {
        rotateX: -y * 0.5, rotateY: x * 0.5,
        transformPerspective: 900,
        duration: 0.45,
        ease: 'power2.out',
      })
      if (img) gsap.to(img, { scale: 1.06, duration: 0.6, ease: 'power2.out' })
    }

    const onLeave = () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.9, ease: 'elastic.out(1, 0.5)' })
      if (img) gsap.to(img, { scale: 1.0, duration: 0.6, ease: 'power2.out' })
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="bs-card group cursor-none"
      style={{ willChange: 'transform' }}
    >
      {/* Image area */}
      <div className="relative overflow-hidden aspect-[3/4] mb-5">
        {/* Background */}
        <div
          className="bs-img absolute inset-0 transition-transform duration-700"
          style={{
            background: `linear-gradient(160deg, ${item.shade[0]} 0%, ${item.shade[1]} 100%)`,
            transformOrigin: 'center',
          }}
        />

        {/* Lighting overlay */}
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 10%, ${item.highlight} 0%, transparent 70%)`,
        }} />

        {/* Fabric texture */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 10px)',
        }} />

        {/* Brand watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-heading text-[7rem] text-white/[0.03] leading-none">C</span>
        </div>

        {/* Badge */}
        {item.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span
              className="text-[8px] tracking-widest uppercase font-semibold px-2.5 py-1"
              style={{
                background: item.badge === 'Low Stock' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.75)',
                color: item.badge === 'Low Stock' ? '#080808' : '#f5f5f5',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {item.badge}
            </span>
          </div>
        )}

        {/* Hover — quick add */}
        <div className="
          absolute inset-x-0 bottom-0 h-0 overflow-hidden
          group-hover:h-12
          transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
          bg-crown-white flex items-center justify-center
        ">
          <span className="text-[9px] font-semibold tracking-widest uppercase text-crown-black whitespace-nowrap">
            Quick Add
          </span>
        </div>

        {/* Shimmer sweep */}
        <div className="
          absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-700 pointer-events-none
          bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent
        " />
      </div>

      {/* Info */}
      <div className="flex items-start justify-between px-0.5">
        <div>
          <p className="text-[9px] tracking-widest uppercase text-crown-muted mb-1.5">{item.category}</p>
          <h3 className="text-[13px] font-medium text-crown-white tracking-wide group-hover:text-crown-cream transition-colors duration-300">
            {item.name}
          </h3>
        </div>
        <span className="text-[13px] font-medium text-crown-white">{item.price}</span>
      </div>

      {/* Size dots */}
      <div className="flex gap-2.5 mt-3 px-0.5">
        {['S', 'M', 'L', 'XL'].map(s => (
          <span
            key={s}
            className="text-[9px] text-crown-muted tracking-wide hover:text-crown-white transition-colors duration-200 cursor-none"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Underline reveal */}
      <div className="mt-3 overflow-hidden">
        <div className="w-0 group-hover:w-full h-px bg-crown-border transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
      </div>
    </div>
  )
}

export default function BestSellers() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 50, opacity: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      })

      gsap.from('.bs-card', {
        y: 80, opacity: 0, stagger: 0.12, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: '.bs-card', start: 'top 88%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="best-sellers"
      className="relative py-28 px-6 md:px-16 bg-crown-black overflow-hidden"
    >
      {/* Section header */}
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <p className="text-[9px] tracking-widest3 uppercase text-crown-muted mb-4">— Bestsellers</p>
          <h2 className="font-heading leading-none text-crown-white" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}>
            BEST SELLERS
          </h2>
        </div>
        <a
          href="#"
          className="
            text-[10px] font-medium tracking-widest uppercase
            text-crown-ash hover:text-crown-white
            border-b border-crown-border hover:border-crown-white/60
            pb-1 transition-all duration-300 cursor-none self-end
          "
        >
          View All →
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
        {BEST_SELLERS.map((item, i) => (
          <BestSellerCard key={item.id} item={item} index={i} />
        ))}
      </div>

      {/* Background ghost text */}
      <div className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden">
        <span className="font-heading text-[18vw] text-white/[0.018] leading-none">KINGS</span>
      </div>
    </section>
  )
}
