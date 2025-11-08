import { IProductRepository } from '@catalog/domain/repositories/product.repository';
import { PersistencyProviders } from '@libs/common/infrastructure/persistency/providers/persistency.provider';
import { ProductRepository } from './repositories/product.repository';

export const CatalogPersistencyProviders = [
  {
    provide: IProductRepository,
    useClass: ProductRepository,
  },
  ...PersistencyProviders,
];
