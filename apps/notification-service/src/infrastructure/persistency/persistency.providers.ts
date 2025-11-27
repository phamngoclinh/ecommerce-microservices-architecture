import { NOTIFICATION_MESSAGE_REPOSITORY } from '../di-tokens';
import { NotificationMessageRepositoryImpl } from './repositories/notification-message.repository.impl';

export const notificationPersistencyProviders = [
  {
    provide: NOTIFICATION_MESSAGE_REPOSITORY,
    useClass: NotificationMessageRepositoryImpl,
  },
];
