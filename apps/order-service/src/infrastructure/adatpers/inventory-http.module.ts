import { InternalHttpClientModule } from '@libs/common/modules/http-clients/internal-http-client.module';
import { Module } from '@nestjs/common';
import { IInventoryGateway } from '@order/application/ports/inventory.gateway';
import { InventoryHttpGateway } from './inventory-http.gateway';

@Module({
  imports: [InternalHttpClientModule],
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
