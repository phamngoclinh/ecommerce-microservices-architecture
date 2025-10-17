import { Body, Controller, Patch, Post } from '@nestjs/common';
import { PaymentService } from '@payment/application/services/payment.service';
import type { CreatePaymentDto } from './dtos/create-payment.dto';
import type { UpdatePaymentStatusDto } from './dtos/update-payment-status.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly service: PaymentService) {}

  @Post()
  async create(@Body() dto: CreatePaymentDto) {
    return await this.service.createPayment(dto);
  }

  @Patch()
  async updateStatus(@Body() dto: UpdatePaymentStatusDto) {
    return await this.service.updateStatus(dto);
  }
}
