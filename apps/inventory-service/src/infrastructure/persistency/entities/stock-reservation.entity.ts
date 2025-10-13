import { BaseEntity } from '@libs/common/domain/entities/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { InventoryItemEntity } from './inventory-item.entity';

export enum StockReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  RELEASED = 'RELEASED',
  CANCELLED = 'CANCELLED',
}

@Entity('stock_reservation')
@Index(['inventoryItem'])
export class StockReservationEntity extends BaseEntity {
  @ManyToOne(() => InventoryItemEntity, item => item.reservations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'inventory_item_id' })
  inventoryItem: InventoryItemEntity;

  @Column({ name: 'order_id', type: 'int', nullable: true })
  orderId: number;

  @Column({ name: 'reserved_qty', type: 'decimal', precision: 18, scale: 4 })
  reservedQty: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: StockReservationStatus,
    default: StockReservationStatus.PENDING,
  })
  status: StockReservationStatus;

  @Column({ name: 'reserved_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  reservedAt: Date;

  @Column({ name: 'expired_at', type: 'timestamp', nullable: true })
  expiredAt?: Date;

  @Column({ name: 'released_at', type: 'timestamp', nullable: true })
  releasedAt?: Date;
}
