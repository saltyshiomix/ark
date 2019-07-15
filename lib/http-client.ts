/** @format */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export default class HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${process.env.HOST}:${process.env.PORT}`,
    });
  }

  public async get(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return this.client.get(url, config);
  }

  public async post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return this.client.post(url, data, config);
  }

  public async update(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return this.client.put(url, data, config);
  }

  public async delete(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return this.client.delete(url, config);
  }
}
