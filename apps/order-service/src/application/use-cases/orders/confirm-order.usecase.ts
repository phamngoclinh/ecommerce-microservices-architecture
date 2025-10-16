import { IEventPublisher } from '@libs/common/application/ports/event-publisher';
import { IUsecase } from '@libs/common/application/use-cases/base.usecase';
import { ConfirmOrderHandler } from '@order/application/handlers/confirm-order/confirm-order.handler';
import { ConfirmationHandler } from '@order/application/handlers/confirm-order/confirmation.handler';
import { SendConfirmedOrderEventHandler } from '@order/application/handlers/confirm-order/send-confirmed-order-event.handler';
import { IOrderRepository } from '@order/domain/repositories/order.repository';

export class ConfirmOrderUseCase extends IUsecase<number, { success: boolean }> {
  private confirmOrderChain: ConfirmOrderHandler;

  constructor(
    private readonly ordersRepository: IOrderRepository,
    private readonly eventPublister: IEventPublisher,
  ) {
    super();

    const confirmationHandler = new ConfirmationHandler(this.ordersRepository);
    const sendConfirmedOrderEventHandler = new SendConfirmedOrderEventHandler(this.eventPublister);
    confirmationHandler.setNext(sendConfirmedOrderEventHandler);
    this.confirmOrderChain = confirmationHandler;
  }

  async execute(id: number): Promise<{ success: boolean }> {
    const context: { id: number } = { id };
    await this.confirmOrderChain.handle(context);
    return { success: true };
  }
}
