import { Cart } from '@order/domain/models/cart.model';
import { ProductNameSnapshotStrategy } from './product-name-snapshot';
import { ICartRepository } from '@order/domain/repositories/cart.repository';

export class ProductServiceSnapshotStrategy extends ProductNameSnapshotStrategy {
  constructor(
    private readonly cart: Cart,
    private readonly cartsRepository: ICartRepository,
  ) {
    super();
  }

  async execute(): Promise<void> {
    // TODO: call product client to get productName
    console.log('Calling product client to get productName of productId: ', this.cart.productId);
    return Promise.resolve();
  }
}
