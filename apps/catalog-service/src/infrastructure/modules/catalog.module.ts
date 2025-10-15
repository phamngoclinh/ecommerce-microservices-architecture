import { CreateProductUseCase } from '@catalog/application/usecases/products/create-product.usecase';
import { GetProductUseCase } from '@catalog/application/usecases/products/get-product.usecase';
import { GetProductsUseCase } from '@catalog/application/usecases/products/get-products.usecase';
import { CatalogController } from '@catalog/presentation/controllers/catalog.controller';
import { Module } from '@nestjs/common';
import { PersistencyModule } from '../persistency/persistency.module';
import { IProductRepository } from '@catalog/domain/repositories/product.repository';
import { IInventoryGateway } from '@catalog/application/ports/inventory.gateway';
import { InventoryHttpModule } from '../gateways/inventory-http.module';

@Module({
  imports: [PersistencyModule, InventoryHttpModule],
  controllers: [CatalogController],
  providers: [
    {
      provide: CreateProductUseCase,
      useFactory: (productsRepository: IProductRepository, inventoryGateway: IInventoryGateway) => {
        return new CreateProductUseCase(productsRepository, inventoryGateway);
      },
      inject: [IProductRepository, 'IInventoryGateway'],
    },
    {
      provide: GetProductsUseCase,
      useFactory: (productsRepository: IProductRepository) => {
        return new GetProductsUseCase(productsRepository);
      },
      inject: [IProductRepository],
    },
    {
      provide: GetProductUseCase,
      useFactory: (productsRepository: IProductRepository) => {
        return new GetProductUseCase(productsRepository);
      },
      inject: [IProductRepository],
    },
  ],
})
export class CatalogModule {}
