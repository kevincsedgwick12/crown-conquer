import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const NAV_LINKS = [
  { label: 'Collection', href: '#best-sellers' },
  { label: 'Lifestyle',  href: '#lifestyle' },
  { label: 'About',      href: '#' },
  { label: 'Journal',    href: '#' },
]

export default function Navbar() {
  const navRef   = useRef<HTMLElement>(null)
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -80, opacity: 0, duration: 1.2,
        ease: 'power4.out', delay: 1.8,
      })
    }, navRef)
    return () => ctx.revert()
  }, [])

  // Scroll background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return
    if (menuOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      )
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0, y: -8, duration: 0.25, ease: 'power2.in',
      })
    }
  }, [menuOpen])

  return (
    <>
      <nav
        ref={navRef}
        className={`
          fixed top-0 left-0 right-0 z-50
          flex items-center justify-between
          px-6 md:px-14 py-5
          transition-all duration-700
          ${scrolled
            ? 'bg-crown-black/92 backdrop-blur-md border-b border-crown-border/60'
            : 'bg-transparent'}
        `}
      >
        {/* Logo */}
        <a href="/" className="font-heading text-2xl tracking-widest2 text-crown-white cursor-none">
          C&amp;C
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-9 list-none">
          {NAV_LINKS.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                className="
                  text-[10px] font-medium tracking-widest2 uppercase
                  text-crown-ash hover:text-crown-white
                  transition-colors duration-300 cursor-none
                "
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#best-sellers"
          className="
            hidden md:inline-flex items-center
            text-[10px] font-semibold tracking-widest uppercase
            border border-crown-border px-6 py-2.5
            text-crown-white
            hover:border-crown-white hover:bg-crown-white hover:text-crown-black
            transition-all duration-300 cursor-none
          "
        >
          Shop
        </a>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1 cursor-none"
          aria-label="Menu"
          onClick={() => setMenuOpen(v => !v)}
        >
          <span
            className="w-6 h-px bg-crown-white block transition-all duration-300"
            style={menuOpen ? { transform: 'rotate(45deg) translate(3px, 4px)' } : {}}
          />
          <span
            className="h-px bg-crown-white block transition-all duration-300"
            style={menuOpen ? { opacity: 0, width: 0 } : { width: '16px' }}
          />
          <span
            className="w-6 h-px bg-crown-white block transition-all duration-300"
            style={menuOpen ? { transform: 'rotate(-45deg) translate(3px, -4px)' } : {}}
          />
        </button>
      </nav>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className="
            fixed top-[64px] left-0 right-0 z-40
            bg-crown-black/96 backdrop-blur-md
            border-b border-crown-border
            px-6 pt-8 pb-10
            flex flex-col gap-1
            md:hidden
          "
        >
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="
                text-[11px] font-medium tracking-widest2 uppercase
                text-crown-ash hover:text-crown-white
                py-4 border-b border-crown-border/40
                transition-colors duration-200 cursor-none
              "
            >
              {link.label}
            </a>
          ))}
          <a
            href="#best-sellers"
            onClick={() => setMenuOpen(false)}
            className="
              mt-6 text-center py-4
              bg-crown-white text-crown-black
              text-[10px] font-semibold tracking-widest uppercase
              cursor-none
            "
          >
            Shop Now
          </a>
        </div>
      )}
    </>
  )
}
