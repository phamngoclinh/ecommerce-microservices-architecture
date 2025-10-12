import { Cart, CartRead } from '../models/cart.model';
import { AddCartItemDto } from '../dtos/add-cart-item.dto';
import { CartEntity } from '../entities/cart.entity';

export class CartMapper {
  static toEntity(cart: Cart): CartEntity {
    const snapshot = cart.snapshot();
    const cartEntity = new CartEntity();
    if (snapshot.id) cartEntity.id = snapshot.id;
    cartEntity.productId = snapshot.productId;
    cartEntity.quantity = snapshot.quantity;
    cartEntity.unitPrice = snapshot.unitPrice;
    cartEntity.lineAmount = snapshot.lineAmount;
    return cartEntity;
  }

  static toCartRead(cart: CartEntity): CartRead {
    return new CartRead(cart.id, cart.productId, cart.unitPrice, cart.quantity, cart.productName);
  }

  static toDomain(cart: CartEntity): Cart {
    return new Cart(cart.id, cart.productId, cart.unitPrice, cart.quantity);
  }

  static fromAddCartItemDto(dto: AddCartItemDto): Cart {
    return new Cart(null, dto.productId, dto.unitPrice, dto.quantity);
  }
}
