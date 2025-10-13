import { Cart } from '@order/domain/models/cart.model';
import { AddCartItemDto } from '../dtos/add-cart-item.dto';
import { UpdateCartItemDto } from '../dtos/update-cart-item.dto';

export class CartUseCaseMapper {
  static fromAddCartItemDto(dto: AddCartItemDto): Cart {
    return new Cart(null, dto.productId, dto.unitPrice, dto.quantity, dto.productName);
  }

  static fromUpdateCartItemDto(dto: UpdateCartItemDto): Cart {
    return new Cart(null, dto.productId, 0, dto.quantity, '');
  }
}
