import { InventoryItem } from '@inventory/domain/entities/inventory-item.entity';
import { IInventoryItemRepository } from '@inventory/domain/repositories/inventory-item.repository';
import { IUsecase } from '@libs/common/application/use-cases/base.usecase';

interface GetInventoryItemInput {
  inventoryItemId: number;
}

export class GetInventoryItemUseCase extends IUsecase<GetInventoryItemInput, InventoryItem> {
  constructor(private readonly inventoryItemsRepository: IInventoryItemRepository) {
    super();
  }

  async execute({ inventoryItemId }: GetInventoryItemInput): Promise<InventoryItem> {
    const inventoryItem = await this.inventoryItemsRepository.getInventoryItem(inventoryItemId);
    if (inventoryItem === null) throw Error(`Inventory item ${inventoryItemId} is not existed`);
    return inventoryItem;
  }
}
