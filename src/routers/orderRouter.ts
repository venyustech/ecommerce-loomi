import { Router } from 'express'
import { ensureAuthenticatedMiddleware } from '../middlewares/ensureAuthenticatedMiddleware.js'
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js'
import orderController from '../controllers/orderController.js'
import { createOrderItemSchema, updateOrderItemQuantitySchema } from '../schemas/orderSchemas.js'

const orderRouter = Router()

orderRouter.post('/order/createOrder', ensureAuthenticatedMiddleware, orderController.createOrder)
orderRouter.post(
  '/order/addItem',
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(createOrderItemSchema),
  orderController.addItemToOrder
)
orderRouter.delete('/order/removeItem/:orderItemId', ensureAuthenticatedMiddleware, orderController.removeItemFromOrder)
orderRouter.patch(
  '/order/updateItemQuantity/:orderItemId',
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(updateOrderItemQuantitySchema),
  orderController.updateItemQuantity
)
orderRouter.post('/order/simulatePayment/:orderId', ensureAuthenticatedMiddleware, orderController.simulatePayment)
orderRouter.patch('/order/updateStatus/:orderId', ensureAuthenticatedMiddleware, orderController.updateOrderStatus)

export default orderRouter
