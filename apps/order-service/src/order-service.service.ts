import { Injectable } from '@nestjs/common';
import type { CreateOrderDto } from './dtos/create-order.dto';
import { DatabaseService } from '@libs/database';
import type { OrderDto } from './dtos/order.dto';

@Injectable()
export class OrderServiceService {
  constructor(private readonly databaseService: DatabaseService) {}

  createOrder(data: CreateOrderDto): Promise<OrderDto> {
    return this.databaseService.createOrder(data);
  }

  getOrders(): Promise<OrderDto[] | null> {
    return this.databaseService.getOrders();
  }

  getOrder(id: number): Promise<OrderDto | null> {
    return this.databaseService.getOrder(id);
  }
}
