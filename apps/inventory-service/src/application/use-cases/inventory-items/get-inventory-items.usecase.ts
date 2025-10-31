import { IInventoryItemRepository } from '@inventory/domain/repositories/inventory-item.repository';
import { IStockRepository } from '@inventory/domain/repositories/stock.repository';
import { IUsecase } from '@libs/common/application/use-cases/base.usecase';

type GetInventoryItemOutput = {
  id: number;
  inventoryItemId: number;
  productId?: number;
  onHandQty: number;
  reservedQty: number;
  availableQty: number;
};

export class GetInventoryItemsUseCase extends IUsecase<undefined, GetInventoryItemOutput[]> {
  constructor(
    private readonly inventoryItemsRepository: IInventoryItemRepository,
    private readonly stocksRepository: IStockRepository,
  ) {
    super();
  }

  async execute(): Promise<GetInventoryItemOutput[]> {
    const items = await this.inventoryItemsRepository.getInventoryItems();
    const stocks = await this.stocksRepository.getStocks(items.map(it => it.id as number));
    console.log('stocks', stocks, items);
    return stocks.map(stock => ({
      id: stock.inventoryItem.id as number,
      inventoryItemId: stock.inventoryItem.id as number,
      productId: stock.inventoryItem.productId,
      onHandQty: stock.onHandQty,
      reservedQty: stock.reservedQty,
      availableQty: stock.availableQty,
    }));
  }
}
