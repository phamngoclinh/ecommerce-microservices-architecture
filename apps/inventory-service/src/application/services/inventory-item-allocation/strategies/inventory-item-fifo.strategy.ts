import { InventoryItem } from '@inventory/domain/entities/inventory-item.entity';
import {
  InventoryItemAllocationContext,
  InventoryItemAllocationStrategy,
} from './inventory-item.strategy';

export class InventoryItemFifoStrategy extends InventoryItemAllocationStrategy {
  allocate({ inventoryItems }: InventoryItemAllocationContext): InventoryItem {
    const allocated = inventoryItems.sort(
      (a, b) => (a.createdAt?.getTime() ?? 0) - (b.createdAt?.getTime() ?? 0),
    )[0];
    return allocated;
  }
}
