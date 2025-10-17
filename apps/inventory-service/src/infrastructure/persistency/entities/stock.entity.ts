import { DecimalTransformer } from '@libs/common/infrastructure/adapters/orm/decimal-transformer.adapter';
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
    type: 'decimal',
    precision: 18,
    scale: 4,
    default: 0,
    transformer: DecimalTransformer,
  })
  onHandQty: number;

  // So luong hang dang duoc dat
  @Column({
    name: 'reserved_qty',
    type: 'decimal',
    precision: 18,
    scale: 4,
    default: 0,
    transformer: DecimalTransformer,
  })
  reservedQty: number;

  // So luong hang dang kha thi
  @Column({
    name: 'available_qty',
    type: 'decimal',
    precision: 18,
    scale: 4,
    default: 0,
    transformer: DecimalTransformer,
  })
  availableQty: number;
}
