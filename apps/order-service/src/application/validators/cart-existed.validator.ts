import { IValidator } from '@libs/common/validators/validator';
import { Injectable } from '@nestjs/common';
import { Cart } from '@order/domain/models/cart.model';
import { ICartRepository } from '@order/domain/repositories/cart.repository';

@Injectable()
export class CartExistedValidator extends IValidator {
  constructor(private readonly cartsRepository: ICartRepository) {
    super();
  }

  async validate(cart: Cart): Promise<void> {
    const result = await this.cartsRepository.getCartItem(cart.productId);
    if (result === null) throw Error('Cart item is not existed');
  }
}
