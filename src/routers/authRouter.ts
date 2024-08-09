import { Router } from 'express'
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js'
import authController from '../controllers/authController.js'
import { loginSchema, userSchema } from '../schemas/userSchemas.js'

const authRouter = Router()

authRouter.post('/user/sign-up', validateSchemaMiddleware(userSchema), authController.signUp)
authRouter.post('/user/sign-in', validateSchemaMiddleware(loginSchema), authController.signIn)

export default authRouter
