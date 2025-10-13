import { IStockRepository } from '@inventory/domain/repositories/stock.repository';
import { IUsecase } from '@libs/common/application/use-cases/base.usecase';

enum CheckStockStatus {
  OK = 'OK',
  NOT_FOUND = 'NOT_FOUND',
  INSUFFICIENT = 'INSUFFICIENT',
}

export interface CheckStockInput {
  items: { inventoryItemId: number; quantity: number }[];
}

interface CheckStockResultOutput {
  inventoryItemId: number;
  available: number;
  requested: number;
  status: CheckStockStatus;
  message?: string;
}

export interface CheckStockOutput {
  isEnough: boolean;
  details: CheckStockResultOutput[];
}

export class CheckStockUseCase extends IUsecase<CheckStockInput, CheckStockOutput> {
  constructor(private readonly stocksRepository: IStockRepository) {
    super();
  }

  async execute({ items }: CheckStockInput): Promise<CheckStockOutput> {
    const results: CheckStockResultOutput[] = [];

    for (const item of items) {
      const { inventoryItemId, quantity } = item;
      const stock = await this.stocksRepository.getStockByInventoryItemId(inventoryItemId);

      if (!stock) {
        results.push({
          inventoryItemId,
          available: 0,
          requested: quantity,
          status: CheckStockStatus.NOT_FOUND,
        });
        continue;
      }

      const available = stock.onHandQty - stock.reservedQty;

      if (available >= quantity) {
        results.push({
          inventoryItemId,
          available,
          requested: quantity,
          status: CheckStockStatus.OK,
        });
      } else {
        results.push({
          inventoryItemId,
          available,
          requested: quantity,
          status: CheckStockStatus.INSUFFICIENT,
        });
      }
    }

    const isEnough = results.every(r => r.status === CheckStockStatus.OK);
    return { isEnough, details: results };
  }
}
