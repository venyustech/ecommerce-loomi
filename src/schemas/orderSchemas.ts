import Joi from 'joi'

const createOrderItemSchema = Joi.object({
  orderId: Joi.number().integer().positive().required(),
  productId: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().min(1).required()
})

const updateOrderItemQuantitySchema = Joi.object({
  newQuantity: Joi.number().integer().min(0).required()
})

export { createOrderItemSchema, updateOrderItemQuantitySchema }
