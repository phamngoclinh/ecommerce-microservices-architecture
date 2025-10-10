import { Body, Controller, Post } from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import type { CreateOrderDto } from './dtos/create-order.dto';
import type { GetOrderDto } from './dtos/get-order.dto';

@Controller()
export class OrderServiceController {
  constructor(private readonly orderServiceService: OrderServiceService) {}

  @Post('create-order')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderServiceService.createOrder(createOrderDto);
  }

  @Post('get-orders')
  getOrders() {
    return this.orderServiceService.getOrders();
  }

  @Post('get-order')
  getOrder(@Body() getOrderDto: GetOrderDto) {
    return this.orderServiceService.getOrder(getOrderDto.id);
  }
}
