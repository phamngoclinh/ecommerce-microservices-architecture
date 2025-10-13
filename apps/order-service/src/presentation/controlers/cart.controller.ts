import { Body, Controller, Post } from '@nestjs/common';
import { AddCartItemUseCase } from '@order/application/use-cases/carts/add-item.usecase';
import { ClearCartUseCase } from '@order/application/use-cases/carts/clear-cart.usecase';
import { GetCartItemsUseCase } from '@order/application/use-cases/carts/get-items.usecase';
import { RemoveCartItemUseCase } from '@order/application/use-cases/carts/remove-item.usecase';
import { UpdateCartItemUseCase } from '@order/application/use-cases/carts/update-item.usecase';
import type { AddCartItemDto } from '../dtos/add-cart-item.dto';
import type { RemoveCartItemDto } from '../dtos/remove-cart-item.dto';
import type { UpdateCartItemDto } from '../dtos/update-cart-item.dto';
import { CartUseCaseMapper } from '../mappers/cart-usecase.mapper';
import { CartPresenterMapper } from '../mappers/cart-presenter.mapper';

@Controller()
export class CartController {
  constructor(
    private readonly getCartItemUseCase: GetCartItemsUseCase,
    private readonly addCartItemUseCase: AddCartItemUseCase,
    private readonly updateCartItemUseCase: UpdateCartItemUseCase,
    private readonly removeCartItemUseCase: RemoveCartItemUseCase,
    private readonly clearCartUseCase: ClearCartUseCase,
  ) {}

  @Post('cart/get-items')
  async getCarts() {
    const carts = await this.getCartItemUseCase.execute();
    return CartPresenterMapper.fromCarts(carts);
  }

  @Post('cart/add-item')
  async addCartItem(@Body() addCartItemDto: AddCartItemDto) {
    const cart = CartUseCaseMapper.fromAddCartItemDto(addCartItemDto);
    const createdCart = await this.addCartItemUseCase.execute(cart);
    return CartPresenterMapper.fromCart(createdCart);
  }

  @Post('cart/update-item')
  async updateCartItem(@Body() updateCartItemDto: UpdateCartItemDto) {
    const cart = CartUseCaseMapper.fromUpdateCartItemDto(updateCartItemDto);
    const updatedCart = await this.updateCartItemUseCase.execute(cart);
    return CartPresenterMapper.fromCart(updatedCart);
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
