import { Router } from 'express'
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js'
import { ensureAuthenticatedMiddleware } from '../middlewares/ensureAuthenticatedMiddleware.js'
import ensureAdminMiddleware from '../middlewares/ensureAdminMiddleware.js'
import { createEcommerceSchema } from '../schemas/ecommerceSchemas.js'
import ecommerceController from '../controllers/ecommerceController.js'

const ecommerceRouter = Router()

ecommerceRouter.post(
  '/ecommerce/admin/create',
  ensureAuthenticatedMiddleware,
  ensureAdminMiddleware,
  validateSchemaMiddleware(createEcommerceSchema),
  ecommerceController.create
)

export default ecommerceRouter
