/**
 * Application Layer - Use Cases Module
 * Provides all application use cases with proper DI wiring
 */

import { Module } from '@nestjs/common';
import type { IEmailProvider } from '@notification//application/ports/email-provider.port';
import type { IDomainEventBus } from '@notification//application/ports/event-bus.port';
import type { INotificationMessageRepository } from '@notification//domain/repositories/notification-message.repository';
import { GetDeliveryStatsUseCase } from '@notification/application/usecases/get-delivery-stats.usecase';
import { GetFailedMessagesUseCase } from '@notification/application/usecases/get-failed-messages.usecase';
import { GetMessageHistoryUseCase } from '@notification/application/usecases/get-message-history.usecase';
import { GetRecipientHistoryUseCase } from '@notification/application/usecases/get-recipient-history.usecase';
import { SendEmailUseCase } from '@notification/application/usecases/send-email.usecase';
import { NotificationMessageController } from '@notification/presentation/controllers/notification-message.controller';
import { InMemoryEventBus } from '../adapters/in-memory-event-bus.adapter';
import { MailerEmailProvider } from '../adapters/mailer-email-provider.adapter';
import { DOMAIN_EVENT_BUS, EMAIL_PROVIDER, NOTIFICATION_MESSAGE_REPOSITORY } from '../di-tokens';
import { PersistencyModule } from '../persistency/persistency.module';

@Module({
  imports: [PersistencyModule],
  controllers: [NotificationMessageController],
  providers: [
    {
      provide: EMAIL_PROVIDER,
      useClass: MailerEmailProvider,
    },
    {
      provide: DOMAIN_EVENT_BUS,
      useClass: InMemoryEventBus,
    },
    {
      provide: SendEmailUseCase,
      inject: [NOTIFICATION_MESSAGE_REPOSITORY, EMAIL_PROVIDER, DOMAIN_EVENT_BUS],
      useFactory: (
        repository: INotificationMessageRepository,
        emailProvider: IEmailProvider,
        eventBus: IDomainEventBus,
      ) => new SendEmailUseCase(repository, emailProvider, eventBus),
    },
    {
      provide: GetMessageHistoryUseCase,
      inject: [NOTIFICATION_MESSAGE_REPOSITORY],
      useFactory: (repository: INotificationMessageRepository) =>
        new GetMessageHistoryUseCase(repository),
    },
    {
      provide: GetDeliveryStatsUseCase,
      inject: [NOTIFICATION_MESSAGE_REPOSITORY],
      useFactory: (repository: INotificationMessageRepository) =>
        new GetDeliveryStatsUseCase(repository),
    },
    {
      provide: GetRecipientHistoryUseCase,
      inject: [NOTIFICATION_MESSAGE_REPOSITORY],
      useFactory: (repository: INotificationMessageRepository) =>
        new GetRecipientHistoryUseCase(repository),
    },
    {
      provide: GetFailedMessagesUseCase,
      inject: [NOTIFICATION_MESSAGE_REPOSITORY],
      useFactory: (repository: INotificationMessageRepository) =>
        new GetFailedMessagesUseCase(repository),
    },
  ],
  exports: [
    SendEmailUseCase,
    GetMessageHistoryUseCase,
    GetDeliveryStatsUseCase,
    GetRecipientHistoryUseCase,
    GetFailedMessagesUseCase,
  ],
})
export class NotificationMessageModule {}
