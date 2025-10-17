import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.config';
import { PaymentMethodEntity } from './entities/payment-method.entity';
import { PaymentTransactionEntity } from './entities/payment-transaction.entity';
import { PaymentEntity } from './entities/payment.entity';
import { RefundEntity } from './entities/refund.entity';
import { PersistencyProviders } from './persistency.provider';

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
  providers: [...PersistencyProviders],
  exports: [...PersistencyProviders],
})
export class PersistencyModule {}
