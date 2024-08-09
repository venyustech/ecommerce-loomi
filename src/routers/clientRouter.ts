import { Router } from 'express'
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js'
import { ensureAuthenticatedMiddleware } from '../middlewares/ensureAuthenticatedMiddleware.js'
import clientController from '../controllers/clientController.js'
import { createClientSchema, updateClientSchema } from '../schemas/clientSchemas.js'

const clientRouter = Router()

clientRouter.post(
  '/client/create',
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(createClientSchema),
  clientController.create
)

clientRouter.put(
  '/client/update',
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(updateClientSchema),
  clientController.update
)

export default clientRouter
