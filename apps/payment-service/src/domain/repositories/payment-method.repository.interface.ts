import { PaymentMethod } from '../entities/payment-method.entity';

export abstract class IPaymentMethodRepository {
  abstract create(paymentMethod: PaymentMethod): Promise<PaymentMethod>;
  abstract getAll(): Promise<PaymentMethod[]>;
}
