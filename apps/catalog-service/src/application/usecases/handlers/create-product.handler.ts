import { IProductRepository } from '@catalog/domain/repositories/product.repository';
import { CoRHandler } from '@libs/common/patterns/cor.pattern';
import { CreateProductContext } from './create-product.context';

export class CreateProductHandler extends CoRHandler<CreateProductContext> {
  constructor(private readonly productsRepository: IProductRepository) {
    super();
  }

  async handle(context: CreateProductContext): Promise<void> {
    const created = await this.productsRepository.createProduct(context.product);
    context.product = created;
    await super.handle(context);
  }
}
