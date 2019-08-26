import ky from 'ky-universal';

const prefixUrl: string = `${process.env.HOST}:${process.env.PORT}`;

export default class HttpClient {
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
