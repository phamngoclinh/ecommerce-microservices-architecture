/**
 * Infrastructure Layer - Domain Event Bus Implementation
 * Simple in-memory event bus for local event handling
 */

import { Injectable, Logger } from '@nestjs/common';
import { IDomainEventBus } from '../../application/ports/event-bus.port';
import { DomainEvent } from '../../domain/events';

@Injectable()
export class InMemoryEventBus implements IDomainEventBus {
  private readonly logger = new Logger(InMemoryEventBus.name);
  private readonly handlers = new Map<string, ((event: DomainEvent) => Promise<void>)[]>();

  async publish(event: DomainEvent): Promise<void> {
    this.logger.debug(`Publishing event: ${event.eventName} for aggregate ${event.aggregateId}`);
    const eventHandlers = this.handlers.get(event.eventName);

    if (!eventHandlers || eventHandlers.length === 0) {
      this.logger.debug(`No handlers registered for event: ${event.eventName}`);
      return;
    }

    await Promise.all(
      eventHandlers.map(handler =>
        handler(event).catch(error => {
          this.logger.error(`Error handling event ${event.eventName}:`, error);
        }),
      ),
    );
  }

  subscribe(eventName: string, handler: (event: DomainEvent) => Promise<void>): void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)!.push(handler);
    this.logger.debug(`Handler registered for event: ${eventName}`);
  }
}
