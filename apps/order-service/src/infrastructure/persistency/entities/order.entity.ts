import { DecimalTransformer } from '@libs/common/infrastructure/adapters/orm/decimal-transformer.adapter';
import { BaseEntity } from '@libs/common/infrastructure/persistency/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  COMPLETED = 'COMPLETED',
}

@Entity({ name: 'orders' })
export class OrderEntity extends BaseEntity {
  // Trạng thái
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  // Tổng giá trị gốc của các sản phẩm
  @Column({
    name: 'sub_amount',
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
    transformer: DecimalTransformer,
  })
  subAmount: number;

  // Discount có thể là phần trăm hoặc số tiền (ví dụ: 10% hoặc 50000)
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, transformer: DecimalTransformer })
  discount: number;

  // Thuế VAT (%)
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, transformer: DecimalTransformer })
  vat: number;

  // Thành tiền sau khi discount (chưa có VAT)
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0, transformer: DecimalTransformer })
  amount: number;

  // Tổng tiền cuối cùng (sau VAT)
  @Column({
    name: 'total_amount',
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
    transformer: DecimalTransformer,
  })
  totalAmount: number;

  // Quan hệ 1-nhiều với các OrderItem
  @OneToMany(() => OrderItemEntity, item => item.order, {
    cascade: true,
    eager: true,
  })
  orderItems: OrderItemEntity[];
}
