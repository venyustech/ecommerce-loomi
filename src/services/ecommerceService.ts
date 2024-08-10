import { CreateEcommerceData } from '../types/ecommerce.js'
import ecommenrceRepository from '../repositories/ecommenrceRepository.js'

async function create(userId: number, ecommercePayload: CreateEcommerceData) {
  return ecommenrceRepository.createEcommerce({ ...ecommercePayload, ownerId: userId })
}

export default {
  create
}
