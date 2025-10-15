import { IUsecase } from '@libs/common/application/use-cases/base.usecase';
import { ICartRepository } from '@order/domain/repositories/cart.repository';

export class RemoveCartItemUseCase extends IUsecase<number, boolean> {
  constructor(private readonly cartsRepository: ICartRepository) {
    super();
  }

  async execute(productId: number) {
    await this.cartsRepository.removeCartItem(productId);
    return true;
  }
}
