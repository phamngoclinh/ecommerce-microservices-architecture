import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
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
      const userRole = request.headers['x-internal-user-role'] as string;
      if (!userRole) return false;
      // if (!request['user']) return false;
      return requiredRoles.some(role => userRole.includes(role));
    }

    return true;
  }
}

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
