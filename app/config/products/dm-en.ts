import type {ProductConfig} from '../types'

export const dmEn: ProductConfig = {
  id: 'dm-en',
  locales: ['en'],
  defaultLocale: 'en',
  routes: [
    {name: 'home', path: '/', cmp: 'Home'},
  ],
  capabilities: {tagsOnCharacter: true, grantPage: false},
  contentSlots: {
    footerSponsors: ['openai', 'microsoft', 'google', 'amazon'],
  },
  seo: {
    canonicalDomain: 'dungeon-master.com',
    hreflang: ['en'],
  },
  market: 'eu',
}
