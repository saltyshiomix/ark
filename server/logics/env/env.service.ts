import { readFileSync } from 'fs';
import { parse } from 'dotenv';

export class EnvService {
  private readonly config: { [key: string]: string };

  constructor(path: string) {
    this.config = parse(readFileSync(path));
  }

  public get(key: string): string {
    return this.config[key];
  }
}
