export interface CreatedOrderEvent {
  id: number;
  orderItems: { inventoryItemId: number; quantity: number }[];
}
