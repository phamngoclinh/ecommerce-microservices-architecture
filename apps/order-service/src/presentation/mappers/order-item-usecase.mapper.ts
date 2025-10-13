import { OrderItem } from '@order/domain/models/order-item.model';
import { CreateOrderItemDto } from '../dtos/create-order.dto';

export class OrderItemUseCaseMapper {
  static fromCreateOrderItemDto(dto: CreateOrderItemDto): OrderItem {
    const orderItem = new OrderItem(
      null,
      dto.orderId,
      dto.productId,
      dto.unitPrice,
      dto.quantity,
      dto.productName,
    );
    return orderItem;
  }
}
