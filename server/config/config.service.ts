/** @format */

import dotenv from 'dotenv';
import fs from 'fs';
import * as Joi from 'joi';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      PORT: Joi.number()
        .default(4000)
        .required(),
      HOST: Joi.string()
        .default('http://localhost')
        .required(),
      DATABASE_URL: Joi.string()
        .default('postgres://arkuser:arkark@localhost:5432/arkdb')
        .required(),
      DATABASE_SCHEMA: Joi.string()
        .default('app_public,app_private')
        .required(),
      REDIS_HOST: Joi.string()
        .default('localhost')
        .required(),
      REDIS_PORT: Joi.number()
        .default(6379)
        .required(),
      REDIS_DB: Joi.number()
        .default(0)
        .required(),
      REDIS_PASSWORD: Joi.string()
        .allow('')
        .empty(),
      REDIS_PREFIX: Joi.string()
        .allow('')
        .empty(),
      SESSION_SECRET: Joi.string()
        .default('ark')
        .required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
