/**
 * Application Layer - Get Failed Messages Use Case
 * Retrieves messages that failed to send
 */

import { MessageStatus } from '../../domain/entities/notification-message';
import type { INotificationMessageRepository } from '../../domain/repositories/notification-message.repository';

export class GetFailedMessagesUseCase {
  constructor(private readonly repository: INotificationMessageRepository) {}

  async execute(limit: number = 100) {
    return this.repository.findWithFilters({
      status: MessageStatus.FAILED,
      limit,
    });
  }
}
