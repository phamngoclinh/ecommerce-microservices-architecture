import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { AuthPayload } from './auth.interface';

@Injectable()
export class AuthService {
  private ISSUER_URL: string = '';

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.ISSUER_URL = this.configService.get<string>('JWT_ISSUER_URL') as string;
  }

  fromHeaderAsBearerToken(req: Request) {
    return req.headers['authorization']?.replace('Bearer ', '');
  }

  verifyToken(token: string): AuthPayload | null {
    try {
      const payload = this.jwtService.verify<
        AuthPayload & {
          iss: string;
        }
      >(token);

      if (payload.iss !== this.ISSUER_URL) throw new ForbiddenException('Issuer is not correct');

      return {
        id: payload.id,
        role: payload.role,
        scope: payload.scope,
      };
    } catch (err) {
      console.error('Failed to validate token', err);
      return null;
    }
  }
}
