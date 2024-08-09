import { NextFunction, Request, Response } from 'express'
import { ObjectSchema } from 'joi'

export function validateQuery(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.query)
    if (error) return res.status(400).send({ error: error.details[0].message })
    next()
  }
}
