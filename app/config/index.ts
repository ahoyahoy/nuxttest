import { dmEn } from './products/dm-en'
import { dmCz } from './products/dm-cz'

export const products = { 'dm-en': dmEn, 'dm-cz': dmCz }
export type ProductId = keyof typeof products

export const getProductConfig = (id: ProductId) => products[id]

export * from './types'

export * from './router'

export function getLocales(configId: ProductId) {
  const productConfig = getProductConfig(configId)

  return productConfig.locales.map(locale => ({
    code: locale,
    language: locale,
    file: 'load.ts',
    cache: false
  }))
}

export function getDefaultLocale(configId: ProductId) {
  const productConfig = getProductConfig(configId)
  return productConfig.defaultLocale
}