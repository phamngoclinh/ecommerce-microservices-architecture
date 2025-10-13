import { IUsecase } from '@libs/common/application/use-cases/base.usecase';
import { Injectable } from '@nestjs/common';
import { Order } from '@order/domain/models/order.model';
import { IOrderRepository } from '@order/domain/repositories/order.repository';

@Injectable()
export class GetOrdersUseCase extends IUsecase<unknown, Order[]> {
  constructor(private readonly ordersRepository: IOrderRepository) {
    super();
  }

  async execute(): Promise<Order[]> {
    return this.ordersRepository.getOrders();
  }
}
