import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.config';
import { PaymentMethodEntity } from './entities/payment-method.entity';
import { PaymentTransactionEntity } from './entities/payment-transaction.entity';
import { PaymentEntity } from './entities/payment.entity';
import { RefundEntity } from './entities/refund.entity';
import { PaymentPersistencyProviders } from './persistency.provider';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      PaymentEntity,
      PaymentTransactionEntity,
      PaymentMethodEntity,
      RefundEntity,
    ]),
  ],
  providers: [...PaymentPersistencyProviders],
  exports: [...PaymentPersistencyProviders],
})
export class PersistencyModule {}
