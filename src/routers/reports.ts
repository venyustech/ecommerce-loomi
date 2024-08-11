import { Router } from 'express'
import reportController from '../controllers/reportController.js'
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js'
import { reportPayloadSchema } from '../schemas/report.js'
import { ensureAuthenticatedMiddleware } from '../middlewares/ensureAuthenticatedMiddleware.js'
import ensureAdminMiddleware from '../middlewares/ensureAdminMiddleware.js'

const reportRouter = Router()

reportRouter.get(
  '/admin/reports/generate',
  ensureAuthenticatedMiddleware,
  ensureAdminMiddleware,
  validateSchemaMiddleware(reportPayloadSchema),
  reportController.generate
)

export default reportRouter
