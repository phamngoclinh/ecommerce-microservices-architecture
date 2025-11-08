import { PersistencyProviders } from '@libs/common/infrastructure/persistency/providers/persistency.provider';
import { Provider } from '@nestjs/common';
import { ICartRepository } from '@order/domain/repositories/cart.repository';
import { IOrderRepository } from '@order/domain/repositories/order.repository';
import { CartRepository } from './repositories/cart.repository';
import { OrderRepository } from './repositories/order.repository';

export const OrderPersistencyProviders: Provider[] = [
  {
    provide: ICartRepository,
    useClass: CartRepository,
  },
  {
    provide: IOrderRepository,
    useClass: OrderRepository,
  },
  ...PersistencyProviders,
];
