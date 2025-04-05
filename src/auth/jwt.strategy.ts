/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        let token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

        if (!token) {
          token = ExtractJwt.fromExtractors([
            (req: Request) => {
              const cookies = req.cookies as {
                [key: string]: string | undefined;
              };
              return cookies['token'] || null;
            },
          ])(req);
        }
        return token;
      },
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'secret',
    });
  }

  validate(payload: { uid: string }) {
    if (!payload.uid) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return { uid: payload.uid };
  }
}
