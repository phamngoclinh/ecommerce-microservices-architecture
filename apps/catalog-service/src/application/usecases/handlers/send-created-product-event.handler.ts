import { IEventPublisher } from '@libs/common/application/ports/event-publisher';
import { CoRHandler } from '@libs/common/patterns/cor.pattern';
import { CreateProductContext } from './create-product.context';

export class SendCreatedProductEventHandler extends CoRHandler<CreateProductContext> {
  constructor(private readonly eventPublisher: IEventPublisher) {
    super();
  }

  async handle(context: CreateProductContext): Promise<void> {
    await this.eventPublisher.publish<CreateProductContext['product']>(
      'product.created',
      context.product,
    );
    await super.handle(context);
  }
}
