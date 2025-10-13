import { OrderItem } from '@order/domain/models/order-item.model';
import { OrderItemEntity } from '../entities/order-item.entity';
import { OrderEntity } from '../entities/order.entity';

export class OrderItemPersistencyMapper {
  static toEntity(orderItem: OrderItem): OrderItemEntity {
    const snapshot = orderItem.snapshot();
    const orderItemEntity = new OrderItemEntity();
    if (snapshot.id) orderItemEntity.id = snapshot.id;
    orderItemEntity.order = { id: snapshot.orderId } as OrderEntity;
    orderItemEntity.productId = snapshot.productId;
    orderItemEntity.quantity = snapshot.quantity;
    orderItemEntity.unitPrice = snapshot.unitPrice;
    orderItemEntity.lineAmount = snapshot.lineAmount;
    orderItemEntity.productName = snapshot.productName;
    return orderItemEntity;
  }

  static toDomain(orderItem: OrderItemEntity): OrderItem {
    return new OrderItem(
      orderItem.id,
      orderItem.order.id,
      orderItem.productId,
      orderItem.unitPrice,
      orderItem.quantity,
      orderItem.productName,
    );
  }
}
