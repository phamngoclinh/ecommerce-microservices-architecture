import { BaseEntity } from '@libs/common/infrastructure/persistency/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { StockReservationEntity } from './stock-reservation.entity';
import { StockEntity } from './stock.entity';

@Entity('inventory_item')
export class InventoryItemEntity extends BaseEntity {
  @Column({ name: 'product_id', type: 'int', nullable: true })
  productId: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  // Relations
  @OneToMany(() => StockEntity, stock => stock.inventoryItem, { eager: true })
  stocks: StockEntity[];

  @OneToMany(() => StockReservationEntity, reservation => reservation.inventoryItem, {
    eager: true,
  })
  reservations: StockReservationEntity[];
}
