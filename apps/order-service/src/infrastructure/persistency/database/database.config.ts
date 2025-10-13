import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from '../entities/cart.entity';
import { OrderItemEntity } from '../entities/order-item.entity';
import { OrderEntity } from '../entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'order_user',
      password: 'order_password',
      database: 'order_db',
      entities: [CartEntity, OrderEntity, OrderItemEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
