import { OrderItem } from '@order/domain/models/order-item.model';
import { OrderItemResponse } from '../presenters/order-response';

export class OrderItemPresenterMapper {
  static fromOrderItem(orderItem: OrderItem): OrderItemResponse {
    return {
      id: orderItem.id as number,
      productId: orderItem.productId,
      productName: orderItem.productName,
      quantity: orderItem.quantity,
      unitPrice: orderItem.unitPrice,
      lineAmount: orderItem.lineAmount,
    };
  }
}
