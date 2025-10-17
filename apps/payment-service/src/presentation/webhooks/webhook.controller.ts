import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PaymentService } from '@payment/application/services/payment.service';
import type { VendorPaymentWebhookDto } from './dtos/vendor-payment-webhook.dto';

@Controller('payments/webhook')
export class PaymentWebhookController {
  constructor(private readonly service: PaymentService) {}

  @Post()
  @HttpCode(200)
  async handleWebhook(@Body() dto: VendorPaymentWebhookDto) {
    return await this.service.handleVendorCallback({
      paymentId: dto.payload.paymentId,
      status: dto.vendorStatus,
      externalId: dto.vendorTransactionId,
    });
  }
}
