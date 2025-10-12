import { Module } from '@nestjs/common';
import { SnapshotProductFactory } from '@order/application/services/snapshot/snapshot-product.factory';
import { AddCartItemUseCase } from '@order/application/use-cases/carts/add-item.usecase';
import { ClearCartUseCase } from '@order/application/use-cases/carts/clear-cart.usecase';
import { GetCartItemsUseCase } from '@order/application/use-cases/carts/get-items.usecase';
import { RemoveCartItemUseCase } from '@order/application/use-cases/carts/remove-item.usecase';
import { CartController } from '../../presentation/cart.controller';
import { PersistencyModule } from '../persistency/persistency.module';

@Module({
  imports: [PersistencyModule],
  controllers: [CartController],
  providers: [
    GetCartItemsUseCase,
    AddCartItemUseCase,
    RemoveCartItemUseCase,
    ClearCartUseCase,

    // providers
    SnapshotProductFactory,
  ],
})
export class CartModule {}
