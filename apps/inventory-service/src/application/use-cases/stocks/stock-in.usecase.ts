import { InventoryItem } from '@inventory/domain/entities/inventory-item.entity';
import { Stock } from '@inventory/domain/entities/stock.entity';
import { IStockRepository } from '@inventory/domain/repositories/stock.repository';
import { IUsecase } from '@libs/common/application/use-cases/base.usecase';

interface StockInInput {
  items: { inventoryItemId: number; quantity: number }[];
}

export interface StockInResult {
  inventoryItemId: number;
  previousQuantity: number;
  newQuantity: number;
}

export class StockInUseCase extends IUsecase<StockInInput, StockInResult[]> {
  constructor(private readonly stocksRepository: IStockRepository) {
    super();
  }

  async execute({ items }: StockInInput): Promise<StockInResult[]> {
    if (!items.length) {
      throw new Error('No stock-in items provided');
    }

    const results: StockInResult[] = [];

    for (const item of items) {
      const { inventoryItemId, quantity } = item;
      if (quantity <= 0) {
        throw new Error(`Invalid stock-in quantity for item ${inventoryItemId}`);
      }

      const stock = await this.stocksRepository.getStockByInventoryItemId(inventoryItemId);
      if (stock) {
        const previousQuantity = stock.onHandQty;
        stock.stockIn(quantity);
        await this.stocksRepository.saveStock(stock);
        results.push({
          inventoryItemId,
          previousQuantity,
          newQuantity: stock.onHandQty,
        });
      } else {
        await this.stocksRepository.saveStock(
          new Stock(null, { id: inventoryItemId } as InventoryItem, quantity, 0, quantity),
        );
        results.push({
          inventoryItemId,
          previousQuantity: 0,
          newQuantity: quantity,
        });
      }
    }

    return results;
  }
}
