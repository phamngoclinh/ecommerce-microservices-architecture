import { OrderCreationContext, OrderCreationHandler } from './order-creation.handler';

export class ValidationHandler extends OrderCreationHandler {
  async handle(context: OrderCreationContext): Promise<void> {
    console.log('Validating order');
    if (context.order.orderItems.length === 0)
      throw new Error('Order must contain at least one item');
    if (context.order.orderItems.some(x => x.quantity <= 0))
      throw new Error('Order item must be at least one');
    if (!context.paymentMethod) throw new Error('Payment method required');
    console.log('✅ Validating order is done !!!');

    await super.handle(context);
  }
}
