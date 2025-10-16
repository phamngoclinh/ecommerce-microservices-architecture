import { Product } from '@catalog/domain/entities/product.entity';

export interface CreateProductContext {
  product: Product | Product[];
}
