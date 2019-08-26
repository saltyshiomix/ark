import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export default class HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({ baseURL: `${process.env.HOST}:${process.env.PORT}` });
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.client.get(url, config)).data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return (await this.client.post(url, data, config)).data;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return (await this.client.put(url, data, config)).data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.client.delete(url, config)).data;
  }
}
