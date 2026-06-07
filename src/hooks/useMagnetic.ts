import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Magnetic button effect.
 * Attach the returned ref to the outer button element.
 * The inner element (mag-btn-inner) gets a stronger pull for a layered feel.
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const inner = el.querySelector<HTMLElement>('.mag-btn-inner')

    const onEnter = (e: Event) => {
      const me = e as MouseEvent
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width  / 2
      const cy = rect.top  + rect.height / 2
      const dx = me.clientX - cx
      const dy = me.clientY - cy
      gsap.to(el,    { x: dx * strength,        y: dy * strength,        duration: 0.4, ease: 'power2.out' })
      if (inner)
        gsap.to(inner, { x: dx * strength * 0.5, y: dy * strength * 0.5, duration: 0.4, ease: 'power2.out' })
    }

    const onLeave = () => {
      gsap.to(el,    { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
      if (inner)
        gsap.to(inner, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
    }

    el.addEventListener('mousemove',  onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove',  onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return ref as React.RefObject<HTMLButtonElement & HTMLAnchorElement>
}
