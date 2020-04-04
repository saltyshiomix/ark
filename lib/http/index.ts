import ky from 'ky-universal';

export class Http {
  private readonly http: typeof ky;

  constructor() {
    this.http = ky.create({
      throwHttpErrors: false,
      prefixUrl: `${process.env.APP_PROTOCOL}://${process.env.APP_HOST}:${process.env.APP_PORT}`,
    });
  }

  public async get(url: string): Promise<Response> {
    return this.http.get(url);
  }

  public async post(url: string, data?: any): Promise<Response> {
    return this.http.post(url, { json: data });
  }

  public async put(url: string, data?: any): Promise<Response> {
    return this.http.put(url, { json: data });
  }

  public async delete(url: string): Promise<Response> {
    return this.http.delete(url);
  }
}
