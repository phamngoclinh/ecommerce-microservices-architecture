import { IEventPublisher } from '@libs/common/application/ports/event-publisher';
import { IUsecase } from '@libs/common/application/use-cases/base.usecase';
import { CompleteOrderHandler } from '@order/application/handlers/complete/complete-order.handler';
import { CompleteHandler } from '@order/application/handlers/complete/complete.handler';
import { SendCompletedOrderEventHandler } from '@order/application/handlers/complete/send-completed-order-event.handler';
import { IOrderRepository } from '@order/domain/repositories/order.repository';

export class CompleteOrderUseCase extends IUsecase<number, { success: boolean }> {
  private completeOrderChain: CompleteOrderHandler;

  constructor(
    private readonly ordersRepository: IOrderRepository,
    private readonly eventPublister: IEventPublisher,
  ) {
    super();

    const completeHandler = new CompleteHandler(this.ordersRepository);
    const sendCompletedOrderEventHandler = new SendCompletedOrderEventHandler(this.eventPublister);
    completeHandler.setNext(sendCompletedOrderEventHandler);
    this.completeOrderChain = completeHandler;
  }

  async execute(id: number): Promise<{ success: boolean }> {
    const context: { id: number } = { id };
    await this.completeOrderChain.handle(context);
    return { success: true };
  }
}
