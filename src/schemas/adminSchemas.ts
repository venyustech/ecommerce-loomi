import Joi from 'joi'

const findClientQuerySchema = Joi.object({
  email: Joi.string().email().optional(),
  initialDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().optional()
})
export { findClientQuerySchema }
