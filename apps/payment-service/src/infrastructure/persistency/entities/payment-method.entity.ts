import { BaseEntity } from '@libs/common/infrastructure/persistency/entities/base.entity';
import { PaymentProvider } from '@payment/domain/entities/payment-method.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PaymentEntity } from './payment.entity';

@Entity('payment_methods')
export class PaymentMethodEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: PaymentProvider,
  })
  provider: PaymentProvider;

  @Column({ name: 'display_name', type: 'varchar', nullable: false })
  displayName: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => PaymentEntity, payment => payment.method)
  payments: PaymentEntity[];
}
