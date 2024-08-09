import Joi from 'joi'
import { UserRole } from '@prisma/client'
import { CreateUserData } from '../types/user'

const userSchema = Joi.object<CreateUserData>({
  email: Joi.string().required(),
  name: Joi.string().max(30).required(),
  password: Joi.string().required(),
  role: Joi.string().valid(UserRole.Admin, UserRole.Client).required()
})

const loginSchema = Joi.object<CreateUserData>({
  email: Joi.string().required(),
  password: Joi.string().required()
})

export { userSchema, loginSchema }
