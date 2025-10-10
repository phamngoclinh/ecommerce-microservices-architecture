import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/order-item.entity';
import { InventoryEntity } from './entities/inventory.entity';
import { SupplierEntity } from './entities/supplier.entity';
import { WarehouseEntity } from './entities/warehouse.entity';
import { PaymentEntity } from './entities/payment.entity';

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
