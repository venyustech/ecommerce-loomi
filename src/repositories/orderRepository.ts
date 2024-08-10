import { OrderStatus } from '@prisma/client'
import { prisma } from '../database.js'
import { CreateOrderData, CreateOrderItemData } from '../types/order.js'

async function findById(id: number) {
  return prisma.order.findUnique({
    where: {
      id
    }
  })
}

async function findOrderItemById(id: number) {
  return prisma.orderItem.findUnique({
    where: {
      id
    }
  })
}
async function findManyOrderItem(orderId: number) {
  return await prisma.orderItem.findMany({
    where: { orderId }
  })
}
async function createOrder(order: CreateOrderData) {
  return prisma.order.create({
    data: { ...order }
  })
}

async function createOrderItem(orderItem: CreateOrderItemData) {
  return prisma.orderItem.create({
    data: { ...orderItem }
  })
}
async function removeByOrderItemId(orderItemId: number) {
  return prisma.orderItem.delete({
    where: { id: orderItemId }
  })
}

async function updateOrderItemQuantity(orderItemId: number, newQuantity: number, newSubTotal) {
  return prisma.orderItem.update({
    where: { id: orderItemId },
    data: { quantity: newQuantity, subtotal: newSubTotal }
  })
}

async function updateOrderStatus(orderId: number, newStatus: OrderStatus) {
  return prisma.order.update({
    where: { id: orderId },
    data: { status: newStatus }
  })
}

export default {
  findById,
  createOrderItem,
  removeByOrderItemId,
  updateOrderItemQuantity,
  findOrderItemById,
  updateOrderStatus,
  findManyOrderItem,
  createOrder
}
