import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartMapper } from '../mappers/cart.mapper';
import { CartEntity } from '../entities/cart.entity';
import { Cart, CartRead } from '../models/cart.model';

@Injectable()
export class CartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  async getItem(productId: number): Promise<CartEntity | null> {
    const cart = await this.cartRepository.findOneBy({ productId });
    // if (cart === null) throw Error('Cart item is not found');
    return cart;
  }

  async getCartItem(productId: number): Promise<CartRead | null> {
    const cart = await this.getItem(productId);
    if (cart === null) return null;
    return CartMapper.toCartRead(cart);
  }

  async getCartItemForUpdate(productId: number): Promise<Cart | null> {
    const cart = await this.getItem(productId);
    if (cart === null) return null;
    return CartMapper.toDomain(cart);
  }

  async getCartItems(): Promise<CartRead[]> {
    const carts = await this.cartRepository.find();
    return carts.map(cart => CartMapper.toCartRead(cart));
  }

  async updateCartItem(cart: Cart): Promise<Cart> {
    const cartEntity = CartMapper.toEntity(cart);
    if (!cartEntity.id) throw Error('Cart is missing id property for updating');
    await this.cartRepository.save(cartEntity);
    return CartMapper.toDomain(cartEntity);
  }

  async addQuantity(cart: Cart): Promise<Cart> {
    await this.cartRepository.update(cart.id as number, { quantity: cart.quantity });
    return cart;
  }

  async addCartItem(cart: Cart): Promise<Cart> {
    const cartEntity = CartMapper.toEntity(cart);
    if (cartEntity.id) throw Error('Cart must be empty id property for adding');
    await this.cartRepository.save(cartEntity);
    return CartMapper.toDomain(cartEntity);
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
