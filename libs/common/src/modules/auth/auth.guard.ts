import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isIgnoreAuth = this.reflector.getAllAndOverride<boolean>('isIgnoreAuth', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isIgnoreAuth) {
      return true;
    }

    const type = context.getType();

    if (type === 'http') {
      const request = context.switchToHttp().getRequest<Request>();
      if (!request['user']) return false;
    }

    return true;
  }
}

export const IgnoreAuth = () => SetMetadata('isIgnoreAuth', true);
