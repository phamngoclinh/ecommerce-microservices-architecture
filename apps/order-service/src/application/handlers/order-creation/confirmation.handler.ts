import { OrderStatus } from '@order/domain/models/order.model';
import { IOrderRepository } from '@order/domain/repositories/order.repository';
import { OrderCreationContext, OrderCreationHandler } from './order-creation.handler';
import type { IInventoryGateway } from '@order/application/ports/inventory.gateway';

export class ConfirmationHandler extends OrderCreationHandler {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly inventoryGateway: IInventoryGateway,
  ) {
    super();
  }

  async handle(context: OrderCreationContext): Promise<void> {
    console.log('Confirming order');
    if (!context.order.id) throw Error('order is missing id property');
    await this.orderRepository.updateStatus(context.order.id, OrderStatus.CONFIRMED);
    console.log('✅ Confirming order is done !!!');

    context.order.status = OrderStatus.CONFIRMED;

    console.log('Confirming stock');
    // Reduce quantity in inventory. Use command to undo if error
    await this.inventoryGateway.confirm(context.order.id);
    console.log('✅ Confirming stock is done !!!');

    await super.handle(context);
  }
}
