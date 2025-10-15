import { InventoryItem } from '../entities/inventory-item.entity';

export abstract class IInventoryItemRepository {
  abstract getInventoryItem(id: number): Promise<InventoryItem | null>;
  abstract getInventoryItemByProductId(productId: number): Promise<InventoryItem | null>;
  abstract getInventoryItemsByProductId(productId: number): Promise<InventoryItem[]>;
  abstract getInventoryItemsByProductIds(productId: number[]): Promise<InventoryItem[]>;
  abstract saveInventoryItem(inventoryItem: InventoryItem): Promise<InventoryItem>;
}
