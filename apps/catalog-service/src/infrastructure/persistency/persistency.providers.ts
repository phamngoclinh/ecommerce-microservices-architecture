import { IProductRepository } from '@catalog/domain/repositories/product.repository';
import { AuditSubscriber } from '@libs/common/infrastructure/persistency/subscribers/audit.subscriber';
import { ProductRepository } from './repositories/product.repository';

export const CatalogPersistencyProviders = [
  {
    provide: IProductRepository,
    useClass: ProductRepository,
  },
  AuditSubscriber,
];
