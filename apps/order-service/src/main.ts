import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RootModule } from './infrastructure/modules/root.module';

async function bootstrap() {
  const app = await NestFactory.create(RootModule, { cors: true });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.port ?? 3002);
}
bootstrap();
