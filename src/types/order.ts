import { Order, OrderItem } from '@prisma/client'

export type CreateOrderData = Pick<Order, 'clientId' | 'status' | 'totalAmount'>

export type CreateOrderItemData = Omit<OrderItem, 'id' | 'createdAt'>

export type OrderItemGrouped = {
  productId: number
  _sum: {
    quantity: number
    subtotal: number
  }
}
