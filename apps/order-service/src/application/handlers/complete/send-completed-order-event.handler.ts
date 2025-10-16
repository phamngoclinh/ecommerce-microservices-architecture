import { IEventPublisher } from '@libs/common/application/ports/event-publisher';
import { CompleteOrderContext, CompleteOrderHandler } from './complete-order.handler';

export class SendCompletedOrderEventHandler extends CompleteOrderHandler {
  constructor(private readonly eventPublisher: IEventPublisher) {
    super();
  }

  async handle(context: CompleteOrderContext): Promise<void> {
    await this.eventPublisher.publish<CompleteOrderContext['id']>('order.completed', context.id);
    await super.handle(context);
  }
}
