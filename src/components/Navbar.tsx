import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const NAV_LINKS = ['Collection', 'About', 'Athletes', 'Journal']

export default function Navbar() {
  const navRef   = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  // Entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -80, opacity: 0, duration: 1.2,
        ease: 'power4.out', delay: 2.0,
      })
    }, navRef)
    return () => ctx.revert()
  }, [])

  // Background transition on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`
        fixed top-0 left-0 right-0 z-50
        flex items-center justify-between
        px-8 md:px-16 py-5
        transition-all duration-700
        ${scrolled
          ? 'bg-crown-black/90 backdrop-blur-md border-b border-crown-border'
          : 'bg-transparent'}
      `}
    >
      {/* Logo */}
      <a href="/" className="font-heading text-2xl tracking-widest2 text-crown-white">
        C&amp;C
      </a>

      {/* Links */}
      <ul className="hidden md:flex gap-10 list-none">
        {NAV_LINKS.map(link => (
          <li key={link}>
            <a
              href="#"
              className="
                text-[11px] font-medium tracking-widest2 uppercase
                text-crown-ash hover:text-crown-white
                transition-colors duration-300
              "
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#"
        className="
          hidden md:inline-flex items-center gap-2
          text-[11px] font-medium tracking-widest uppercase
          border border-crown-border px-5 py-2.5
          text-crown-white
          hover:border-crown-white hover:bg-crown-white hover:text-crown-black
          transition-all duration-300
        "
      >
        Shop
      </a>

      {/* Mobile menu icon */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-1 cursor-none"
        aria-label="Menu"
      >
        <span className="w-6 h-px bg-crown-white block" />
        <span className="w-4 h-px bg-crown-white block" />
      </button>
    </nav>
  )
}
