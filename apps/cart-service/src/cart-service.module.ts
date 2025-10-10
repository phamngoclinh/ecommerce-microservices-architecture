import { Module } from '@nestjs/common';
import { CartServiceController } from './cart-service.controller';
import { CartServiceService } from './cart-service.service';
import { DatabaseModule } from '@libs/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from '@libs/database/entities/cart.entity';
import { CartRepository } from './repositories/cart.repository';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([CartEntity])],
  controllers: [CartServiceController],
  providers: [CartRepository, CartServiceService],
})
export class CartServiceModule {}
