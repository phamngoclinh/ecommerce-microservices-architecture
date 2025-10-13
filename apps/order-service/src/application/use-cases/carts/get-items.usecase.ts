import { IUsecase } from '@libs/common/application/use-cases/base.usecase';
import { Injectable } from '@nestjs/common';
import { Cart } from '@order/domain/models/cart.model';
import { ICartRepository } from '@order/domain/repositories/cart.repository';

@Injectable()
export class GetCartItemsUseCase extends IUsecase<undefined, Cart[]> {
  constructor(private readonly cartsRepository: ICartRepository) {
    super();
  }

  async execute() {
    return await this.cartsRepository.getCartItems();
  }
}
