import { StockReservationStatus } from '@inventory/domain/entities/stock-reservation.entity';
import { IStockReservationRepository } from '@inventory/domain/repositories/stock-reservation.repository';
import { IStockRepository } from '@inventory/domain/repositories/stock.repository';
import { IUsecase } from '@libs/common/application/use-cases/base.usecase';

interface ReleaseReservationInput {
  orderId: number;
}

export class ReleaseReservationUseCase extends IUsecase<
  ReleaseReservationInput,
  { success: boolean }
> {
  constructor(
    private readonly stocksRepository: IStockRepository,
    private readonly stockReservationsRepository: IStockReservationRepository,
  ) {
    super();
  }

  async execute({ orderId }: ReleaseReservationInput): Promise<{ success: boolean }> {
    const reservations =
      await this.stockReservationsRepository.getStockReservationsByOrderId(orderId);

    for (const res of reservations) {
      res.status = StockReservationStatus.RELEASED;
      await this.stockReservationsRepository.saveStockReservation(res);
    }

    return { success: true };
  }
}
