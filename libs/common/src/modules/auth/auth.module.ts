import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const secretKey = configService.get<string>('JWT_SECRET_KEY');
        if (!secretKey) throw Error('Missing configurations for JWT_SECRET_KEY');
        return {
          secret: secretKey,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
