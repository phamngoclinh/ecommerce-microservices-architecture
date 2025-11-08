import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import type { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    if (request['user']) return next.handle();

    const userId = request.headers['x-internal-user-id'] as string;
    const userRole = request.headers['x-internal-user-role'] as string;
    const userScope = request.headers['x-internal-user-scope'] as string;
    if (userId && userRole && userScope) {
      request['user'] = {
        id: userId,
        role: userRole,
        scope: userScope,
      };
    }

    // const token = this.authService.fromHeaderAsBearerToken(request);
    // if (token) {
    //   const validate = this.authService.verifyToken(token);
    //   if (!validate) throw new UnauthorizedException('Token is invalid');
    //   request['user'] = validate;
    // }

    return next.handle();
  }
}
