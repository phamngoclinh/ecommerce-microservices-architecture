import { NestFactory } from '@nestjs/core';
import { OrderServiceModule } from './orders/order-service.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderServiceModule, { cors: true });
  await app.listen(process.env.port ?? 3002);
}
bootstrap();
