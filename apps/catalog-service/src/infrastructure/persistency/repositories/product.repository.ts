import { Product } from '@catalog/domain/entities/product.entity';
import { IProductRepository } from '@catalog/domain/repositories/product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductPersistencyMapper } from '../mappers/product-persistency.mapper';

export class ProductRepository extends IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {
    super();
  }

  async createProduct(product: Product | Product[]): Promise<Product | Product[]> {
    if (Array.isArray(product)) {
      const entities = await this.productRepository.save(
        ProductPersistencyMapper.toEntities(product),
      );
      return ProductPersistencyMapper.toDomains(entities);
    }
    const entity = this.productRepository.create(ProductPersistencyMapper.toEntity(product));
    return ProductPersistencyMapper.toDomain(entity);
  }

  async getProducts(): Promise<Product[]> {
    const entities = await this.productRepository.find();
    return ProductPersistencyMapper.toDomains(entities);
  }

  async getProduct(id: number): Promise<Product | null> {
    const entity = await this.productRepository.findOneBy({ id });
    if (entity === null) return null;
    return ProductPersistencyMapper.toDomain(entity);
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async deleteProducts(ids: number[]): Promise<void> {
    await this.productRepository.delete({ id: In(ids) });
  }
}
