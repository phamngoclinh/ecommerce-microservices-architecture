import { IPaymentMethodRepository } from '@payment/domain/repositories/payment-method.repository.interface';
import { IPaymentTransactionRepository } from '@payment/domain/repositories/payment-transaction.repository.interface';
import { IPaymentRepository } from '@payment/domain/repositories/payment.repository.interface';
import { PaymentMethodRepository } from './repositories/payment-method.repository';
import { PaymentTransactionRepository } from './repositories/payment-transaction.repository';
import { PaymentRepository } from './repositories/payment.repository';

export const PersistencyProviders = [
  {
    provide: IPaymentRepository,
    useClass: PaymentRepository,
  },
  {
    provide: IPaymentMethodRepository,
    useClass: PaymentMethodRepository,
  },
  {
    provide: IPaymentTransactionRepository,
    useClass: PaymentTransactionRepository,
  },
];
