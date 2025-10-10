import { ProductEntity } from '@libs/database/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(product: DeepPartial<ProductEntity>): Promise<ProductEntity> {
    const result = this.productsRepository.create(product);
    await this.productsRepository.save(product);
    return result;
  }

  getProducts(): Promise<ProductEntity[] | null> {
    return this.productsRepository.find();
  }

  getProduct(productId: number): Promise<ProductEntity | null> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }
}
