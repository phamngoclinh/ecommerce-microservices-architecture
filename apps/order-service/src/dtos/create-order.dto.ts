export interface CreateOrderItemDto {
  orderId?: number;
  productId: number;
  quantity: number;
  unitPrice: number;
}

export interface CreateOrderDto {
  orderItems: CreateOrderItemDto[];
  discount?: number;
  vat?: number;
  paymentMethod: string;
}
