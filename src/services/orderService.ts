import { OrderStatus } from '@prisma/client'
import orderRepository from '../repositories/orderRepository.js'
import productRepository from '../repositories/productRepository.js'
import { notFoundError } from '../utils/errorUtils.js'
import clientRepository from '../repositories/clientRepository.js'

async function addToOrder(orderId: number, productId: number, quantity: number) {
  const product = await productRepository.findProductById(productId)
  if (!product) throw notFoundError('Product not found')
  return orderRepository.createOrderItem({
    orderId,
    productId,
    quantity,
    unitPrice: product.price,
    subtotal: product.price * quantity
  })
}

async function removeFromOrder(orderItemId: number) {
  return orderRepository.removeByOrderItemId(orderItemId)
}

async function createOrder(userId: number) {
  const client = await clientRepository.findByUserId(userId)
  if (!client) throw notFoundError('You must register your client details first')
  return orderRepository.createOrder({
    clientId: client.id,
    status: 'Received',
    totalAmount: 0
  })
}
async function updateOrderItemQuantity(orderItemId: number, newQuantity: number) {
  const orderItem = await orderRepository.findOrderItemById(orderItemId)
  if (!orderItem) throw notFoundError('OrderItem not found')
  return orderRepository.updateOrderItemQuantity(orderItemId, newQuantity, orderItem.unitPrice * newQuantity)
}

async function updateOrderStatus(orderId: number, newStatus: OrderStatus) {
  const order = await orderRepository.findById(orderId)
  if (!order) throw notFoundError('Order not found')
  return orderRepository.updateOrderStatus(orderId, newStatus)
}

async function simulatePayment(orderId: number) {
  const isPaymentSuccessful = Math.random() > 0.5
  if (isPaymentSuccessful) {
    await updateOrderStatus(orderId, 'Received')
    await debitStock(orderId)
    return { success: true, message: 'Payment successful and stock debited' }
  } else {
    await updateOrderStatus(orderId, 'Failed')
    return { success: false, message: 'Payment failed' }
  }
}

async function debitStock(orderId: number) {
  const items = await orderRepository.findManyOrderItem(orderId)
  for (const item of items) productRepository.updateStock(item.productId, item.quantity)
}

export default {
  addToOrder,
  removeFromOrder,
  updateOrderItemQuantity,
  updateOrderStatus,
  simulatePayment,
  createOrder
}
