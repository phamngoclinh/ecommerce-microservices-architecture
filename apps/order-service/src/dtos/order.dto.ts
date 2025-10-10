import type { ProductDto } from '@libs/common/dtos/product.dto';

interface OrderItemDto {
  id: number;
  product: ProductDto;
  quantity: number;
  unitPrice: number;
  lineAmount: number;
}

export interface OrderDto {
  id: number;
  orderItems: OrderItemDto[];
  subAmount: number;
  discount?: number;
  amount: number;
  vat?: number;
  totalAmount: number;
}
