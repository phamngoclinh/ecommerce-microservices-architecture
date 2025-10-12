import { NestFactory } from '@nestjs/core';
import { RootModule } from './infrastructure/modules/root.module';

async function bootstrap() {
  const app = await NestFactory.create(RootModule, { cors: true });
  await app.listen(process.env.port ?? 3002);
}
bootstrap();
