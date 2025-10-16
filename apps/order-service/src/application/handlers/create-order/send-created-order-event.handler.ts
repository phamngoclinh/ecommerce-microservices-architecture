import { IEventPublisher } from '@libs/common/application/ports/event-publisher';
import { CoRHandler } from '@libs/common/patterns/cor.pattern';
import { CreateOrderContext } from './create-order.handler';

export class SendCreatedOrderEventHandler extends CoRHandler<CreateOrderContext> {
  constructor(private readonly eventPublisher: IEventPublisher) {
    super();
  }

  async handle(context: CreateOrderContext): Promise<void> {
    await this.eventPublisher.publish<CreateOrderContext['order']>('order.created', context.order);
    await super.handle(context);
  }
}
