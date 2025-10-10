import { Injectable } from '@nestjs/common';
import { Cart } from './models/cart.model';
import { CartRepository } from './repositories/cart.repository';

@Injectable()
export class CartServiceService {
  constructor(private readonly cartsRepository: CartRepository) {}

  async getCartItems(): Promise<Cart[]> {
    return await this.cartsRepository.getCartItems();
  }

  async addCartItem(item: Cart): Promise<Cart> {
    let cart = await this.cartsRepository.getCartItem(item.productId);
    if (cart !== null) {
      cart.addMoreItem(item.quantity);
      await this.cartsRepository.updateCartItem(cart);
    } else {
      cart = await this.cartsRepository.addCartItem(item);
    }
    return cart;
  }

  async removeCartItem(productId: number): Promise<boolean> {
    await this.cartsRepository.removeCartItem(productId);
    return true;
  }

  async clearCart(): Promise<boolean> {
    await this.cartsRepository.clearCart();
    return true;
  }
}
