import Joi from 'joi'
import { CreateEcommerceData } from '../types/ecommerce'

const createEcommerceSchema = Joi.object<CreateEcommerceData>({
  name: Joi.string().min(1).required(),
  document: Joi.string().min(1).required(),
  isActive: Joi.boolean().required(),
  type: Joi.string().min(1).required()
})
export { createEcommerceSchema }
