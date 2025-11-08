import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { InternalHttpClientService } from './internal-http-client.service';

@Module({
  imports: [HttpModule],
  providers: [InternalHttpClientService],
  exports: [InternalHttpClientService],
})
export class InternalHttpClientModule {}
