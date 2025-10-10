import { OrderContext, OrderHandler } from './order.handler';
import { OrderRepository } from '../repositories/order.repository';

export class SaveOrderHandler extends OrderHandler {
  constructor(private readonly orderRepository: OrderRepository) {
    super();
  }

  async handle(context: OrderContext): Promise<void> {
    console.log('Creating order');
    context.order.calculateTotals();
    await this.orderRepository.createOrder(context.order);
    console.log('✅ Creating order is done !!!');
    await super.handle(context);
  }
}
