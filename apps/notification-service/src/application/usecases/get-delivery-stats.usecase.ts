/**
 * Application Layer - Get Delivery Stats Use Case
 * Retrieves delivery statistics for a given time period
 */

import type { INotificationMessageRepository } from '../../domain/repositories/notification-message.repository';

export interface DeliveryStats {
  period: string;
  total: number;
  sent: number;
  failed: number;
  pending: number;
  successRate: string;
}

export class GetDeliveryStatsUseCase {
  constructor(private readonly repository: INotificationMessageRepository) {}

  async execute(hours: number = 24): Promise<DeliveryStats> {
    const stats = await this.repository.getStats(hours);

    return {
      period: `Last ${hours} hours`,
      total: stats.total,
      sent: stats.sent,
      failed: stats.failed,
      pending: stats.pending,
      successRate: stats.total > 0 ? ((stats.sent / stats.total) * 100).toFixed(2) : '0',
    };
  }
}
