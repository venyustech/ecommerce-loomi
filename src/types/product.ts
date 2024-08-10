import { Product } from '@prisma/client'

export type CreateProductData = Omit<Product, 'id'>

export interface SearchFilters {
  name?: string
  minPrice?: string
  maxPrice?: string
  categories?: string[]
  inStock?: boolean
}
