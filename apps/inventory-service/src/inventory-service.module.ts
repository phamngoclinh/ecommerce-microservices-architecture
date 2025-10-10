import { Module } from '@nestjs/common';
import { InventoryServiceController } from './inventory-service.controller';
import { InventoryServiceService } from './inventory-service.service';
import { DatabaseModule } from '@libs/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@libs/database/entities/product.entity';
import { InventoryEntity } from '@libs/database/entities/inventory.entity';
import { SupplierEntity } from '@libs/database/entities/supplier.entity';
import { WarehouseEntity } from '@libs/database/entities/warehouse.entity';
import { InventoryRepository } from './repositories/inventory.repository';
import { WarehouseRepository } from './repositories/warehouse.repository';
import { SupplierRepository } from './repositories/supplier.repository';
import { ProductRepository } from './repositories/product.repository';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([ProductEntity, InventoryEntity, SupplierEntity, WarehouseEntity]),
  ],
  controllers: [InventoryServiceController],
  providers: [
    ProductRepository,
    SupplierRepository,
    WarehouseRepository,
    InventoryRepository,
    InventoryServiceService,
  ],
})
export class InventoryServiceModule {}
