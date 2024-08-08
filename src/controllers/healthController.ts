import { Request, Response } from 'express'

async function getHealth(req: Request, res: Response) {
  return res.send("I'm alive 🎉 ").status(200)
}

export default {
  getHealth
}
