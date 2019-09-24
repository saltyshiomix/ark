import ky from 'ky-universal';

const prefixUrl: string = `${process.env.APP_PROTOCOL}://${process.env.APP_HOST}:${process.env.APP_PORT}`;

export class Http {
  public async get<T>(url: string): Promise<T> {
    return ky.get(url, { prefixUrl }).json();
  }

  public async post<T>(url: string, data?: any): Promise<T> {
    return ky.post(url, { prefixUrl, json: data }).json();
  }

  public async put<T>(url: string, data?: any): Promise<T> {
    return ky.put(url, { prefixUrl, json: data }).json();
  }

  public async delete<T>(url: string): Promise<T> {
    return ky.delete(url, { prefixUrl }).json();
  }
}
