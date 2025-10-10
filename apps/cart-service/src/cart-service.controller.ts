import { Body, Controller, Post } from '@nestjs/common';
import { CartServiceService } from './cart-service.service';
import { CartMapper } from './mappers/cart.mapper';
import type { AddCartItemDto } from './dtos/add-cart-item.dto';
import type { RemoveCartItemDto } from './dtos/remove-cart-item.dto';

@Controller()
export class CartServiceController {
  constructor(private readonly cartServiceService: CartServiceService) {}

  @Post('get-items')
  getCarts() {
    return this.cartServiceService.getCartItems();
  }

  @Post('add-item')
  addCartItem(@Body() addCartItemDto: AddCartItemDto) {
    const cart = CartMapper.fromAddCartItemDto(addCartItemDto);
    return this.cartServiceService.addCartItem(cart);
  }

  @Post('remove-item')
  removeCartItem(@Body() removeCartItemDto: RemoveCartItemDto) {
    return this.cartServiceService.removeCartItem(removeCartItemDto.productId);
  }

  @Post('clear')
  clearCart() {
    return this.cartServiceService.clearCart();
  }
}
