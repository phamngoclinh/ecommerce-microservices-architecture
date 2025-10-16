import { IEventPublisher } from '@libs/common/application/ports/event-publisher';
import { CoRHandler } from '@libs/common/patterns/cor.pattern';
import { ConfirmOrderContext } from './confirm-order.handler';

export class SendConfirmedOrderEventHandler extends CoRHandler<ConfirmOrderContext> {
  constructor(private readonly eventPublisher: IEventPublisher) {
    super();
  }

  async handle(context: ConfirmOrderContext): Promise<void> {
    await this.eventPublisher.publish<ConfirmOrderContext['id']>('order.confirmed', context.id);
    await super.handle(context);
  }
}
