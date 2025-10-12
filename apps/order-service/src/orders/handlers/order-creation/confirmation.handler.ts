import { OrderCreationContext, OrderCreationHandler } from './order-creation.handler';
import { OrderRepository } from '../../repositories/order.repository';
import { OrderStatus } from '../../models/order.model';

export class ConfirmationHandler extends OrderCreationHandler {
  constructor(private readonly orderRepository: OrderRepository) {
    super();
  }

  async handle(context: OrderCreationContext): Promise<void> {
    console.log('Confirming order');
    if (!context.order.id) throw Error('order is missing id property');
    await this.orderRepository.updateStatus(context.order.id, OrderStatus.CONFIRMED);
    console.log('✅ Confirming order is done !!!');

    // TODO: Reduce quantity in inventory

    await super.handle(context);
  }
}
