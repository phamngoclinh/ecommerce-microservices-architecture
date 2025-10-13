import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '@order/domain/models/cart.model';
import { ICartRepository } from '@order/domain/repositories/cart.repository';
import { Repository } from 'typeorm';
import { CartEntity } from '../entities/cart.entity';
import { CartPersistencyMapper } from '../mappers/cart-persistency.mapper';

@Injectable()
export class CartRepository implements ICartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  async getItem(productId: number): Promise<CartEntity | null> {
    const cart = await this.cartRepository.findOneBy({ productId });
    return cart;
  }

  async getCartItem(productId: number): Promise<Cart | null> {
    const cart = await this.getItem(productId);
    if (cart === null) return null;
    return CartPersistencyMapper.toDomain(cart);
  }

  async getCartItemForUpdate(productId: number): Promise<Cart | null> {
    const cart = await this.getItem(productId);
    if (cart === null) return null;
    return CartPersistencyMapper.toDomain(cart);
  }

  async getCartItems(): Promise<Cart[]> {
    const carts = await this.cartRepository.find();
    return carts.map(cart => CartPersistencyMapper.toDomain(cart));
  }

  async updateCartItem(cart: Cart): Promise<Cart> {
    const cartEntity = CartPersistencyMapper.toEntity(cart);
    if (!cartEntity.id) throw Error('Cart is missing id property for updating');
    await this.cartRepository.save(cartEntity);
    return CartPersistencyMapper.toDomain(cartEntity);
  }

  async addQuantity(cart: Cart): Promise<Cart> {
    await this.cartRepository.update(cart.id as number, { quantity: cart.quantity });
    return cart;
  }

  async addCartItem(cart: Cart): Promise<Cart> {
    const cartEntity = CartPersistencyMapper.toEntity(cart);
    if (cartEntity.id) throw Error('Cart must be empty id property for adding');
    await this.cartRepository.save(cartEntity);
    return CartPersistencyMapper.toDomain(cartEntity);
  }

  async removeCartItem(productId: number): Promise<void> {
    await this.cartRepository.delete({ productId });
  }

  async clearCart(): Promise<void> {
    await this.cartRepository.deleteAll();
  }

  async snapshotProduct(productId: number, productName: string): Promise<boolean> {
    await this.cartRepository.update({ productId }, { productName });
    return true;
  }
}
