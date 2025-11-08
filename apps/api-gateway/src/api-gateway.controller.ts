import { All, Controller, Param, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  // Catch-all route
  @All(':service/*path')
  async proxy(
    @Param('service') service: string,
    @Param('path') path: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.apiGatewayService.forwardRequest(service, path, req, res);
  }
}
