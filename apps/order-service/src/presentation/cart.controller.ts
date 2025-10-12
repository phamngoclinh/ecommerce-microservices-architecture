import { Body, Controller, Post } from '@nestjs/common';
import { AddCartItemUseCase } from '@order/application/use-cases/carts/add-item.usecase';
import { ClearCartUseCase } from '@order/application/use-cases/carts/clear-cart.usecase';
import { GetCartItemsUseCase } from '@order/application/use-cases/carts/get-items.usecase';
import { RemoveCartItemUseCase } from '@order/application/use-cases/carts/remove-item.usecase';
import { CartMapper } from '../infrastructure/persistency/mappers/cart.mapper';
import type { AddCartItemDto } from './dtos/add-cart-item.dto';
import type { RemoveCartItemDto } from './dtos/remove-cart-item.dto';

@Controller()
export class CartController {
  constructor(
    private readonly getCartItemUseCase: GetCartItemsUseCase,
    private readonly addCartItemUseCase: AddCartItemUseCase,
    private readonly removeCartItemUseCase: RemoveCartItemUseCase,
    private readonly clearCartUseCase: ClearCartUseCase,
  ) {}

  @Post('cart/get-items')
  getCarts() {
    return this.getCartItemUseCase.execute();
  }

  @Post('cart/add-item')
  addCartItem(@Body() addCartItemDto: AddCartItemDto) {
    const cart = CartMapper.fromAddCartItemDto(addCartItemDto);
    return this.addCartItemUseCase.execute(cart);
  }

  @Post('cart/remove-item')
  removeCartItem(@Body() removeCartItemDto: RemoveCartItemDto) {
    return this.removeCartItemUseCase.execute(removeCartItemDto.productId);
  }

  @Post('cart/clear')
  clearCart() {
    return this.clearCartUseCase.execute();
  }
}
