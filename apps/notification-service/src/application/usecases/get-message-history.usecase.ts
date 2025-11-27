/**
 * Application Layer - Get Message History Use Case
 * Retrieves notification message history with various filters
 */

import type { MessageStatus, MessageType } from '../../domain/entities/notification-message';
import type { INotificationMessageRepository } from '../../domain/repositories/notification-message.repository';

export interface MessageHistoryQuery {
  status?: MessageStatus;
  recipient?: string;
  messageType?: MessageType;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}

export class GetMessageHistoryUseCase {
  constructor(private readonly repository: INotificationMessageRepository) {}

  async execute(query: MessageHistoryQuery) {
    return this.repository.findWithFilters({
      status: query.status,
      recipient: query.recipient,
      startDate: query.startDate,
      endDate: query.endDate,
      limit: query.limit,
    });
  }
}
