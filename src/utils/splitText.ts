/**
 * Lightweight text-splitting utilities.
 * Wraps each word/char in overflow-hidden spans so GSAP can clip-reveal them.
 */

export function splitWords(el: HTMLElement): HTMLElement[] {
  const original = el.innerHTML
  const words = original.split(/(\s+)/)
  el.innerHTML = words
    .map(w =>
      w.trim()
        ? `<span class="word-clip" style="overflow:hidden;display:inline-block;vertical-align:bottom">` +
          `<span class="word" style="display:inline-block">${w}</span></span>`
        : w
    )
    .join('')
  return Array.from(el.querySelectorAll<HTMLElement>('.word'))
}

export function splitChars(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? ''
  el.innerHTML = text
    .split('')
    .map(c =>
      c === ' '
        ? '<span style="display:inline-block;width:0.3em"></span>'
        : `<span class="char" style="display:inline-block">${c}</span>`
    )
    .join('')
  return Array.from(el.querySelectorAll<HTMLElement>('.char'))
}
