export interface AddCartItemDto {
  productId: number;
  productName?: string;
  unitPrice: number;
  quantity: number;
}
