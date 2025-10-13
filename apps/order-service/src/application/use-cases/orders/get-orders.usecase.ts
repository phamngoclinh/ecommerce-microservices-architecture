import { Injectable } from '@nestjs/common';
import { Order } from '@order/domain/models/order.model';
import { IOrderRepository } from '@order/domain/repositories/order.repository';
import { IUsecase } from '../base.usecase';

@Injectable()
export class GetOrdersUseCase extends IUsecase<unknown, Order[]> {
  constructor(private readonly ordersRepository: IOrderRepository) {
    super();
  }

  async execute(): Promise<Order[]> {
    return this.ordersRepository.getOrders();
  }
}
