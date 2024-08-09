import { prisma } from '../database.js'
import { CreateClientData } from '../types/client.js'

async function findById(id: number): Promise<CreateClientData> {
  return prisma.client.findUnique({
    where: {
      id
    }
  })
}

async function findByUserId(userId: number) {
  return prisma.client.findFirst({
    where: {
      userId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          role: true
        }
      }
    }
  })
}

async function findAllClients(email?: string, initialDate?: Date, endDate?: Date) {
  console.log(initialDate)
  console.log(endDate)
  return prisma.client.findMany({
    where: {
      ...(email && { user: { email } }),
      ...(initialDate && endDate && { createdAt: { gte: initialDate, lte: endDate } })
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          role: true
        }
      }
    }
  })
}

async function insert(clientData: CreateClientData) {
  return prisma.client.create({
    data: clientData
  })
}

async function updateById(clientData: CreateClientData, id: number) {
  return prisma.client.update({
    where: {
      id
    },
    data: clientData
  })
}

async function deleteClientById(id: number) {
  return prisma.client.delete({
    where: { id }
  })
}
export default {
  findById,
  findByUserId,
  insert,
  updateById,
  findAllClients,
  deleteClientById
}
