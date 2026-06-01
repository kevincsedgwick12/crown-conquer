import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Thin line at the top of the viewport tracking scroll depth. */
export default function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return

    gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end:   'bottom bottom',
        scrub: 0.3,
      },
    })
    gsap.set(bar, { scaleX: 0 })
  }, [])

  return <div id="scroll-progress" style={{ width: '100%' }} />
}
