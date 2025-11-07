import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.authService.fromHeaderAsBearerToken(request);
    if (token) {
      const validate = this.authService.verifyToken(token);
      if (!validate) throw new UnauthorizedException('Token is invalid');
      request['user'] = validate;
    }

    return next.handle();
  }
}
