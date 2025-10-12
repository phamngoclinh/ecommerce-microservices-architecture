export enum OrderStatusDto {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  COMPLETED = 'COMPLETED',
}

export interface OrderItemDto {
  id: number;
  productId: number;
  productName?: string;
  quantity: number;
  unitPrice: number;
  lineAmount: number;
}

export interface OrderDto {
  id: number;
  orderItems: OrderItemDto[];
  status: OrderStatusDto;
  subAmount: number;
  discount?: number;
  amount: number;
  vat?: number;
  totalAmount: number;
  createdAt: Date;
}
