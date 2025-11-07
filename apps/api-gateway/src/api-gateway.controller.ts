import { AuthService } from '@libs/common/modules/auth/auth.service';
import { All, Controller, Param, Req, Res, UnauthorizedException } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    private readonly authService: AuthService,
  ) {}

  // Catch-all route
  @All(':service/*path')
  async proxy(
    @Param('service') service: string,
    @Param('path') path: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const token = this.authService.fromHeaderAsBearerToken(req);
    if (token) {
      const validate = this.authService.verifyToken(token);
      if (!validate) throw new UnauthorizedException('Token is invalid');
    }

    return this.apiGatewayService.forwardRequest(service, path, req, res);
  }
}
