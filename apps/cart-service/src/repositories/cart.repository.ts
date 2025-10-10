import { CartEntity } from '@libs/database/entities/cart.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartMapper } from '../mappers/cart.mapper';
import { Cart } from '../models/cart.model';

@Injectable()
export class CartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  async getCartItem(productId: number): Promise<Cart | null> {
    const cart = await this.cartRepository.findOne({ where: { product: { id: productId } } });
    if (cart === null) return null;
    return CartMapper.toDomain(cart);
  }

  async getCartItems(): Promise<Cart[]> {
    const carts = await this.cartRepository.find();
    return carts.map(cart => CartMapper.toDomain(cart));
  }

  async updateCartItem(cart: Cart): Promise<Cart> {
    const cartEntity = CartMapper.toEntity(cart);
    if (!cartEntity.id) throw Error('Cart is missing id property for updating');
    await this.cartRepository.save(cartEntity);
    return cart;
  }

  async addCartItem(cart: Cart): Promise<Cart> {
    const cartEntity = CartMapper.toEntity(cart);
    if (cartEntity.id) throw Error('Cart must be empty id property for adding');
    await this.cartRepository.save(cartEntity);
    return CartMapper.toDomain(cartEntity);
  }

  async removeCartItem(productId: number): Promise<void> {
    await this.cartRepository.delete({ product: { id: productId } });
  }

  async clearCart(): Promise<void> {
    await this.cartRepository.deleteAll();
  }
}
