import { CreateProductUseCase } from '@catalog/application/usecases/products/create-product.usecase';
import { GetProductUseCase } from '@catalog/application/usecases/products/get-product.usecase';
import { GetProductsUseCase } from '@catalog/application/usecases/products/get-products.usecase';
import { Product } from '@catalog/domain/entities/product.entity';
import { AuthInterceptor } from '@libs/common/modules/auth/auth.interceptor';
import { ApplicationContextInterceptor } from '@libs/common/modules/context/application-context.interceptor';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';

@Controller('product')
@UseInterceptors(AuthInterceptor, ApplicationContextInterceptor)
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
