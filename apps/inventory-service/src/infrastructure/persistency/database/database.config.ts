import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from '../entities/stock.entity';
import { StockReservationEntity } from '../entities/stock-reservation.entity';
import { InventoryItemEntity } from '../entities/inventory-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'inventory_user',
      password: 'inventory_password',
      database: 'inventory_db',
      entities: [StockEntity, StockReservationEntity, InventoryItemEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseConfigModule {}
