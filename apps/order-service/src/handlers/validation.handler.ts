import { OrderContext, OrderHandler } from './order.handler';

export class ValidationHandler extends OrderHandler {
  async handle(context: OrderContext): Promise<void> {
    if (context.order.orderItems.length === 0)
      throw new Error('Order must contain at least one item');
    if (context.order.orderItems.some(x => x.quantity <= 0))
      throw new Error('Order item must be at least one');
    if (!context.paymentMethod) throw new Error('Payment method required');

    // TODO: Check inventory

    await super.handle(context);
  }
}
