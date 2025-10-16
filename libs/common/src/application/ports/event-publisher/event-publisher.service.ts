import type { IEventBusClient } from '@libs/common/infrastructure/event-bus/event-bus-client.interface';
import { IEventPublisher } from './event-publisher.interface';

export class EventPublisherService implements IEventPublisher {
  constructor(private readonly eventBusClient: IEventBusClient) {}

  async publish<TData>(event: string, data: TData): Promise<void> {
    console.log('Publishing event:', event, data);
    await this.eventBusClient.emit(event, data);
  }
}
