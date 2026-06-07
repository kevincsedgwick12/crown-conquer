import { createContext, useContext, useEffect, useState } from 'react'
import VALID_CODES from '../data/discounts.json'

const STORAGE_KEY = 'cc_discount_code'
const STORE_BASE  = 'https://crownconquer.com'

interface DiscountContextValue {
  code:       string | null
  applyCode:  (raw: string) => 'ok' | 'invalid'
  clearCode:  () => void
  getShopUrl: (path?: string) => string
}

const DiscountContext = createContext<DiscountContextValue | null>(null)

export function DiscountProvider({ children }: { children: React.ReactNode }) {
  const [code, setCode] = useState<string | null>(() => {
    try { return localStorage.getItem(STORAGE_KEY) } catch { return null }
  })

  // Also honour ?discount= in the URL (for email click-through links)
  useEffect(() => {
    const params  = new URLSearchParams(window.location.search)
    const urlCode = params.get('discount')
    if (urlCode) {
      const upper = urlCode.trim().toUpperCase()
      try { localStorage.setItem(STORAGE_KEY, upper) } catch { /* private mode */ }
      setCode(upper)
    }
  }, [])

  function applyCode(raw: string): 'ok' | 'invalid' {
    const upper = raw.trim().toUpperCase()
    if (!upper) return 'invalid'
    if (!(VALID_CODES as string[]).includes(upper)) return 'invalid'
    try { localStorage.setItem(STORAGE_KEY, upper) } catch {}
    setCode(upper)
    return 'ok'
  }

  function clearCode() {
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
    setCode(null)
  }

  function getShopUrl(path: string = '/collections/all'): string {
    if (code) {
      return `${STORE_BASE}/discount/${code}?redirect=${encodeURIComponent(path)}`
    }
    return `${STORE_BASE}${path}`
  }

  return (
    <DiscountContext.Provider value={{ code, applyCode, clearCode, getShopUrl }}>
      {children}
    </DiscountContext.Provider>
  )
}

export function useDiscount() {
  const ctx = useContext(DiscountContext)
  if (!ctx) throw new Error('useDiscount must be used inside <DiscountProvider>')
  return ctx
}
