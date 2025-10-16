import { Product } from '@catalog/domain/entities/product.entity';
import { IUsecase } from '@libs/common/application/use-cases/base.usecase';
import { CreateProductContext } from '../handlers/create-product.context';
import { CreateProductHandler } from '../handlers/create-product.handler';
import { SendCreatedProductEventHandler } from '../handlers/send-created-product-event.handler';

export class CreateProductUseCase extends IUsecase<Product | Product[], Product | Product[]> {
  constructor(
    private readonly createProductHandler: CreateProductHandler,
    private readonly sendCreatedProductEventHandler: SendCreatedProductEventHandler,
  ) {
    super();
  }

  async execute(product: Product | Product[]): Promise<Product | Product[]> {
    const context: CreateProductContext = { product };
    this.createProductHandler.setNext(this.sendCreatedProductEventHandler);
    const chain = this.createProductHandler;
    await chain.handle(context);

    return context.product;
  }
}
