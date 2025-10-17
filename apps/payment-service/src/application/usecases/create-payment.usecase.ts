import { PaymentMethod } from '@payment/domain/entities/payment-method.entity';
import { Payment, PaymentStatus } from '@payment/domain/entities/payment.entity';
import { IPaymentRepository } from '@payment/domain/repositories/payment.repository.interface';

export interface CreatePaymentInput {
  orderId: number;
  amount: number;
  methodId: number;
  currency?: string;
}

export class CreatePaymentUseCase {
  constructor(private readonly repo: IPaymentRepository) {}

  async execute(dto: CreatePaymentInput): Promise<Payment> {
    const payment = new Payment();
    payment.orderId = dto.orderId;
    payment.amount = dto.amount;
    payment.currency = dto.currency ?? 'VND';
    payment.status = PaymentStatus.PENDING;
    payment.method = { id: dto.methodId } as PaymentMethod;

    return await this.repo.create(payment);
  }
}
