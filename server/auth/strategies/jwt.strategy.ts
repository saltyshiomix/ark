/** @format */

// #region Imports NPM
import { Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// #endregion
// #region Imports Local
import { ConfigService } from '../../config/config.service';
import { JwtPayload } from '../models/jwt-payload.interface';
import { AuthService } from '../auth.service';
import { UserResponseDTO } from '../../user/models/user.dto';
// #endregion

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      ...configService.jwtStrategyOptions,
    } as StrategyOptions);
  }

  validate = async (payload: JwtPayload): Promise<UserResponseDTO | null> =>
    this.authService.validate(payload);
}
