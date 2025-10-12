import { Injectable } from '@nestjs/common';
import { CartRead } from '@order/domain/models/cart.model';
import { ICartRepository } from '@order/domain/repositories/cart.repository';
import { IUsecase } from '../base.usecase';

@Injectable()
export class GetCartItemsUseCase extends IUsecase<undefined, CartRead[]> {
  constructor(private readonly cartsRepository: ICartRepository) {
    super();
  }

  async execute() {
    return await this.cartsRepository.getCartItems();
  }
}
