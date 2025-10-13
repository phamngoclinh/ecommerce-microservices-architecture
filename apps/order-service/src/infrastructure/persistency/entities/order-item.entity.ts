import { Base } from '@libs/database/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity({ name: 'order_items' })
export class OrderItemEntity extends Base {
  @ManyToOne(() => OrderEntity, order => order.orderItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @Column({ type: 'int', nullable: false })
  productId: number;

  @Column({ type: 'varchar', nullable: false })
  productName: string;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  unitPrice: number;

  // Thành tiền cho dòng này
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  lineAmount: number;

  // // Hook để tính thành tiền mỗi item
  // @BeforeInsert()
  // @BeforeUpdate()
  // calculateLineAmount() {
  //   this.lineAmount = this.unitPrice * this.quantity;
  // }
}
