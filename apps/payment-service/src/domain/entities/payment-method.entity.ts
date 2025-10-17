import { Payment } from './payment.entity';

export enum PaymentProvider {
  VNPAY = 'VNPAY',
  MOMO = 'MOMO',
  ZALOPAY = 'ZALOPAY',
  PAYPAL = 'PAYPAL',
  STRIPE = 'STRIPE',
  COD = 'COD',
}

export class PaymentMethod {
  public readonly id: number | null = null;

  provider: PaymentProvider;

  displayName: string;

  isActive: boolean;

  payments: Payment[];

  constructor(props?: Partial<PaymentMethod>) {
    if (props) {
      Object.assign(this, props);
    }
  }

  snapshot() {
    return {
      id: this.id,
      provider: this.provider,
      displayName: this.displayName,
      isActive: this.isActive,
    };
  }
}
