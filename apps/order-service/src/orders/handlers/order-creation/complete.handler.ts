import { OrderStatus } from '../../models/order.model';
import { OrderRepository } from '../../repositories/order.repository';
import { OrderCreationContext, OrderCreationHandler } from './order-creation.handler';

export class CompleteHandler extends OrderCreationHandler {
  constructor(private readonly orderRepository: OrderRepository) {
    super();
  }

  async handle(context: OrderCreationContext): Promise<void> {
    if (!context.order.id) throw Error('order is missing id property');
    await this.orderRepository.updateStatus(context.order.id, OrderStatus.COMPLETED);
    await super.handle(context);
  }
}
