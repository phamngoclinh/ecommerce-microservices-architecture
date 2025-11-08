import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: Request, res: any, next: (error?: any) => void) {
    const userId = req.headers['x-internal-user-id'] as string;
    const userRole = req.headers['x-internal-user-role'] as string;
    const userScope = req.headers['x-internal-user-scope'] as string;
    if (userId && userRole && userScope) {
      req['user'] = {
        id: userId,
        role: userRole,
        scope: userScope,
      };
    }

    // const token = this.authService.fromHeaderAsBearerToken(req);
    // if (token) {
    //   const validate = this.authService.verifyToken(token);
    //   if (!validate) throw new UnauthorizedException('Token is invalid');
    //   req['user'] = validate;
    // }

    next();
  }
}
