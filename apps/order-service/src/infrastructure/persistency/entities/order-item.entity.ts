import { DecimalTransformer } from '@libs/common/infrastructure/adapters/orm/decimal-transformer.adapter';
import { BaseEntity } from '@libs/common/domain/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity({ name: 'order_items' })
export class OrderItemEntity extends BaseEntity {
  @ManyToOne(() => OrderEntity, order => order.orderItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @Column({ name: 'inventory_item_id', type: 'int', nullable: false })
  inventoryItemId: number;

  @Column({ name: 'product_id', type: 'int', nullable: false })
  productId: number;

  @Column({ name: 'product_name', type: 'varchar', nullable: false })
  productName: string;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({
    name: 'unit_price',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: false,
    transformer: DecimalTransformer,
  })
  unitPrice: number;

  // Thành tiền cho dòng này
  @Column({
    name: 'line_amount',
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
    transformer: DecimalTransformer,
  })
  lineAmount: number;

  // // Hook để tính thành tiền mỗi item
  // @BeforeInsert()
  // @BeforeUpdate()
  // calculateLineAmount() {
  //   this.lineAmount = this.unitPrice * this.quantity;
  // }
}
