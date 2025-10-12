import { Injectable } from '@nestjs/common';
import { ICartRepository } from '@order/domain/repositories/cart.repository';
import { IUsecase } from '../base.usecase';

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
