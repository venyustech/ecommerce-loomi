import { Router } from 'express'
import healthRouter from './healthRouter.js'
import authRouter from './authRouter.js'
import clientRouter from './clientRouter.js'
import adminRouter from './adminRouter.js'

const router = Router()
router.use(healthRouter)
router.use(authRouter)
router.use(clientRouter)
router.use(adminRouter)

export default router
