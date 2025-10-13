import { InventoryItem } from '@inventory/domain/entities/inventory-item.entity';
import { Stock } from '@inventory/domain/entities/stock.entity';
import { InventoryItemEntity } from '../entities/inventory-item.entity';
import { StockEntity } from '../entities/stock.entity';

export class StockPersistencyMapper {
  static toEntity(stock: Stock): StockEntity {
    const entity = new StockEntity();
    if (stock.id) entity.id = stock.id;
    entity.inventoryItem = {
      id: stock.inventoryItem.id,
      productId: stock.inventoryItem.productId,
      isActive: stock.inventoryItem.isActive,
    } as InventoryItemEntity;
    entity.onHandQty = stock.onHandQty;
    entity.reservedQty = stock.reservedQty;
    entity.availableQty = stock.availableQty;
    return entity;
  }

  static toDomain(stock: StockEntity): Stock {
    return new Stock(
      stock.id,
      {
        id: stock.inventoryItem.id,
        productId: stock.inventoryItem.productId,
        isActive: stock.inventoryItem.isActive,
      } as InventoryItem,
      stock.onHandQty,
      stock.reservedQty,
      stock.availableQty,
    );
  }
}
