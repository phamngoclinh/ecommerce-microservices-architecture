import { Payment } from './payment.entity';

export enum TransactionType {
  REQUEST = 'REQUEST',
  RESPONSE = 'RESPONSE',
  CALLBACK = 'CALLBACK',
  REFUND = 'REFUND',
  RETRY = 'RETRY',
}

export class PaymentTransaction {
  public readonly id: number | null = null;

  payment: Payment;

  type: TransactionType;

  payload?: Record<string, any>; // dữ liệu gửi hoặc nhận

  externalTxnId?: string; // Mã giao dịch từ bên thứ ba

  message?: string; // Mô tả lỗi hoặc log

  constructor(props?: Partial<PaymentTransaction>) {
    if (props) {
      Object.assign(this, props);
    }
  }

  snapshot() {
    return {
      id: this.id,
      payment: this.payment,
      type: this.type,
      payload: this.payload,
      externalTxnId: this.externalTxnId,
      message: this.message,
    };
  }
}
