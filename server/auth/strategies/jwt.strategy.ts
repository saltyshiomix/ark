/** @format */

// #region Imports NPM
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// #endregion
// #region Imports Local
import { ConfigService } from '../../config/config.service';
import { jwtPrivateKey, jwtPublicKey } from '../jwt.rsa-options';
// #endregion

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtPrivateKey,
      publicKey: jwtPublicKey,
    });
  }

  async validate(payload: any): Promise<any> {
    // eslint-disable-next-line no-debugger
    debugger;

    return { id: payload.id };
  }
}
