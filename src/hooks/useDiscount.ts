import { useEffect, useState } from 'react'

const STORAGE_KEY = 'cc_discount_code'
const STORE_BASE  = 'https://crownconquer.com'

/**
 * Reads a discount code from the URL (?discount=CODE), persists it in
 * localStorage, and exposes a helper that builds the correct Shopify URL.
 *
 * Shopify discount URL format:
 *   /discount/CODE?redirect=/collections/all
 *
 * Usage in emails:
 *   https://crownconquer.com/?discount=SAVE10
 */
export function useDiscount() {
  const [code, setCode] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY)
    } catch {
      return null
    }
  })

  useEffect(() => {
    const params  = new URLSearchParams(window.location.search)
    const urlCode = params.get('discount')
    if (urlCode) {
      const upper = urlCode.toUpperCase()
      try { localStorage.setItem(STORAGE_KEY, upper) } catch { /* private mode */ }
      setCode(upper)
    }
  }, [])

  /**
   * Returns a full Shopify URL.
   * If a discount code is active, wraps the path in /discount/CODE?redirect=…
   * so Shopify auto-applies it at checkout.
   *
   * @param path  Shopify path to redirect to, e.g. '/collections/all'
   */
  function getShopUrl(path: string = '/collections/all'): string {
    if (code) {
      return `${STORE_BASE}/discount/${code}?redirect=${encodeURIComponent(path)}`
    }
    return `${STORE_BASE}${path}`
  }

  return { code, getShopUrl }
}
