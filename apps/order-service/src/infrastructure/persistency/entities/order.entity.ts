import { BaseEntity } from '@libs/common/domain/entities/base.entity';
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
  @Column({ name: 'sub_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
  subAmount: number;

  // Discount có thể là phần trăm hoặc số tiền (ví dụ: 10% hoặc 50000)
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  discount: number;

  // Thuế VAT (%)
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  vat: number;

  // Thành tiền sau khi discount (chưa có VAT)
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  amount: number;

  // Tổng tiền cuối cùng (sau VAT)
  @Column({ name: 'total_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalAmount: number;

  // Quan hệ 1-nhiều với các OrderItem
  @OneToMany(() => OrderItemEntity, item => item.order, {
    cascade: true,
    eager: true,
  })
  orderItems: OrderItemEntity[];

  // // --- Hooks để tự tính toán ---
  // @BeforeInsert()
  // @BeforeUpdate()
  // calculateTotals() {
  //   if (this.orderItems && this.orderItems.length > 0) {
  //     // Tổng giá gốc
  //     this.subAmount = this.orderItems.reduce(
  //       (sum, item) => sum + item.unitPrice * item.quantity,
  //       0,
  //     );
  //   } else {
  //     this.subAmount = 0;
  //   }

  //   // Giảm giá có thể là phần trăm (nếu nhỏ hơn 1) hoặc giá trị tuyệt đối
  //   let discountValue = this.discount;
  //   if (this.discount < 1) {
  //     discountValue = this.subAmount * this.discount; // ví dụ discount = 0.1 → 10%
  //   }

  //   this.amount = this.subAmount - discountValue;
  //   const vatValue = (this.amount * this.vat) / 100;
  //   this.totalAmount = this.amount + vatValue;
  // }
}
