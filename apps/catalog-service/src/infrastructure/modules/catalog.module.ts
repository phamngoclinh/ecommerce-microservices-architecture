import { CreateProductHandler } from '@catalog/application/usecases/handlers/create-product.handler';
import { SendCreatedProductEventHandler } from '@catalog/application/usecases/handlers/send-created-product-event.handler';
import { CreateProductUseCase } from '@catalog/application/usecases/products/create-product.usecase';
import { GetProductUseCase } from '@catalog/application/usecases/products/get-product.usecase';
import { GetProductsUseCase } from '@catalog/application/usecases/products/get-products.usecase';
import { IProductRepository } from '@catalog/domain/repositories/product.repository';
import { CatalogController } from '@catalog/presentation/controllers/catalog.controller';
import { EventPublisherService } from '@libs/common/application/ports/event-publisher';
import { RedisClientModule } from '@libs/common/infrastructure/adapters/redis/redis-client.module';
import { RedisClientService } from '@libs/common/infrastructure/adapters/redis/redis-client.service';
import { Module } from '@nestjs/common';
import { PersistencyModule } from '../persistency/persistency.module';

@Module({
  imports: [PersistencyModule, RedisClientModule],
  controllers: [CatalogController],
  providers: [
    //#region usecases
    {
      provide: CreateProductUseCase,
      useFactory: (
        productsRepository: CreateProductHandler,
        inventoryGateway: SendCreatedProductEventHandler,
      ) => {
        return new CreateProductUseCase(productsRepository, inventoryGateway);
      },
      inject: [CreateProductHandler, SendCreatedProductEventHandler],
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
    //#endregion

    //#region handlers
    {
      provide: CreateProductHandler,
      useFactory: (productsRepository: IProductRepository) => {
        return new CreateProductHandler(productsRepository);
      },
      inject: [IProductRepository],
    },
    {
      provide: SendCreatedProductEventHandler,
      useFactory: (redisClient: RedisClientService) => {
        return new SendCreatedProductEventHandler(new EventPublisherService(redisClient));
      },
      inject: [RedisClientService],
    },
    //#endregion
  ],
})
export class CatalogModule {}
