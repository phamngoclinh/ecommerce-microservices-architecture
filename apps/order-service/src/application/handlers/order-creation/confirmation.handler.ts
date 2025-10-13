import { OrderStatus } from '@order/domain/models/order.model';
import { IOrderRepository } from '@order/domain/repositories/order.repository';
import { OrderCreationContext, OrderCreationHandler } from './order-creation.handler';

export class ConfirmationHandler extends OrderCreationHandler {
  constructor(private readonly orderRepository: IOrderRepository) {
    super();
  }

  async handle(context: OrderCreationContext): Promise<void> {
    console.log('Confirming order');
    if (!context.order.id) throw Error('order is missing id property');
    await this.orderRepository.updateStatus(context.order.id, OrderStatus.CONFIRMED);
    console.log('✅ Confirming order is done !!!');

    context.order.status = OrderStatus.CONFIRMED;

    // TODO: Reduce quantity in inventory

    await super.handle(context);
  }
}
