export interface RouteDef {
  name: string
  path: string | {[locale: string]: string}
  cmp: string
  features?: string[]
  meta?: {
    title?: string
    description?: string
  }
}

export interface ProductConfig {
  id: string // 'dm-en'
  locales: string[] // dostupné jazyky pro produkt
  defaultLocale: string // default pro produkt
  routes: RouteDef[]
  capabilities: Record<string, boolean>
  contentSlots: Record<string, string[]> // např. footerSponsors
  seo: {
    canonicalDomain: string
    hreflang: string[]
  }
  market?: string // např. 'eu'|'pl'|'dach'
}
