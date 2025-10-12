import { Body, Controller, Post } from '@nestjs/common';
import { OrderUseCase } from '../application/use-cases/order.use-case';
import { OrderMapper } from '../infrastructure/persistency/mappers/order.mapper';
import type { CreateOrderDto } from './dtos/create-order.dto';
import type { GetOrderDto } from './dtos/get-order.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderUseCase: OrderUseCase) {}

  @Post('order/create-order')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    const order = OrderMapper.fromCreateOrderDto(createOrderDto);
    return this.orderUseCase.createOrder(order, createOrderDto.paymentMethod);
  }

  @Post('order/get-orders')
  getOrders() {
    return this.orderUseCase.getOrders();
  }

  @Post('order/get-order')
  getOrder(@Body() getOrderDto: GetOrderDto) {
    return this.orderUseCase.getOrder(getOrderDto.id);
  }
}
