import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: Request, res: any, next: (error?: any) => void) {
    const token = this.authService.fromHeaderAsBearerToken(req);
    if (token) {
      const validate = this.authService.verifyToken(token);
      if (!validate) throw new UnauthorizedException('Token is invalid');
      req['user'] = validate;
    }

    next();
  }
}
