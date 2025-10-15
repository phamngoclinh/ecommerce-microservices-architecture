enum CheckStockStatus {
  OK = 'OK',
  NOT_FOUND = 'NOT_FOUND',
  INSUFFICIENT = 'INSUFFICIENT',
}

interface CheckStockResultOutput {
  inventoryItemId: number;
  available: number;
  requested: number;
  status: CheckStockStatus;
  message?: string;
}

export interface CheckStockResponseDto {
  isEnough: boolean;
  details: CheckStockResultOutput[];
}
