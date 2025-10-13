import { Module } from '@nestjs/common';
import { CatalogModule } from './catalog.module';

@Module({
  imports: [CatalogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
