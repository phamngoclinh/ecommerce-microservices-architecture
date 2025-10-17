import { PaymentMethod } from '@payment/domain/entities/payment-method.entity';
import { IPaymentMethodRepository } from '@payment/domain/repositories/payment-method.repository.interface';

export class GetPaymentMethodsUseCase {
  constructor(private readonly paymentMethodsRepository: IPaymentMethodRepository) {}

  async execute(): Promise<PaymentMethod[]> {
    return await this.paymentMethodsRepository.getAll();
  }
}
