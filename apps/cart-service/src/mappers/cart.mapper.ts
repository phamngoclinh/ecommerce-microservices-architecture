import { ProductEntity } from '@libs/database/entities/product.entity';
import { CartEntity } from '@libs/database/entities/cart.entity';
import { Cart } from '../models/cart.model';
import { AddCartItemDto } from '../dtos/add-cart-item.dto';

export class CartMapper {
  static toEntity(cart: Cart): CartEntity {
    const snapshot = cart.snapshot();
    const cartEntity = new CartEntity();
    if (snapshot.id) cartEntity.id = snapshot.id;
    cartEntity.product = { id: snapshot.product.id, name: snapshot.product.name } as ProductEntity;
    cartEntity.quantity = snapshot.quantity;
    cartEntity.unitPrice = snapshot.unitPrice;
    cartEntity.lineAmount = snapshot.lineAmount;
    return cartEntity;
  }

  static toDomain(cart: CartEntity): Cart {
    return new Cart(cart.id, cart.product.id, cart.unitPrice, cart.quantity, cart.product);
  }

  static fromAddCartItemDto(dto: AddCartItemDto): Cart {
    return new Cart(null, dto.productId, dto.unitPrice, dto.quantity, {
      id: dto.productId,
      name: dto.productName,
    });
  }
}
