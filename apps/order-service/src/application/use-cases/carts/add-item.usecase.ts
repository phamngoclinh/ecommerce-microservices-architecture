import { IUsecase } from '@libs/common/application/use-cases/base.usecase';
import { IValidator } from '@libs/common/validators/validator';
import { SnapshotProductFactory } from '@order/application/services/snapshot/snapshot-product.factory';
import { CartQuantityValidator } from '@order/application/validators/cart-quantity.validator';
import { Cart } from '@order/domain/models/cart.model';
import { ICartRepository } from '@order/domain/repositories/cart.repository';

export class AddCartItemUseCase extends IUsecase<Cart, Cart> {
  private validator: IValidator<Cart>;

  constructor(
    private readonly cartsRepository: ICartRepository,
    private readonly snapshotProductFactory: SnapshotProductFactory,
  ) {
    super();

    this.validator = new CartQuantityValidator(this.cartsRepository);
  }

  async execute(input: Cart): Promise<Cart> {
    await this.validator.handle(input);

    const cart = await this.cartsRepository.getCartItem(input.productId);

    if (cart !== null) {
      return await this.cartsRepository.updateCartItem(
        new Cart(
          cart.id,
          input.productId,
          input.unitPrice,
          cart.quantity + input.quantity,
          input.productName,
        ),
      );
    }

    const newCart = await this.cartsRepository.addCartItem(input);

    // snapshot product
    const snapshot = this.snapshotProductFactory.create(input);
    await snapshot.execute();

    return newCart;
  }
}
