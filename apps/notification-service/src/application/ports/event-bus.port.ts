/**
 * Application Layer - Domain Event Bus Port
 * Defines the interface for publishing domain events
 * Implementation is in infrastructure layer
 */

import { DomainEvent } from '../../domain/events';

export interface IDomainEventBus {
  publish(event: DomainEvent): Promise<void>;
  subscribe(eventName: string, handler: (event: DomainEvent) => Promise<void>): void;
}
