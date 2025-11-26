import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('INVENTORY_DB_HOST'),
        port: Number(configService.get<string>('INVENTORY_DB_PORT')),
        username: configService.get<string>('INVENTORY_DB_USER'),
        password: configService.get<string>('INVENTORY_DB_PASSWORD'),
        database: configService.get<string>('INVENTORY_DB_DATABASE'),
        schema: configService.get<string>('INVENTORY_DB_SCHEMA') || 'public',
        entities: [path.join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
        logging: process.env.NODE_ENV === 'development' ? ['error', 'warn', 'info'] : ['error'],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseConfigModule {}
