import { Request, Response } from 'express'
import orderService from '../services/orderService.js'

async function createOrder(req: Request, res: Response) {
  const userId = res.locals.user.id
  const order = await orderService.createOrder(userId)
  res.status(200).send(order)
}

async function addItemToOrder(req: Request, res: Response) {
  const { orderId, productId, quantity } = req.body
  const item = await orderService.addToOrder(orderId, productId, quantity)
  res.status(200).send(item)
}

async function removeItemFromOrder(req: Request, res: Response) {
  const { orderItemId } = req.params
  await orderService.removeFromOrder(Number(orderItemId))
  res.status(204).send()
}

async function updateItemQuantity(req: Request, res: Response) {
  const { orderItemId } = req.params
  const { newQuantity } = req.body
  const updatedItem = await orderService.updateOrderItemQuantity(Number(orderItemId), newQuantity)
  res.status(200).send(updatedItem)
}

async function simulatePayment(req: Request, res: Response) {
  const { orderId } = req.params
  const result = await orderService.simulatePayment(Number(orderId))
  res.status(200).send(result)
}

async function updateOrderStatus(req: Request, res: Response) {
  const { orderId } = req.params
  const { newStatus } = req.body
  const updatedOrder = await orderService.updateOrderStatus(Number(orderId), newStatus)
  res.status(200).send(updatedOrder)
}

export default {
  addItemToOrder,
  removeItemFromOrder,
  updateItemQuantity,
  simulatePayment,
  updateOrderStatus,
  createOrder
}
