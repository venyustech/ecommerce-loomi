import { conflictError, notFoundError, wrongSchemaError } from '../utils/errorUtils.js'
import clientRepository from '../repositories/clientRepository.js'
import { CreateClientData } from '../types/client.js'
import userRepository from '../repositories/userRepository.js'

async function create(userId: number, clientPayload: CreateClientData) {
  const existingClient = await clientRepository.findByUserId(userId)
  if (existingClient) throw conflictError('Client already exist')
  const clientData = assembleClientData(clientPayload, userId)
  return clientRepository.insert(clientData)
}

async function update(userId: number, clientPayload: CreateClientData) {
  const clientData = await clientRepository.findByUserId(userId)
  if (!clientData) throw notFoundError('Client not found')
  return clientRepository.updateById(clientPayload, clientData.id)
}
async function updateByAdmin(userEmail: string, clientPayload: CreateClientData) {
  const clientData = await findClientByUserEmailOrFail(userEmail)
  return clientRepository.updateById(clientPayload, clientData.id)
}

async function findByUserEmail(emailPayload: string) {
  const clientData = await findClientByUserEmailOrFail(emailPayload)
  return clientData
}
async function findAllByAdmin(emailPayload: string, initialDatePayload: string, endDatePayload: string) {
  const email = assembleClientEmail(emailPayload)
  const { interval } = assembleDateIntervalPayload(initialDatePayload, endDatePayload)
  const initialDate = interval ? interval.initialDate : undefined
  const endDate = interval ? interval.endDate : undefined
  const clientData = await clientRepository.findAllClients(email, initialDate, endDate)
  if (!clientData) throw notFoundError('Client not found')
  return clientData
}

async function findClientByUserEmailOrFail(emailPayload: string) {
  const existingUser = await userRepository.findByEmail(emailPayload)
  if (!existingUser) throw notFoundError('Client not found')
  const clientData = await clientRepository.findByUserId(existingUser.id)
  if (!clientData) throw notFoundError('Client not found')
  return clientData
}

async function deleteClientById(id: number) {
  const client = await clientRepository.findById(id)
  if (!client) throw notFoundError('Client not found')
  await clientRepository.deleteClientById(id)
}
function assembleClientData(clientPayload: CreateClientData, userId: number): CreateClientData {
  return {
    ...clientPayload,
    userId,
    updatedAt: new Date(),
    isActive: true
  }
}

function assembleClientEmail(emailPayload: string) {
  if (!emailPayload) return undefined
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(emailPayload)) throw wrongSchemaError('Invalid email format')
  return emailPayload
}

function assembleDateIntervalPayload(initialDatePayload: string, endDatePayload: string) {
  if (!initialDatePayload || !endDatePayload) return { interval: null }
  const initialDate = new Date(initialDatePayload)
  const endDate = new Date(endDatePayload)
  if (isNaN(initialDate.getTime()) || isNaN(endDate.getTime())) throw wrongSchemaError('Invalid date format')
  return {
    interval: {
      initialDate,
      endDate
    }
  }
}

export default {
  create,
  update,
  findByUserEmail,
  updateByAdmin,
  findAllByAdmin,
  deleteClientById
}
