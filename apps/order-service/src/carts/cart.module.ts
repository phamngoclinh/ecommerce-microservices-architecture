import { DatabaseModule } from '@libs/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { CartController } from './cart.controller';
import { CartRepository } from './repositories/cart.repository';
import { CartService } from './cart.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([CartEntity])],
  controllers: [CartController],
  providers: [CartRepository, CartService],
})
export class CartModule {}
