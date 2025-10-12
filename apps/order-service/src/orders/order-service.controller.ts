import { Body, Controller, Post } from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import type { CreateOrderDto } from './dtos/create-order.dto';
import type { GetOrderDto } from './dtos/get-order.dto';
import { OrderMapper } from './mappers/order.mapper';

@Controller()
export class OrderServiceController {
  constructor(private readonly orderServiceService: OrderServiceService) {}

  @Post('order/create-order')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    const order = OrderMapper.fromCreateOrderDto(createOrderDto);
    return this.orderServiceService.createOrder(order, createOrderDto.paymentMethod);
  }

  @Post('order/get-orders')
  getOrders() {
    return this.orderServiceService.getOrders();
  }

  @Post('order/get-order')
  getOrder(@Body() getOrderDto: GetOrderDto) {
    return this.orderServiceService.getOrder(getOrderDto.id);
  }
}
