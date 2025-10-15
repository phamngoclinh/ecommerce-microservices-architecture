export interface CheckStockDto {
  items: { inventoryItemId: number; quantity: number }[];
}
