import { Request, Response } from 'express'
import productsService from '../services/productsService.js'

async function create(req: Request, res: Response) {
  const userId = res.locals.user.id
  const createProductPayload = req.body
  const productData = await productsService.create(userId, createProductPayload)
  res.send(productData).status(200)
}

async function update(req: Request, res: Response) {
  const { productId } = req.params
  const createProductPayload = req.body
  const productData = await productsService.update(Number(productId), createProductPayload)
  res.send(productData).status(200)
}

async function findProducts(req: Request, res: Response) {
  const { name, minPrice, maxPrice, categories, inStock } = req.query
  const categoryArray = categories ? (categories as string).split(',') : []
  const products = await productsService.searchProducts({
    name: name as string,
    minPrice: minPrice as string,
    maxPrice: maxPrice as string,
    categories: categoryArray,
    inStock: inStock === 'true'
  })
  res.status(200).send(products)
}

async function deleteByProductId(req: Request, res: Response) {
  const { productId } = req.params
  const userId = res.locals.user.id
  await productsService.deleteProduct(Number(productId), userId)
  res.status(204).send()
}

export default {
  create,
  update,
  findProducts,
  deleteByProductId
}
