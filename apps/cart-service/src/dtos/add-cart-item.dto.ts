export interface AddCartItemDto {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineAmount: number;
}
