import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from 'apps/order-service/src/carts/entities/cart.entity';
import { OrderItemEntity } from 'apps/order-service/src/orders/entities/order-item.entity';
import { OrderEntity } from 'apps/order-service/src/orders/entities/order.entity';
import { DatabaseService } from './database.service';
import { InventoryEntity } from './entities/inventory.entity';
import { PaymentEntity } from './entities/payment.entity';
import { ProductEntity } from './entities/product.entity';
import { SupplierEntity } from './entities/supplier.entity';
import { WarehouseEntity } from './entities/warehouse.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'monorepo_db',
      entities: [
        CartEntity,
        ProductEntity,
        OrderEntity,
        OrderItemEntity,
        InventoryEntity,
        SupplierEntity,
        WarehouseEntity,
        PaymentEntity,
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
