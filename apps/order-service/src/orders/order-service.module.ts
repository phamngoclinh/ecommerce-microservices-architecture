import { DatabaseModule } from '@libs/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemEntity } from './entities/order-item.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderServiceController } from './order-service.controller';
import { OrderServiceService } from './order-service.service';
import { OrderRepository } from './repositories/order.repository';
import { CartModule } from '../carts/cart.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]), CartModule],
  controllers: [OrderServiceController],
  providers: [OrderRepository, OrderServiceService],
})
export class OrderServiceModule {}
