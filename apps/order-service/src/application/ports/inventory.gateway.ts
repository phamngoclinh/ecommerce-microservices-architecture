import { CheckStockDto } from './check-stock.dto';
import { CheckStockResponseDto } from './check-stock.response';
import { InventoryItemResponseDto } from './inventory-item.response';
import { ReserveStockDto } from './reserve-stock.dto';
import { ReserveStockResponseDto } from './reserve-stock.response';

export interface IInventoryGateway {
  reserve(data: ReserveStockDto): Promise<ReserveStockResponseDto>;
  confirm(orderId: number): Promise<{ success: boolean }>;
  release(orderId: number): Promise<{ success: boolean }>;
  checkStock(data: CheckStockDto): Promise<CheckStockResponseDto>;
  findBestInventoryItem(productIds: number[]): Promise<InventoryItemResponseDto[]>;
}
