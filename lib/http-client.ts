import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

export default class HttpClient {
  private client: AxiosInstance;

  constructor() {
    let baseURL: string = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`;
    if ((process.env.PROTOCOL === 'https' && process.env.PORT === '443') || (process.env.PROTOCOL === 'http' && process.env.PORT === '80')) {
      baseURL = `${process.env.PROTOCOL}://${process.env.HOST}`;
    }

    this.client = axios.create({ baseURL });
  }

  public async get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return await this.client.get(url, config);
  }

  public async post(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return await this.client.post(url, data, config);
  }

  public async update(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return await this.client.put(url, data, config);
  }

  public async delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return await this.client.delete(url, config);
  }
}
