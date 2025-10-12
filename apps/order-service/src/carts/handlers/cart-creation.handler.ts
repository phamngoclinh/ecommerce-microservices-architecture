import { BaseHandler } from '@libs/common/handlers/base-handler';
import { Cart } from '../models/cart.model';

export interface CartCreationContext {
  productId: number;
  unitPrice: number;
  quantity: number;
  lineAmount: number;

  cart?: Cart; // presentation data
}

export class CartCreationHandler extends BaseHandler<CartCreationContext> {}
