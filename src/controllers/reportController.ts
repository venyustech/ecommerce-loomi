import { Request, Response } from 'express'
import reportService from '../services/reportService.js'

async function generate(req: Request, res: Response) {
  const userId = res.locals.user.id
  const reportPayload = req.body
  const reportData = await reportService.generateReport({ ...reportPayload, userId })
  res.download(reportData)
}

export default {
  generate
}
