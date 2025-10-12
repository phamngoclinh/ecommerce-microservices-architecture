import { OrderStatus } from '@order/domain/models/order.model';
import { IOrderRepository } from '@order/domain/repositories/order.repository';
import { OrderCreationContext, OrderCreationHandler } from './order-creation.handler';

export class CompleteHandler extends OrderCreationHandler {
  constructor(private readonly orderRepository: IOrderRepository) {
    super();
  }

  async handle(context: OrderCreationContext): Promise<void> {
    if (!context.order.id) throw Error('order is missing id property');
    await this.orderRepository.updateStatus(context.order.id, OrderStatus.COMPLETED);
    await super.handle(context);
  }
}
