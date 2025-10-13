import { InventoryItem } from '@inventory/domain/entities/inventory-item.entity';
import { IInventoryItemRepository } from '@inventory/domain/repositories/inventory-item.repository';
import { IUsecase } from '@libs/common/application/use-cases/base.usecase';

interface CreateInventoryItemInput {
  productId: number;
}

export class CreateInventoryItemUseCase extends IUsecase<CreateInventoryItemInput, InventoryItem> {
  constructor(private readonly inventoryItemsRepository: IInventoryItemRepository) {
    super();
  }

  async execute(input: CreateInventoryItemInput): Promise<InventoryItem> {
    const inventoryItem = await this.inventoryItemsRepository.saveInventoryItem(
      new InventoryItem(null, input.productId, true, [], []),
    );
    return inventoryItem;
  }
}
