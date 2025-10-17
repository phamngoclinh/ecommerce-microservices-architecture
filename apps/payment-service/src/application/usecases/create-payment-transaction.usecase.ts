import { PaymentTransaction } from '@payment/domain/entities/payment-transaction.entity';
import { IPaymentTransactionRepository } from '@payment/domain/repositories/payment-transaction.repository.interface';

export class CreatePaymentTransactionUseCase {
  constructor(private readonly paymentTransactionsRepository: IPaymentTransactionRepository) {}

  async execute(paymentTransaction: PaymentTransaction): Promise<PaymentTransaction> {
    return await this.paymentTransactionsRepository.create(paymentTransaction);
  }
}
