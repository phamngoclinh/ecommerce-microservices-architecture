import { Product } from '@catalog/domain/entities/product.entity';
import { ProductEntity } from '../entities/product.entity';

export class ProductPersistencyMapper {
  static toEntity(product: Product): ProductEntity {
    const entity = new ProductEntity();
    entity.name = product.name;
    entity.status = product.status;
    entity.price = product.price;
    return entity;
  }

  static toEntities(products: Product[]): ProductEntity[] {
    return products.map(product => ProductPersistencyMapper.toEntity(product));
  }

  static toDomain(entity: ProductEntity): Product {
    return new Product(entity.id, entity.name, entity.status, entity.price);
  }

  static toDomains(entities: ProductEntity[]): Product[] {
    return entities.map(entity => ProductPersistencyMapper.toDomain(entity));
  }
}
