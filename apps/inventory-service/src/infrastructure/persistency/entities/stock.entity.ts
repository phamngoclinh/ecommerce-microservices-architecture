import { BaseEntity } from '@libs/common/infrastructure/persistency/entities/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { InventoryItemEntity } from './inventory-item.entity';

@Entity('stock')
@Index(['inventoryItem'], { unique: true })
export class StockEntity extends BaseEntity {
  @ManyToOne(() => InventoryItemEntity, item => item.stocks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'inventory_item_id' })
  inventoryItem: InventoryItemEntity;

  // So luong hang thuc te
  @Column({
    name: 'on_hand_qty',
    type: 'float',
    default: 0,
  })
  onHandQty: number;

  // So luong hang dang duoc dat
  @Column({
    name: 'reserved_qty',
    type: 'float',
    default: 0,
  })
  reservedQty: number;

  // So luong hang dang kha thi
  @Column({
    name: 'available_qty',
    type: 'float',
    default: 0,
  })
  availableQty: number;
}
