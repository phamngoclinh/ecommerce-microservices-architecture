import { PaymentTransaction } from '@payment/domain/entities/payment-transaction.entity';
import { Payment } from '@payment/domain/entities/payment.entity';
import { PaymentTransactionEntity } from '../entities/payment-transaction.entity';
import { PaymentEntity } from '../entities/payment.entity';

export class PaymentTransactionPersistencyMapper {
  static toEntity(paymentTransaction: PaymentTransaction): PaymentTransactionEntity {
    const snapshot = paymentTransaction.snapshot();
    const paymentTransactionEntity = new PaymentTransactionEntity();
    if (snapshot.id) paymentTransactionEntity.id = snapshot.id;
    paymentTransactionEntity.type = snapshot.type;
    paymentTransactionEntity.payload = snapshot.payload;
    paymentTransactionEntity.externalTxnId = snapshot.externalTxnId;
    paymentTransactionEntity.message = snapshot.message;
    if (snapshot.payment && snapshot.payment.id) {
      paymentTransactionEntity.payment = { id: snapshot.payment.id } as PaymentEntity;
    }
    return paymentTransactionEntity;
  }

  static toDomain(paymentTransactionEntity: PaymentTransactionEntity): PaymentTransaction {
    const input = {
      id: paymentTransactionEntity.id,
      type: paymentTransactionEntity.type,
      payload: paymentTransactionEntity.payload,
      externalTxnId: paymentTransactionEntity.externalTxnId,
      message: paymentTransactionEntity.message,
    };
    if (paymentTransactionEntity.payment) {
      input['payment'] = new Payment({
        id: paymentTransactionEntity.payment.id,
        orderId: paymentTransactionEntity.payment.orderId,
        amount: paymentTransactionEntity.payment.amount,
        currency: paymentTransactionEntity.payment.currency,
        transactionId: paymentTransactionEntity.payment.transactionId,
        status: paymentTransactionEntity.payment.status,
      });
    }
    return new PaymentTransaction(input);
  }
}
