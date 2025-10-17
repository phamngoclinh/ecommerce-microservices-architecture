import { BaseEntity } from '@libs/common/infrastructure/persistency/entities/base.entity';
import { TransactionType } from '@payment/domain/entities/payment-transaction.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PaymentEntity } from './payment.entity';

@Entity('payment_transactions')
export class PaymentTransactionEntity extends BaseEntity {
  @ManyToOne(() => PaymentEntity, payment => payment.transactions)
  payment: PaymentEntity;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column({ type: 'json', nullable: true })
  payload?: Record<string, any>; // dữ liệu gửi hoặc nhận

  @Column({ name: 'external_txn_id', nullable: true })
  externalTxnId?: string; // Mã giao dịch từ bên thứ ba

  @Column({ nullable: true })
  message?: string; // Mô tả lỗi hoặc log
}
