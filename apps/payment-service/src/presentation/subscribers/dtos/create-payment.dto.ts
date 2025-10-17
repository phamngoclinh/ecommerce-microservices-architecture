import { PaymentProvider } from '@payment/domain/entities/payment-method.entity';

export interface CreatePaymentDto {
  orderId: number;
  amount: number;
  method: PaymentProvider;
  currency?: string;
}
