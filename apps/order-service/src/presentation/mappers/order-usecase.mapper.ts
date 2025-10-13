import { Order } from '@order/domain/models/order.model';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderItemUseCaseMapper } from './order-item-usecase.mapper';

export class OrderUseCaseMapper {
  static fromCreateOrderDto(dto: CreateOrderDto): Order {
    const orderItems = dto.orderItems.map(item =>
      OrderItemUseCaseMapper.fromCreateOrderItemDto(item),
    );
    const order = new Order(null, orderItems, new Date());
    return order;
  }
}
