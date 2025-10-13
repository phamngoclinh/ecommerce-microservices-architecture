enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  COMPLETED = 'COMPLETED',
}

export interface OrderItemResponse {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineAmount: number;
}

export interface OrderResponse {
  id: number;
  orderItems: OrderItemResponse[];
  status: OrderStatus;
  subAmount: number;
  discount?: number;
  amount: number;
  vat?: number;
  totalAmount: number;
  createdDate: Date;
}
