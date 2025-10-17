export interface CreatePaymentDto {
  orderId: number;
  amount: number;
  methodId: number;
  currency?: string;
}
