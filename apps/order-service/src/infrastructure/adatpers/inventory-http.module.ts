import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { IInventoryGateway } from '@order/application/ports/inventory.gateway';
import { InventoryHttpGateway } from './inventory-http.gateway';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [
    {
      provide: IInventoryGateway,
      useClass: InventoryHttpGateway,
    },
  ],
  exports: [
    {
      provide: IInventoryGateway,
      useClass: InventoryHttpGateway,
    },
  ],
})
export class InventoryHttpModule {}
