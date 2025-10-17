import { IEventPublisher } from '@libs/common/application/ports/event-publisher';
import {
  PaymentTransaction,
  TransactionType,
} from '@payment/domain/entities/payment-transaction.entity';
import { Payment, PaymentStatus } from '@payment/domain/entities/payment.entity';
import { IPaymentTransactionRepository } from '@payment/domain/repositories/payment-transaction.repository.interface';
import { IPaymentRepository } from '@payment/domain/repositories/payment.repository.interface';
import { PaymentStatusMapper } from '../mappers/payment-status.mapper';

export interface HandleVendorCallbackInput {
  paymentId: number;
  status: string;
  externalId: string;
  message?: string;
}

export class HandleVendorCallbackUseCase {
  constructor(
    private readonly paymentsRepository: IPaymentRepository,
    private readonly paymentTransactionsRepository: IPaymentTransactionRepository,
    private readonly eventPublisher: IEventPublisher,
  ) {}

  async execute(dto: HandleVendorCallbackInput) {
    const payment = await this.paymentsRepository.findById(dto.paymentId);
    if (!payment) {
      throw new Error(`Payment with ID ${dto.paymentId} not found.`);
    }

    await this.paymentTransactionsRepository.create(
      new PaymentTransaction({
        payment: { id: dto.paymentId } as Payment,
        type: TransactionType.CALLBACK,
        payload: dto,
        externalTxnId: dto.externalId,
        message: dto.message,
      }),
    );

    const normalizedStatus = PaymentStatusMapper.map(payment.method.provider, dto.status);

    const result = await this.paymentsRepository.updateStatus(dto.paymentId, normalizedStatus);

    if (normalizedStatus === PaymentStatus.SUCCESS) {
      await this.paymentsRepository.updateTransactionId(dto.paymentId, dto.externalId);

      await this.eventPublisher.publish<{
        orderId: number;
        paymentId: number;
        amount: number;
      }>('payment.successful', {
        orderId: payment.orderId,
        paymentId: payment.id as number,
        amount: payment.amount,
      });
    }

    return result;
  }
}
