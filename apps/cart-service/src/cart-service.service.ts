import { Injectable } from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';
import { Cart } from './models/cart.model';

@Injectable()
export class CartServiceService {
  constructor(private readonly cartsRepository: CartRepository) {}

  async getCartItems(): Promise<Cart[]> {
    return await this.cartsRepository.getCartItems();
  }

  async addCartItem(item: Cart): Promise<Cart> {
    let cart = await this.cartsRepository.getCartItem(item.productId);
    if (cart !== null) {
      cart.addItem();
      await this.cartsRepository.updateCartItem(cart);
    } else {
      cart = await this.cartsRepository.addCartItem(item);
    }
    return cart;
  }

  async removeCartItem(productId: number): Promise<void> {
    await this.cartsRepository.removeCartItem(productId);
  }

  async clearCart(): Promise<void> {
    await this.cartsRepository.clearCart();
  }
}
