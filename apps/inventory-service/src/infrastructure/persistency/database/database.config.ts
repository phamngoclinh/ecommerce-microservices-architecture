import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryItemEntity } from '../entities/inventory-item.entity';
import { StockReservationEntity } from '../entities/stock-reservation.entity';
import { StockEntity } from '../entities/stock.entity';

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
