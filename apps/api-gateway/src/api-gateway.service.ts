import { AuthService } from '@libs/common/modules/auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import type { Request, Response } from 'express';

@Injectable()
export class ApiGatewayService {
  constructor(private readonly authService: AuthService) {}

  private serviceMap: Record<string, string> = {
    catalogs: process.env.API_GATEWAY_CATALOG_SERVICE_URL!,
    inventories: process.env.API_GATEWAY_INVENTORY_SERVICE_URL!,
    orders: process.env.API_GATEWAY_ORDER_SERVICE_URL!,
    payments: process.env.API_GATEWAY_PAYMENT_SERVICE_URL!,
    notifications: process.env.API_GATEWAY_NOTIFICATION_SERVICE_URL!,
  };

  private validateToken(req: Request) {
    const token = this.authService.fromHeaderAsBearerToken(req);
    if (token) {
      const validate = this.authService.verifyToken(token);
      if (!validate) throw new UnauthorizedException('Token is invalid');
      return validate;
    }
    return null;
  }

  async forwardRequest(service: string, path: string, req: Request, res: Response) {
    const token = this.validateToken(req);

    const headers = token
      ? {
          'x-internal-user-id': token.id,
          'x-internal-user-role': token.role,
          'x-internal-user-scope': token.scope,
        }
      : {};

    const baseUrl = this.serviceMap[service];
    if (!baseUrl) {
      return res.status(400).json(JSON.stringify({ error: 'Gateway error' }));
    }
    const targetUrl = `${baseUrl}${req.url.replace(`/${service}`, '')}`;
    try {
      const response = await axios({
        method: req.method,
        url: targetUrl,
        headers: {
          ...headers,
          'Content-Type': req.headers['content-type'],
          authorization: req.headers['authorization'],
          host: undefined, // tránh lỗi "invalid header host",
        },
        data: req.body as unknown, // giữ nguyên body (phải bật body parser)
        params: req.query,
        validateStatus: () => true, // forward cả lỗi HTTP 4xx, 5xx
      });
      res.status(response.status).json(response.data);
    } catch (err: any) {
      if (err instanceof Error) {
        res.status(500).json({ error: 'Internal Server Error: ' + err.message });
      } else {
        res.status(500).json(err);
      }
    }
  }
}
