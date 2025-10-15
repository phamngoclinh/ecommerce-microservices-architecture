import { IInventoryGateway } from '@catalog/application/ports/inventory.gateway';
import { Product } from '@catalog/domain/entities/product.entity';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryHttpGateway implements IInventoryGateway {
  constructor(private readonly http: HttpService) {}

  private host: string = 'http://localhost:3003/inventory';

  async post<TInput, TOutput>(endpoint: string, data: TInput): Promise<TOutput> {
    try {
      const response = await this.http.axiosRef.post(`${this.host}${endpoint}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data as TOutput;
    } catch (error: any) {
      console.error(error);
      throw Error('Failed to calling inventory service!');
    }
  }

  async productCreated(data: Product[]): Promise<{ success: boolean }> {
    return this.post<{ items: { productId: number }[] }, { success: boolean }>('/create-item', {
      items: data.map(datum => ({ productId: datum.id as number })),
    });
  }
}
