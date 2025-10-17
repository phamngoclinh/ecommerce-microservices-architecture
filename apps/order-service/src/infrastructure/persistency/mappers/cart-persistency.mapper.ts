import { Cart } from '@order/domain/models/cart.model';
import { CartEntity } from '../entities/cart.entity';

export class CartPersistencyMapper {
  static toEntity(cart: Cart): CartEntity {
    const snapshot = cart.snapshot();
    const cartEntity = new CartEntity();
    if (snapshot.id) cartEntity.id = snapshot.id;
    cartEntity.productId = snapshot.productId;
    cartEntity.quantity = snapshot.quantity;
    cartEntity.unitPrice = snapshot.unitPrice;
    cartEntity.lineAmount = snapshot.lineAmount;
    cartEntity.productName = snapshot.productName;
    return cartEntity;
  }

  static toDomain(cart: CartEntity): Cart {
    return new Cart(cart.id, cart.productId, cart.unitPrice, cart.quantity, cart.productName);
  }
}
