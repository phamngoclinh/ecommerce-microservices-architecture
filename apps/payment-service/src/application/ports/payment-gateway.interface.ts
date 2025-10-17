import { PaymentProvider } from '@payment/domain/entities/payment-method.entity';

export interface IPaymentGateway {
  getPaymentUrl(orderId: number, amount: number, method: PaymentProvider): Promise<string>;
}
