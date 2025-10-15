import { InventoryItemAllocationService } from '@inventory/application/services/inventory-item-allocation/inventory-item-allocation.service';
import { IInventoryItemRepository } from '@inventory/domain/repositories/inventory-item.repository';
import { IUsecase } from '@libs/common/application/use-cases/base.usecase';

interface AllocateInventoryItemInput {
  items: { productId: number }[];
}

export interface AllocateInventoryItemOutput {
  productId: number;
  inventoryItemId: number;
}

export class AllocateInventoryItemUseCase extends IUsecase<
  AllocateInventoryItemInput,
  AllocateInventoryItemOutput[]
> {
  private inventoryItemAllocationService: InventoryItemAllocationService;

  constructor(private readonly inventoryItemsRepository: IInventoryItemRepository) {
    super();
    this.inventoryItemAllocationService = new InventoryItemAllocationService();
  }

  async execute({ items }: AllocateInventoryItemInput): Promise<AllocateInventoryItemOutput[]> {
    const productIds = items.map(item => item.productId);

    const inventoryItems =
      await this.inventoryItemsRepository.getInventoryItemsByProductIds(productIds);

    if (!inventoryItems.length)
      throw Error(`No inventory item was found for product id ${productIds.join(', ')}`);

    const result: AllocateInventoryItemOutput[] = [];

    for (const productId of productIds) {
      const items = inventoryItems.filter(x => x.productId === productId);
      const selected = this.inventoryItemAllocationService.allocate(items);
      result.push({
        productId,
        inventoryItemId: selected.inventoryItemId,
      });
    }

    return result;
  }
}
