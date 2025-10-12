import { CartRepository } from '../repositories/cart.repository';
import { AddCartItemHandler } from './add-cart-item.handler';
import { CartCreationContext, CartCreationHandler } from './cart-creation.handler';
import { UpdateCartItemHandler } from './update-cart-item.handler';

export class ValidationHandler extends CartCreationHandler {
  constructor(private readonly cartsRepository: CartRepository) {
    super();
  }

  async handle(context: CartCreationContext): Promise<void> {
    const cart = await this.cartsRepository.getCartItemForUpdate(context.productId);
    if (cart === null) {
      this.setNext(new AddCartItemHandler(this.cartsRepository));
    } else {
      this.setNext(new UpdateCartItemHandler(this.cartsRepository));
    }
  }
}
