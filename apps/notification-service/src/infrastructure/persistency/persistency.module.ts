import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigModule } from './database/database.config';
import { NotificationMessageEntity } from './entities/notification-message.entity';
import { notificationPersistencyProviders } from './persistency.providers';

@Module({
  imports: [DatabaseConfigModule, TypeOrmModule.forFeature([NotificationMessageEntity])],
  providers: [...notificationPersistencyProviders],
  exports: [...notificationPersistencyProviders],
})
export class PersistencyModule {}
