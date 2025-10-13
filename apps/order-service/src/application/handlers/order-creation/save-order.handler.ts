import { IOrderRepository } from '@order/domain/repositories/order.repository';
import { OrderCreationContext, OrderCreationHandler } from './order-creation.handler';

export class SaveOrderHandler extends OrderCreationHandler {
  constructor(private readonly orderRepository: IOrderRepository) {
    super();
  }

  async handle(context: OrderCreationContext): Promise<void> {
    console.log('Creating order');
    context.order.calculateTotals();
    const order = await this.orderRepository.createOrder(context.order);
    console.log('✅ Creating order is done !!!');
    context.order = order;

    await super.handle(context);
  }
}
