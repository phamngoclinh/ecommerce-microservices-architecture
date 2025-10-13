import { OrderStatus } from '@order/domain/models/order.model';
import { IOrderRepository } from '@order/domain/repositories/order.repository';
import { OrderCreationContext, OrderCreationHandler } from './order-creation.handler';

export class PaymentHandler extends OrderCreationHandler {
  constructor(private readonly orderRepository: IOrderRepository) {
    super();
  }

  async handle(context: OrderCreationContext): Promise<void> {
    if (!context.order.id) throw Error('order is missing id property');

    // payment client

    await this.orderRepository.updateStatus(context.order.id, OrderStatus.PAID);

    context.order.status = OrderStatus.PAID;

    await super.handle(context);
  }
}
