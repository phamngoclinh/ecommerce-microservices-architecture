import { Product } from '@catalog/domain/entities/product.entity';
import { IProductRepository } from '@catalog/domain/repositories/product.repository';
import { IUsecase } from '@libs/common/application/use-cases/base.usecase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateProductUseCase extends IUsecase<Product | Product[], Product | Product[]> {
  constructor(private readonly productsRepository: IProductRepository) {
    super();
  }

  async execute(input: Product | Product[]): Promise<Product | Product[]> {
    return this.productsRepository.createProduct(input);
  }
}
