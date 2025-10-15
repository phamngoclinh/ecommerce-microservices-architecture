import { Cart } from '@order/domain/models/cart.model';
import { ICartRepository } from '@order/domain/repositories/cart.repository';
import { ProductNameSnapshotStrategy } from './product-name-snapshot';
import { ProductServiceSnapshotStrategy } from './product-service-snapshot';
import { SelfProductNameSnapshotStrategy } from './self-product-name-snapshot';

export class SnapshotProductFactory {
  constructor(private readonly cartsRepository: ICartRepository) {}

  create(cart: Cart): ProductNameSnapshotStrategy {
    if (cart.productName) {
      return new SelfProductNameSnapshotStrategy(cart, this.cartsRepository);
    } else {
      return new ProductServiceSnapshotStrategy(cart, this.cartsRepository);
    }
  }
}
