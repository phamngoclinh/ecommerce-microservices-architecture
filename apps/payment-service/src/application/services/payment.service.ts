import { IEventPublisher } from '@libs/common/application/ports/event-publisher';
import { PaymentStatus } from '@payment/domain/entities/payment.entity';
import { CreatePaymentInput, CreatePaymentUseCase } from '../usecases/create-payment.usecase';
import {
  UpdatePaymentStatusInput,
  UpdatePaymentStatusUseCase,
} from '../usecases/update-payment-status.usecase';

export class PaymentService {
  constructor(
    private readonly createUseCase: CreatePaymentUseCase,
    private readonly updateStatusUseCase: UpdatePaymentStatusUseCase,
    private readonly eventPublisher: IEventPublisher,
  ) {}

  async createPayment(dto: CreatePaymentInput) {
    return await this.createUseCase.execute(dto);
  }

  async updateStatus(dto: UpdatePaymentStatusInput) {
    const payment = await this.updateStatusUseCase.execute(dto);

    if (payment.status === PaymentStatus.SUCCESS) {
      await this.eventPublisher.publish('payment.completed', {
        paymentId: payment.id,
        orderId: payment.orderId,
        amount: payment.amount,
        method: payment.method.displayName,
        timestamp: new Date().toISOString(),
      });
      console.log('[PaymentService] Published event: payment.completed');
    }

    return payment;
  }
}
