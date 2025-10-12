import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartMapper } from './mappers/cart.mapper';
import type { AddCartItemDto } from './dtos/add-cart-item.dto';
import type { RemoveCartItemDto } from './dtos/remove-cart-item.dto';

@Controller()
export class CartController {
  constructor(private readonly cartServiceService: CartService) {}

  @Post('cart/get-items')
  getCarts() {
    return this.cartServiceService.getCartItems();
  }

  @Post('cart/add-item')
  addCartItem(@Body() addCartItemDto: AddCartItemDto) {
    const cart = CartMapper.fromAddCartItemDto(addCartItemDto);
    return this.cartServiceService.addCartItem(cart, { productName: addCartItemDto.productName });
  }

  @Post('cart/remove-item')
  removeCartItem(@Body() removeCartItemDto: RemoveCartItemDto) {
    return this.cartServiceService.removeCartItem(removeCartItemDto.productId);
  }

  @Post('cart/clear')
  clearCart() {
    return this.cartServiceService.clearCart();
  }
}
