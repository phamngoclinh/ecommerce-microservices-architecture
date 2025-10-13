import { Module } from '@nestjs/common';
import { DatabaseConfigModule } from './database/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { CatalogPersistencyProviders } from './persistency.providers';

@Module({
  imports: [DatabaseConfigModule, TypeOrmModule.forFeature([ProductEntity])],
  controllers: [],
  providers: [...CatalogPersistencyProviders],
  exports: [...CatalogPersistencyProviders],
})
export class PersistencyModule {}
