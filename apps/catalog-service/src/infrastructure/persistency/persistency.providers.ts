import { IProductRepository } from '@catalog/domain/repositories/product.repository';
import { ProductRepository } from './repositories/product.repository';

export const CatalogPersistencyProviders = [
  {
    provide: IProductRepository,
    useClass: ProductRepository,
  },
];
