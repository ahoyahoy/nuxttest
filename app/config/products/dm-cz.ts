import type { ProductConfig } from '../types'

export const dmCz: ProductConfig = {
  id: 'dm-cz',
  locales: ['cs','en'],
  defaultLocale: 'cs',
  routes: [
    { name: 'home', path: '/', cmp: 'Home' },
    { 
      name: 'grant-thanks',
      path: {
       cs: '/dekujeme',
       en: '/thank-you'
      }, 
      cmp: 'GrantThanks'
    }
  ],
  capabilities: { tagsOnCharacter: false, grantPage: true },
  contentSlots: { footerSponsors: [] },
  seo: {
    canonicalDomain: 'pan-jeskyne.cz',
    hreflang: ['cs','en']
  },
  market: 'eu'
}