import { Product } from '@catalog/domain/entities/product.entity';
import { IProductRepository } from '@catalog/domain/repositories/product.repository';
import { IUsecase } from '@libs/common/application/use-cases/base.usecase';

export class GetProductsUseCase extends IUsecase<unknown, Product[]> {
  constructor(private readonly productsRepository: IProductRepository) {
    super();
  }

  async execute(): Promise<Product[]> {
    return this.productsRepository.getProducts();
  }
}
