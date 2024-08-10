import { prisma } from '../database.js'
import { CreateProductData, SearchFilters } from '../types/product.js'

async function createProduct(data: CreateProductData) {
  return prisma.product.create({
    data,
    include: {
      ecommerce: true
    }
  })
}

async function updateProduct(productId: number, data: CreateProductData) {
  return prisma.product.update({
    where: { id: productId },
    data,
    include: {
      ecommerce: true
    }
  })
}

async function deleteProduct(id: number) {
  return prisma.product.delete({ where: { id } })
}

async function findProductById(id: number) {
  return prisma.product.findUnique({
    where: {
      id
    },
    include: {
      ecommerce: true
    }
  })
}

async function searchProducts(filters: SearchFilters) {
  const { name, minPrice, maxPrice, categories, inStock } = filters
  return prisma.product.findMany({
    where: {
      name: name ? { contains: name, mode: 'insensitive' } : undefined,
      price: {
        gte: minPrice ? parseFloat(minPrice) : undefined,
        lte: maxPrice ? parseFloat(maxPrice) : undefined
      },
      stockQuantity: inStock ? { gt: 0 } : undefined,
      category: categories && categories.length > 0 ? { in: categories } : undefined
    }
  })
}

export default {
  createProduct,
  updateProduct,
  deleteProduct,
  findProductById,
  searchProducts
}
