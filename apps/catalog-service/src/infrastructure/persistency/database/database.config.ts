import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('CATALOG_DB_DATABASE'),
        entities: [path.join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
        synchronize: process.env.NODE_ENV === 'development' ? true : false,
        autoLoadEntities: process.env.NODE_ENV === 'development' ? true : false,
        logging: process.env.NODE_ENV === 'development' ? ['error', 'warn', 'info'] : ['error'],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseConfigModule {}
