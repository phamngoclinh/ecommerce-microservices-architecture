import { Module } from '@nestjs/common';
import { AddCartItemUseCase } from '@order/application/use-cases/carts/add-item.usecase';
import { ClearCartUseCase } from '@order/application/use-cases/carts/clear-cart.usecase';
import { GetCartItemsUseCase } from '@order/application/use-cases/carts/get-items.usecase';
import { RemoveCartItemUseCase } from '@order/application/use-cases/carts/remove-item.usecase';
import { UpdateCartItemUseCase } from '@order/application/use-cases/carts/update-item.usecase';
import { CartController } from '../../presentation/controllers/cart.controller';
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
      useFactory: (cartsRepository: ICartRepository) => {
        return new AddCartItemUseCase(cartsRepository);
      },
      inject: [ICartRepository],
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
  ],
})
export class CartModule {}
