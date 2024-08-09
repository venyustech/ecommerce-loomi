import { Router } from 'express'
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js'
import { ensureAuthenticatedMiddleware } from '../middlewares/ensureAuthenticatedMiddleware.js'
import clientController from '../controllers/clientController.js'
import ensureAdminMiddleware from '../middlewares/ensureAdminMiddleware.js'
import { updateClientByAdminSchema } from '../schemas/clientSchemas.js'
import { findClientQuerySchema } from '../schemas/adminSchemas.js'
import { validateQuery } from '../middlewares/validateQuerySchema.js'

const adminRouter = Router()

adminRouter.put(
  '/admin/update/:email',
  ensureAuthenticatedMiddleware,
  ensureAdminMiddleware,
  validateSchemaMiddleware(updateClientByAdminSchema),
  clientController.updateUserByAdmin
)
adminRouter.get(
  '/admin/user/find',
  ensureAuthenticatedMiddleware,
  ensureAdminMiddleware,
  validateQuery(findClientQuerySchema),
  clientController.findAllByAdmin
)

adminRouter.delete(
  '/admin/client/:id',
  ensureAuthenticatedMiddleware,
  ensureAdminMiddleware,
  clientController.deleteClientById
)

export default adminRouter
