import { Stock } from '../entities/stock.entity';

export abstract class IStockRepository {
  abstract getStock(id: number): Promise<Stock | null>;
  abstract getStockByInventoryItemId(inventoryItemId: number): Promise<Stock | null>;
  abstract getStocks(ids: number[]): Promise<Stock[]>;
  abstract saveStock(stock: Stock): Promise<Stock>;
}
