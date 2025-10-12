import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.config';
import { PersistencyProviders } from './persistency.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/order-item.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([CartEntity, OrderEntity, OrderItemEntity])],
  providers: [...PersistencyProviders],
  exports: [...PersistencyProviders],
})
export class PersistencyModule {}
