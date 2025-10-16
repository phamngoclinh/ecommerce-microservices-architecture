import { CreateOrderContext, CreateOrderHandler } from './create-order.handler';

export class ValidationHandler extends CreateOrderHandler {
  async handle(context: CreateOrderContext): Promise<void> {
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
