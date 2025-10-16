import { Observable } from 'rxjs';

export interface IEventBusClient {
  emit(pattern: string, data: any): Promise<void>;
  send<TResult = any, TInput = any>(pattern: string, data: TInput): Promise<Observable<TResult>>;
}
