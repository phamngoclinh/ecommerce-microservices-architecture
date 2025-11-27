/**
 * Domain Layer - Repository Interface
 * Defines the contract for persisting notification messages
 */

import { MessageStatus, NotificationMessage } from '../entities/notification-message';

export interface INotificationMessageRepository {
  /**
   * Save a new notification message
   */
  save(message: NotificationMessage): Promise<NotificationMessage>;

  /**
   * Find a message by ID
   */
  findById(id: number): Promise<NotificationMessage | null>;

  /**
   * Find messages by status
   */
  findByStatus(status: MessageStatus): Promise<NotificationMessage[]>;

  /**
   * Find messages by recipient
   */
  findByRecipient(recipient: string): Promise<NotificationMessage[]>;

  /**
   * Find messages sent after a specific date
   */
  findBySentAfter(date: Date): Promise<NotificationMessage[]>;

  /**
   * Find messages with custom filters
   */
  findWithFilters(filters: {
    status?: MessageStatus;
    recipient?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }): Promise<NotificationMessage[]>;

  /**
   * Get statistics for a time period
   */
  getStats(hours: number): Promise<{
    total: number;
    sent: number;
    failed: number;
    pending: number;
  }>;
}
