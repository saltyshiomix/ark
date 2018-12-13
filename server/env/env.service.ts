import { parse } from 'dotenv';
import { readFileSync } from 'fs';

export class EnvService {
  private readonly envConfig: { [key: string]: string };

  constructor(configPath: string) {
    this.envConfig = parse(readFileSync(configPath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
