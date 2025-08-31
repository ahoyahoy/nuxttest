import { dmEn } from './products/dm-en'
import { dmCz } from './products/dm-cz'

export const products = { 'dm-en': dmEn, 'dm-cz': dmCz }
export type ProductId = keyof typeof products

export const getProductConfig = (id: ProductId) => products[id]

export * from './types'

export * from './router'
