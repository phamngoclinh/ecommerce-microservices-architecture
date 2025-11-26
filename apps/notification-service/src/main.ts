import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NotificationServiceModule } from './notification-service.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationServiceModule);

  const configService = app.get(ConfigService);

  const appPort = configService.get<number>('NOTIFICATION_APP_PORT') || 4006;

  await app.listen(appPort);
}
bootstrap();
