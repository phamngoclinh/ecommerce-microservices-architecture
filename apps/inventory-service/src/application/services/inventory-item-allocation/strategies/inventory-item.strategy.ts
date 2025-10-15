import { InventoryItem } from '@inventory/domain/entities/inventory-item.entity';

export interface InventoryItemAllocationContext {
  inventoryItems: InventoryItem[];
}

export abstract class InventoryItemAllocationStrategy {
  abstract allocate(input: InventoryItemAllocationContext): InventoryItem;
}
