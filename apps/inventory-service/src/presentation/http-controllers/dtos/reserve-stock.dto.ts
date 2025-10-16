export interface ReserveStockDto {
  orderId: number;
  items: { inventoryItemId: number; quantity: number }[];
}
