import { StockReservation } from '../entities/stock-reservation.entity';

export abstract class IStockReservationRepository {
  abstract getStockReservation(id: number): Promise<StockReservation | null>;
  abstract getStockReservationByOrderId(orderId: number): Promise<StockReservation | null>;
  abstract getStockReservationsByOrderId(orderId: number): Promise<StockReservation[]>;
  abstract saveStockReservation(stockReservation: StockReservation): Promise<StockReservation>;
}
