import { OrderStatus } from '@order/domain/models/order.model';
import { IOrderRepository } from '@order/domain/repositories/order.repository';
import { ConfirmOrderContext, ConfirmOrderHandler } from './confirm-order.handler';

export class ConfirmationHandler extends ConfirmOrderHandler {
  constructor(private readonly orderRepository: IOrderRepository) {
    super();
  }

  async handle(context: ConfirmOrderContext): Promise<void> {
    console.log('Confirming order');
    await this.orderRepository.updateStatus(context.id, OrderStatus.CONFIRMED);
    console.log('✅ Confirming order is done !!!');

    await super.handle(context);
  }
}
