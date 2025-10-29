import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethodEntity } from '../entities/payment-method.entity';
import { PaymentTransactionEntity } from '../entities/payment-transaction.entity';
import { PaymentEntity } from '../entities/payment.entity';
import { RefundEntity } from '../entities/refund.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('PAYMENT_DB_DATABASE'),
        entities: [PaymentEntity, PaymentTransactionEntity, PaymentMethodEntity, RefundEntity],
        synchronize: process.env.NODE_ENV === 'development' ? true : false,
        autoLoadEntities: process.env.NODE_ENV === 'development' ? true : false,
        logging: process.env.NODE_ENV === 'development' ? ['error', 'warn', 'info'] : ['error'],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
