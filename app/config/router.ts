import type { RouteRecordRaw } from 'vue-router'
import { getProductConfig, type ProductId } from "./index.js"

export function createRouter(productId: ProductId): RouteRecordRaw[] {
    const productConfig = getProductConfig(productId)
    const pages = import.meta.glob('~/components/pages/**/*.vue')
    const routes: RouteRecordRaw[] = []

    console.log('productConfig', productConfig, pages)

    for (const route of productConfig.routes) {
        const componentPath = Object.keys(pages).find(path => {
            const fileName = path.split('/').pop()?.replace('.vue', '')
            return fileName === route.cmp
        })
        
        if (componentPath) {
            const pageComponent = pages[componentPath]
            routes.push({ 
                path: route.path, 
                component: pageComponent as any, 
                meta: route.meta 
            })
        } else {
            console.warn(`Component ${route.cmp} not found for route ${route.path}`)
        }
    }
    return routes
}
