import { Router } from 'express'
import healthRouter from './healthRouter.js'
import authRouter from './authRouter.js'
import clientRouter from './clientRouter.js'
import adminRouter from './adminRouter.js'
import ecommerceRouter from './ecommerceRouter.js'
import productRouter from './productRouter.js'
import orderRouter from './orderRouter.js'
import reportRouter from './reports.js'

const router = Router()
router.use(healthRouter)
router.use(authRouter)
router.use(clientRouter)
router.use(adminRouter)
router.use(ecommerceRouter)
router.use(productRouter)
router.use(orderRouter)
router.use(reportRouter)

export default router
