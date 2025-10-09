import { Entity, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { OrderItem } from './order-item.entity';

@Entity({ name: 'orders' })
export class Order extends Base {
  // Tổng giá trị gốc của các sản phẩm
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
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
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalAmount: number;

  // Quan hệ 1-nhiều với các OrderItem
  @OneToMany(() => OrderItem, item => item.order, {
    cascade: true,
    eager: true,
  })
  orderItems: OrderItem[];

  // --- Hooks để tự tính toán ---
  @BeforeInsert()
  @BeforeUpdate()
  calculateTotals() {
    if (this.orderItems && this.orderItems.length > 0) {
      // Tổng giá gốc
      this.subAmount = this.orderItems.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0,
      );
    } else {
      this.subAmount = 0;
    }

    // Giảm giá có thể là phần trăm (nếu nhỏ hơn 1) hoặc giá trị tuyệt đối
    let discountValue = this.discount;
    if (this.discount < 1) {
      discountValue = this.subAmount * this.discount; // ví dụ discount = 0.1 → 10%
    }

    this.amount = this.subAmount - discountValue;
    const vatValue = (this.amount * this.vat) / 100;
    this.totalAmount = this.amount + vatValue;
  }
}
