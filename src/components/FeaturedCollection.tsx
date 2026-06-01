import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PRODUCTS = [
  {
    id: 1,
    name: 'Conquer Hoodie',
    subtitle: 'Heavyweight Series',
    price: '$89',
    tag: 'New Drop',
    gradient: 'from-[#1a1a1a] to-[#111]',
    accent: 'before:bg-[#2a2a2a]',
  },
  {
    id: 2,
    name: 'Reign Oversized Tee',
    subtitle: 'Core Collection',
    price: '$49',
    tag: 'Bestseller',
    gradient: 'from-[#161616] to-[#0e0e0e]',
    accent: 'before:bg-[#222]',
  },
  {
    id: 3,
    name: 'Discipline Shorts',
    subtitle: 'Performance Series',
    price: '$65',
    tag: 'Limited',
    gradient: 'from-[#1c1c1c] to-[#121212]',
    accent: 'before:bg-[#2c2c2c]',
  },
]

function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D tilt on hover
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 18
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 18
      gsap.to(card, {
        rotateX: -y, rotateY: x,
        transformPerspective: 800,
        ease: 'power2.out', duration: 0.4,
      })
    }

    const onLeave = () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1,0.5)' })
    }

    card.addEventListener('mousemove',  onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove',  onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="product-card group relative overflow-hidden cursor-none"
      style={{ willChange: 'transform' }}
    >
      {/* Image placeholder */}
      <div
        className={`
          relative w-full aspect-[3/4] bg-gradient-to-b ${product.gradient}
          overflow-hidden
        `}
      >
        {/* Texture lines */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px)',
          }}
        />

        {/* Crown watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] select-none pointer-events-none">
          <span className="font-heading text-[10rem] text-white leading-none">C&amp;C</span>
        </div>

        {/* Product silhouette graphic */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 opacity-20">
          <div className="w-full h-full border border-white/20 rounded-sm" />
        </div>

        {/* Zoom overlay */}
        <div className="absolute inset-0 bg-white/[0.03] scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />

        {/* Tag */}
        <div className="absolute top-4 left-4">
          <span className="text-[9px] tracking-widest uppercase text-crown-ash bg-crown-black/60 backdrop-blur-sm px-2.5 py-1 border border-crown-border">
            {product.tag}
          </span>
        </div>

        {/* Quick add (appears on hover) */}
        <div className="
          absolute bottom-0 left-0 right-0 px-6 py-4
          translate-y-full group-hover:translate-y-0
          transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
          bg-crown-white
        ">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-crown-black">
            Quick Add
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="pt-5 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] tracking-widest uppercase text-crown-ash mb-1">
              {product.subtitle}
            </p>
            <h3 className="text-sm font-medium tracking-wide text-crown-white group-hover:text-crown-cream transition-colors duration-300">
              {product.name}
            </h3>
          </div>
          <span className="text-sm font-medium text-crown-white">{product.price}</span>
        </div>

        {/* Size dots */}
        <div className="flex gap-2 mt-3">
          {['XS','S','M','L','XL'].map(s => (
            <span
              key={s}
              className="text-[9px] text-crown-muted tracking-wider hover:text-crown-white transition-colors duration-200 cursor-none"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function FeaturedCollection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(headingRef.current, {
        y: 50, opacity: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        },
      })

      // Card stagger
      gsap.from('.product-card', {
        y: 80, opacity: 0, duration: 1.0,
        stagger: 0.15, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.product-card',
          start: 'top 88%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="relative py-28 px-6 md:px-16 bg-crown-black"
    >
      {/* Section header */}
      <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <p className="text-[10px] tracking-widest3 uppercase text-crown-ash mb-3">
            — Featured Drop
          </p>
          <h2 className="font-heading text-[clamp(2.5rem,7vw,6rem)] leading-none text-crown-white">
            New Collection
          </h2>
        </div>
        <a
          href="#"
          className="
            text-[11px] font-medium tracking-widest uppercase
            text-crown-ash hover:text-crown-white
            border-b border-crown-border hover:border-crown-white
            pb-1 transition-all duration-300 self-end cursor-none
          "
        >
          View All →
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {PRODUCTS.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  )
}
