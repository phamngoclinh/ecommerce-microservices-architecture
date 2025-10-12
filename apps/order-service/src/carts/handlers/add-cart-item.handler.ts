import { Cart } from '../models/cart.model';
import { CartRepository } from '../repositories/cart.repository';
import { CartCreationContext, CartCreationHandler } from './cart-creation.handler';
import { SnapshotHandler } from './snapshot-product.handler';

export class AddCartItemHandler extends CartCreationHandler {
  constructor(private readonly cartsRepository: CartRepository) {
    super();
  }

  async handle(context: CartCreationContext): Promise<void> {
    const cart = await this.cartsRepository.addCartItem(
      new Cart(null, context.productId, context.unitPrice, context.quantity),
    );
    context.cart = cart;
    this.setNext(new SnapshotHandler(this.cartsRepository));
  }
}
