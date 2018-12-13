import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvService } from '../env/env.service';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  constructor(private readonly env: EnvService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.env.get('DB_TYPE'),
      host: this.env.get('DB_HOST'),
      port: this.env.get('DB_PORT'),
      username: this.env.get('DB_USERNAME'),
      password: this.env.get('DB_PASSWORD'),
      database: this.env.get('DB_DATABASE'),
      synchronize: this.env.get('DB_SYNCHRONIZE') === 'true' ? true : false,
      entities: [__dirname + '/../entities/**/*.entity{.ts,.js}']
    } as TypeOrmModuleOptions;
  }
}
