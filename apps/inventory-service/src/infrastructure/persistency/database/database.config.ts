import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryItemEntity } from '../entities/inventory-item.entity';
import { StockReservationEntity } from '../entities/stock-reservation.entity';
import { StockEntity } from '../entities/stock.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('INVENTORY_DB_DATABASE'),
        entities: [StockEntity, StockReservationEntity, InventoryItemEntity],
        synchronize: process.env.NODE_ENV === 'development' ? true : false,
        autoLoadEntities: process.env.NODE_ENV === 'development' ? true : false,
        logging: process.env.NODE_ENV === 'development' ? ['error', 'warn', 'info'] : ['error'],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseConfigModule {}
