import { IOrderRepository } from '@order/domain/repositories/order.repository';
import { OrderCreationContext, OrderCreationHandler } from './order-creation.handler';
import type { IInventoryGateway } from '@order/application/ports/inventory.gateway';

export class SaveOrderHandler extends OrderCreationHandler {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly inventoryGateway: IInventoryGateway,
  ) {
    super();
  }

  async handle(context: OrderCreationContext): Promise<void> {
    console.log('Creating order', context.order, context.order.orderItems);
    context.order.calculateTotals();
    context.order = await this.orderRepository.createOrder(context.order);
    console.log('✅ Creating order is done !!!');

    console.log('Reserving stock');
    await this.inventoryGateway.reserve({
      orderId: context.order.id as number,
      items: context.order.orderItems.map(orderItem => ({
        inventoryItemId: orderItem.inventoryItemId,
        quantity: orderItem.quantity,
      })),
    });
    console.log('✅ Reserving stock is done !!!');

    await super.handle(context);
  }
}
