import { CreateProductUseCase } from '@catalog/application/usecases/products/create-product.usecase';
import { GetProductUseCase } from '@catalog/application/usecases/products/get-product.usecase';
import { GetProductsUseCase } from '@catalog/application/usecases/products/get-products.usecase';
import { Product } from '@catalog/domain/entities/product.entity';
import { AuthGuard, IgnoreAuth } from '@libs/common/modules/auth/auth.guard';
import { Roles, RolesGuard } from '@libs/common/modules/auth/roles.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard, RolesGuard)
@Controller('product')
export class CatalogController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getroductsUseCase: GetProductsUseCase,
    private readonly getroductUseCase: GetProductUseCase,
  ) {}

  @Roles('admin')
  @Post('create-product')
  createProduct(@Body() product: Product | Product[]) {
    return this.createProductUseCase.execute(product);
  }

  @IgnoreAuth()
  @Post('get-products')
  getProducts() {
    return this.getroductsUseCase.execute();
  }

  @IgnoreAuth()
  @Post('get-product')
  getProduct(@Body() input: { id: number }) {
    return this.getroductUseCase.execute(input.id);
  }
}
