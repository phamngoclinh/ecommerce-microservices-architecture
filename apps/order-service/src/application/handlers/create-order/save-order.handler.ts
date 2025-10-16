import { IOrderRepository } from '@order/domain/repositories/order.repository';
import { CreateOrderContext, CreateOrderHandler } from './create-order.handler';

export class SaveOrderHandler extends CreateOrderHandler {
  constructor(private readonly orderRepository: IOrderRepository) {
    super();
  }

  async handle(context: CreateOrderContext): Promise<void> {
    console.log('Creating order', context.order, context.order.orderItems);
    context.order.calculateTotals();
    context.order = await this.orderRepository.createOrder(context.order);
    console.log('✅ Creating order is done !!!');

    await super.handle(context);
  }
}
