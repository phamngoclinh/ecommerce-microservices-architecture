import { InventoryItem } from '@inventory/domain/entities/inventory-item.entity';
import { StockReservation } from '@inventory/domain/entities/stock-reservation.entity';
import { Stock } from '@inventory/domain/entities/stock.entity';
import { InventoryItemEntity } from '../entities/inventory-item.entity';

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
      inventoryItem.stocks.map(
        stock =>
          new Stock(
            stock.id,
            {
              id: inventoryItem.id,
              productId: inventoryItem.productId,
              isActive: inventoryItem.isActive,
            } as InventoryItem,
            stock.onHandQty,
            stock.reservedQty,
            stock.availableQty,
          ),
      ),
      inventoryItem.reservations.map(
        reservation =>
          new StockReservation(
            reservation.id,
            {
              id: inventoryItem.id,
              productId: inventoryItem.productId,
              isActive: inventoryItem.isActive,
            } as InventoryItem,
            reservation.orderId,
            reservation.reservedQty,
            reservation.status,
            reservation.reservedAt,
            reservation.expiredAt,
            reservation.releasedAt,
          ),
      ),
    );
  }
}
