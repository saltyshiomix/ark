import {
  Module,
  INestApplication,
} from '@nestjs/common';
import { PostgresExpressSessionModule } from '@nestpress/postgres-express-session';
import { EnvModule } from '../../logics/env/env.module';
import { EnvService } from '../../logics/env/env.service';

@Module({
  imports: [
    EnvModule,
  ],
})
export class SessionModule extends PostgresExpressSessionModule {
  constructor(
    private readonly env: EnvService,
  ) {
    super();
  }

  public initialize(app: INestApplication) {
    super.initialize(app, {
      secret: this.env.get('SESSION_SECRET'),
      username: this.env.get('DB_USERNAME'),
      password: this.env.get('DB_PASSWORD'),
      database: this.env.get('DB_DATABASE'),
      host: this.env.get('DB_HOST'),
      port: parseInt(this.env.get('DB_PORT'), 10),
      expire: 24 * 60 * 60 * 1000, // one day
    });
  }
}
