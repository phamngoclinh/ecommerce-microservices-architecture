import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { IEventBusClient } from '../event-bus-client.interface';

@Injectable()
export class RedisClientService implements IEventBusClient {
  private client: ClientProxy;
  private connected = false;

  constructor(private readonly configService: ConfigService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: this.configService.get<string>('REDIS_HOST') || 'localhost',
        port: this.configService.get<number>('REDIS_PORT') || 6379,
      },
    });
  }

  private async ensureConnected() {
    if (!this.connected) {
      await this.client.connect();
      this.connected = true;
      console.log('✅ Redis client connected');
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
