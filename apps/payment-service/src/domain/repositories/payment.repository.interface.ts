import { Payment, PaymentStatus } from '../entities/payment.entity';

export abstract class IPaymentRepository {
  abstract create(payment: Payment): Promise<Payment>;
  abstract findById(id: number): Promise<Payment | null>;
  abstract updateStatus(id: number, status: PaymentStatus): Promise<Payment>;
}
