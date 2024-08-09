import { NextFunction, Request, Response } from 'express'
import { ObjectSchema, StringSchema } from 'joi'

export function validateSchemaMiddleware(schema: ObjectSchema | StringSchema, validationPayload?: unknown) {
  return (req: Request, res: Response, next: NextFunction) => {
    const payloadToValidate = validationPayload || req.body
    const validation = schema.validate(payloadToValidate)
    if (validation.error) {
      return res.status(400).send({ error: validation.error.message })
    }
    next()
  }
}
