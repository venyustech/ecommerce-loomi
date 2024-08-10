import { Ecommerce } from '@prisma/client'

export type CreateEcommerceData = Omit<Ecommerce, 'id'>
