import { Entity, Column, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';
import { Base } from './base.entity';

@Entity({ name: 'order_items' })
export class OrderItem extends Base {
  @ManyToOne(() => Order, order => order.orderItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  unitPrice: number;

  // Thành tiền cho dòng này
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  lineAmount: number;

  // Hook để tính thành tiền mỗi item
  @BeforeInsert()
  @BeforeUpdate()
  calculateLineAmount() {
    this.lineAmount = this.unitPrice * this.quantity;
  }
}
