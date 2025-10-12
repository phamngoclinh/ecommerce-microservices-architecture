import { IValidator } from '@libs/common/validators/validator';
import { Cart } from '@order/domain/models/cart.model';
import { ICartRepository } from '@order/domain/repositories/cart.repository';

export class CartQuantityValidator extends IValidator {
  constructor(private readonly cartsRepository: ICartRepository) {
    super();
  }

  async validate(cart: Cart): Promise<void> {
    if (cart.quantity <= 0) throw Error('Quantity must be larger than zero');
    return Promise.resolve();
  }
}
