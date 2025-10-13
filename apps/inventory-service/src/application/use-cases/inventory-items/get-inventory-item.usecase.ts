import { InventoryItem } from '@inventory/domain/entities/inventory-item.entity';
import { IInventoryItemRepository } from '@inventory/domain/repositories/inventory-item.repository';
import { IUsecase } from '@libs/common/application/use-cases/base.usecase';

interface GetInventoryItemInput {
  productId: number;
}

export class GetInventoryItemUseCase extends IUsecase<GetInventoryItemInput, InventoryItem> {
  constructor(private readonly inventoryItemsRepository: IInventoryItemRepository) {
    super();
  }

  async execute(input: GetInventoryItemInput): Promise<InventoryItem> {
    const inventoryItem = await this.inventoryItemsRepository.getInventoryItemByProductId(
      input.productId,
    );
    if (inventoryItem === null) throw Error(`Inventory item ${input.productId} is not existed`);
    return inventoryItem;
  }
}
