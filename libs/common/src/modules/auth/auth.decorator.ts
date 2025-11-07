/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export const Auth = createParamDecorator(
  (data: 'id' | 'role' | 'scope' | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request['user'];
    if (!user) return null;
    if (!data) return user;
    return user[data];
  },
);
