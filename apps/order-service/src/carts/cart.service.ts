import { Injectable } from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';
import { Cart, CartRead } from './models/cart.model';

@Injectable()
export class CartService {
  constructor(private readonly cartsRepository: CartRepository) {}

  async getCartItems(): Promise<CartRead[]> {
    return await this.cartsRepository.getCartItems();
  }

  async addCartItem(item: Cart, product: { productName?: string }): Promise<Cart> {
    const cart = await this.cartsRepository.getCartItem(item.productId);
    if (cart !== null) {
      return await this.updateCartItem(
        new Cart(cart.id, item.productId, item.unitPrice, cart.quantity + item.quantity),
      );
    }
    const newCart = await this.cartsRepository.addCartItem(item);
    // snapshot product
    if (product.productName) {
      await this.cartsRepository.snapshotProduct(item.productId, product.productName);
    } else {
      // TODO: call product client to get productName
    }
    return newCart;
  }

  async updateCartItem(item: Cart): Promise<Cart> {
    const cart = await this.cartsRepository.getCartItemForUpdate(item.productId);
    if (cart === null) throw Error('Cart item is not found');
    if (item.quantity <= 0) throw Error('Quantity must be larger than zero');
    return await this.cartsRepository.updateCartItem(item);
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
