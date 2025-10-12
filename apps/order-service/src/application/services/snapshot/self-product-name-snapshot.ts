import { Cart } from '@order/domain/models/cart.model';
import { ProductNameSnapshotStrategy } from './product-name-snapshot';
import { ICartRepository } from '@order/domain/repositories/cart.repository';

export class SelfProductNameSnapshotStrategy extends ProductNameSnapshotStrategy {
  constructor(
    private readonly cart: Cart,
    private readonly cartsRepository: ICartRepository,
  ) {
    super();
  }

  async execute(): Promise<void> {
    await this.cartsRepository.snapshotProduct(
      this.cart.productId,
      this.cart.productName as string,
    );
    return Promise.resolve();
  }
}
