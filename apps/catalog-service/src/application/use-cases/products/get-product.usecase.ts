import { Product } from '@catalog/domain/entities/product.entity';
import { IProductRepository } from '@catalog/domain/repositories/product.repository';
import { IUsecase } from '@libs/common/application/use-cases/base.usecase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetProductUseCase extends IUsecase<number, Product | null> {
  constructor(private readonly productsRepository: IProductRepository) {
    super();
  }

  async execute(id: number): Promise<Product | null> {
    const product = await this.productsRepository.getProduct(id);
    if (product === null) return null;
    return product;
  }
}
