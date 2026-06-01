import { useEffect } from 'react'
import { gsap } from 'gsap'

/**
 * Custom cursor: a small dot that snaps + a larger ring that lags behind.
 * The ring expands on interactive elements (a, button, [data-cursor]).
 */
export default function CustomCursor() {
  useEffect(() => {
    const dot  = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    if (!dot || !ring) return

    // Dot follows instantly
    const moveDot = (e: MouseEvent) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY })
    }

    // Ring follows with lag
    let rx = 0, ry = 0
    const moveRing = (e: MouseEvent) => {
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.18, ease: 'power2.out' })
      rx = e.clientX; ry = e.clientY
    }

    // Hover state
    const addHover = () => ring.classList.add('hovering')
    const rmHover  = () => ring.classList.remove('hovering')

    const targets = 'a, button, [data-cursor]'
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(targets)) addHover()
    }
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest(targets)) rmHover()
    }

    window.addEventListener('mousemove', moveDot,  { passive: true })
    window.addEventListener('mousemove', moveRing, { passive: true })
    document.addEventListener('mouseover',  onOver)
    document.addEventListener('mouseout',   onOut)

    return () => {
      window.removeEventListener('mousemove', moveDot)
      window.removeEventListener('mousemove', moveRing)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mouseout',   onOut)
    }
  }, [])

  return (
    <>
      <div id="cursor-dot"  />
      <div id="cursor-ring" />
    </>
  )
}
