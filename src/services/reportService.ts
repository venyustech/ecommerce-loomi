import path from 'path'
import { promises as fs } from 'fs'
import orderRepository from '../repositories/orderRepository.js'
import productRepository from '../repositories/productRepository.js'
import { ReportData } from '../types/report.js'
import { createObjectCsvWriter } from 'csv-writer'
import { Product } from '@prisma/client'
import { OrderItemGrouped } from '../types/order.js'

async function generateReport({ startDatePayload, endDatePayload, userId }) {
  const startDate = assembleDate(startDatePayload)
  const endDate = assembleDate(endDatePayload, true)
  const products = await productRepository.findProductsByOwnerId(userId)
  const productIds = products.map((product) => product.id)
  const orderData = await orderRepository.findOrdersByProductIdGroup(startDate, endDate, productIds)
  const reportData = await assembleReportData(products, orderData)

  return exportReportToCSV(reportData)
}

export default {
  generateReport
}

function assembleDate(datePayload: string | undefined, isEndDate: boolean = false): Date {
  const today = new Date()
  if (datePayload) return new Date(datePayload)
  if (isEndDate) return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
  return new Date(today.getFullYear(), today.getMonth(), today.getDate())
}

async function assembleReportData(products: Product[], orderData: OrderItemGrouped[]): Promise<ReportData[]> {
  return orderData.map((order) => {
    const productDetail = products.find((product) => product.id === order.productId)
    return {
      productId: order.productId,
      quantity: order._sum.quantity,
      subtotal: order._sum.subtotal,
      productName: productDetail?.name,
      description: productDetail?.description,
      price: productDetail?.price,
      category: productDetail?.category,
      color: productDetail?.color,
      stockQuantity: productDetail?.stockQuantity,
      createdAt: productDetail?.createdAt,
      updatedAt: productDetail?.updatedAt
    }
  })
}

async function exportReportToCSV(reportData: ReportData[]) {
  const today = new Date()
  const filePath = `Downloads/report-${today}.csv`

  await ensureDirectoryExists(filePath)
  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: [
      { id: 'productId', title: 'Product ID' },
      { id: 'quantity', title: 'Quantity' },
      { id: 'subtotal', title: 'Subtotal' },
      { id: 'productName', title: 'Product Name' },
      { id: 'description', title: 'Description' },
      { id: 'price', title: 'Price' },
      { id: 'category', title: 'Category' },
      { id: 'color', title: 'Color' },
      { id: 'stockQuantity', title: 'Stock Quantity' },
      { id: 'createdAt', title: 'Created At' },
      { id: 'updatedAt', title: 'Updated At' }
    ]
  })
  await csvWriter.writeRecords(reportData)
  return filePath
}

async function ensureDirectoryExists(filePath: string) {
  const dir = path.dirname(filePath)
  try {
    await fs.access(dir)
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(dir, { recursive: true })
    } else {
      throw error
    }
  }
}
