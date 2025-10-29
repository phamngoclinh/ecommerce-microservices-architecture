import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPaymentGateway } from '@payment/application/ports/payment-gateway.interface';
import { PaymentProvider } from '@payment/domain/entities/payment-method.entity';

@Injectable()
export class PaymentGatewayAdapter implements IPaymentGateway {
  constructor(private readonly configService: ConfigService) {}

  async getPaymentUrl(orderId: number, amount: number, method: PaymentProvider): Promise<string> {
    const paymentUrl = `${this.configService.get<string>('PAYMENT_PROVIDER_URL')}/payment-gateway-simulator/pay?orderId=${orderId}&amount=${amount}&method=${method}`;
    return Promise.resolve(paymentUrl);
  }
}
