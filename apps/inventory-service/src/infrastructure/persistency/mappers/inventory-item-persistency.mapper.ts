import { InventoryItem } from '@inventory/domain/entities/inventory-item.entity';
import { InventoryItemEntity } from '../entities/inventory-item.entity';
import { StockPersistencyMapper } from './stock-persistency.mapper';
import { StockReservationPersistencyMapper } from './stock-reservation-persistency.mapper';

export class InventoryItemPersistencyMapper {
  static toEntity(inventoryItem: InventoryItem): InventoryItemEntity {
    const entity = new InventoryItemEntity();
    if (inventoryItem.id) entity.id = inventoryItem.id;
    entity.productId = inventoryItem.productId;
    entity.isActive = inventoryItem.isActive;
    return entity;
  }

  static toDomain(inventoryItem: InventoryItemEntity): InventoryItem {
    return new InventoryItem(
      inventoryItem.id,
      inventoryItem.productId,
      inventoryItem.isActive,
      inventoryItem.stocks.map(stock => StockPersistencyMapper.toDomain(stock)),
      inventoryItem.reservations.map(reservation =>
        StockReservationPersistencyMapper.toDomain(reservation),
      ),
    );
  }
}
