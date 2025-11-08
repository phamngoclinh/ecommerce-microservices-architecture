import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigModule } from './database/database.config';
import { InventoryItemEntity } from './entities/inventory-item.entity';
import { StockReservationEntity } from './entities/stock-reservation.entity';
import { StockEntity } from './entities/stock.entity';
import { InventoryPersistencyProviders } from './persistency.providers';

@Module({
  imports: [
    DatabaseConfigModule,
    TypeOrmModule.forFeature([StockEntity, StockReservationEntity, InventoryItemEntity]),
  ],
  providers: [...InventoryPersistencyProviders],
  exports: [...InventoryPersistencyProviders],
})
export class PersistencyModule {}
