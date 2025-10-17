import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OrderStatus } from '@order/domain/models/order.model';
import { IOrderRepository } from '@order/domain/repositories/order.repository';

@Controller('order/subcriber')
export class OrderSubcriber {
  constructor(private readonly ordersRepository: IOrderRepository) {}

  @EventPattern('payment.successful')
  async handlePaymentSuccessuly(
    @Payload()
    data: {
      orderId: number;
      paymentId: number;
      amount: number;
    },
  ) {
    console.log('Received event payment.successful: ', data);
    await this.ordersRepository.updateStatus(data.orderId, OrderStatus.PAID);
  }
}
