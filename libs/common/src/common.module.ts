import { ProductEntity } from '@libs/database/entities/product.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from './common.service';
import { ProductRepository } from './repositories/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductRepository, CommonService],
  exports: [ProductRepository, CommonService],
})
export class CommonModule {}
