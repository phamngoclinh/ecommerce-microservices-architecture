import { CartRepository } from '../repositories/cart.repository';
import { CartCreationContext, CartCreationHandler } from './cart-creation.handler';

export class UpdateCartItemHandler extends CartCreationHandler {
  constructor(private readonly cartsRepository: CartRepository) {
    super();
  }

  async handle(context: CartCreationContext): Promise<void> {
    const cart = await this.cartsRepository.getCartItemForUpdate(context.productId);
    if (cart === null) throw Error('Cart item is not found');
    if (context.quantity <= 0) throw Error('Quantity must be larger than zero');
    cart.changeQuantity(context.quantity);
    await this.cartsRepository.updateCartItem(cart);
    context.cart = cart;
  }
}
