import { IInventoryGateway } from '@catalog/application/ports/inventory.gateway';
import { Product } from '@catalog/domain/entities/product.entity';
import { IProductRepository } from '@catalog/domain/repositories/product.repository';
import { IUsecase } from '@libs/common/application/use-cases/base.usecase';
import { CreateProductCommand } from '../commands/products/create-product.command';
import { CreateProductManager } from '../commands/products/create-product.manager';
import { SendCreatedProductEventCommand } from '../commands/products/send-created-product-event.command';

export class CreateProductUseCase extends IUsecase<Product | Product[], Product | Product[]> {
  constructor(
    private readonly productsRepository: IProductRepository,
    private readonly inventoryGateway: IInventoryGateway,
  ) {
    super();
  }

  async execute(input: Product | Product[]): Promise<Product | Product[]> {
    const createProductCommand = new CreateProductCommand(this.productsRepository, input);

    const manager = new CreateProductManager([
      createProductCommand,
      new SendCreatedProductEventCommand(this.inventoryGateway, input),
    ]);

    await manager.execute();

    return createProductCommand.getResult();
  }
}
