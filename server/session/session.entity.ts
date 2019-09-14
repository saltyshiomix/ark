import { Entity } from 'typeorm';
import { PostgresExpressSession } from '@nestpress/postgres-express-session';

@Entity()
export class Session extends PostgresExpressSession {}
