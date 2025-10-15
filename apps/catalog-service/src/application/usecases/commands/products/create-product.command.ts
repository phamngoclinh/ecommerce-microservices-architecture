import { Product } from '@catalog/domain/entities/product.entity';
import { IProductRepository } from '@catalog/domain/repositories/product.repository';
import { IUndoableCommand } from '@libs/common/patterns/command.pattern';

export class CreateProductCommand implements IUndoableCommand {
  constructor(
    private readonly productsRepository: IProductRepository,
    private readonly product: Product | Product[],
  ) {}

  private result: Product | Product[] = [];

  async execute(): Promise<void> {
    const created = await this.productsRepository.createProduct(this.product);
    this.result = created;
  }

  async undo(): Promise<void> {
    const ids = Array.isArray(this.result)
      ? this.result.map(x => x.id as number)
      : [this.result.id as number];
    if (ids.length) {
      await this.productsRepository.deleteProducts(ids);
      this.result = [];
    }
  }

  getResult(): Product | Product[] {
    return this.result;
  }
}
