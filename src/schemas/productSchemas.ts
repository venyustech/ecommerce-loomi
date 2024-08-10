import Joi from 'joi'
import { CreateProductData } from '../types/product'

const createProductSchema = Joi.object<CreateProductData>({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  stockQuantity: Joi.number().integer().min(0).required(),
  category: Joi.string().required(),
  color: Joi.string().optional(),
  ecommerceId: Joi.number().integer().required()
})

const findProductsQuerySchema = Joi.object({
  name: Joi.string().optional(),
  minPrice: Joi.number().positive().optional(),
  maxPrice: Joi.number().positive().optional(),
  category: Joi.string().optional(),
  inStock: Joi.boolean().optional()
})

export { createProductSchema, findProductsQuerySchema }
