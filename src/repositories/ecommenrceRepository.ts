import { prisma } from '../database.js'
import { CreateEcommerceData } from '../types/ecommerce.js'

async function createEcommerce(data: CreateEcommerceData) {
  return prisma.ecommerce.create({ data })
}

async function findByOwnerId(ownerId: number) {
  return prisma.ecommerce.findFirst({
    where: {
      ownerId
    },
    include: {
      owner: {
        select: { id: true, name: true, email: true, createdAt: true, updatedAt: true, role: true }
      }
    }
  })
}

async function findById(id: number) {
  return prisma.ecommerce.findFirst({
    where: {
      id
    },
    include: {
      owner: {
        select: { id: true, name: true, email: true, createdAt: true, updatedAt: true, role: true }
      }
    }
  })
}

export default {
  createEcommerce,
  findByOwnerId,
  findById
}
