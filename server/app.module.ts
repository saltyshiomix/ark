import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import {
  NextModule,
  NextMiddleware,
} from '@nestpress/next';
import { LogicModule } from './logics/logic.module';
import { RouteModule } from './routes/route.module';
import {
  RedirectIfAuthenticatedMiddleware,
  RedirectIfNotAuthenticatedMiddleware,
} from './logics/auth/middlewares';

@Module({
  imports: [
    NextModule,
    LogicModule,
    RouteModule,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    this.handleRoutes(consumer);
    this.handleAssets(consumer);
  }

  private handleRoutes(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RedirectIfAuthenticatedMiddleware)
      .forRoutes({
        path: 'auth/register',
        method: RequestMethod.GET,
      });

    consumer
      .apply(RedirectIfAuthenticatedMiddleware)
      .forRoutes({
        path: 'auth/login',
        method: RequestMethod.GET,
      });

    consumer
      .apply(RedirectIfNotAuthenticatedMiddleware)
      .forRoutes({
        path: '',
        method: RequestMethod.GET,
      });
  }

  private handleAssets(consumer: MiddlewareConsumer): void {
    consumer
      .apply(NextMiddleware)
      .forRoutes({
        path: '_next*',
        method: RequestMethod.GET,
      });
  }
}
