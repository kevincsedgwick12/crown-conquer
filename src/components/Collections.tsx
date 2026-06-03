import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const COLLECTIONS = [
  {
    id: 1,
    title: 'Hoodies',
    subtitle: 'Heavyweight Series',
    count: '6 Styles',
    shade: ['#141414', '#0c0c0c'],
    accent: 'rgba(255,255,255,0.06)',
    href: '#',
  },
  {
    id: 2,
    title: 'Shorts',
    subtitle: 'Performance Series',
    count: '4 Styles',
    shade: ['#111111', '#0a0a0a'],
    accent: 'rgba(255,255,255,0.05)',
    href: '#',
  },
  {
    id: 3,
    title: "Women's",
    subtitle: "Women's Collection",
    count: '8 Styles',
    shade: ['#171717', '#0e0e0e'],
    accent: 'rgba(255,255,255,0.055)',
    href: '#',
  },
]

function CollectionCard({ col, index }: { col: typeof COLLECTIONS[0]; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 8
      gsap.to(card, {
        rotateX: -y, rotateY: x,
        transformPerspective: 1000,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    const onLeave = () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 1.0, ease: 'elastic.out(1, 0.4)' })
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <a
      ref={cardRef}
      href={col.href}
      className="col-card group relative overflow-hidden cursor-none block"
      style={{ willChange: 'transform' }}
    >
      {/* Background */}
      <div
        className="relative aspect-[3/4] overflow-hidden"
        style={{
          background: `linear-gradient(155deg, ${col.shade[0]} 0%, ${col.shade[1]} 100%)`,
        }}
      >
        {/* Atmospheric light */}
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 10%, ${col.accent} 0%, transparent 65%)`,
        }} />

        {/* Fabric texture */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 14px)',
        }} />

        {/* Collection title watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-heading text-[6rem] text-white/[0.025] leading-none uppercase">{col.title}</span>
        </div>

        {/* Hover overlay */}
        <div className="
          absolute inset-0
          bg-white/[0.035]
          opacity-0 group-hover:opacity-100
          transition-opacity duration-700
        " />

        {/* Corner arrow — appears on hover */}
        <div className="
          absolute top-5 right-5
          w-8 h-8 flex items-center justify-center
          border border-crown-white/0 group-hover:border-crown-white/30
          transition-all duration-400
        ">
          <span className="
            text-[10px] text-crown-white/0 group-hover:text-crown-white/70
            transition-all duration-400
          ">↗</span>
        </div>

        {/* Bottom label */}
        <div className="
          absolute bottom-0 left-0 right-0 p-6
          translate-y-2 group-hover:translate-y-0
          transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
        ">
          <div className="
            h-px w-0 group-hover:w-full bg-crown-white/20
            transition-all duration-500 delay-100 mb-4
          " />
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[8px] tracking-widest uppercase text-crown-muted mb-1.5">{col.subtitle}</p>
              <h3 className="font-heading text-[clamp(2rem,5vw,3.5rem)] leading-none text-crown-white">{col.title}</h3>
            </div>
            <span className="text-[9px] tracking-widest uppercase text-crown-ash">{col.count}</span>
          </div>
        </div>
      </div>
    </a>
  )
}

export default function Collections() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 50, opacity: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      })

      gsap.from('.col-card', {
        y: 80, opacity: 0, stagger: 0.15, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.col-card', start: 'top 88%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="collections"
      className="relative py-28 px-6 md:px-16 bg-crown-charcoal overflow-hidden"
    >
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crown-border to-transparent" />

      {/* Header */}
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <p className="text-[9px] tracking-widest3 uppercase text-crown-muted mb-4">— Shop By Category</p>
          <h2 className="font-heading leading-none text-crown-white" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}>
            COLLECTIONS
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
          Shop All →
        </a>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {COLLECTIONS.map((col, i) => (
          <CollectionCard key={col.id} col={col} index={i} />
        ))}
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crown-border to-transparent" />
    </section>
  )
}
