import { IInventoryGateway } from '@catalog/application/ports/inventory.gateway';
import { Product } from '@catalog/domain/entities/product.entity';
import { IProductRepository } from '@catalog/domain/repositories/product.repository';
import { IUsecase } from '@libs/common/application/use-cases/base.usecase';

export class CreateProductUseCase extends IUsecase<Product | Product[], Product | Product[]> {
  constructor(
    private readonly productsRepository: IProductRepository,
    private readonly inventoryGateway: IInventoryGateway,
  ) {
    super();
  }

  async execute(input: Product | Product[]): Promise<Product | Product[]> {
    const product = await this.productsRepository.createProduct(input);
    await this.inventoryGateway.productCreated(Array.isArray(product) ? product : [product]);
    return product;
  }
}
