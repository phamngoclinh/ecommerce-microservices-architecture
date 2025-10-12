import { CreateOrderItemDto } from '../dtos/create-order.dto';
import { OrderItemEntity } from '../entities/order-item.entity';
import { OrderItem } from '../models/order-item.model';

export class OrderItemMapper {
  static toEntity(orderItem: OrderItem): OrderItemEntity {
    const snapshot = orderItem.snapshot();
    const orderItemEntity = new OrderItemEntity();
    if (snapshot.id) orderItemEntity.id = snapshot.id;
    orderItemEntity.productId = snapshot.productId;
    orderItemEntity.quantity = snapshot.quantity;
    orderItemEntity.unitPrice = snapshot.unitPrice;
    orderItemEntity.lineAmount = snapshot.lineAmount;
    return orderItemEntity;
  }

  static toDomain(orderItem: OrderItemEntity): OrderItem {
    return new OrderItem(
      orderItem.id,
      orderItem.order.id,
      orderItem.productId,
      orderItem.unitPrice,
      orderItem.quantity,
    );
  }

  static fromCreateOrderItemDto(dto: CreateOrderItemDto): OrderItem {
    const orderItem = new OrderItem(null, dto.orderId, dto.productId, dto.unitPrice, dto.quantity);
    return orderItem;
  }
}
