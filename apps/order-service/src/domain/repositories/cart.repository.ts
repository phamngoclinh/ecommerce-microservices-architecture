import { Cart } from '../models/cart.model';

export abstract class ICartRepository {
  abstract getCartItem(productId: number): Promise<Cart | null>;

  abstract getCartItemForUpdate(productId: number): Promise<Cart | null>;

  abstract getCartItems(): Promise<Cart[]>;

  abstract updateCartItem(cart: Cart): Promise<Cart>;

  abstract addQuantity(cart: Cart): Promise<Cart>;

  abstract addCartItem(cart: Cart): Promise<Cart>;

  abstract removeCartItem(productId: number): Promise<void>;

  abstract clearCart(): Promise<void>;

  abstract snapshotProduct(productId: number, productName: string): Promise<boolean>;
}
