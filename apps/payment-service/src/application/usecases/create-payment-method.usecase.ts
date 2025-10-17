import { PaymentMethod } from '@payment/domain/entities/payment-method.entity';
import { IPaymentMethodRepository } from '@payment/domain/repositories/payment-method.repository.interface';

export class CreatePaymentMethodsUseCase {
  constructor(private readonly paymentMethodsRepository: IPaymentMethodRepository) {}

  async execute(paymentMethod: PaymentMethod): Promise<PaymentMethod> {
    return await this.paymentMethodsRepository.create(paymentMethod);
  }
}
