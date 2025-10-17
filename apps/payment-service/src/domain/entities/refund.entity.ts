import { Payment } from './payment.entity';

export class Refund {
  public readonly id: number | null = null;

  payment: Payment;

  amount: number;

  reason?: string;

  externalRefundId?: string;

  constructor(props?: Partial<Refund>) {
    if (props) {
      Object.assign(this, props);
    }
  }

  snapshot() {
    return {
      id: this.id,
      payment: this.payment,
      amount: this.amount,
      reason: this.reason,
      externalRefundId: this.externalRefundId,
    };
  }
}
