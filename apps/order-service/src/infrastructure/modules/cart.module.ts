import { Module } from '@nestjs/common';
import { SnapshotProductFactory } from '@order/application/services/snapshot/snapshot-product.factory';
import { AddCartItemUseCase } from '@order/application/use-cases/carts/add-item.usecase';
import { ClearCartUseCase } from '@order/application/use-cases/carts/clear-cart.usecase';
import { GetCartItemsUseCase } from '@order/application/use-cases/carts/get-items.usecase';
import { RemoveCartItemUseCase } from '@order/application/use-cases/carts/remove-item.usecase';
import { UpdateCartItemUseCase } from '@order/application/use-cases/carts/update-item.usecase';
import { CartController } from '../../presentation/controlers/cart.controller';
import { PersistencyModule } from '../persistency/persistency.module';
import { ICartRepository } from '@order/domain/repositories/cart.repository';

@Module({
  imports: [PersistencyModule],
  controllers: [CartController],
  providers: [
    // usecases
    {
      provide: GetCartItemsUseCase,
      useFactory: (cartsRepository: ICartRepository) => {
        return new GetCartItemsUseCase(cartsRepository);
      },
      inject: [ICartRepository],
    },
    {
      provide: AddCartItemUseCase,
      useFactory: (
        cartsRepository: ICartRepository,
        snapshotProductFactory: SnapshotProductFactory,
      ) => {
        return new AddCartItemUseCase(cartsRepository, snapshotProductFactory);
      },
      inject: [ICartRepository, SnapshotProductFactory],
    },
    {
      provide: UpdateCartItemUseCase,
      useFactory: (cartsRepository: ICartRepository) => {
        return new UpdateCartItemUseCase(cartsRepository);
      },
      inject: [ICartRepository],
    },
    {
      provide: RemoveCartItemUseCase,
      useFactory: (cartsRepository: ICartRepository) => {
        return new RemoveCartItemUseCase(cartsRepository);
      },
      inject: [ICartRepository],
    },
    {
      provide: ClearCartUseCase,
      useFactory: (cartsRepository: ICartRepository) => {
        return new ClearCartUseCase(cartsRepository);
      },
      inject: [ICartRepository],
    },

    // providers
    {
      provide: SnapshotProductFactory,
      useFactory: (cartsRepository: ICartRepository) => {
        return new SnapshotProductFactory(cartsRepository);
      },
      inject: [ICartRepository],
    },
  ],
})
export class CartModule {}
