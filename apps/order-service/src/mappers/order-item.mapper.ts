import { OrderItemEntity } from '@libs/database/entities/order-item.entity';
import { ProductEntity } from '@libs/database/entities/product.entity';
import { OrderItem } from '../models/order-item.model';
import { CreateOrderItemDto } from '../dtos/create-order.dto';

export class OrderItemMapper {
  static toEntity(orderItem: OrderItem): OrderItemEntity {
    const snapshot = orderItem.snapshot();
    const orderItemEntity = new OrderItemEntity();
    if (snapshot.id) orderItemEntity.id = snapshot.id;
    orderItemEntity.product = { id: snapshot.productId } as ProductEntity;
    orderItemEntity.quantity = snapshot.quantity;
    orderItemEntity.unitPrice = snapshot.unitPrice;
    orderItemEntity.lineAmount = snapshot.lineAmount;
    return orderItemEntity;
  }

  static toDomain(orderItem: OrderItemEntity): OrderItem {
    return new OrderItem(
      orderItem.id,
      orderItem.product.id,
      orderItem.unitPrice,
      orderItem.quantity,
    );
  }

  static fromCreateOrderItemDto(dto: CreateOrderItemDto): OrderItem {
    const orderItem = new OrderItem(
      dto.orderId || null,
      dto.productId,
      dto.unitPrice,
      dto.quantity,
    );
    return orderItem;
  }
}
