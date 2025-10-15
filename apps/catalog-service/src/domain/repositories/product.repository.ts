import { Product } from '../entities/product.entity';

export abstract class IProductRepository {
  abstract createProduct(product: Product | Product[]): Promise<Product | Product[]>;

  abstract getProducts(): Promise<Product[]>;

  abstract getProduct(id: number): Promise<Product | null>;

  abstract deleteProduct(id: number): Promise<void>;

  abstract deleteProducts(id: number[]): Promise<void>;
}
