import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CheckStockDto } from '@order/application/ports/check-stock.dto';
import { CheckStockResponseDto } from '@order/application/ports/check-stock.response';
import { InventoryItemResponseDto } from '@order/application/ports/inventory-item.response';
import { IInventoryGateway } from '@order/application/ports/inventory.gateway';

@Injectable()
export class InventoryHttpGateway implements IInventoryGateway {
  constructor(private readonly http: HttpService) {}

  private host: string = 'http://localhost:3003/inventory';

  async post<TInput, TOutput>(endpoint: string, data: TInput): Promise<TOutput> {
    try {
      const response = await this.http.axiosRef.post(`${this.host}${endpoint}`, data, {
        headers: {
          mode: 'cors',
          'Content-Type': 'application/json',
        },
      });
      return response.data as TOutput;
    } catch (error: any) {
      console.error(error);
      throw Error('Failed to calling inventory service!');
    }
  }

  async checkStock(data: CheckStockDto): Promise<CheckStockResponseDto> {
    return this.post<CheckStockDto, CheckStockResponseDto>('/check-stock', data);
  }

  async findBestInventoryItem(productIds: number[]): Promise<InventoryItemResponseDto[]> {
    return this.post<{ items: { productId: number }[] }, InventoryItemResponseDto[]>(
      '/allocate-item',
      {
        items: productIds.map(productId => ({ productId })),
      },
    );
  }
}
