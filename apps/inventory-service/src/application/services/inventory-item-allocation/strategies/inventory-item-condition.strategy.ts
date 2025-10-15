import { InventoryItem } from '@inventory/domain/entities/inventory-item.entity';
import {
  InventoryItemAllocationStrategy,
  InventoryItemAllocationContext,
} from './inventory-item.strategy';

export class InventoryItemConditionStrategy extends InventoryItemAllocationStrategy {
  allocate({ inventoryItems }: InventoryItemAllocationContext): InventoryItem {
    // Process conditions here to choose one inventory items
    // Example: isActive: true
    // const filterd = inventoryItems.filter(inventoryItem => inventoryItem.isActive);

    return inventoryItems[0];
  }
}
