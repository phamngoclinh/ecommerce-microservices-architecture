import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Role } from './auth.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest<Request>();
      if (!request['user']) return false;
      const user = request['user'];
      return user && requiredRoles.some(role => user.role.includes(role));
    }

    return true;
  }
}

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
