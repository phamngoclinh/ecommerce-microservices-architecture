/**
 * Application Layer - Get Recipient History Use Case
 * Retrieves all messages sent to a specific recipient
 */

import type { INotificationMessageRepository } from '../../domain/repositories/notification-message.repository';

export class GetRecipientHistoryUseCase {
  constructor(private readonly repository: INotificationMessageRepository) {}

  async execute(recipient: string) {
    return this.repository.findByRecipient(recipient);
  }
}
