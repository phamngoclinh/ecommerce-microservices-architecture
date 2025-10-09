enum STOCK_STATUS {
  IN_STOCK = 'IN_STOCK',
  LOW_STOCK = 'LOW_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export interface InventoryDto {
  id: number;
  product: { id: number };
  quantity: number;
  supplier?: { id: number };
  warehouseId?: { id: number };
  reorderLevel: number;
  status: STOCK_STATUS;
}
