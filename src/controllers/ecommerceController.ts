import { Request, Response } from 'express'
import ecommerceService from '../services/ecommerceService.js'

async function create(req: Request, res: Response) {
  const userId = res.locals.user.id
  const ecommercePayload = req.body
  const ecommerceData = await ecommerceService.create(Number(userId), ecommercePayload)
  res.send(ecommerceData).status(200)
}

export default {
  create
}
