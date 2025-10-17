import { PaymentMethod } from './payment-method.entity';
import { PaymentTransaction } from './payment-transaction.entity';

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export class Payment {
  public readonly id: number | null = null;

  orderId: number; // ID của đơn hàng tương ứng (lấy từ Order service)

  method: PaymentMethod;

  status: PaymentStatus;

  amount: number;

  currency: string;

  transactionId?: string;

  transactions: PaymentTransaction[];

  constructor(props?: Partial<Payment>) {
    if (props) {
      Object.assign(this, props);
    }
  }

  snapshot() {
    return {
      id: this.id,
      orderId: this.orderId,
      method: this.method,
      status: this.status,
      amount: this.amount,
      currency: this.currency,
      transactionId: this.transactionId,
      transactions: this.transactions,
    };
  }
}
