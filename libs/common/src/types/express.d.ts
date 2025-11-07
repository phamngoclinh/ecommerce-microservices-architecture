import 'express';
import { AuthPayload } from '../modules/auth/auth.interface';

declare module 'express' {
  interface Request {
    user: AuthPayload;
  }
}
