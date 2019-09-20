import passport from 'passport';
import {
  Module,
  INestApplication,
} from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import {
  LocalRegisterStrategy,
  LocalLoginStrategy,
} from './strategies';

@Module({
  imports: [
    UserModule,
  ],
  providers: [
    AuthService,
    LocalRegisterStrategy,
    LocalLoginStrategy,
  ],
  exports: [
    AuthService,
  ],
})
export class AuthModule {
  constructor(
    private readonly authService: AuthService,
  ) {}

  public initialize(app: INestApplication) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user: any, done: (err: any, id?: any) => void) => done(null, user));
    passport.deserializeUser((id: any, done: (err: any, user?: any) => void) => done(null, id));

    passport.use(new LocalRegisterStrategy(this.authService));
    passport.use(new LocalLoginStrategy(this.authService));
  }
}
