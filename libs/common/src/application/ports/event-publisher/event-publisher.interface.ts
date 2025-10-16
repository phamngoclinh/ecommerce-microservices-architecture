export interface IEventPublisher {
  publish<TData>(event: string, data: TData): Promise<void>;
}
