/** @format */

// #region Imports NPM
import { join } from 'path';
import { ConfigService } from './server/config/config.service';
// #endregion

const configService = new ConfigService(join(process.cwd(), '.env'));

module.exports = {
  name: 'default',
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  schema: configService.get('DATABASE_SCHEMA'),
  uuidExtension: 'pgcrypto',
  synchronize: true,
  dropSchema: true,
  logging: true,
  entities: ['server/**/*.entity.ts'],
  cache: true,
};
