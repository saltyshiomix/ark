import { Module } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import passport from 'passport';

@Module({})
export class SessionPassportModule {
  public initialize(app: NestExpressApplication) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser((user: any, cb: any) => cb(null, user));
    passport.deserializeUser((obj: any, cb: any) => cb(null, obj)); 
  }
}
