import { Router } from 'express'
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js'
import { ensureAuthenticatedMiddleware } from '../middlewares/ensureAuthenticatedMiddleware.js'
import ensureAdminMiddleware from '../middlewares/ensureAdminMiddleware.js'
import productController from '../controllers/productController.js'
import { createProductSchema, findProductsQuerySchema } from '../schemas/productSchemas.js'
import { validateQuery } from '../middlewares/validateQuerySchema.js'

const productRouter = Router()

productRouter.post(
  '/products/create',
  ensureAuthenticatedMiddleware,
  ensureAdminMiddleware,
  validateSchemaMiddleware(createProductSchema),
  productController.create
)

productRouter.put(
  '/products/update/:productId',
  ensureAuthenticatedMiddleware,
  ensureAdminMiddleware,
  validateSchemaMiddleware(createProductSchema),
  productController.update
)

productRouter.delete(
  '/products/delete/:productId',
  ensureAuthenticatedMiddleware,
  ensureAdminMiddleware,
  productController.deleteByProductId
)

productRouter.get(
  '/products/find',
  ensureAuthenticatedMiddleware,
  validateQuery(findProductsQuerySchema),
  productController.findProducts
)

export default productRouter
