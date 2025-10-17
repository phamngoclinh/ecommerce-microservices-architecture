export interface CreateOrderEvent {
  id: number;
  orderItems: { inventoryItemId: number; quantity: number }[];
}
