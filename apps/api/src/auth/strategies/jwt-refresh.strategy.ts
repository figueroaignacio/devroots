import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => req?.cookies?.refresh_token,
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
      ignoreExpiration: false,
    });
  }

  async validate(req: Request, payload: any) {
    return {
      sub: payload.sub,
      refreshToken: req.cookies.refresh_token,
    };
  }
}
