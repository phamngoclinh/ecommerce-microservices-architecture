import { IEventPublisher } from '@libs/common/application/ports/event-publisher';
import { CreateOrderContext, CreateOrderHandler } from './create-order.handler';

type PaymentHandlerPayload = {
  orderId: number;
  amount: number;
  paymentMethod: string;
};

export class PaymentHandler extends CreateOrderHandler {
  constructor(private readonly eventPublisher: IEventPublisher) {
    super();
  }

  async handle(context: CreateOrderContext): Promise<void> {
    if (!context.order.id) throw Error('order is missing id property');

    if (context.paymentMethod !== 'cod') {
      await this.eventPublisher.publish<PaymentHandlerPayload>('payment.requested', {
        orderId: context.order.id,
        amount: context.order.totalAmount,
        paymentMethod: context.paymentMethod,
      });
    }

    await super.handle(context);
  }
}
