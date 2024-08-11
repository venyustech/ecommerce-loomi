import Joi from 'joi'

const reportPayloadSchema = Joi.object({
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().greater(Joi.ref('startDate')).optional()
})

export { reportPayloadSchema }
