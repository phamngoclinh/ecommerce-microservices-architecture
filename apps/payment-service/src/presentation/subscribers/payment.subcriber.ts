import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PaymentService } from '@payment/application/services/payment.service';
import { PaymentProvider } from '@payment/domain/entities/payment-method.entity';
import type { CreatePaymentDto } from './dtos/create-payment.dto';

@Controller('payment/subcriber')
export class PaymentSubscriber {
  constructor(private readonly service: PaymentService) {}

  @EventPattern('payment.requested')
  async handleOrderPayment(
    @Payload()
    data: {
      orderId: number;
      amount: number;
      paymentMethod: PaymentProvider;
    },
  ) {
    const methods = await this.service.getPaymentMethods();
    const method = methods.find(p => p.provider.toLowerCase() === data.paymentMethod.toLowerCase());
    if (!method) {
      throw new Error(`Payment method ${data.paymentMethod} not found`);
    }
    const payload: CreatePaymentDto = {
      orderId: data.orderId,
      amount: data.amount,
      method: data.paymentMethod,
    };
    console.log('Received payment event:', payload);
    const result = await this.service.createPayment({
      orderId: payload.orderId,
      amount: payload.amount,
      methodId: method.id as number,
    });
    console.log('Payment created:', result);
  }
}
