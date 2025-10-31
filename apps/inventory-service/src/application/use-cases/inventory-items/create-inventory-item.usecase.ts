import { InventoryItem } from '@inventory/domain/entities/inventory-item.entity';
import { Stock } from '@inventory/domain/entities/stock.entity';
import { IInventoryItemRepository } from '@inventory/domain/repositories/inventory-item.repository';
import { IStockRepository } from '@inventory/domain/repositories/stock.repository';
import { IUsecase } from '@libs/common/application/use-cases/base.usecase';

interface CreateInventoryItemInput {
  items: { productId: number; quantity?: number }[];
}

export class CreateInventoryItemUseCase extends IUsecase<
  CreateInventoryItemInput,
  InventoryItem[]
> {
  constructor(
    private readonly inventoryItemsRepository: IInventoryItemRepository,
    private readonly stocksRepository: IStockRepository,
  ) {
    super();
  }

  async execute({ items }: CreateInventoryItemInput): Promise<InventoryItem[]> {
    const result: InventoryItem[] = [];
    for (const item of items) {
      const { productId } = item;
      const inventoryItem = new InventoryItem(null, productId, true, [], []);
      const savedInventoryItem =
        await this.inventoryItemsRepository.saveInventoryItem(inventoryItem);
      await this.stocksRepository.saveStock(
        new Stock(null, { id: savedInventoryItem.id as number } as InventoryItem, 0, 0, 0),
      );
      result.push(inventoryItem);
    }
    return result;
  }
}
