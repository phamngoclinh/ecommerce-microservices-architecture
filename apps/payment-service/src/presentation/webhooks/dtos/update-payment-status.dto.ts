import { PaymentStatus } from '@payment/domain/entities/payment.entity';

export interface UpdatePaymentStatusDto {
  id: number;
  status: PaymentStatus;
}
