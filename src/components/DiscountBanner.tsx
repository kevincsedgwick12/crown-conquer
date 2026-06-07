import { useState, useRef } from 'react'
import { useDiscount } from '../context/DiscountContext'

export default function DiscountBanner() {
  const { code, applyCode, clearCode } = useDiscount()
  const [input, setInput]   = useState('')
  const [error, setError]   = useState(false)
  const inputRef            = useRef<HTMLInputElement>(null)

  function handleApply() {
    const trimmed = input.trim()
    if (!trimmed) {
      setError(true)
      inputRef.current?.focus()
      return
    }
    applyCode(trimmed)
    setInput('')
    setError(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleApply()
    if (error) setError(false)
  }

  return (
    <div
      className="
        w-full bg-crown-charcoal border-b border-crown-border/40
        flex items-center justify-center gap-4 flex-wrap
        px-6 py-2.5
      "
    >
      {code ? (
        /* ── Applied state ── */
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* Check mark */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-crown-white">
              <path d="M1.5 6l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[9px] tracking-widest uppercase text-crown-white font-semibold">
              {code}
            </span>
            <span className="text-[9px] tracking-widest uppercase text-crown-muted">
              applied — discount will activate at checkout
            </span>
          </div>
          <button
            onClick={clearCode}
            className="text-[9px] tracking-widest uppercase text-crown-ash hover:text-crown-white transition-colors duration-200 cursor-none"
            aria-label="Remove discount code"
          >
            Remove
          </button>
        </div>
      ) : (
        /* ── Input state ── */
        <div className="flex items-center gap-3">
          <label
            htmlFor="discount-input"
            className="text-[9px] tracking-widest uppercase text-crown-muted hidden sm:block"
          >
            Promo code
          </label>

          <div className="relative">
            <input
              ref={inputRef}
              id="discount-input"
              type="text"
              value={input}
              onChange={e => { setInput(e.target.value); setError(false) }}
              onKeyDown={handleKeyDown}
              placeholder="ENTER CODE"
              maxLength={32}
              spellCheck={false}
              autoComplete="off"
              className={`
                w-44 sm:w-56
                bg-transparent
                border-b ${error ? 'border-red-400' : 'border-crown-border'}
                focus:border-crown-white
                outline-none
                text-[10px] font-medium tracking-widest uppercase text-crown-white
                placeholder:text-crown-border placeholder:tracking-widest
                py-1 pr-2
                transition-colors duration-200
                cursor-none
              `}
              style={{ WebkitAppearance: 'none' }}
            />
            {error && (
              <span className="absolute -bottom-4 left-0 text-[8px] tracking-wider text-red-400 uppercase">
                Please enter a code
              </span>
            )}
          </div>

          <button
            onClick={handleApply}
            className="
              px-5 py-1.5
              border border-crown-white/25
              text-[9px] font-semibold tracking-widest uppercase text-crown-white
              hover:border-crown-white/60 hover:bg-crown-white/[0.05]
              transition-all duration-200
              cursor-none
            "
          >
            Apply
          </button>
        </div>
      )}
    </div>
  )
}
