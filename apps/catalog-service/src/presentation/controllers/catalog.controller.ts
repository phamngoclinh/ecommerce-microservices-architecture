import { CreateProductUseCase } from '@catalog/application/use-cases/products/create-product.usecase';
import { GetProductUseCase } from '@catalog/application/use-cases/products/get-product.usecase';
import { GetProductsUseCase } from '@catalog/application/use-cases/products/get-products.usecase';
import { Product } from '@catalog/domain/entities/product.entity';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('product')
export class CatalogController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getroductsUseCase: GetProductsUseCase,
    private readonly getroductUseCase: GetProductUseCase,
  ) {}

  @Post('create-product')
  createProduct(@Body() product: Product | Product[]) {
    return this.createProductUseCase.execute(product);
  }

  @Post('get-products')
  getProducts() {
    return this.getroductsUseCase.execute();
  }

  @Post('get-product')
  getProduct(@Body() input: { id: number }) {
    return this.getroductUseCase.execute(input.id);
  }
}
