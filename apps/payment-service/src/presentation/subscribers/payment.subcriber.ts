import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PaymentService } from '@payment/application/services/payment.service';
import type { CreatePaymentDto } from '../controllers/dtos/create-payment.dto';

@Controller()
export class PaymentSubscriber {
  constructor(private readonly service: PaymentService) {}

  @EventPattern('order.payment.requested')
  async handleOrderPayment(@Payload() payload: CreatePaymentDto) {
    console.log('Received payment event:', payload);
    const result = await this.service.createPayment(payload);
    console.log('Payment created:', result);
  }
}
