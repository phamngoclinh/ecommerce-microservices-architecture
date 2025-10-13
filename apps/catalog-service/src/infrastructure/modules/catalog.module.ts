import { CreateProductUseCase } from '@catalog/application/use-cases/products/create-product.usecase';
import { GetProductUseCase } from '@catalog/application/use-cases/products/get-product.usecase';
import { GetProductsUseCase } from '@catalog/application/use-cases/products/get-products.usecase';
import { CatalogController } from '@catalog/presentation/controllers/catalog.controller';
import { Module } from '@nestjs/common';
import { PersistencyModule } from '../persistency/persistency.module';

@Module({
  imports: [PersistencyModule],
  controllers: [CatalogController],
  providers: [CreateProductUseCase, GetProductsUseCase, GetProductUseCase],
})
export class CatalogModule {}

// import { Module } from '@nestjs/common';
// @Module({
//   imports: [],
//   controllers: [],
//   providers: [],
// })
// export class CatalogModule {}
