import { ClientProxy } from '@nestjs/microservices';

export abstract class IEventBusClient {
  protected client: ClientProxy;
  protected connected = false;
  protected name: string = 'EventBus';

  protected async ensureConnected() {
    if (!this.connected) {
      await this.client.connect();
      this.connected = true;
      console.log(`✅ ${this.name} client connected`);
    }
  }

  async emit(pattern: string, data: any) {
    await this.ensureConnected();
    this.client.emit(pattern, data);
  }

  async send<TResult = any, TInput = any>(pattern: string, data: TInput) {
    await this.ensureConnected();
    return this.client.send<TResult, TInput>(pattern, data);
  }
}
