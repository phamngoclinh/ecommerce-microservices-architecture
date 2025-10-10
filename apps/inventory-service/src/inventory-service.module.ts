import { ProductRepository } from '@libs/common/repositories/product.repository';
import { DatabaseModule } from '@libs/database';
import { InventoryEntity } from '@libs/database/entities/inventory.entity';
import { ProductEntity } from '@libs/database/entities/product.entity';
import { SupplierEntity } from '@libs/database/entities/supplier.entity';
import { WarehouseEntity } from '@libs/database/entities/warehouse.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryServiceController } from './inventory-service.controller';
import { InventoryServiceService } from './inventory-service.service';
import { InventoryRepository } from './repositories/inventory.repository';
import { SupplierRepository } from './repositories/supplier.repository';
import { WarehouseRepository } from './repositories/warehouse.repository';

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
