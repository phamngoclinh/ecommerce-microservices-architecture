import { Product } from '@catalog/domain/entities/product.entity';

export interface IInventoryGateway {
  productCreated(product: Product[]): Promise<{ success: boolean }>;
}
