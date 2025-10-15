import { InventoryItemFifoStrategy } from '../strategies/inventory-item-fifo.strategy';
import { InventoryItemConditionStrategy } from '../strategies/inventory-item-condition.strategy';

export class InventoryItemAllocationFactory {
  create(strategy = 'FIFO') {
    switch (strategy) {
      case 'FIFO':
        return new InventoryItemFifoStrategy();
      case 'CONDITION':
        return new InventoryItemConditionStrategy();
      default:
        return new InventoryItemFifoStrategy();
    }
  }
}
