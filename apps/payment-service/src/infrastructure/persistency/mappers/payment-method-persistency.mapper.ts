import { PaymentMethod } from '@payment/domain/entities/payment-method.entity';
import { PaymentMethodEntity } from '../entities/payment-method.entity';

export class PaymentMethodPersistencyMapper {
  static toEntity(paymentMethod: PaymentMethod): PaymentMethodEntity {
    const snapshot = paymentMethod.snapshot();
    const paymentMethodEntity = new PaymentMethodEntity();
    if (snapshot.id) paymentMethodEntity.id = snapshot.id;
    paymentMethodEntity.displayName = snapshot.displayName;
    paymentMethodEntity.provider = snapshot.provider;
    paymentMethodEntity.isActive = snapshot.isActive;
    return paymentMethodEntity;
  }

  static toDomain(paymentMethodEntity: PaymentMethodEntity): PaymentMethod {
    return new PaymentMethod({
      id: paymentMethodEntity.id,
      displayName: paymentMethodEntity.displayName,
      provider: paymentMethodEntity.provider,
      isActive: paymentMethodEntity.isActive,
    });
  }
}
