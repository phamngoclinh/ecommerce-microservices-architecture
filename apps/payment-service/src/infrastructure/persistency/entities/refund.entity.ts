import { DecimalTransformer } from '@libs/common/infrastructure/adapters/orm/decimal-transformer.adapter';
import { BaseEntity } from '@libs/common/infrastructure/persistency/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PaymentEntity } from './payment.entity';

@Entity('refunds')
export class RefundEntity extends BaseEntity {
  @ManyToOne(() => PaymentEntity)
  payment: PaymentEntity;

  @Column({ type: 'decimal', precision: 15, scale: 2, transformer: DecimalTransformer })
  amount: number;

  @Column({ nullable: true })
  reason?: string;

  @Column({ name: 'external_refund_id', nullable: true })
  externalRefundId?: string;
}
