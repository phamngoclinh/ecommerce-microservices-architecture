import { IUsecase } from '@libs/common/application/use-cases/base.usecase';
import { Injectable } from '@nestjs/common';
import { ICartRepository } from '@order/domain/repositories/cart.repository';

@Injectable()
export class ClearCartUseCase extends IUsecase<undefined, boolean> {
  constructor(private readonly cartsRepository: ICartRepository) {
    super();
  }

  async execute() {
    await this.cartsRepository.clearCart();
    return true;
  }
}
