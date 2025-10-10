import { Module } from '@nestjs/common';
import { OrderServiceController } from './order-service.controller';
import { OrderServiceService } from './order-service.service';
import { DatabaseModule } from '@libs/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '@libs/database/entities/order.entity';
import { OrderItemEntity } from '@libs/database/entities/order-item.entity';
import { OrderRepository } from './repositories/order.repository';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([OrderEntity, OrderItemEntity])],
  controllers: [OrderServiceController],
  providers: [OrderRepository, OrderServiceService],
})
export class OrderServiceModule {}
