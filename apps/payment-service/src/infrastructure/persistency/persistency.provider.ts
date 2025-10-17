import { IPaymentRepository } from '@payment/domain/repositories/payment.repository.interface';
import { PaymentRepository } from './repositories/payment.repository';

export const PersistencyProviders = [
  {
    provide: IPaymentRepository,
    useClass: PaymentRepository,
  },
];
