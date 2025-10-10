import { NestFactory } from '@nestjs/core';
import { CartServiceModule } from './cart-service.module';

async function bootstrap() {
  const app = await NestFactory.create(CartServiceModule, { cors: true });
  await app.listen(process.env.port ?? 3005);
}
bootstrap();
