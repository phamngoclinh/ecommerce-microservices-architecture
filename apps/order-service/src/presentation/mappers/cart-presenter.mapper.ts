import { Cart } from '@order/domain/models/cart.model';
import { CartResponse } from '../presenters/cart-response';

export class CartPresenterMapper {
  static fromCart(cart: Cart): CartResponse {
    return {
      id: cart.id as number,
      productId: cart.productId,
      productName: cart.productName,
      unitPrice: cart.unitPrice,
      quantity: cart.quantity,
      lineAmount: cart.lineAmount,
    };
  }

  static fromCarts(carts: Cart[]): CartResponse[] {
    return carts.map(cart => CartPresenterMapper.fromCart(cart));
  }
}
