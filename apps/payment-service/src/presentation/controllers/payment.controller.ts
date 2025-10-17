import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from '@payment/application/services/payment.service';
import { PaymentMethod, PaymentProvider } from '@payment/domain/entities/payment-method.entity';

@Controller('payments')
export class PaymentController {
  constructor(private readonly service: PaymentService) {}

  @Post('/methods')
  async getMethods() {
    return await this.service.getPaymentMethods();
  }

  @Post('/create-method')
  async createMethod(@Body() data: { displayName: string; provider: string }) {
    return await this.service.createPaymentMethod(
      new PaymentMethod({
        displayName: data.displayName,
        provider: data.provider as PaymentProvider,
      }),
    );
  }

  /**
   * Kiểm tra xem đã có payment record cho order chưa (được tạo từ event).
   *
   * Nếu chưa có, có thể:
   * - Đợi một chút (polling) để chờ record được tạo (nếu event vừa mới publish).
   * - Hoặc tự tạo tạm record nếu chưa có (và flag là "on-demand").
   *
   * Sau đó gọi Payment Gateway API để sinh paymentUrl (redirect URL).
   */
  @Post('/start')
  async startPayment(@Body() data: { orderId: number; amount: number; method: PaymentProvider }) {
    return await this.service.startPayment(data);
  }
}
