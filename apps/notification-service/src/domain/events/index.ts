/**
 * Domain Layer - Domain Events
 * Events that occur in the notification domain
 */

import { NotificationMessage } from '../entities/notification-message';

export abstract class DomainEvent {
  abstract readonly eventName: string;
  readonly occurredAt: Date = new Date();
  readonly aggregateId: number;

  constructor(aggregateId: number) {
    this.aggregateId = aggregateId;
  }
}

export class MessageSentEvent extends DomainEvent {
  readonly eventName = 'MessageSent';

  constructor(
    aggregateId: number,
    readonly message: NotificationMessage,
  ) {
    super(aggregateId);
  }
}

export class MessageFailedEvent extends DomainEvent {
  readonly eventName = 'MessageFailed';

  constructor(
    aggregateId: number,
    readonly message: NotificationMessage,
    readonly error: string,
  ) {
    super(aggregateId);
  }
}

export class MessageCreatedEvent extends DomainEvent {
  readonly eventName = 'MessageCreated';

  constructor(
    aggregateId: number,
    readonly message: NotificationMessage,
  ) {
    super(aggregateId);
  }
}
