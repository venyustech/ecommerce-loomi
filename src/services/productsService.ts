import { notFoundError, unauthorizedError } from '../utils/errorUtils.js'
import { CreateProductData, SearchFilters } from '../types/product.js'
import ecommenrceRepository from '../repositories/ecommenrceRepository.js'
import productRepository from '../repositories/productRepository.js'

async function create(userId: number, productPayload: CreateProductData) {
  await validateEcommerceOwnerOrFail(productPayload, userId)
  return productRepository.createProduct(assembleProductData(productPayload))
}

async function update(productId: number, productPayload: CreateProductData) {
  await validateEcommerceOwnerOrFail(productPayload, productId)
  return productRepository.updateProduct(productId, assembleProductData(productPayload))
}

async function deleteProduct(productId: number, adminId: number) {
  const product = await productRepository.findProductById(productId)
  if (!product) throw notFoundError('Product not found')
  if (adminId !== product.ecommerce.ownerId) throw unauthorizedError('You must be the owner of this product')
  await productRepository.deleteProduct(productId)
}

async function searchProducts(filters: SearchFilters) {
  return await productRepository.searchProducts(filters)
}

async function validateEcommerceOwnerOrFail(productPayload: CreateProductData, userId: number) {
  const ecommerceData = await ecommenrceRepository.findById(productPayload.ecommerceId)
  if (!ecommerceData) throw notFoundError('Ecommerce not found')
  if (userId !== ecommerceData.ownerId) unauthorizedError('You must be the owner of this ecommerce')
}

function assembleProductData(productPayload: CreateProductData) {
  return {
    name: productPayload.name,
    description: productPayload.description,
    price: productPayload.price * 100,
    stockQuantity: productPayload.stockQuantity,
    createdAt: productPayload.createdAt,
    updatedAt: productPayload.updatedAt,
    category: productPayload.category,
    color: productPayload.color,
    ecommerceId: productPayload.ecommerceId
  }
}
export default {
  create,
  update,
  deleteProduct,
  searchProducts
}
