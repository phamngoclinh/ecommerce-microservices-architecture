import { PaymentTransaction } from '@payment/domain/entities/payment-transaction.entity';
import { IPaymentTransactionRepository } from '@payment/domain/repositories/payment-transaction.repository.interface';

export class GetPaymentTransactionsUseCase {
  constructor(private readonly paymentTransactionsRepository: IPaymentTransactionRepository) {}

  async execute(paymentId: number): Promise<PaymentTransaction[]> {
    return await this.paymentTransactionsRepository.getAllByPaymentId(paymentId);
  }
}
