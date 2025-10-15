import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderUseCase } from '@order/application/use-cases/orders/create-order.usecase';
import { GetOrderUseCase } from '@order/application/use-cases/orders/get-order.usecase';
import { GetOrdersUseCase } from '@order/application/use-cases/orders/get-orders.usecase';
import type { CreateOrderDto } from '../dtos/create-order.dto';
import type { GetOrderDto } from '../dtos/get-order.dto';
import { OrderUseCaseMapper } from '../mappers/order-usecase.mapper';

@Controller()
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrdersUseCase: GetOrdersUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
  ) {}

  @Post('order/create-order')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    const order = OrderUseCaseMapper.fromCreateOrderDto(createOrderDto);
    return this.createOrderUseCase.execute({
      order,
      paymentMethod: createOrderDto.paymentMethod,
    });
  }

  @Post('order/get-orders')
  getOrders() {
    return this.getOrdersUseCase.execute();
  }

  @Post('order/get-order')
  getOrder(@Body() getOrderDto: GetOrderDto) {
    return this.getOrderUseCase.execute(getOrderDto.id);
  }

  // @Post('order/cancel-order')
  // cancelOrder(@Body() getOrderDto: GetOrderDto) {
  //   return this.getOrderUseCase.execute(getOrderDto.id);
  // }
}
