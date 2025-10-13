export interface CreateOrderItemDto {
  orderId: number;
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
}

export interface CreateOrderDto {
  orderItems: CreateOrderItemDto[];
  discount?: number;
  vat?: number;
  paymentMethod: string;
}
