import { OrderStatus } from '@order/domain/models/order.model';
import { IOrderRepository } from '@order/domain/repositories/order.repository';
import { CreateOrderContext, CreateOrderHandler } from './create-order.handler';

export class PaymentHandler extends CreateOrderHandler {
  constructor(private readonly orderRepository: IOrderRepository) {
    super();
  }

  async handle(context: CreateOrderContext): Promise<void> {
    if (!context.order.id) throw Error('order is missing id property');

    if (context.paymentMethod !== 'cod') {
      // payment client

      await this.orderRepository.updateStatus(context.order.id, OrderStatus.PAID);

      context.order.status = OrderStatus.PAID;
    }

    await super.handle(context);
  }
}
