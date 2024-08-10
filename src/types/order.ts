import { OrderItem, OrderStatus } from '@prisma/client'

export type CreateOrderData = {
  clientId: number
  status: OrderStatus
  totalAmount: number
}

export type CreateOrderItemData = Omit<OrderItem, 'id'>
