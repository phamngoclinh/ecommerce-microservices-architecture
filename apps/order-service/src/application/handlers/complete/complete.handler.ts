import { OrderStatus } from '@order/domain/models/order.model';
import { IOrderRepository } from '@order/domain/repositories/order.repository';
import { CompleteOrderContext, CompleteOrderHandler } from './complete-order.handler';

export class CompleteHandler extends CompleteOrderHandler {
  constructor(private readonly orderRepository: IOrderRepository) {
    super();
  }

  async handle(context: CompleteOrderContext): Promise<void> {
    console.log('Completing order');
    if (!context.id) throw Error('order is missing id property');
    await this.orderRepository.updateStatus(context.id, OrderStatus.COMPLETED);
    console.log('✅ Completing order is done !!!');

    await super.handle(context);
  }
}
