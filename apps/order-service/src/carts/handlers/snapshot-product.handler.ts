import { CartRepository } from '../repositories/cart.repository';
import { CartCreationContext, CartCreationHandler } from './cart-creation.handler';

export class SnapshotHandler extends CartCreationHandler {
  constructor(private readonly cartsRepository: CartRepository) {
    super();
  }

  async handle(context: CartCreationContext): Promise<void> {
    const productName = '';
    await this.cartsRepository.snapshotProduct(context.productId, productName);
  }
}
