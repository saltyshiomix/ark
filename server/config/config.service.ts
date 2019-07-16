/** @format */

import dotenv from 'dotenv';
import fs from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    // eslint-disable-next-line no-debugger
    // debugger;
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
