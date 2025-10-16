import { Body, Controller, Post } from '@nestjs/common';
import { CompleteOrderUseCase } from '@order/application/use-cases/orders/complete-order.usecase';
import { ConfirmOrderUseCase } from '@order/application/use-cases/orders/confirm-order.usecase';
import { CreateOrderUseCase } from '@order/application/use-cases/orders/create-order.usecase';
import { GetOrderUseCase } from '@order/application/use-cases/orders/get-order.usecase';
import { GetOrdersUseCase } from '@order/application/use-cases/orders/get-orders.usecase';
import { ShipOrderUseCase } from '@order/application/use-cases/orders/ship-order.usecase';
import type { CreateOrderDto } from '../dtos/create-order.dto';
import type { GetOrderDto } from '../dtos/get-order.dto';
import { OrderUseCaseMapper } from '../mappers/order-usecase.mapper';

@Controller('order')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrdersUseCase: GetOrdersUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly confirmOrderUseCase: ConfirmOrderUseCase,
    private readonly shipOrderUseCase: ShipOrderUseCase,
    private readonly completeOrderUseCase: CompleteOrderUseCase,
  ) {}

  @Post('create-order')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    const order = OrderUseCaseMapper.fromCreateOrderDto(createOrderDto);
    return this.createOrderUseCase.execute({
      order,
      paymentMethod: createOrderDto.paymentMethod,
    });
  }

  @Post('get-orders')
  getOrders() {
    return this.getOrdersUseCase.execute();
  }

  @Post('get-order')
  getOrder(@Body() getOrderDto: GetOrderDto) {
    return this.getOrderUseCase.execute(getOrderDto.id);
  }

  @Post('confirm-order')
  confirmOrder(@Body() data: { id: number }) {
    return this.confirmOrderUseCase.execute(data.id);
  }

  @Post('ship-order')
  shipOrder(@Body() data: { id: number }) {
    return this.shipOrderUseCase.execute(data.id);
  }

  @Post('complete-order')
  completeOrder(@Body() data: { id: number }) {
    return this.completeOrderUseCase.execute(data.id);
  }

  // @Post('order/cancel-order')
  // cancelOrder(@Body() getOrderDto: GetOrderDto) {
  //   return this.getOrderUseCase.execute(getOrderDto.id);
  // }
}
