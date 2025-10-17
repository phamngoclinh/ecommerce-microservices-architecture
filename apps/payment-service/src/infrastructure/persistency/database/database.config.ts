import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethodEntity } from '../entities/payment-method.entity';
import { PaymentTransactionEntity } from '../entities/payment-transaction.entity';
import { PaymentEntity } from '../entities/payment.entity';
import { RefundEntity } from '../entities/refund.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'payment_user',
      password: 'payment_password',
      database: 'payment_db',
      entities: [PaymentEntity, PaymentTransactionEntity, PaymentMethodEntity, RefundEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
