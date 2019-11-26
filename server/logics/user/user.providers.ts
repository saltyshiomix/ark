import { Connection } from 'typeorm';
import { User } from '../../entities/user.entity';
import {
  DATABASE_CONNECTION,
  USER_REPOSITORY,
} from '../database/constants';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DATABASE_CONNECTION],
  },
];
