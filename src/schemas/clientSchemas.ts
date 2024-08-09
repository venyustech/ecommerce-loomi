import Joi from 'joi'
import { CreateClientData } from '../types/client'

const createClientSchema = Joi.object<CreateClientData>({
  fullName: Joi.string().min(3).max(500).required(),
  contact: Joi.string()
    .pattern(/^[0-9()+\-.\s]*$/)
    .min(7)
    .max(20)
    .required(),
  address: Joi.string().min(10).max(500).required()
})

const updateClientSchema = Joi.object<CreateClientData>({
  fullName: Joi.string().min(3).max(500).optional(),
  contact: Joi.string()
    .pattern(/^[0-9()+\-.\s]*$/)
    .min(7)
    .max(20)
    .optional(),
  address: Joi.string().min(10).max(500).optional()
})

const updateClientByAdminSchema = Joi.object({
  fullName: Joi.string().min(3).max(500).optional(),
  contact: Joi.string()
    .pattern(/^[0-9()+\-.\s]*$/)
    .min(7)
    .max(20)
    .optional(),
  address: Joi.string().min(10).max(500).optional()
})

const emailSchema = Joi.string().email().required()

const dateRangeSchema = Joi.object({
  initialDate: Joi.date().optional(),
  endDate: Joi.date().optional()
})

export { createClientSchema, updateClientSchema, emailSchema, updateClientByAdminSchema, dateRangeSchema }
