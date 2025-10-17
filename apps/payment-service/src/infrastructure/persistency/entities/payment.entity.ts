import { DecimalTransformer } from '@libs/common/infrastructure/adapters/orm/decimal-transformer.adapter';
import { BaseEntity } from '@libs/common/infrastructure/persistency/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { PaymentMethodEntity } from './payment-method.entity';
import { PaymentTransactionEntity } from './payment-transaction.entity';

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

@Entity('payments')
export class PaymentEntity extends BaseEntity {
  @Column()
  orderId: number; // ID của đơn hàng tương ứng (lấy từ Order service)

  @ManyToOne(() => PaymentMethodEntity, method => method.payments)
  @JoinColumn({ name: 'method_id' })
  method: PaymentMethodEntity;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Column({ type: 'decimal', precision: 15, scale: 2, transformer: DecimalTransformer })
  amount: number;

  @Column({ nullable: true })
  currency: string;

  @Column({ name: 'transaction_id', nullable: true })
  transactionId?: string; // Mã giao dịch từ cổng thanh toán

  @OneToMany(() => PaymentTransactionEntity, tx => tx.payment, { cascade: true })
  transactions: PaymentTransactionEntity[];
}
