import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { IPaymentGateway } from '@payment/application/ports/payment-gateway.interface';
import { PaymentProvider } from '@payment/domain/entities/payment-method.entity';

@Injectable()
export class PaymentGatewayAdapter implements IPaymentGateway {
  constructor(private readonly httpService: HttpService) {}

  async getPaymentUrl(orderId: number, amount: number, method: PaymentProvider): Promise<string> {
    // this.httpService.post('http://localhost:3004/payment-gateway-simulator/pay', {
    //   body: {
    //     orderId,
    //     amount,
    //     methodId,
    //   },
    // });

    const paymentUrl = `http://localhost:3004/payment-gateway-simulator/pay?orderId=${orderId}&amount=${amount}&method=${method}`;
    return Promise.resolve(paymentUrl);
  }
}
