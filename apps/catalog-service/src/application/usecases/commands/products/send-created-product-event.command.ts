import { IInventoryGateway } from '@catalog/application/ports/inventory.gateway';
import { Product } from '@catalog/domain/entities/product.entity';
import { IUndoableCommand } from '@libs/common/patterns/command.pattern';

export class SendCreatedProductEventCommand implements IUndoableCommand {
  constructor(
    private readonly inventoryGateway: IInventoryGateway,
    private readonly product: Product | Product[],
  ) {}

  async execute(): Promise<void> {
    await this.inventoryGateway.productCreated(
      Array.isArray(this.product) ? this.product : [this.product],
    );
  }

  async undo(): Promise<void> {}
}
