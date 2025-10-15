import { OrderItem } from '@order/domain/models/order-item.model';
import { CreateOrderItemDto } from '../dtos/create-order.dto';

export class OrderItemUseCaseMapper {
  static fromCreateOrderItemDto(dto: CreateOrderItemDto): OrderItem {
    const orderItem = new OrderItem(
      null,
      dto.orderId,
      0,
      dto.unitPrice,
      dto.quantity,
      dto.productId,
      dto.productName,
    );
    return orderItem;
  }
}
