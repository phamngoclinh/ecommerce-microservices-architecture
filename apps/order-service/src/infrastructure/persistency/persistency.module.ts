import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.config';
import { CartEntity } from './entities/cart.entity';
import { OrderItemEntity } from './entities/order-item.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderPersistencyProviders } from './persistency.provider';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([CartEntity, OrderEntity, OrderItemEntity])],
  providers: [...OrderPersistencyProviders],
  exports: [...OrderPersistencyProviders],
})
export class PersistencyModule {}
