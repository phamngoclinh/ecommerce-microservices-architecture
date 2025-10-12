import { Entity, Column } from 'typeorm';
import { Base } from './base.entity';

enum PaymentMethod {
  PAYPAL = 'PAYPAL',
  MOMO = 'MOMO',
  COD = 'COD',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

@Entity({ name: 'payments' })
export class PaymentEntity extends Base {
  // Đơn hàng liên quan
  @Column({ type: 'int', nullable: false })
  orderId: number;

  // Số tiền thanh toán
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  // Phương thức thanh toán
  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  method: PaymentMethod;

  // Mã giao dịch do bên thứ 3 trả về (PayPal, Momo,...)
  @Column({ type: 'varchar', length: 255, nullable: true })
  transactionId?: string;

  // Trạng thái thanh toán
  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  // Thời điểm thanh toán (khi SUCCESS)
  @Column({ type: 'timestamp', nullable: true })
  paymentTime?: Date;

  // Dữ liệu phản hồi gốc từ cổng thanh toán (JSON)
  @Column({ type: 'json', nullable: true })
  rawResponse?: Record<string, any>;

  // Ghi chú thêm
  @Column({ type: 'varchar', length: 500, nullable: true })
  note?: string;
}
