import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaymentProvider } from '@payment/domain/entities/payment-method.entity';
import { IPaymentRepository } from '@payment/domain/repositories/payment.repository.interface';

@Controller('payment-gateway-simulator')
export class PaymentGatewaySimulatorController {
  constructor(
    private readonly paymentsRepository: IPaymentRepository,
    private readonly httpService: HttpService,
  ) {}

  @Get('/pay')
  pay(
    @Query('orderId') orderId: number,
    @Query('amount') amount: number,
    @Query('method') method: PaymentProvider,
  ) {
    return `this is a simulated payment gateway pay page for orderId=${orderId}, amount=${amount}, method=${method}`;
  }

  @Get('/pay/success/:orderId')
  async paySuccess(@Param('orderId') orderId: number) {
    // calling to webhook to update payment status
    async function delay(time: number) {
      return new Promise(resolve => setTimeout(resolve, time));
    }

    await delay(2000); // wait for 2 seconds

    const payment = await this.paymentsRepository.getPaymentIdOrderId(orderId);

    if (payment === null) return { success: false };

    await this.httpService.axiosRef.post(
      'http://localhost:3004/payments/webhook',
      {
        vendor: 'VNPAY',
        vendorStatus: '00',
        vendorTransactionId: `VENDOR_TXN_${Date.now()}`,
        payload: {
          paymentId: payment.id as number,
        },
      },
      {
        headers: {
          mode: 'cors',
          'Content-Type': 'application/json',
        },
      },
    );

    return { success: true };
  }

  @Get('/pay/failed/:orderId')
  async payFailed(@Param('orderId') orderId: number) {
    // calling to webhook to update payment status
    async function delay(time: number) {
      return new Promise(resolve => setTimeout(resolve, time));
    }

    await delay(2000); // wait for 2 seconds

    const payment = await this.paymentsRepository.getPaymentIdOrderId(orderId);

    if (payment === null) return { success: false };

    await this.httpService.axiosRef.post(
      'http://localhost:3004/payments/webhook',
      {
        vendor: 'VNPAY',
        vendorStatus: '11',
        vendorTransactionId: `VENDOR_TXN_${Date.now()}`,
        payload: {
          paymentId: payment.id as number,
        },
      },
      {
        headers: {
          mode: 'cors',
          'Content-Type': 'application/json',
        },
      },
    );

    return { success: true };
  }
}
