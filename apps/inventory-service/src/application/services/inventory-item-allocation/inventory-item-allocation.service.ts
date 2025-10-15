import { InventoryItemAllocationFactory } from './factories/inventory-item-allocation.factory';
import { InventoryItemAllocationStrategy } from './strategies/inventory-item.strategy';
import { InventoryItem } from '@inventory/domain/entities/inventory-item.entity';

export class InventoryItemAllocationService {
  private strategy: InventoryItemAllocationStrategy;

  constructor() {
    this.strategy = new InventoryItemAllocationFactory().create();
  }

  allocate(inventoryItems: InventoryItem[]): { inventoryItemId: number } {
    const selected = this.strategy.allocate({ inventoryItems });
    return { inventoryItemId: selected.id as number };
  }
}
