import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);

  const appPort = configService.get<number>('CATALOG_APP_PORT') || 4002;

  await app.startAllMicroservices();
  await app.listen(appPort);
}
bootstrap();
