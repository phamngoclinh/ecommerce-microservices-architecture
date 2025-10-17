import { PaymentProvider } from '@payment/domain/entities/payment-method.entity';

export interface VendorPaymentWebhookDto {
  payload: {
    paymentId: number;
    orderId?: number;
  };
  vendor: PaymentProvider;
  vendorStatus: string;
  vendorTransactionId: string;
}
