import { PaymentProvider } from '@payment/domain/entities/payment-method.entity';
import { PaymentStatus } from '@payment/domain/entities/payment.entity';

export class PaymentStatusMapper {
  static map(gateway: PaymentProvider, rawStatus: string | number): PaymentStatus {
    switch (gateway) {
      case PaymentProvider.VNPAY:
        return this.mapVNPayStatus(rawStatus);
      case PaymentProvider.MOMO:
        return this.mapMomoStatus(rawStatus);
      case PaymentProvider.STRIPE:
        return this.mapStripeStatus(rawStatus as string);
      case PaymentProvider.PAYPAL:
        return this.mapPayPalStatus(rawStatus as string);
      default:
        return PaymentStatus.FAILED;
    }
  }

  private static mapVNPayStatus(code: string | number): PaymentStatus {
    switch (String(code)) {
      case '00':
        return PaymentStatus.SUCCESS;
      case '24':
        return PaymentStatus.CANCELLED;
      default:
        return PaymentStatus.FAILED;
    }
  }

  private static mapMomoStatus(code: string | number): PaymentStatus {
    switch (String(code)) {
      case '0':
        return PaymentStatus.SUCCESS;
      case '9000':
        return PaymentStatus.PENDING;
      case '1001':
        return PaymentStatus.CANCELLED;
      default:
        return PaymentStatus.FAILED;
    }
  }

  private static mapStripeStatus(code: string): PaymentStatus {
    switch (code) {
      case 'succeeded':
        return PaymentStatus.SUCCESS;
      case 'processing':
      case 'pending':
        return PaymentStatus.PENDING;
      case 'canceled':
        return PaymentStatus.CANCELLED;
      default:
        return PaymentStatus.FAILED;
    }
  }

  private static mapPayPalStatus(code: string): PaymentStatus {
    switch (code.toLowerCase()) {
      case 'completed':
        return PaymentStatus.SUCCESS;
      case 'pending':
        return PaymentStatus.PENDING;
      case 'canceled':
        return PaymentStatus.CANCELLED;
      default:
        return PaymentStatus.FAILED;
    }
  }
}
