export class SendEmailDto {
  subject: string;

  message: string;

  to: string;

  correlationId?: string;
}

export class MessageHistoryQueryDto {
  status?: string;

  recipient?: string;

  messageType?: string;

  limit?: string;

  startDate?: string;

  endDate?: string;
}

export class DeliveryStatsDto {
  period: string;
  total: number;
  sent: number;
  failed: number;
  pending: number;
  successRate: string;
}
