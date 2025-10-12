import { OrderStatus } from '@order/domain/models/order.model';
import { IOrderRepository } from '@order/domain/repositories/order.repository';
import { OrderCreationContext, OrderCreationHandler } from './order-creation.handler';

export class PaymentHandler extends OrderCreationHandler {
  constructor(private readonly orderRepository: IOrderRepository) {
    super();
  }

  async handle(context: OrderCreationContext): Promise<void> {
    // payment client

    const id = context.order.id as number;
    await this.orderRepository.updateStatus(id, OrderStatus.PAID);

    await super.handle(context);
  }
}
