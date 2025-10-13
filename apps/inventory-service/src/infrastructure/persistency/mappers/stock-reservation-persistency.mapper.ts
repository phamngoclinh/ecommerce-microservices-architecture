import { StockReservation } from '@inventory/domain/entities/stock-reservation.entity';
import { StockReservationEntity } from '../entities/stock-reservation.entity';
import { InventoryItemEntity } from '../entities/inventory-item.entity';
import { InventoryItem } from '@inventory/domain/entities/inventory-item.entity';

export class StockReservationPersistencyMapper {
  static toEntity(stockReservation: StockReservation): StockReservationEntity {
    const entity = new StockReservationEntity();
    if (stockReservation.id) entity.id = stockReservation.id;
    entity.orderId = stockReservation.orderId;
    entity.inventoryItem = {
      id: stockReservation.inventoryItem.id,
      productId: stockReservation.inventoryItem.productId,
      isActive: stockReservation.inventoryItem.isActive,
    } as InventoryItemEntity;
    entity.reservedQty = stockReservation.reservedQty;
    entity.status = stockReservation.status;
    entity.releasedAt = stockReservation.releasedAt;
    entity.reservedAt = stockReservation.reservedAt;
    return entity;
  }

  static toDomain(stockReservation: StockReservationEntity): StockReservation {
    return new StockReservation(
      stockReservation.id,
      {
        id: stockReservation.inventoryItem.id,
        productId: stockReservation.inventoryItem.productId,
        isActive: stockReservation.inventoryItem.isActive,
      } as InventoryItem,
      stockReservation.orderId,
      stockReservation.reservedQty,
      stockReservation.status,
      stockReservation.reservedAt,
      stockReservation.expiredAt,
      stockReservation.releasedAt,
    );
  }
}
