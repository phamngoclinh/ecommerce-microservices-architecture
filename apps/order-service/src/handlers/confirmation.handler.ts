import { OrderContext, OrderHandler } from './order.handler';
import { OrderRepository } from '../repositories/order.repository';
import { OrderStatus } from '../models/order.model';

export class ConfirmationHandler extends OrderHandler {
  constructor(private readonly orderRepository: OrderRepository) {
    super();
  }

  async handle(context: OrderContext): Promise<void> {
    console.log('Confirming order');
    const id = context.order.getId();
    if (!id) throw Error('order is missing id property');
    await this.orderRepository.updateStatus(id, OrderStatus.COMPLETED);
    console.log('✅ Confirming order is done !!!');

    // TODO: Reduce quantity in inventory

    await super.handle(context);
  }
}
