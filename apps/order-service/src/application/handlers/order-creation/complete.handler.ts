import type { IInventoryGateway } from '@order/application/ports/inventory.gateway';
import { OrderStatus } from '@order/domain/models/order.model';
import { IOrderRepository } from '@order/domain/repositories/order.repository';
import { OrderCreationContext, OrderCreationHandler } from './order-creation.handler';

export class CompleteHandler extends OrderCreationHandler {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly inventoryGateway: IInventoryGateway,
  ) {
    super();
  }

  async handle(context: OrderCreationContext): Promise<void> {
    console.log('Completing order');
    if (!context.order.id) throw Error('order is missing id property');
    await this.orderRepository.updateStatus(context.order.id, OrderStatus.COMPLETED);
    context.order.status = OrderStatus.COMPLETED;
    console.log('✅ Completing order is done !!!');

    console.log('Completing stock');
    // Reduce quantity in inventory. Use command to undo if error
    await this.inventoryGateway.release(context.order.id);
    console.log('✅ Completing stock is done !!!');

    await super.handle(context);
  }
}
