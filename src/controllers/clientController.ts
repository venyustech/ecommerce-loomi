import { Request, Response } from 'express'
import clientService from '../services/clientService.js'

async function create(req: Request, res: Response) {
  const userId = res.locals.user.id
  const clientData = req.body
  const clientPayload = await clientService.create(userId, clientData)
  res.send(clientPayload).status(200)
}

async function update(req: Request, res: Response) {
  const userId = res.locals.user.id
  const clientData = req.body
  const clientPayload = await clientService.update(userId, clientData)
  res.send(clientPayload).status(200)
}

async function updateUserByAdmin(req: Request, res: Response) {
  const updateData = req.body
  const clientEmail = req.params.email
  const clientPayload = await clientService.updateByAdmin(clientEmail, updateData)
  res.send(clientPayload).status(200)
}

async function findByEmail(req: Request, res: Response) {
  const email = req.params.email
  const clientPayload = await clientService.findByUserEmail(email)
  res.send(clientPayload).status(200)
}
async function findAllByAdmin(req: Request, res: Response) {
  const email = req.query.email as string | undefined
  const initialDate = req.query.initialDate as string | undefined
  const endDate = req.query.endDate as string | undefined
  const clientPayload = await clientService.findAllByAdmin(email, initialDate, endDate)
  res.send(clientPayload).status(200)
}

async function deleteClientById(req: Request, res: Response) {
  const { id } = req.params
  await clientService.deleteClientById(Number(id))
  res.status(204).send()
}

export default {
  create,
  update,
  findByEmail,
  findAllByAdmin,
  updateUserByAdmin,
  deleteClientById
}
