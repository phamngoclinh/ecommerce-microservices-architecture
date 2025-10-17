import { Module } from '@nestjs/common';
import { PaymentModule } from './payment.module';

@Module({
  imports: [PaymentModule],
})
export class AppModule {}
