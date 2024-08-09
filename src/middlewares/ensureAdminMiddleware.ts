import { NextFunction, Request, Response } from 'express'
import { unauthorizedError } from '../utils/errorUtils.js'

export default function ensureAdminMiddleware(req: Request, res: Response, next: NextFunction) {
  const userRole = res.locals.user?.role
  if (userRole !== 'Admin') throw unauthorizedError('You do not have authorization to perform this action.')
  next()
}
