import { InternalHttpClientService } from '@libs/common/modules/http-clients/internal-http-client.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CheckStockDto } from '@order/application/ports/check-stock.dto';
import { CheckStockResponseDto } from '@order/application/ports/check-stock.response';
import { InventoryItemResponseDto } from '@order/application/ports/inventory-item.response';
import { IInventoryGateway } from '@order/application/ports/inventory.gateway';

@Injectable()
export class InventoryHttpGateway implements IInventoryGateway {
  constructor(
    private readonly configService: ConfigService,
    private readonly internalHttpClientService: InternalHttpClientService,
  ) {}

  async post<TInput, TOutput>(endpoint: string, data: TInput): Promise<TOutput> {
    const host: string = `${this.configService.get<string>('ORDER_PAYMENT_SERVICE_URL')}/inventory`;
    return this.internalHttpClientService.post(`${host}${endpoint}`, data);
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
