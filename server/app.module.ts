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
import { EntityModule } from './entities/entity.module';
import { LogicModule } from './logics/logic.module';
import { RouteModule } from './routes/route.module';
import {
  ApiAuthMiddleware,
  RedirectIfAuthenticatedMiddleware,
  RedirectIfNotAuthenticatedMiddleware,
} from './logics/auth/middlewares';

@Module({
  imports: [
    NextModule,
    EntityModule,
    LogicModule,
    RouteModule,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    this.handleAssets(consumer);
    this.handleApiRoutes(consumer);
    this.handleRoutes(consumer)
  }

  private handleAssets(consumer: MiddlewareConsumer): void {
    consumer
      .apply(NextMiddleware)
      .forRoutes({
        path: '_next*',
        method: RequestMethod.GET,
      });

    consumer
      .apply(NextMiddleware)
      .forRoutes({
        path: 'static*',
        method: RequestMethod.GET,
      });
  }

  private handleApiRoutes(consumer: MiddlewareConsumer): void {
    // consumer
    //   .apply(ApiAuthMiddleware)
    //   .forRoutes('api/user*');
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
}
