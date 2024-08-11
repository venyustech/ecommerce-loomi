export type ReportPayload = {
  startDate: Date
  endDate: Date
  userId: number
}

export type ReportData = {
  productId: number
  quantity: number
  subtotal: number
  productName: string
  description: string
  price: number
  category: string
  color: string
  stockQuantity: number
  createdAt: Date
  updatedAt: Date
}
