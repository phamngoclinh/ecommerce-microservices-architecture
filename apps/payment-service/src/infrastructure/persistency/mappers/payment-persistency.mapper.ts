import { Payment } from '@payment/domain/entities/payment.entity';
import { PaymentMethodEntity } from '../entities/payment-method.entity';
import { PaymentTransactionEntity } from '../entities/payment-transaction.entity';
import { PaymentEntity } from '../entities/payment.entity';

export class PaymentPersistencyMapper {
  static toEntity(payment: Payment): PaymentEntity {
    const snapshot = payment.snapshot();
    const paymentEntity = new PaymentEntity();
    if (snapshot.id) paymentEntity.id = snapshot.id;
    paymentEntity.orderId = snapshot.orderId;
    paymentEntity.amount = snapshot.amount;
    paymentEntity.method = { id: snapshot.method.id } as PaymentMethodEntity;
    paymentEntity.currency = snapshot.currency || 'USD';
    if (snapshot.transactionId) paymentEntity.transactionId = snapshot.transactionId;
    paymentEntity.status = snapshot.status;
    paymentEntity.transactions = snapshot.transactions
      ? snapshot.transactions.map(tx => {
          const txEntity = new PaymentTransactionEntity();
          if (tx.id) txEntity.id = tx.id;
          txEntity.type = tx.type;
          txEntity.payload = tx.payload;
          txEntity.externalTxnId = tx.externalTxnId;
          return txEntity;
        })
      : [];
    return paymentEntity;
  }

  static toDomain(payment: PaymentEntity): Payment {
    return new Payment({
      id: payment.id,
      orderId: payment.orderId,
      amount: payment.amount,
      currency: payment.currency,
      transactionId: payment.transactionId,
      status: payment.status,
      method: {
        id: payment.method.id,
        displayName: payment.method.displayName,
        provider: payment.method.provider,
        isActive: payment.method.isActive,
      },
      transactions: payment.transactions
        ? payment.transactions.map(tx => ({
            id: tx.id,
            type: tx.type,
            payload: tx.payload,
            externalTxnId: tx.externalTxnId,
            message: tx.message,
          }))
        : [],
    } as Payment);
  }
}
