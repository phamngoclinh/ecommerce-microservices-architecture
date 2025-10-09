export interface CreateStockDto {
  productId: number;
  quantity: number;
  supplierId?: number;
  warehouseId?: number;
}
