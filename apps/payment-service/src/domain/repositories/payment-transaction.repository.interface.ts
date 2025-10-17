import { PaymentTransaction } from '../entities/payment-transaction.entity';

export abstract class IPaymentTransactionRepository {
  abstract getAllByPaymentId(paymentId: number): Promise<PaymentTransaction[]>;
  abstract create(paymentTransaction: PaymentTransaction): Promise<PaymentTransaction>;
  abstract updateExternalId(id: number, externalId: string): Promise<PaymentTransaction>;
}
