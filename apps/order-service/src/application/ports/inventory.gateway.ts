import { CheckStockDto } from './check-stock.dto';
import { CheckStockResponseDto } from './check-stock.response';
import { InventoryItemResponseDto } from './inventory-item.response';

export abstract class IInventoryGateway {
  abstract checkStock(data: CheckStockDto): Promise<CheckStockResponseDto>;
  abstract findBestInventoryItem(productIds: number[]): Promise<InventoryItemResponseDto[]>;
}
