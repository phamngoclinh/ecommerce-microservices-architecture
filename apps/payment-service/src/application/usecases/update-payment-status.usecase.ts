import { PaymentStatus } from '@payment/domain/entities/payment.entity';
import { IPaymentRepository } from '@payment/domain/repositories/payment.repository.interface';

export interface UpdatePaymentStatusInput {
  id: number;
  status: PaymentStatus;
}

export class UpdatePaymentStatusUseCase {
  constructor(private readonly repo: IPaymentRepository) {}

  async execute(dto: UpdatePaymentStatusInput) {
    return await this.repo.updateStatus(dto.id, dto.status);
  }
}
